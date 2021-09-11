import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function createOrbitalController({ camera, renderer }) {
  const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
  //   controls.enablePan = false;
  //   controls.noPan = true;
  //   controls.enableRotate = false;
  //   controls.maxPolarAngle = Math.PI / 2;
  //   controls.maxDistance = controls.minDistance = 200;
  //   controls.noKeys = true;
  //   controls.noRotate = true;
  //   controls.noZoom = true;
  return controls;
}
