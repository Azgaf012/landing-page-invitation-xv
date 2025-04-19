/* =========  01  AUDIO  ========= */
const audio   = document.getElementById('bgMusic');
const toggle  = document.getElementById('audioToggle');
const seekBar = document.getElementById('seek');
const curSpan = document.getElementById('current');
const durSpan = document.getElementById('duration');

toggle.addEventListener('click',()=>{
  if(audio.paused){
    audio.play(); toggle.textContent='🔇';
  }else{
    audio.pause(); toggle.textContent='🔊';
  }
});

audio.addEventListener('loadedmetadata',()=>{
  durSpan.textContent = formatTime(audio.duration);
  seekBar.max = Math.floor(audio.duration);
});

audio.addEventListener('timeupdate',()=>{
  curSpan.textContent = formatTime(audio.currentTime);
  seekBar.value       = Math.floor(audio.currentTime);
});

seekBar.addEventListener('input',()=> audio.currentTime = seekBar.value);

function formatTime(t){
  const m = String(Math.floor(t/60)).padStart(2,'0');
  const s = String(Math.floor(t%60)).padStart(2,'0');
  return `${m}:${s}`;
}

/* =========  02  COUNTDOWN  ========= */
const target = new Date('2025-05-03T19:00:00-05:00'); // Perú -05
const ids = {d:'d',h:'h',m:'m',s:'s'};

function tick(){
  const now = new Date();
  let diff = (target - now)/1000; // seg
  if(diff < 0) diff = 0;
  const d = Math.floor(diff/86400);
  const h = Math.floor(diff%86400/3600);
  const m = Math.floor(diff%3600/60);
  const s = Math.floor(diff%60);
  document.getElementById(ids.d).textContent = String(d).padStart(2,'0');
  document.getElementById(ids.h).textContent = String(h).padStart(2,'0');
  document.getElementById(ids.m).textContent = String(m).padStart(2,'0');
  document.getElementById(ids.s).textContent = String(s).padStart(2,'0');
}
tick(); setInterval(tick,1000);
