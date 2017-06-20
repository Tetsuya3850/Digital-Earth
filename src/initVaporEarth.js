import THREELib from "three-js";
import earth from "./images/earthmap4k.jpg";
import cloud from "./images/fair_clouds_4k.png";
import vapor from "./vapor.mp4";

const THREE = THREELib(["OrbitControls"]);

var earthCanvas;
var renderer;
var scene;
var camera;
var control;
var cameraControl;
var point = lonLatToVector3(-30, -140);
var video, videoImage, videoImageContext, videoTexture;

/**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
export function initVaporEarth() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // create a render, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.Enabled = true;

  // create a sphere
  var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
  var sphereMaterial = createEarthMaterial();
  var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  earthMesh.name = "earth";
  scene.add(earthMesh);
  // earthMesh.position.set(-10, 0, 0);
  earthMesh.rotation.set(point.x, point.y, 0);

  // position and point the camera to the center of the scene
  // camera.position.x = 25;
  // camera.position.y = 26;
  camera.position.z = 45;
  camera.lookAt(scene.position);

  // add controls
  cameraControl = new THREE.OrbitControls(camera);

  control = new function() {
    this.rotationSpeed = 0.001;
  }();

  earthCanvas = document.getElementById("earthCanvas");
  earthCanvas.appendChild(renderer.domElement);

  render();

  window.addEventListener("resize", handleResize, false);
}

function createEarthMaterial() {
  video = document.createElement("video");
  video.src = vapor;
  video.load(); // must call after setting/changing source
  video.play();

  videoImage = document.createElement("canvas");
  videoImage.width = 1024;
  videoImage.height = 512;

  videoImageContext = videoImage.getContext("2d");
  // background color if no video present
  videoImageContext.fillStyle = "#000000";
  videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

  videoTexture = new THREE.Texture(videoImage);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;

  var earthMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture
  });

  return earthMaterial;
}

function lonLatToVector3(lng, lat, out) {
  out = out || new THREE.Vector3();

  var adjust = 280 - lat;

  //distribute to sphere
  out.set(lng / 90 * Math.PI / 2, adjust / 90 * Math.PI / 2, 0);

  return out;
}

/**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
function render() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    videoImageContext.drawImage(video, 0, 0);
    if (videoTexture) videoTexture.needsUpdate = true;
  }

  // update the camera
  cameraControl.update();

  // scene.getObjectByName("earth").rotation.y += control.rotationSpeed;
  // scene.getObjectByName("overlay").rotation.y += control.rotationSpeed;
  // scene.getObjectByName("clouds").rotation.y += control.rotationSpeed * 1.1;

  // and render the scene
  renderer.render(scene, camera);

  // render using requestAnimationFrame
  requestAnimationFrame(render);
}

/**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
