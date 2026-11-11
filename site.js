// Fills in versions, links and channel from config.js (which the release automation keeps up to date).
(function () {
  var c = window.FRAGMIO || {}
  var all = function (sel, fn) { document.querySelectorAll(sel).forEach(fn) }
  all('[data-download]', function (a) { if (c.downloadUrl) a.href = c.downloadUrl })
  all('[data-releases]', function (a) { if (c.releasesUrl) { a.href = c.releasesUrl; a.target = '_blank'; a.rel = 'noopener' } })
  all('[data-version]', function (e) { if (c.version) e.textContent = c.version })
  all('[data-date]', function (e) { if (c.date) e.textContent = c.date })
  all('[data-year]', function (e) { e.textContent = new Date().getFullYear() })

  // Channel: alpha / beta show their badge; stable hides badges and beta-only text.
  var ch = (c.channel || 'stable').toLowerCase()
  all('[data-channel]', function (e) { if (ch === 'stable') e.classList.add('hidden'); else e.textContent = ch.toUpperCase() })
  all('[data-channel-label]', function (e) { e.textContent = ch === 'stable' ? 'Free' : 'Free ' + ch })
  all('[data-prerelease-only]', function (e) { if (ch === 'stable') e.classList.add('hidden') })

  // Support page
  var pay = document.getElementById('pay')
  if (pay) { if (c.razorpayUrl) pay.href = c.razorpayUrl; else pay.closest('.panel').classList.add('hidden') }
  var upi = document.getElementById('upi')
  if (upi) { if (c.upiId) upi.querySelector('span').textContent = c.upiId; else upi.classList.add('hidden') }
  var copy = document.getElementById('copy-upi')
  if (copy) copy.addEventListener('click', function () { try { navigator.clipboard.writeText(c.upiId); copy.textContent = 'Copied' } catch (e) {} })

  // Feedback page: the app opens it with ?type=problem&app=1.16.3&channel=beta&os=Windows 11
  var q = new URLSearchParams(location.search)
  var title = document.getElementById('fb-title')
  if (title && q.get('type') === 'problem') {
    title.textContent = 'Report a problem'
    document.getElementById('fb-lead').textContent = 'Tell us what happened and what you expected. Please attach the newest log file (Help → Open log folder in the app).'
  }
  var info = document.getElementById('fb-info')
  if (info && q.get('app')) {
    info.classList.remove('hidden')
    info.querySelector('span').textContent = 'Fragmio ' + q.get('app') + (q.get('channel') ? ' ' + q.get('channel') : '') + ' · ' + (q.get('os') || '')
  }
  var frame = document.getElementById('fb-frame')
  if (frame) {
    var open = document.getElementById('fb-open')
    if (c.feedbackFormUrl) {
      frame.src = c.feedbackFormUrl + (c.feedbackFormUrl.indexOf('?') < 0 ? '?' : '&') + 'embedded=true'
      open.href = c.feedbackFormUrl
    } else { frame.classList.add('hidden'); open.classList.add('hidden'); document.getElementById('fb-soon').classList.remove('hidden') }
  }
})()
