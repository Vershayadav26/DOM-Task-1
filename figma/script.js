const canvas = document.getElementById("canvas");

let selectedElement = null;

/* ---------------- CREATE ELEMENT ---------------- */

document.getElementById("addRect").onclick = function () {
  createElement("rect");
};

document.getElementById("addText").onclick = function () {
  createElement("text");
};

function createElement(type) {
  const el = document.createElement("div");
  el.className = "element";
  el.dataset.type = type;
  el.dataset.rotate = "0";

  el.style.width = "100px";
  el.style.height = "80px";
  el.style.left = "50px";
  el.style.top = "50px";

  if (type === "rect") {
    el.style.background = "orange";
  } else {
    el.textContent = "Text";
    el.style.color = "white";
  }

  canvas.appendChild(el);
  enableDrag(el);
}

/* ---------------- SELECT ELEMENT ---------------- */

function selectElement(el) {
  if (selectedElement) {
    selectedElement.classList.remove("selected");
    removeResizeHandles(selectedElement);
  }

  selectedElement = el;
  el.classList.add("selected");
  addResizeHandles(el);
  updateProperties();
}

canvas.onclick = function (e) {
  if (e.target === canvas && selectedElement) {
    selectedElement.classList.remove("selected");
    removeResizeHandles(selectedElement);
    selectedElement = null;
  }
};

/* ---------------- DRAG ---------------- */

function enableDrag(el) {
  el.onmousedown = function (e) {
    e.stopPropagation();
    selectElement(el);

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = el.getBoundingClientRect();

    document.onmousemove = function (ev) {
      el.style.left =
        rect.left + ev.clientX - startX - canvas.offsetLeft + "px";
      el.style.top =
        rect.top + ev.clientY - startY - canvas.offsetTop + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

/* ---------------- RESIZE ---------------- */

function addResizeHandles(el) {
  const points = ["top-left", "top-right", "bottom-left", "bottom-right"];

  points.forEach(function (pos) {
    const handle = document.createElement("div");
    handle.className = "resize-handle " + pos;
    el.appendChild(handle);

    handle.onmousedown = function (e) {
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const l = el.offsetLeft;
      const t = el.offsetTop;

      document.onmousemove = function (ev) {
        if (pos.includes("right")) el.style.width = w + (ev.clientX - startX) + "px";
        if (pos.includes("bottom")) el.style.height = h + (ev.clientY - startY) + "px";
        if (pos.includes("left")) {
          el.style.width = w - (ev.clientX - startX) + "px";
          el.style.left = l + (ev.clientX - startX) + "px";
        }
        if (pos.includes("top")) {
          el.style.height = h - (ev.clientY - startY) + "px";
          el.style.top = t + (ev.clientY - startY) + "px";
        }
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  });
}

function removeResizeHandles(el) {
  el.querySelectorAll(".resize-handle").forEach(h => h.remove());
}

/* ---------------- PROPERTIES ---------------- */

const propWidth = document.getElementById("propWidth");
const propHeight = document.getElementById("propHeight");
const propRotate = document.getElementById("propRotate");
const propColor = document.getElementById("propColor");
const propText = document.getElementById("propText");

function updateProperties() {
  if (!selectedElement) return;

  propWidth.value = parseInt(selectedElement.style.width);
  propHeight.value = parseInt(selectedElement.style.height);
  propRotate.value = selectedElement.dataset.rotate;
  propText.value = selectedElement.textContent || "";
}

propWidth.oninput = function () {
  if (selectedElement)
    selectedElement.style.width = propWidth.value + "px";
};

propHeight.oninput = function () {
  if (selectedElement)
    selectedElement.style.height = propHeight.value + "px";
};

propRotate.oninput = function () {
  if (!selectedElement) return;

  selectedElement.dataset.rotate = propRotate.value;
  selectedElement.style.transform =
    "rotate(" + propRotate.value + "deg)";
};

propColor.oninput = function () {
  if (selectedElement)
    selectedElement.style.background = propColor.value;
};

propText.oninput = function () {
  if (selectedElement && selectedElement.dataset.type === "text") {
    selectedElement.textContent = propText.value;
  }
};

/* ---------------- JSON EXPORT ---------------- */

document.getElementById("exportJSON").onclick = function () {
  const elements = document.querySelectorAll(".element");
  const data = [];

  elements.forEach(function (el) {
    data.push({
      type: el.dataset.type,
      x: el.style.left,
      y: el.style.top,
      width: el.style.width,
      height: el.style.height,
      rotation: el.dataset.rotate,
      color: el.style.background,
      text: el.textContent
    });
  });

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "design.json";
  a.click();
};

/* ---------------- DELETE KEY ---------------- */

document.addEventListener("keydown", function (e) {
  if (e.key === "Delete" && selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
});

/* ---------------- ARROW KEYS MOVE ---------------- */

document.addEventListener("keydown", function (e) {
  if (!selectedElement) return;

  let step = 5;
  let left = parseInt(selectedElement.style.left);
  let top = parseInt(selectedElement.style.top);

  if (e.key === "ArrowLeft") selectedElement.style.left = (left - step) + "px";
  if (e.key === "ArrowRight") selectedElement.style.left = (left + step) + "px";
  if (e.key === "ArrowUp") selectedElement.style.top = (top - step) + "px";
  if (e.key === "ArrowDown") selectedElement.style.top = (top + step) + "px";
});

/* ---------------- AUTO SAVE + LOAD ---------------- */

function saveDesign() {
  const elements = document.querySelectorAll(".element");
  const data = [];

  elements.forEach(function (el) {
    data.push({
      type: el.dataset.type,
      x: el.style.left,
      y: el.style.top,
      width: el.style.width,
      height: el.style.height,
      rotation: el.dataset.rotate,
      color: el.style.background,
      text: el.textContent
    });
  });

  localStorage.setItem("figmaDesign", JSON.stringify(data));
}

document.addEventListener("click", saveDesign);

window.onload = function () {
  const saved = localStorage.getItem("figmaDesign");
  if (!saved) return;

  const data = JSON.parse(saved);

  data.forEach(function (item) {
    const el = document.createElement("div");
    el.className = "element";
    el.dataset.type = item.type;
    el.dataset.rotate = item.rotation;

    el.style.left = item.x;
    el.style.top = item.y;
    el.style.width = item.width;
    el.style.height = item.height;
    el.style.background = item.color;
    el.style.transform = "rotate(" + item.rotation + "deg)";
    el.textContent = item.text || "";

    canvas.appendChild(el);
    enableDrag(el);
  });
};

/* ---------------- HTML EXPORT ---------------- */

document.getElementById("exportHTML").onclick = function () {
  const html = canvas.innerHTML;

  const blob = new Blob(
    ["<div style='position:relative;width:100%;height:100%'>" + html + "</div>"],
    { type: "text/html" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "design.html";
  a.click();
};
