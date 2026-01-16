const keys = document.querySelectorAll('.white[data-key], .black[data-key]');

function playSound(key){
  // 🔊 sound-1, sound-2 yahan add karna
  // const audio = new Audio(`sounds/${key.dataset.key}.mp3`);
  // audio.currentTime = 0;
  // audio.play();

  key.classList.add('active');
  setTimeout(() => key.classList.remove('active'), 150);
}

keys.forEach(key=>{
  key.addEventListener('click',()=>playSound(key));
});

document.addEventListener('keydown',(e)=>{
  const k = e.key.toLowerCase();
  const key = document.querySelector(`[data-key="${k}"]`);
  if(key) playSound(key);
});
