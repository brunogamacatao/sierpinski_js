const WIDTH  = 600;
const HEIGHT = 600;
const BLACK = '#000000';

let ctx = null;
let lastFrameTs;
let delay = 50;
let delaySoFar = 0;
let running = false;

const Point = (x, y) => {
  return {x: x, y: y};
};

let points = [Point(WIDTH/2, 10), Point(10, HEIGHT - 10), Point(WIDTH - 10, HEIGHT - 10)];

const drawPoint = (x, y) => {
  ctx.fillStyle = BLACK;
  ctx.fillRect(x - 2, y - 2, 4, 4);
};

const randRange = (max) => {
  return Math.floor(Math.random() * max);
};

const createFractal = () => {
  // choose two random points
  let i1 = randRange(3);
  let i2 = i1;

  while (i1 == i2) {
    i2 = randRange(points.length);;
  }

  // add a new point between them
  let p1 = points[i1];
  let p2 = points[i2];
  let p3 = Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

  points.push(p3);
};

const draw = () => {
  let now = Date.now();
  let deltaT = now - lastFrameTs;
  lastFrameTs = now;

  delaySoFar += deltaT;

  document.getElementById('delay_label').textContent = '' + delay;
  
  if (delaySoFar >= delay) {
    delaySoFar = 0;
    if (running) {
      createFractal();
    }
  }

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, WIDTH, HEIGHT); // clear canvas

  points.forEach(p => drawPoint(p.x, p.y));

  window.requestAnimationFrame(draw);
};

const toggleSimulation = () => {
  running = !running;
  
  let button = document.getElementById('simulation_button');

  button.textContent = running ? 'Stop Simulation' : 'Start Simulation';
};

const changeDelay = () => {
  let slider = document.getElementById('delay_range');
  delay = parseInt(slider.value);
};

const main = () => {
  const canvas = document.getElementById('game_of_life');
  ctx = canvas.getContext('2d');

  ctx.canvas.width  = WIDTH;
  ctx.canvas.height = HEIGHT;

  lastFrameTs = Date.now();

  window.requestAnimationFrame(draw);
}
