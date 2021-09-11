import * as THREE from "three";

export default function createCube({ color, x, y, z, wireframe }) {
  const geometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({ color, wireframe: wireframe, roughness: 0.9, metalness: 0.5 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);

  return cube;
}
