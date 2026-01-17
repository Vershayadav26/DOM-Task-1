// Octave 2 keys
const octave2Keys = document.querySelectorAll('.octave-2 .key');

const octave2Map = {
    'Q': 'C',
    'W': 'D',
    'E': 'E',
    'R': 'F',
    'T': 'G',
    'Y': 'A',
    'U': 'B',
    '2': 'C#',
    '3': 'D#',
    '5': 'F#',
    '6': 'G#',
    '7': 'A#'
};

function playNote(note) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
}

// Mouse click
octave2Keys.forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        if (note) {
            playNote(note);
            key.classList.add('active');
            setTimeout(() => key.classList.remove('active'), 200);
        }
    });
});

// Keyboard press
document.addEventListener('keydown', (e) => {
    const pressedKey = e.key.toUpperCase();
    if (octave2Map[pressedKey]) {
        const keyEl = [...octave2Keys].find(k => k.dataset-key === pressedKey);
        if (keyEl) {
            playNote(octave2Map[pressedKey]);
            keyEl.classList.add('active');
            setTimeout(() => keyEl.classList.remove('active'), 200);
        }
    }
});
