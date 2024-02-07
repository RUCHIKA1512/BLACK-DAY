const canvas = document.getElementsByTagName("canvas")[0];
const image = document.getElementsByTagName("p")[0];
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const params = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 0.995,
  VELOCITY_DISSIPATION: 0.9,
  PRESSURE_ITERATIONS: 10,
  SPLAT_RADIUS: 3 / window.innerHeight,
  color: { r: 0.8, g: 0.5, b: 0.2 },
};

const pointer = {
  x: 0.65 * window.innerWidth,
  y: 0.5 * window.innerHeight,
  dx: 0,
  dy: 0,
  moved: false,
  firstMove: false,
};
window.setTimeout(() => {
  pointer.firstMove = true;
}, 3000);

let prevTimestamp = Date.now();

const gl = canvas.getContext("webgl");
gl.getExtension("OES_texture_float");

let outputColor, velocity, divergence, pressure;

const vertexShader = createShader(
  document.getElementById("vertShader").innerHTML,
  gl.VERTEX_SHADER
);
