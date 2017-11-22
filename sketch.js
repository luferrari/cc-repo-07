var font, cam, mic;

function preload() {
  font = loadFont('./assets/AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(500, 500);

  cam = createCapture(VIDEO);
  cam.size(666, 500);
  cam.hide();

  mic = new p5.AudioIn();
  mic.start();
}

var i = 0;

function mousePressed() {
  // fun with mouse
  if (i === 0) {
    i = 1;
  } else {
    i = 0;
  }
  return false;
}




function draw() {
  // fun with arrays
  var bgColor = [color(0), color(235, 40, 95)];
  var bgMode = [SCREEN, MULTIPLY];
  var stColor = [color(235, 40, 95), color(255)];


  // fun with cam
  push();
  translate(width, 0);
  scale(-1, 1);
  image(cam, -83.333, 0, 666.666, 500);
  filter(THRESHOLD, 1 / 3);
  blendMode(bgMode[i]);
  background(bgColor[i]);
  pop();


  var vu = mic.getLevel();
  var st = 25 + vu * 150;
  var cl = [
    color(143, 45, 86),
    color(255, 188, 66),
    color(235, 40, 95),
    color(33, 131, 128),
    color(115, 210, 222)
  ];

  noFill();
  strokeWeight(st);
  stroke(stColor[i]);
  rect(st * 1.5, st * 1.5, width - st * 3, height - st * 3);
  noStroke();


  // fun with text
  fill(stColor[1]);
  textFont(font);
  textSize(20);
  textAlign(LEFT);
  text('move around, make noise, click', st * 2, st * 1.75);
  fill(stColor[0]);
  textAlign(RIGHT);
  text('i \u003C3 p5*js', width - st * 2, height - st * 1.25);


  // fun with mic
  if (mouseX < st * 2.5) {
    mouseX = st * 2.5;
  } else if (mouseX > width - st * 2.5) {
    mouseX = width - st * 2.5;
  }
  if (mouseY < st * 2.5) {
    mouseY = st * 2.5;
  } else if (mouseY > height - st * 2.5) {
    mouseY = height - st * 2.5;
  }
  fill(cl[0]);
  ellipse(width - st * 1.5, mouseY, st);
  fill(cl[1]);
  ellipse(mouseX, width - st * 1.5, st);
  push();
  translate(0, height);
  scale(1, -1);
  fill(cl[3]);
  ellipse(st * 1.5, mouseY, st);
  pop();
  push();
  translate(width, 0);
  scale(-1, 1);
  fill(cl[4]);
  ellipse(mouseX, st * 1.5, st);
  pop();
}

// PALETTE
// yellow orange      255, 188, 66
// dark raspberry     143, 45, 86
// razzmatazz         235, 40, 95
// celadon green      33, 131, 128
// middle blue        115, 210, 222
