import THREELib from "three-js";
import vapor from "./earthvapor.mp4";

const THREE = THREELib(["OrbitControls"]);

var earthCanvas;
var renderer;
var scene;
var camera;
var cameraControl;
var point = lonLatToVector3(30, 140);
var video, videoImage, videoImageContext, videoTexture;

export function initVaporEarth() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.Enabled = true;

  var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
  var sphereMaterial = createEarthMaterial();
  var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  earthMesh.name = "earth";
  scene.add(earthMesh);
  earthMesh.rotation.set(point.x, point.y, 0);

  camera.position.z = 45;
  camera.lookAt(scene.position);

  cameraControl = new THREE.OrbitControls(camera);

  earthCanvas = document.getElementById("earthCanvas");
  earthCanvas.appendChild(renderer.domElement);

  render();

  window.addEventListener("resize", handleResize, false);
}

function createEarthMaterial() {
  video = document.createElement("video");
  video.src = vapor;
  video.load();
  video.play();
  video.loop = true;

  videoImage = document.createElement("canvas");
  videoImage.width = 1024;
  videoImage.height = 512;

  videoImageContext = videoImage.getContext("2d");
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
  var adjust = 90 - lat;
  out.set(lng / 90 * Math.PI / 2, adjust / 90 * Math.PI / 2, 0);
  return out;
}

function render() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    videoImageContext.drawImage(video, 0, 0);
    if (videoTexture) videoTexture.needsUpdate = true;
  }
  cameraControl.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
