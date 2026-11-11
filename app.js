const $=id=>document.getElementById(id);
const KEY='riseup.pwa.alarms.v1', WINS='riseup.pwa.wins.v1';
let alarms=JSON.parse(localStorage.getItem(KEY)||'[]'), wins=JSON.parse(localStorage.getItem(WINS)||'[]');
let problem={a:4,b:5}, selectedDays=new Set([1,2,3,4,5,6,7]);
const dayNames=['S','M','T','W','T','F','S'];
function persist(){localStorage.setItem(KEY,JSON.stringify(alarms));localStorage.setItem(WINS,JSON.stringify(wins));}
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2300)}
function pretty(t){let [h,m]=t.split(':').map(Number);let d=new Date();d.setHours(h,m);return d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}
function render(){
 $('alarms').innerHTML=alarms.length?alarms.map(a=>`<article class="alarm"><div><time>${pretty(a.time)}</time><div class="label">${escapeHtml(a.label)}</div><div class="repeat">${a.days.map(d=>dayNames[d-1]).join(' · ')}</div></div><button class="toggle ${a.enabled?'on':''}" aria-label="Toggle alarm" data-toggle="${a.id}"></button></article>`).join(''):'<div class="empty">No alarms yet. Add one to plan your next morning.</div>';
 $('streak').textContent=streak();$('total').textContent=wins.length;
 $('historyList').innerHTML=wins.length?[...wins].reverse().slice(0,5).map(w=>`<div class="history-row"><span class="tick">✓</span><span>${escapeHtml(w.challenge)}</span><time>${new Date(w.date).toLocaleDateString([], {month:'short',day:'numeric'})}</time></div>`).join(''):'<p class="muted">Your wins will show up here.</p>';
 document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{let a=alarms.find(x=>x.id===b.dataset.toggle);a.enabled=!a.enabled;persist();render();toast(a.enabled?'Alarm enabled':'Alarm paused');});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function streak(){let set=new Set(wins.map(w=>new Date(w.date).toDateString()));let d=new Date();if(!set.has(d.toDateString()))d.setDate(d.getDate()-1);let n=0;while(set.has(d.toDateString())){n++;d.setDate(d.getDate()-1);}return n;}
function makeDays(){ $('days').innerHTML=dayNames.map((d,i)=>`<button type="button" class="day ${selectedDays.has(i+1)?'selected':''}" data-day="${i+1}">${d}</button>`).join('');document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{let n=+b.dataset.day;selectedDays.has(n)?selectedDays.delete(n):selectedDays.add(n);b.classList.toggle('selected');});}
$('addAlarm').onclick=()=>{selectedDays=new Set([1,2,3,4,5,6,7]);makeDays();$('alarmDialog').showModal();};
$('alarmForm').onsubmit=e=>{e.preventDefault();if(!selectedDays.size){toast('Choose at least one day');return;}alarms.push({id:crypto.randomUUID(),time:$('alarmTime').value,label:$('alarmLabel').value.trim()||'Wake up',days:[...selectedDays].sort(),enabled:true});persist();render();$('alarmDialog').close();toast('Alarm saved');};
$('startChallenge').onclick=()=>{problem={a:Math.floor(Math.random()*13)+3,b:Math.floor(Math.random()*12)+2};$('question').textContent=`${problem.a} + ${problem.b} = ?`;$('answer').value='';$('error').textContent='';$('challengeDialog').showModal();};
$('closeChallenge').onclick=()=>$('challengeDialog').close();
$('checkAnswer').onclick=()=>{if(Number($('answer').value)!==problem.a+problem.b){$('error').textContent='Not quite — try again.';return;}if(!wins.some(w=>new Date(w.date).toDateString()===new Date().toDateString()))wins.push({date:new Date().toISOString(),challenge:'Math challenge'});persist();render();$('challengeDialog').close();toast('Morning won! Great work.');};
$('navAlarms').onclick=()=>$('addAlarm').click();$('navProgress').onclick=()=>$('historyList').scrollIntoView({behavior:'smooth'});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
if('Notification' in window && Notification.permission==='default'){/* Ask only after user taps enable reminder in a future version. */}
render();