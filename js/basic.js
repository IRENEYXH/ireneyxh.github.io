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

drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(5,0,0));
drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(0,5,0));
drawLine(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,5));
render();

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.enableKeys = true;

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
<<<<<<< HEAD
  if (enableDraw){
    var element = renderer.domElement;
    // mouse.x = (event.clientX/element.width) * 2 - 1;
    // mouse.y = - (event.clientY/element.height) * 2 + 1;
    // mouse.z = camera.z;
    // mouse.unproject(camera);

    endPoint.set(
      ((event.clientX/element.width) * 2 - 1,
      - (event.clientY/element.height) * 2 + 1,
      0));

    endPoint.unproject(camera);

    console.log(startPoint, endPoint);

    drawBox(startPoint, endPoint);
    controls.enableRotate = true;
    enableDraw = false;
  }
}

function onMouseDown (event){
  if (enableDraw){
    var element = renderer.domElement;
    // mouse.x = (event.clientX/element.width) * 2 - 1;
    // mouse.y = - (event.clientY/element.height) * 2 + 1;
    // mouse.z = camera.z;
    // mouse.unproject(camera);

    startPoint.set(
      ((event.clientX/element.width) * 2 - 1,
      - (event.clientY/element.height) * 2 + 1,
      0));

    startPoint.unproject(camera);
    controls.enableRotate = false;
  }
}

function onMouseMove (event){
  if (enableDraw){
    var element = renderer.domElement;
    // mouse.x = (event.clientX/element.width) * 2 - 1;
    // mouse.y = - (event.clientY/element.height) * 2 + 1;
    // mouse.z = camera.z;
    // mouse.unproject(camera);

    endPoint.set(
      ((event.clientX/element.width) * 2 - 1,
      - (event.clientY/element.height) * 2 + 1,
      0));

    endPoint.unproject(camera);
    controls.enableRotate = false;
=======
  var element = renderer.domElement;
  var offset = $(element).offset();
  endPoint.set(
    (event.clientX/element.width) * 2 - 1,
    - (event.clientY/element.height) * 2 + 1,
    0);
    endPoint.unproject( camera );
    drawBox(startPoint, endPoint);
    controls.enableRotate = true;
}

function onMouseDown (event){
  var element = renderer.domElement;
  var offset = $(element).offset();
  var temp;

  startPoint.set(
    (event.clientX/element.width) * 2 - 1,
    - (event.clientY/element.height) * 2 + 1,
    0);

  startPoint.unproject( camera );
  controls.enableRotate = false;
}

function onMouseMove (event){
  var element = renderer.domElement;
  var offset = $(element).offset();
  if ( isDown ) {
    endPoint.set(
      (event.clientX/element.width) * 2 - 1,
      - (event.clientY/element.height) * 2 + 1,
      0);
      endPoint.unproject( camera );
>>>>>>> parent of 8843f00... 1
  }
}
//
// $container.mousedown(function(event){
//   if (enableDraw) {
//     var element = renderer.domElement;
//     var offset = $(element).offset();
//
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     mouse.z = 0;
//     //mouse.unproject(camera);
//
//     startPoint.set(mouse.x, mouse.y, 0);
//     // startPoint.set(
//     //   (( event.clientX - offset.left )/element.width) * 2 - 1,
//     //   - (( event.clientY - offset.top )/element.height) * 2 + 1,
//     //   0);
//     //
//     // startPoint.unproject( camera );
//
//     controls.enableRotate = false;
//
//     isDown = true;
//   }
// });
//
// $container.mousemove(function(event){
//   if (enableDraw) {
//     var element = renderer.domElement;
//     var offset = $(element).offset();
//     if ( isDown ) {
//
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//       mouse.z = 0;
//       //mouse.unproject(camera);
//
//       endPoint.set(mouse.x, mouse.y, 0);
//
//       // endPoint.set(
//       //   (( event.clientX - offset.left )/element.width) * 2 - 1,
//       //   - (( event.clientY - offset.top )/element.height) * 2 + 1,
//       //   0);
//       //   endPoint.unproject( camera );
//         drawBox(startPoint, endPoint);
//         // scene.add( drawLine(startPoint, endPoint) );
//         // renderer.render( scene, camera );
//     }
//   }
// });
// $container.mouseup(function(event){
//   if (enableDraw) {
//     var element = renderer.domElement;
//     var offset = $(element).offset();
//
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     mouse.z = 0;
//     //mouse.unproject(camera);
//
//     endPoint.set(mouse.x, mouse.y, 0);
//
//     // endPoint.set(
//     //   (( event.clientX - offset.left )/element.width) * 2 - 1,
//     //   - (( event.clientY - offset.top )/element.height) * 2 + 1,
//     //   0);
//     //   endPoint.unproject( camera );
//       drawBox(startPoint, endPoint);
//       // scene.add( drawLine(startPoint, endPoint) );
//       // renderer.render( scene, camera );
//       isDown = false;
//       controls.enableRotate = true;
//   }
// });

function drawBox (start, end){
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
  upLeft.z = start.z;
  upRight.set (downRight.x, upLeft.y, start.z);
  downLeft.set (upLeft.x, downRight.y, start.z);

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
