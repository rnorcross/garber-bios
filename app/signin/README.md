# Bios for Dealerships

Shared editor for Garber Automotive Group platform bios: website, Facebook, Instagram, TikTok, Pinterest, LinkedIn, Google Business Profile, YouTube, Yelp, and BBB, for all 43 profiles. Edits save per field, and everyone sees each other's changes within about 5 seconds.

**Stack:** Next.js 14 on Vercel · Neon Postgres (the copy) · Vercel Blob (dealership logos) · Google sign-in limited to your company domain.

---

## Deploy (about 15 minutes)

### 1. Put the code on GitHub
Create a new **private** repo (for example `bios-for-dealerships`) and push this folder to it:

```bash
cd bios-for-dealerships
git init && git add . && git commit -m "Bios for Dealerships"
git branch -M main
git remote add origin https://github.com/<your-org>/bios-for-dealerships.git
git push -u origin main
```

### 2. Import it into Vercel
In Vercel, choose **Add New → Project**, pick the repo, and click **Deploy**. The first deploy builds fine; the app won't work until the steps below are done.

### 3. Add the database and logo storage
In the project, open the **Storage** tab:
- **Create Database → Neon (Postgres)** → connect it to this project. This adds `DATABASE_URL`.
- **Create → Blob** → connect it to this project. This adds `BLOB_READ_WRITE_TOKEN`.

The table is created and loaded with all 43 profiles automatically the first time someone opens the app.

### 4. Set up Google sign-in
In [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (use the Google Workspace project your IT team manages, if there is one):
1. **OAuth consent screen:** User type **Internal** (limits sign-in to your Workspace). App name "Bios for Dealerships".
2. **Credentials → Create credentials → OAuth client ID → Web application.**
3. **Authorized redirect URI:** `https://<your-vercel-domain>/api/auth/callback/google`
   (for example `https://bios-for-dealerships.vercel.app/api/auth/callback/google`; add a second one if you attach a custom domain).
4. Copy the client ID and secret.

### 5. Add the remaining environment variables
Vercel → **Settings → Environment Variables** (Production):

| Name | Value |
| --- | --- |
| `GOOGLE_CLIENT_ID` | from step 4 |
| `GOOGLE_CLIENT_SECRET` | from step 4 |
| `NEXTAUTH_SECRET` | a long random string (`openssl rand -base64 32`) |
| `ALLOWED_EMAIL_DOMAINS` | your Google Workspace domain, e.g. `garberauto.com` (comma-separate several) |

Sign-in stays closed to everyone until `ALLOWED_EMAIL_DOMAINS` is set.

### 6. Redeploy
**Deployments → ⋯ → Redeploy.** Open the URL, sign in with a work Google account, and send the link to your team.

---

## Good to know
- **Starting copy** comes from `data/seed-profiles.json`, exported from the claude.ai version on 2026-09-22. It only loads into an empty database, so redeploying never overwrites your team's edits.
- **Editing the store list:** add, rename, or remove rows in the `profiles` table (Neon's SQL editor works). `fields` is JSON keyed by field name.
- **Character limits** live in `PLATFORMS` in `public/app.js` (what editors see) and `lib/fields.js` (which fields can be saved). Change both together.
- **Logos** are uploaded from each dealership's page with **Add logo** (PNG, JPG, WebP, or SVG under 2 MB) and stored in Vercel Blob.
- **No edit history** is kept; the last save wins per field.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in the values; add http://localhost:3000/api/auth/callback/google to the OAuth client
npm run dev
```
