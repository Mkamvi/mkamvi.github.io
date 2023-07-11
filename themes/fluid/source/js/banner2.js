// const canvasEle = document.querySelector("#banner-canvas");
const canvasEle = document.createElement('div');
const particlesJSEle = document.querySelector("#particles-js");

canvasEle.style.position = "absolute";
canvasEle.style.width = "100%";
canvasEle.style.height = "100%";

particlesJSEle.style.position = "absolute";
particlesJSEle.style.width = "100%";
particlesJSEle.style.height = "100%";
particlesJSEle.style.background = "rgba(37,50,40,0.7)";

// console.log(canvasEle);

console.clear();
var doc = document;
var flower = doc.querySelector(".flower");
var range = doc.querySelector(".range");
var petalPartMarkup =
  '<div class="box"> \
                    <div class="shape"></div> \
                </div>';
var maxParts = 20;
var maxPetalsDef = 6;
var maxPetals = maxPetalsDef;
var partsFontStepDef = 25 / maxParts;
var partsFontStep = partsFontStepDef;
var huetStep = 150 / maxParts;
// createFlower();
function createFlower() {
  var angle = 360 / maxPetals;
  for (var i = 0; i < maxPetals; i++) {
    var petal = createPetal();
    var currAngle = angle * i + "deg";
    var transform =
      "transform: rotateY(" + currAngle + ") rotateX(-30deg) translateZ(9vmin)";
    petal.setAttribute("style", transform);
    flower.appendChild(petal);
  }
}
function createPetal() {
  var box = createBox(null, 0);
  var petal = doc.createElement("div");
  petal.classList.add("petal");
  for (var i = 1; i <= maxParts; i++) {
    newBox = createBox(box, i);
    box = newBox;
  }
  petal.appendChild(box);
  return petal;
}
function createBox(box, pos) {
  var fontSize = partsFontStep * (maxParts - pos) + "vmin";
  var half = maxParts / 2;
  var bright = "50";
  if (pos < half + 1) {
    fontSize = partsFontStep * pos + "vmin";
  } else {
    bright = 10 + (40 / half) * (maxParts - pos);
  }
  var color = "hsl(" + huetStep * pos + ", 100%, " + bright + "%)";
  var newShape = doc.createElement("div");
  newShape.classList.add("shape");
  var newBox = doc.createElement("div");
  newBox.classList.add("box");
  var boxStyle = ["color: " + color, "font-size: " + fontSize].join(";");
  newBox.setAttribute("style", boxStyle);
  if (box) {
    newBox.appendChild(box);
  }
  newBox.appendChild(newShape);
  return newBox;
}
function out(content) {
  console.log(content);
}


particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
