// When a release is published: write version.json (read by Help → Check for updates in the app)
// and the version/date in website/config.js (Vercel redeploys the website by itself).
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const tag = process.env.TAG ?? ''
const body = process.env.BODY ?? ''
const version = tag.replace(/^v/, '')
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.log(`Skipped: "${tag}" is not a version tag.`)
  process.exit(0)
}
const day = new Date(process.env.PUBLISHED_AT || Date.now())
const iso = day.toISOString().slice(0, 10)
const pretty = day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })

// The bullet lines before the footer are the notes.
const notes = body
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => /^[-*] /.test(l))
  .map((l) => l.slice(2).replace(/\*\*/g, '').trim())
  .filter(Boolean)
  .slice(0, 12)

const old = existsSync('version.json') ? JSON.parse(readFileSync('version.json', 'utf8')) : {}
const json = {
  version,
  channel: old.channel ?? 'beta',
  date: iso,
  download: old.download ?? 'https://fragmio.vercel.app/download',
  notes,
  important: /\[important\]/i.test(body)
}
writeFileSync('version.json', JSON.stringify(json, null, 2) + '\n')
console.log('version.json →', json)

const cfg = 'website/config.js'
if (existsSync(cfg)) {
  const s = readFileSync(cfg, 'utf8')
    .replace(/version: '[^']*'/, `version: '${version}'`)
    .replace(/date: '[^']*'/, `date: '${pretty}'`)
  writeFileSync(cfg, s)
  console.log('website/config.js →', version, pretty)
}
