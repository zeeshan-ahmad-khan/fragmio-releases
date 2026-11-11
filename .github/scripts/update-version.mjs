// When a release is published: write version.json (read by Help → Check for updates in the app),
// the version/date/channel in the website's config.js (Vercel redeploys the website by itself),
// and the channel notice in README.md. The channel comes from the hidden line <!-- channel: beta --> in the release text.
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

const marked = body.match(/<!--\s*channel:\s*([a-z]+)\s*-->/i)
const channel = marked ? marked[1].toLowerCase() : null
const Label = (c) => c.charAt(0).toUpperCase() + c.slice(1)

const old = existsSync('version.json') ? JSON.parse(readFileSync('version.json', 'utf8')) : {}
const json = {
  version,
  channel: channel ?? old.channel ?? 'beta',
  date: iso,
  download: old.download ?? 'https://fragmio.vercel.app/download',
  notes,
  important: /\[important\]/i.test(body)
}
writeFileSync('version.json', JSON.stringify(json, null, 2) + '\n')
console.log('version.json →', json)

// The website lives at the top of the repo (config.js) or in a website/ folder.
const cfg = existsSync('config.js') ? 'config.js' : 'website/config.js'
if (existsSync(cfg)) {
  const s = readFileSync(cfg, 'utf8')
    .replace(/version: '[^']*'/, `version: '${version}'`)
    .replace(/date: '[^']*'/, `date: '${pretty}'`)
    .replace(/channel: '[^']*'/, `channel: '${json.channel}'`)
  writeFileSync(cfg, s)
  console.log(cfg, '→', version, pretty)
}

// README.md: the notice between <!-- channel-notice --> and <!-- /channel-notice -->.
if (existsSync('README.md')) {
  const notice =
    json.channel === 'stable'
      ? ''
      : `> **Fragmio is in ${json.channel}.** Everything is free while the ${json.channel} runs. Please tell us what breaks.\n`
  const r = readFileSync('README.md', 'utf8').replace(
    /<!-- channel-notice -->[\s\S]*?<!-- \/channel-notice -->/,
    `<!-- channel-notice -->\n${notice}<!-- /channel-notice -->`
  )
  writeFileSync('README.md', r)
  console.log('README.md → channel', json.channel)
}
