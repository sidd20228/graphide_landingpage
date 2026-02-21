import nodemailer from 'nodemailer'
import pg from 'pg'
import { buildComingSoonEmail } from '../server/emailTemplate.js'

const requiredEnv = ['NEON_DATABASE_URL', 'MAILGUN_SMTP_USER', 'MAILGUN_SMTP_PASS', 'MAIL_FROM']

let pool
let transporter
let tableInitPromise

function missingConfig() {
  return requiredEnv.filter((name) => !process.env[name])
}

function getPool() {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.NEON_DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  }
  return pool
}

function getTransporter() {
  if (!transporter) {
    const smtpHost = process.env.MAILGUN_SMTP_HOST || 'smtp.mailgun.org'
    const smtpPort = Number(process.env.MAILGUN_SMTP_PORT || 587)
    const smtpSecure = String(process.env.MAILGUN_SMTP_SECURE || 'false').toLowerCase() === 'true'
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.MAILGUN_SMTP_USER || '',
        pass: process.env.MAILGUN_SMTP_PASS || '',
      },
    })
  }
  return transporter
}

async function ensureTable() {
  if (!tableInitPromise) {
    tableInitPromise = getPool().query(`
      CREATE TABLE IF NOT EXISTS waitlist_signups (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
  }
  await tableInitPromise
}

function parseBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body || {}
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const missing = missingConfig()
    if (missing.length) {
      return res.status(500).json({ error: 'Server is missing required configuration.' })
    }

    const body = parseBody(req)
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim().toLowerCase()

    if (name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    await ensureTable()

    await getPool().query(
      `INSERT INTO waitlist_signups (name, email)
       VALUES ($1, $2)
       ON CONFLICT (email)
       DO UPDATE SET name = EXCLUDED.name, updated_at = NOW()`,
      [name, email],
    )

    await getTransporter().sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Graphide — You’re on the waitlist',
      text: `Hi ${name},\n\nThanks for joining the Graphide waitlist. We’ll share updates and early access details soon.\n\n— Graphide Team`,
      html: buildComingSoonEmail({ name }),
    })

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('vercel_waitlist_error', error)
    if (error?.code === 'EAUTH') {
      return res.status(502).json({
        error: 'SMTP authentication failed. Check MAILGUN_SMTP_USER and MAILGUN_SMTP_PASS.',
      })
    }
    if (error?.code === 'ESOCKET' || error?.code === 'ECONNECTION') {
      return res.status(502).json({ error: 'SMTP connection failed. Check MAILGUN_SMTP_HOST and MAILGUN_SMTP_PORT.' })
    }
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
