// Colours and light/dark: saved in this browser (localStorage), so returning visitors get the same look.
(function () {
  var r = document.documentElement
  var save = function (k, v) { try { localStorage.setItem(k, v) } catch (e) {} }
  function setPal(p) {
    r.dataset.pal = p
    save('fr-palette', p)
    document.querySelectorAll('#picker [data-p]').forEach(function (b) { b.classList.toggle('on', b.dataset.p === p) })
  }
  function toggleMode() { r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark'; save('fr-theme', r.dataset.theme) }
  document.querySelectorAll('#picker [data-p]').forEach(function (b) { b.onclick = function () { setPal(b.dataset.p) } })
  setPal(r.dataset.pal || 'berry')
  var m = document.getElementById('mode'); if (m) m.onclick = toggleMode
  var t = document.getElementById('theme'); if (t) t.onclick = toggleMode
  // Phone menu
  var mb = document.getElementById('menuBtn'), mn = document.getElementById('mnav')
  if (mb && mn) {
    var close = function () { mn.hidden = true; mb.setAttribute('aria-expanded', 'false') }
    mb.onclick = function () { var open = mn.hidden; mn.hidden = !open; mb.setAttribute('aria-expanded', String(open)) }
    mn.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close) })
    addEventListener('keydown', function (e) { if (e.key === 'Escape') close() })
    addEventListener('resize', function () { if (innerWidth > 960) close() })
  }
})()
