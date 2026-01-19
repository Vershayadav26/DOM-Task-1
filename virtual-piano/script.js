// -------- audio map --------
var soundMap = {
  KeyQ: new Audio('./sounds/24.mp3'),
  KeyW: new Audio('./sounds/29.mp3'),
  KeyE: new Audio('./sounds/36.mp3'),
  KeyR: new Audio('./sounds/41.mp3'),
  KeyT: new Audio('./sounds/48.mp3'),
  KeyY: new Audio('./sounds/53.mp3'),
  KeyU: new Audio('./sounds/60.mp3'),

  Digit2: new Audio('./sounds/64.mp3'),
  Digit3: new Audio('./sounds/65.mp3'),
  Digit5: new Audio('./sounds/69.mp3'),
  Digit6: new Audio('./sounds/72.mp3'),
  Digit7: new Audio('./sounds/77.mp3'),

  KeyI: new Audio('./sounds/29.mp3'),
  KeyO: new Audio('./sounds/36.mp3'),
  KeyP: new Audio('./sounds/41.mp3'),
  KeyZ: new Audio('./sounds/48.mp3'),
  KeyX: new Audio('./sounds/53.mp3'),
  KeyC: new Audio('./sounds/60.mp3'),
  KeyV: new Audio('./sounds/64.mp3'),

  Digit9: new Audio('./sounds/65.mp3'),
  Digit0: new Audio('./sounds/69.mp3'),
  KeyS: new Audio('./sounds/72.mp3'),
  KeyD: new Audio('./sounds/77.mp3'),
  KeyF: new Audio('./sounds/79.mp3'),

  KeyB: new Audio('./sounds/36.mp3'),
  KeyN: new Audio('./sounds/41.mp3'),
  KeyM: new Audio('./sounds/48.mp3'),
  Comma: new Audio('./sounds/53.mp3'),
  Period: new Audio('./sounds/60.mp3'),
  Slash: new Audio('./sounds/64.mp3'),

  KeyH: new Audio('./sounds/69.mp3'),
  KeyJ: new Audio('./sounds/72.mp3'),
  KeyL: new Audio('./sounds/77.mp3'),
  Semicolon: new Audio('./sounds/84.mp3'),
  Quote: new Audio('./sounds/96.mp3')
};

var keys = document.querySelectorAll('.key');

// -------- play function --------
function playSoundByCode(code) {
  var audio = soundMap[code];
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.play();

  var label = getKeyLabel(code);
  var keyEl = document.querySelector('.key[data-key="' + label + '"]');

  if (keyEl) {
    keyEl.classList.add('active');
    setTimeout(() => keyEl.classList.remove('active'), 120);
  }
}

function getKeyLabel(code) {
  if (code.startsWith('Key')) return code.replace('Key', '');
  if (code.startsWith('Digit')) return code.replace('Digit', '');
  if (code === 'Comma') return ',';
  if (code === 'Period') return '.';
  if (code === 'Slash') return '/';
  if (code === 'Semicolon') return ';';
  if (code === 'Quote') return "'";
  return '';
}

// -------- keyboard --------
document.addEventListener('keydown', function (e) {
  if (e.repeat) return; // 🔥 important fix
  playSoundByCode(e.code);
});

// -------- mouse --------
keys.forEach(function (key) {
  key.addEventListener('mousedown', function () {
    var keyChar = key.dataset.key;
    if (!keyChar) return;

    var code =
      keyChar >= '0' && keyChar <= '9'
        ? 'Digit' + keyChar
        : 'Key' + keyChar;

    playSoundByCode(code);
  });
});

var piano = document.querySelector('.piano'); // piano div
var zoomBtn = document.getElementById('zoomBtn');
var fsBtn = document.getElementById('fullscreenBtn');

var zoomLevel = 1;

// -------- ZOOM --------
zoomBtn.addEventListener('click', function () {
  zoomLevel += 0.1;

  if (zoomLevel > 1.5) {
    zoomLevel = 1;
  }

  piano.style.transform = `scale(${zoomLevel})`;
  piano.style.transformOrigin = 'center';
});

// -------- FULL SCREEN --------
fsBtn.addEventListener('click', function () {
  if (!document.fullscreenElement) {
    piano.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


// -------- EXIT FULL SCREEN HANDLER --------


