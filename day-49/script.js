var aud = new Audio('./31.mp3');
var h1 = document.querySelector('h1');

document.body.addEventListener('keydown', function(dets) {
    if (dets.code == 'keyD') {
        aud.play();
        
    }
      if (dets.code == 'keyJ') {
        aud.play();
        
    }
})