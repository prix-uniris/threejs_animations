import * as THREE from "three";

export default function createRenderer() {
  const root = document.getElementById("app");
  const renderer = new THREE.WebGLRenderer({  alpha: true });
  renderer.setClearColor( 0x000000, 0.6 ); 
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.appendChild(renderer.domElement);
  return renderer;
}
