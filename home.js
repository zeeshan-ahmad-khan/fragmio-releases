// Home page only: the caption demo and the motion.
(function(){
const inp=document.getElementById('capIn'),out=document.getElementById('capOut');let style='hook';
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function render(){const t=esc(inp.value||'Your title here').replace(/\*(.+?)\*/g,'<em>$1</em>');out.className='cap-out '+style;out.innerHTML=style==='box'?'<span>'+t+'</span>':t}
inp.oninput=render;document.querySelectorAll('#styles button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#styles button').forEach(x=>x.classList.toggle('on',x===b));style=b.dataset.s;render()});render();

})();
(()=>{const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
const W=['a week of short clips.','ten Shorts in one go.','a month of Reels.','clips people share.'];let i=0;const e=document.getElementById('rot');
if(!red)setInterval(()=>{e.classList.add('out');setTimeout(()=>{i=(i+1)%W.length;e.textContent=W[i];e.classList.remove('out')},350)},2800);
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.reveal,#exprows').forEach(el=>red?el.classList.add('in'):io.observe(el));
const btns=[...document.querySelectorAll('#styles button')];let auto=!red,k=0;btns.forEach(b=>b.addEventListener('click',()=>auto=false));document.getElementById('capIn').addEventListener('input',()=>auto=false);
setInterval(()=>{if(!auto)return;k=(k+1)%btns.length;btns[k].click();auto=true},2400);})()
