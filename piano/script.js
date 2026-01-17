// Select all piano keys
const keys = document.querySelectorAll(".key");

// Map notes to audio files
const soundMap = {
  "C": "sounds/C.mp3",
  "C#": "sounds/Cs.mp3",
  "D": "sounds/D.mp3",
  "D#": "sounds/Ds.mp3",
  "E": "sounds/E.mp3",
  "F": "sounds/F.mp3",
  "F#": "sounds/Fs.mp3",
  "G": "sounds/G.mp3",
  "G#": "sounds/Gs.mp3",
  "A": "sounds/A.mp3",
  "A#": "sounds/As.mp3",
  "B": "sounds/B.mp3"
};

// Function to play sound
function playNote(note) {
  const audio = new Audio(soundMap[note]);
  audio.currentTime = 0; // allows rapid replay
  audio.play();
}

// Add pressed visual effect
function activateKey(key) {
  key.classList.add("active");
  setTimeout(() => {
    key.classList.remove("active");
  }, 150);
}

// Mouse click support
keys.forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playNote(note);
    activateKey(key);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const pressedKey = e.key.toLowerCase();

  keys.forEach(key => {
    if (key.dataset.key === pressedKey) {
      playNote(key.dataset.note);
      activateKey(key);
    }
  });
});
