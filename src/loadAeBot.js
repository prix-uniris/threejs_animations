// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import * as THREE from "three";
// import aebotGltf from "../static/AeBot.glb";
// import * as TWEEN from "@tweenjs/tween.js";

// export default function loadAeBot(scene, interactionManager, camera) {
//   const loader = new GLTFLoader();

//   loader.load(
//     aebotGltf,
//     function (gltf) {
//       const aeBot = gltf.scene;
//       console.log(aeBot);
//       aeBot.position.x = 5;
//       aeBot.position.y = -10;
//       aeBot.position.z = -5;

//       aeBot.scale.set(10, 10, 10);
//       // aeBot.scale.set(1, 1)
//       // aeBot.rotateZ = 90;

//       aeBot.addEventListener("click", () => {
//         let oldCoords = {
//           // x: aeBot.position.x,
//           // y: aeBot.position.y,
//           // z: aeBot.position.z,
//           xc: camera.position.x,
//           yc: camera.position.y,
//           zc: camera.position.z,
//         };

//         new TWEEN.Tween(oldCoords)
//           .to({
//             xc: aeBot.position.x - 5,
//             yc: aeBot.position.y  + 10,
//             zc: aeBot.position.z + 5,
//           })
//           .easing(TWEEN.Easing.Quadratic.Out)
//           .onUpdate(() => {
//         //     aeBot.position.set(oldCoords.x, oldCoords.y, oldCoords.z);
//             camera.position.set(oldCoords.xc, oldCoords.yc, oldCoords.zc);
//           })
//           .start();
//       });

//       scene.add(aeBot);
//       interactionManager.add(aeBot);
//     },
//     function (xhr) {
//       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     function (error) {
//       console.error(error);
//     }
//   );
// }
