import THREELib from "three-js";
import earth from "./images/earthmap4k.jpg";
import cloud from "./images/fair_clouds_4k.png";

const THREE = THREELib(["OrbitControls"]);

var renderer;
var scene;
var camera;
var control;
// var cameraControl;

/**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
export function init() {
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
  earthMesh.position.set(-10, 0, 0);
  scene.add(earthMesh);

  var overlayGeometry = new THREE.SphereGeometry(15, 60, 60);
  var overlayMaterial = createOverlayMaterial();
  var overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
  overlayMesh.name = "overlay";
  overlayMesh.position.set(-10, 0, 0);
  scene.add(overlayMesh);

  // create a cloudGeometry, slighly bigger than the original sphere
  var cloudGeometry = new THREE.SphereGeometry(15.2, 60, 60);
  var cloudMaterial = createCloudMaterial();
  var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
  cloudMesh.name = "clouds";
  cloudMesh.position.set(-10, 0, 0);
  scene.add(cloudMesh);

  // position and point the camera to the center of the scene
  // camera.position.x = 25;
  // camera.position.y = 26;
  camera.position.z = 40;
  camera.lookAt(scene.position);

  // add controls
  // cameraControl = new THREE.OrbitControls(camera);

  control = new function() {
    this.rotationSpeed = 0.001;
  }();

  document.body.appendChild(renderer.domElement);

  render();

  window.addEventListener("resize", handleResize, false);
}

function createEarthMaterial() {
  var loader = new THREE.TextureLoader();
  var earthTexture = loader.load(earth);

  var earthMaterial = new THREE.MeshBasicMaterial();
  earthMaterial.map = earthTexture;

  return earthMaterial;
}

function createCloudMaterial() {
  var loader = new THREE.TextureLoader();
  var cloudTexture = loader.load(cloud);

  var cloudMaterial = new THREE.MeshBasicMaterial();
  cloudMaterial.map = cloudTexture;
  cloudMaterial.transparent = true;

  return cloudMaterial;
}

function createOverlayMaterial() {
  var olMaterial = new THREE.MeshBasicMaterial();
  olMaterial.map = new THREE.Texture(addCanvas());
  olMaterial.transparent = true;
  olMaterial.opacity = 0.6;
  return olMaterial;
}

function addCanvas() {
  var canvas = document.createElement("canvas");
  canvas.width = 4096;
  canvas.height = 2048;

  var context = canvas.getContext("2d");

  monthlySearch(data => {
    data.forEach(function(e) {
      var posX = parseFloat(e[0]);
      var posY = parseFloat(e[1]);

      var x2 = 4096 / 360.0 * (180 + posX);
      var y2 = 2048 / 180.0 * (90 - posY);

      context.beginPath();
      context.arc(x2, y2, 8, 0, 2 * Math.PI, false);
      context.fillStyle = "yellow";
      context.fill();

      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "yellow";
      context.stroke();
    });
  });

  return canvas;
}

function monthlySearch(cb) {
  return fetch(
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson`,
    {
      accept: "application/json"
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(extractLocation)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function extractLocation(response) {
  return response.features.map(feature => feature.geometry.coordinates);
}

/**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
function render() {
  scene.getObjectByName("overlay").material.map.needsUpdate = true;

  // update the camera
  // cameraControl.update();

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
