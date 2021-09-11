import * as THREE from "three";

import bg_image from "../static/bg_main_5.svg";

export default function createScene() {
  const scene = new THREE.Scene();
  // const loader = new THREE.TextureLoader();
  // loader.load(bg_image, function(texture){
  //   scene.background = texture
  // });
  return scene;
}
