import * as THREE from "three";

export default function createCamera() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000
  );
  // const camera = new THREE.OrthographicCamera( width / - 150, width / 150, height / 150, height / - 150, 1, 1000 );
//   camera.position.x = 5;
//   camera.position.y = -5;
  camera.position.z = 10;
  
  return camera;
}
