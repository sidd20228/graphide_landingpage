import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import pg from 'pg'
import { buildComingSoonEmail } from './emailTemplate.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 8787)

const requiredEnv = [
  'NEON_DATABASE_URL',
  'MAILGUN_SMTP_USER',
  'MAILGUN_SMTP_PASS',
  'MAIL_FROM',
]

const missing = requiredEnv.filter((name) => !process.env[name])
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`)
}

const pool = new pg.Pool({ connectionString: process.env.NEON_DATABASE_URL, ssl: { rejectUnauthorized: false } })

const smtpHost = process.env.MAILGUN_SMTP_HOST || 'smtp.mailgun.org'
const smtpPort = Number(process.env.MAILGUN_SMTP_PORT || 587)
const smtpSecure = String(process.env.MAILGUN_SMTP_SECURE || 'false').toLowerCase() === 'true'
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.MAILGUN_SMTP_USER || '',
    pass: process.env.MAILGUN_SMTP_PASS || '',
  },
})

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',').map((v) => v.trim()) : true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/waitlist', async (req, res) => {
  try {
    if (missing.length) {
      return res.status(500).json({ error: 'Server is missing required configuration.' })
    }

    const name = String(req.body?.name || '').trim()
    const email = String(req.body?.email || '').trim().toLowerCase()

    if (name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    await pool.query(
      `INSERT INTO waitlist_signups (name, email)
       VALUES ($1, $2)
       ON CONFLICT (email)
       DO UPDATE SET name = EXCLUDED.name, updated_at = NOW()`,
      [name, email],
    )

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Graphide — You’re on the waitlist',
      text: `Hi ${name},\n\nThanks for joining the Graphide waitlist. We’ll share updates and early access details soon.\n\n— Graphide Team`,
      html: buildComingSoonEmail({ name }),
    })

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('waitlist_error', error)
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
})

async function start() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist_signups (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    app.listen(PORT, () => {
      console.log(`Graphide API listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('startup_error', error)
    process.exit(1)
  }
}

start()
