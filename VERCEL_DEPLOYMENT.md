# Deploying to Vercel (ajiko-portfolio.vercel.app)

## 1. Push the code

Export this project to your `ajiko2505/Ajiko-Portfolio` GitHub repo (Project Settings -> GitHub),
or download the code and push it. Vercel auto-deploys the connected repo on push.

## 2. Required environment variables

Add these in Vercel -> Project -> Settings -> Environment Variables, for
**Production**, **Preview** and **Development**.

### Frontend (must be prefixed with `VITE_`, safe to expose)

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | same as the value in this project's `.env` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | same as `.env` |
| `VITE_SUPABASE_ANON_KEY` | same as `.env` |
| `VITE_SUPABASE_PROJECT_ID` | same as `.env` |

### Backend / server functions (secret — never prefix with `VITE_`)

| Name | Purpose |
| --- | --- |
| `SUPABASE_URL` | backend database access |
| `SUPABASE_PUBLISHABLE_KEY` | backend public client |
| `SUPABASE_PROJECT_ID` | backend project reference |
| `SUPABASE_SERVICE_ROLE_KEY` | required to store contact messages (server-only) |
| `LOVABLE_API_KEY` | authenticates calls to the email gateway |
| `RESEND_API_KEY` | connection key for Resend email delivery |
| `CONTACT_NOTIFY_EMAIL` | inbox that receives contact form enquiries |
| `CONTACT_FROM_EMAIL` | optional; e.g. `Ajiko Fidelis <hello@yourdomain.com>` |

Notes:
- Without `LOVABLE_API_KEY`, `RESEND_API_KEY` and `CONTACT_NOTIFY_EMAIL`, messages are still
  saved to the database, but no email is sent. The server logs
  `email delivery skipped: missing env ...` so this is visible in Vercel logs.
- `CONTACT_FROM_EMAIL` should use a domain verified in Resend. The default
  `onboarding@resend.dev` only delivers to the Resend account owner.

## 3. Verify after deploy

1. Open `https://ajiko-portfolio.vercel.app/contact` and submit a test enquiry.
2. In Vercel -> Deployments -> Functions -> Logs, look for lines starting with `[contact:<id>]`:
   - `email delivered on attempt 1 in NNNms` -> working
   - `Resend request failed [4xx/5xx] ...` -> Resend rejected it (check `from` domain / API key)
   - `email delivery skipped: missing env ...` -> an env var is missing
3. Every attempt is also recorded in the database: the `contact_messages` row stores
   `delivered_email` and `delivery_error`.

Failed sends retry up to 3 times with backoff; permanent 4xx errors stop immediately.

## 4. Reading enquiries

Contact submissions are readable only by an admin account. After signing up on the site,
grant your account the admin role once (one row in `user_roles` with role `admin`).
No other signed-up user can read submissions.
