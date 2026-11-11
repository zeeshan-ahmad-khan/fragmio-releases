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
  setPal(r.dataset.pal || 'duo')
  var m = document.getElementById('mode'); if (m) m.onclick = toggleMode
  var t = document.getElementById('theme'); if (t) t.onclick = toggleMode
})()
