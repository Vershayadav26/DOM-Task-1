var img = document.querySelector('.card img');
var love = document.querySelector('.card i');

img.addEventListener('dblclick', function () {

  // show heart
  love.style.opacity = "1";
  love.style.transform = "translate(-50%, -50%) scale(1)";

  // thoda upar fly effect
  setTimeout(function () {
    love.style.transform = "translate(-50%, -300%) scale(1)";
  }, 600);

  // hide heart smoothly
  setTimeout(function () {
    love.style.opacity = "0";
    love.style.transform = "translate(-50%, -50%) scale(0)";
  }, 1200);

});



