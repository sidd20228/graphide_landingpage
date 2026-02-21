export function buildComingSoonEmail({ name = 'there' }) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Graphide — You’re on the list</title>
  </head>
  <body style="margin:0;padding:0;background:#050507;font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;color:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050507;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:94%;border:1px solid rgba(255,255,255,.14);border-radius:18px;overflow:hidden;background:linear-gradient(160deg,#0e1118 0%, #08090d 100%);">
            <tr>
              <td style="padding:28px 32px 18px;border-bottom:1px solid rgba(255,255,255,.08);">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.58);">Graphide</div>
                <h1 style="margin:10px 0 0;font-size:34px;line-height:1.2;font-weight:600;background:linear-gradient(145deg,#fff 20%,rgba(96,165,250,.85) 95%);-webkit-background-clip:text;background-clip:text;color:transparent;">You’re on the waitlist</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 16px;color:rgba(255,255,255,.85);font-size:16px;line-height:1.65;">Hi ${escapeHtml(name)},</p>
                <p style="margin:0 0 14px;color:rgba(255,255,255,.75);font-size:15px;line-height:1.7;">
                  Thanks for requesting early access to <strong>Graphide</strong>.
                  We’re preparing a private beta and you’re now in line for an invite.
                </p>
                <p style="margin:0 0 20px;color:rgba(255,255,255,.75);font-size:15px;line-height:1.7;">
                  We’ll reach out with product updates, early-access timing, and onboarding details as we get closer to launch.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:10px 0 24px;">
                  <tr>
                    <td style="border:1px solid rgba(96,165,250,.75);background:rgba(96,165,250,.16);border-radius:999px;padding:11px 20px;color:#fff;font-size:14px;font-weight:600;letter-spacing:.01em;">
                      Coming Soon — Private Beta
                    </td>
                  </tr>
                </table>

                <div style="height:1px;background:rgba(255,255,255,.08);margin:10px 0 18px;"></div>

                <p style="margin:0;color:rgba(255,255,255,.56);font-size:12px;line-height:1.6;">
                  This message was sent because you submitted the early-access form on Graphide’s landing page.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
