import React, { Component } from "react";
import "./CSS/App.css";
import THREELib from "three-js";

const THREE = THREELib(["OrbitControls"]);

let earthCanvas;
let renderer;
let scene;
let camera;
let cameraControl;

let video, videoImage, videoImageContext, videoTexture;

class Earth extends Component {
  componentDidMount() {
    this.init();
  }

  init() {
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

    const sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
    let sphereMaterial = this.createEarthMaterial();
    let earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = "earth";
    scene.add(earthMesh);
    let point = lonLatToVector3(this.props.lon, this.props.lat);
    earthMesh.rotation.set(point.x, point.y, 0);

    camera.position.z = 45;
    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera);
    cameraControl.enableZoom = false;
    cameraControl.enablePan = false;

    earthCanvas = document.getElementById("earthCanvas");
    earthCanvas.appendChild(renderer.domElement);

    render();

    window.addEventListener("resize", handleResize, false);
  }

  createEarthMaterial() {
    video = document.createElement("video");
    video.src = this.props.global;
    video.load();
    video.play();
    video.loop = this.props.loop;

    videoImage = document.createElement("canvas");
    videoImage.width = 1024;
    videoImage.height = 512;

    videoImageContext = videoImage.getContext("2d");
    videoImageContext.fillStyle = "#000000";
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    let earthMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture
    });

    return earthMaterial;
  }

  render() {
    return <div id="earthCanvas" />;
  }
}

function lonLatToVector3(lng, lat, out) {
  out = out || new THREE.Vector3();
  const adjust = 90 - lat;
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

export default Earth;
