import * as THREE from "three";

export default function createLight({x, y, z, intensity, color}) {
  const light = new THREE.PointLight(color, intensity, 500);
  light.position.set(x, y, z);
  return light;
}

