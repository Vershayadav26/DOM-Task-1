var cursor = document.querySelector(".cursor");
var images = document.querySelectorAll(".img");

// cursor follow mouse
document.addEventListener("mousemove", function (dets) {
  cursor.style.left = dets.x + "px";
  cursor.style.top = dets.y + "px";
});

// image hover effects
images.forEach(function (img) {
  img.addEventListener("mouseenter", function () {
    cursor.style.opacity = 1;
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
  });

  img.addEventListener("mouseleave", function () {
    cursor.style.opacity = 0;
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});
