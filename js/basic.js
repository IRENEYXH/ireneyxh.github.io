import * as THREE from '../three/three.module.js';
import { OrbitControls } from '../three.js-dev/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var $container = $("body");
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 1 );

// drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(5,0,0));
// drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(0,5,0));
// drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,5));
// render();

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.enableKeys = true;
controls.panSpeed = 0.5;

var mouse = new THREE.Vector3();
var startPoint = new THREE.Vector3();
var endPoint = new THREE.Vector3();
var lineBox = [];
var enableDraw = false;

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseup, false);
animate();

$container.keydown(function(event){
  if (event.key == 'd'){
    enableDraw = true;
    console.log("pressing d");
  }
  else if (event.key == 's'){
    enableDraw = false;
    console.log("pressing s");
  }
});

function onMouseup (event){
  if (enableDraw) {
    var element = renderer.domElement;
    var offset = $(element).offset();

    endPoint.set(
      (( event.clientX - offset.left )/element.width) * 2 - 1,
      - (( event.clientY - offset.top )/element.height) * 2 + 1,
      0);

      drawBox(startPoint, endPoint);
      controls.enableRotate = true;
  }
}

function onMouseDown (event){
  if (enableDraw) {
    var element = renderer.domElement;
    var offset = $(element).offset();

    startPoint.set(
      (( event.clientX - offset.left )/element.width) * 2 - 1,
      - (( event.clientY - offset.top )/element.height) * 2 + 1,
      0);

      controls.enableRotate = false;
  }
}

function onMouseMove (event){
  if (enableDraw) {
    var element = renderer.domElement;
    var offset = $(element).offset();

    endPoint.set(
      (( event.clientX - offset.left )/element.width) * 2 - 1,
      - (( event.clientY - offset.top )/element.height) * 2 + 1,
      0);
  }
}


function drawBox (start, end){
  console.log(start, end);
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
  material.light = true;
  var geometry = new THREE.Geometry();

  var upLeft = new THREE.Vector3();
  var downRight = new THREE.Vector3();
  var upRight = new THREE.Vector3();
  var downLeft = new THREE.Vector3();

  upLeft.x = Math.min( start.x, end.x );
  upLeft.y = Math.max( start.y, end.y );
  upLeft.z = start.z;
  downRight.x = Math.max( start.x, end.x );
  downRight.y = Math.min( start.y, end.y );
  downRight.z = start.z;
  upRight.set (downRight.x, upLeft.y, start.z);
  downLeft.set (upLeft.x, downRight.y, start.z);

  upLeft.unproject(camera);
  downLeft.unproject(camera);
  upRight.unproject(camera);
  downRight.unproject(camera);

  drawLine(upLeft, upRight);
  drawLine(upLeft, downLeft);
  drawLine(upRight, downRight);
  drawLine(downLeft, downRight);
}

function drawLine (start, end) {
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
  material.light = true;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(start);
  geometry.vertices.push(end);
  var line = new THREE.Line( geometry, material );

  scene.add( line );
  render();
}

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

function animate() {
				requestAnimationFrame( animate );
				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
				render();
			}

function render() {
				renderer.render( scene, camera );
			}
