# Fragmio website

Plain HTML and CSS, no build step. Hosted on Vercel.

## Deploy
1. Put this folder in a GitHub repo (e.g. `fragmio-website`), or add it to `fragmio-releases` in a `website` folder.
2. On vercel.com: **Add New → Project**, pick the repo. Framework: **Other**. Root directory: this folder. Deploy.
3. In the Vercel project → Settings → Domains, use `fragmio.vercel.app` if it's free. If you get a different address,
   change `WEBSITE_URL` in the app's `src/shared/links.ts` and the `download` link in `version.json`.

## Change things
- `config.js`: version, release date, Razorpay link, UPI ID, Google Form link.
- `support-qr.png`: your UPI QR code (add this file).
- Pages are built from `build.py` (shared header and footer). Edit it and run `python3 build.py`,
  or edit the `.html` files directly for small changes.

## Pages
- `/` home, `/download`, `/support`, `/feedback` (the app opens `/feedback?type=problem&app=…&os=…` for problem reports).
