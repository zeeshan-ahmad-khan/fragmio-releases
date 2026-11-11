// Fills in links and version numbers from config.js, and the feedback/support details.
(function () {
  var c = window.FRAGMIO || {}
  document.querySelectorAll('[data-download]').forEach(function (a) { a.href = c.downloadUrl })
  document.querySelectorAll('[data-releases]').forEach(function (a) { a.href = c.releasesUrl })
  document.querySelectorAll('[data-version]').forEach(function (e) { e.textContent = c.version })
  document.querySelectorAll('[data-date]').forEach(function (e) { e.textContent = c.date })
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear() })

  // Support page
  var pay = document.getElementById('pay')
  if (pay) { if (c.razorpayUrl) pay.href = c.razorpayUrl; else pay.classList.add('hidden') }
  var upi = document.getElementById('upi')
  if (upi) { if (c.upiId) { upi.querySelector('span').textContent = c.upiId } else upi.classList.add('hidden') }
  var copy = document.getElementById('copy-upi')
  if (copy) copy.addEventListener('click', function () {
    try { navigator.clipboard.writeText(c.upiId); copy.textContent = 'Copied' } catch (e) {}
  })

  // Feedback page: the app opens it with ?type=problem&app=1.16.0&channel=beta&os=Windows 11
  var q = new URLSearchParams(location.search)
  var problem = q.get('type') === 'problem'
  var title = document.getElementById('fb-title')
  if (title && problem) {
    title.textContent = 'Report a problem'
    document.getElementById('fb-lead').textContent = 'Tell us what happened and what you expected. Please attach the newest log file (Help → Open log folder in the app).'
  }
  var info = document.getElementById('fb-info')
  if (info && q.get('app')) {
    info.classList.remove('hidden')
    info.querySelector('span').textContent = 'Fragmio ' + q.get('app') + (q.get('channel') ? ' ' + q.get('channel') : '') + ' · ' + (q.get('os') || '')
  }
  var frame = document.getElementById('fb-frame')
  var soon = document.getElementById('fb-soon')
  if (frame) {
    if (c.feedbackFormUrl) {
      var url = c.feedbackFormUrl
      frame.src = url + (url.indexOf('?') < 0 ? '?' : '&') + 'embedded=true'
      document.getElementById('fb-open').href = url
    } else { frame.classList.add('hidden'); document.getElementById('fb-open').classList.add('hidden'); soon.classList.remove('hidden') }
  }
})()
