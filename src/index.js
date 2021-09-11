import "./style.css";
import createCube from "./createCube";
import createLight from "./createLight";
import animate from "./animate";
import createCamera from "./createCamera";
import createRenderer from "./createRenderer";
import createTorusRing from "./createTorusRing";
import createScene from "./createScene";
import createOrbitalController from "./createOrbitalController";
import createDragController from "./createDragController";
import createBG from "./createBackground";
import createNetwork from "./createComputerNetwork";
import { InteractionManager } from "three.interactive";
import * as TWEEN from "@tweenjs/tween.js";
import loadAeBot from "./loadAeBot";
import * as THREE from "three";
import { eventNames } from "process";
import { object } from "webidl-conversions";
import { group } from "console";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import createPlaneWTexture from "./createPlaneWTexture";

import earthmap from "../static/2_no_clouds_4k.jpg";
import earthbump from "../static/elev_bump_4k.jpg";
import earthemissive from "../static/water_4k.png";
import earthClouds from "../static/fair_clouds_4k.png";

import p_1 from "../static/p_1.jpg";
import p_2 from "../static/p_2.jpg";
import p_3 from "../static/p_3.jpg";
import p_4 from "../static/p_4.jpg";

function createSphere(radius, segments, loader) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshPhongMaterial({
      map: loader.load(earthmap),
      bumpMap: loader.load(earthbump),
      bumpScale: 0.5,
      specularMap: loader.load(earthemissive),
      specular: new THREE.Color("black"),
    })
  );
}

function createClouds(radius, segments, loader) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.003, segments, segments),
    new THREE.MeshPhongMaterial({
      map: loader.load(earthClouds),
      transparent: true,
    })
  );
}

function changePosition(object, x, y, z) {
  object.position.x = x;
  object.position.y = y;
  object.position.z = z;
}

const renderer = createRenderer();
const scene = createScene();
scene.background = null;
const camera = createCamera();
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// const torusRing = createTorusRing();
// scene.add(torusRing);

const bg = createBG();
scene.add(bg);

// const network = createNetwork();
// scene.add(network);

const loader = new THREE.TextureLoader();

const earth = createSphere(5, 64, loader);
const earthC = createClouds(5.1, 64, loader);

changePosition(earth, 5, 0, -1);
changePosition(earthC, 5, 0, -1);

scene.add(earth);
scene.add(earthC);

// Image Planes Stuff
const p1 = createPlaneWTexture(1.6, 0.9, loader.load(p_1));
changePosition(p1, -2, 0, -15);
scene.add(p1);

const p2 = createPlaneWTexture(1.6, 0.9, loader.load(p_2));
changePosition(p2, -12, -5, -15);
scene.add(p2);

const p3 = createPlaneWTexture(1.6, 0.9, loader.load(p_3));
changePosition(p3, -20, -10, -20);
scene.add(p3);

const p4 = createPlaneWTexture(1.6, 0.9, loader.load(p_4));
changePosition(p4, -18, 2, -15);
scene.add(p4);

const images = {
  p1: p1,
  p2: p2,
  p3: p3,
  p4: p4,
};

// const controlsx = createOrbitalController({
// 	camera: camera,
// 	renderer: renderer
// });

// controlsx.enableRotate = false
// controlsx.enableZoom = false

// loadAeBot(scene, interactionManager, camera)

const cubeGroup = new THREE.Group();

const cubes = {
  pink: createCube({ color: 0xffffff, x: -2, y: -2, z: 0, wireframe: true }),
  purple: createCube({ color: 0x7cd6da, x: 1, y: -1, z: -1, wireframe: true }),
  blue: createCube({ color: 0x20c9e0, x: 1, y: 1, z: -5, wireframe: true }),
  cyan: createCube({ color: 0x00d7f6, x: -1, y: 1, z: -10, wireframe: true }),
};

Object.keys(cubes).forEach((key) => {
  cubeGroup.add(cubes[key]);
});

const redCube = createCube({
  color: 0x9d5154,
  x: -5,
  y: 5,
  z: -15,
  wireframe: true,
});
// scene.add(redCube);

// cubeGroup.add(redCube);
// scene.add(cubeGroup);

let activeCube = 4; // The X Button Initially

// redCube.addEventListener("click", (event) => {
//   event.stopPropagation();
//   // console.log("Red Cube Clicked")
//   activeCube = 0;
//   let seekDist = false;
//   if (camera.position.z < 6) {
//     seekDist = true;
//   }
//   const coords = {
//     x: camera.position.x,
//     y: camera.position.y,
//     z: camera.position.z,
//   };
//   new TWEEN.Tween(coords)
//     .to({
//       x: camera.position.x,
//       y: camera.position.y,
//       z: seekDist ? 11 : camera.position.z,
//     })
//     .easing(TWEEN.Easing.Quadratic.Out)
//     .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
//     .start();
// });

// interactionManager.add(redCube);

// const controls = createDragController([earth], camera, renderer);

// const controls = new TrackballControls( camera, renderer.domElement );

// controls.rotateSpeed = 1.0;
// controls.zoomSpeed = 1.2;
// controls.panSpeed = 0.8;

// controls.keys = ["KeyA", "KeyS", "KeyD"];
// add event listener to highlight dragged objects

// controls.addEventListener("dragstart", function (event) {
//   // event.object.material.emissive.set( 0xaaaaaa );
// });

// controls.addEventListener("dragend", function (event) {
//   // event.object.material.emissive.set( 0x000000 );
// });

const light1 = createLight({
  x: -100,
  y: 100,
  z: 0,
  intensity: 1.5,
  color: "#ffffee",
});

scene.add(light1);

const light2 = createLight({
  x: 50,
  y: -50,
  z: 100,
  intensity: 0.5,
  color: "#ffeeff",
});

scene.add(light2);

// Object.keys(cubes).forEach((key, index) => {
//   cubes[key].addEventListener("click", (event) => {
//     event.stopPropagation();
//     console.log(`${key} cube was clicked ${index}`);
//     activeCube = index;
//     const cube = event.target;
//     const coords = {
//       x: camera.position.x,
//       y: camera.position.y,
//       z: camera.position.z,
//     };
//     // console.log(coords)
//     // console.log(cube.position)

//     new TWEEN.Tween(coords)
//       .to({ x: cube.position.x, y: cube.position.y, z: cube.position.z + 5.5 })
//       .easing(TWEEN.Easing.Quadratic.Out)
//       .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
//       .start();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
//   interactionManager.add(cubes[key]);
//   // scene.add(cubes[key]);
// });

// Images Adjustment and Event listeners
Object.keys(images).forEach((key, index) => {
  images[key].addEventListener("click", (event) => {
    event.stopPropagation();
    // console.log(`${key} image was clicked ${index}`);
    activeCube = index;
    const image = event.target;

    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    // console.log(coords)
    // console.log(image.position)

    new TWEEN.Tween(coords)
      .to({
        x: image.position.x,
        y: image.position.y,
        z: image.position.z + 10.5,
      })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
      .start();
    resetImages(images, key);
    TweenScaleTo(image, 16, 9);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  });
  interactionManager.add(images[key]);
  // scene.add(cubes[key]);
});

interactionManager.add(scene);

// Mouse Tracking Stuff
let mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Scroll
document.addEventListener("scroll", scrollSphere);

let lastScroll = 0;

function scrollSphere() {
  cubeGroup.position.y += (scrollY - lastScroll) * 0.03;
  lastScroll = window.scrollY;
}

const container = document.querySelector("#content");

function getElementInString(id) {
  switch (id) {
    case 0:
      return "<p>Most Secure Blockchain</p>";
    case 1:
      return "<p>No Transaction Limit</p>";
    case 2:
      return "<p>Only one Identity</p>";
    case 3:
      return "<p>2024 Olympics IAM</p>";
    default:
      return "<p>A Blockchain to Help Earth and Sustainable</p>";
  }
}

const btn1 = document.querySelector("#controls-1");
const btn2 = document.querySelector("#controls-2");
const btn3 = document.querySelector("#controls-3");
const btn4 = document.querySelector("#controls-4");
const btnx = document.querySelector("#controls-x");

const btns = [btn1, btn2, btn3, btn4, btnx];

btns.forEach((btn, index) => {
  if (index === 4) {
    btn.addEventListener("click", () => {
      activeCube = index;

      cameraTo(0, 0, 10);
      resetImages(images, "p");
    });
  } else {
    btn.addEventListener("click", (e) => {
      activeCube = index;
      switch (index) {
        case 0:
          resetImages(images, "p1");
          TweenScaleTo(p1, 16, 9);
          cameraTo(p1.position.x, p1.position.y, p1.position.z + 8);
          break;
        case 1:
          resetImages(images, "p2");
          TweenScaleTo(p2, 16, 9);
          cameraTo(p2.position.x, p2.position.y, p2.position.z + 8);
          break;
        case 2:
          resetImages(images, "p3");
          TweenScaleTo(p3, 16, 9);
          cameraTo(p3.position.x, p3.position.y, p3.position.z + 8);
          break;
        case 3:
          resetImages(images, "p4");
          TweenScaleTo(p4, 16, 9);
          cameraTo(p4.position.x, p4.position.y, p4.position.z + 8);
          break;
        default:
          cameraTo(0, 0, 10);
      }
    });
  }
});

function TweenScaleTo(objMesh, w, h) {
  // console.log(objMesh.geometry.parameters)
  const scale = {
    w: objMesh.geometry.parameters.width,
    h: objMesh.geometry.parameters.height,
  };

  // console.log(scale, w, h)

  new TWEEN.Tween(scale)
    .to({ w: w, h: h })
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      objMesh.geometry = new THREE.PlaneGeometry(scale.w, scale.h);
    })
    .start();
}

function cameraTo(x, y, z) {
  const coords = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };
  // console.log(coords)
  // console.log(cube.position)

  new TWEEN.Tween(coords)
    .to({ x: x, y: y, z: z + 2 })
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
    .start();
}

function resetStyles(elems) {
  elems.forEach((elems) => {
    elems.setAttribute("style", "");
  });
}

function resetImages(images, except) {
  Object.keys(images).forEach((key) => {
    if (key !== except) {
      TweenScaleTo(images[key], 1.6, 0.9);
    }
  });
}

earth.rotation.x = THREE.MathUtils.degToRad(30);

animate((time) => {
  // redCube.rotation.x = time * 0.001
  // redCube.rotation.y = time * 0.001

  // torusRing.rotation.z = time * 0.0001;
  // torusRing.rotation.y = time * 0.0001;

  bg.rotation.x = mouse.y * 0.0001;
  bg.rotation.y = mouse.x * 0.0001;
  bg.rotation.z = time * 0.00005;

  resetStyles(btns);
  btns[activeCube].setAttribute("style", "background: white; color: black;");

  earth.rotation.y = time * 0.0001;
  // earth.rotation.x = time * 0.0001;
  earthC.rotation.y = time * -0.0001;

  container.innerHTML = getElementInString(activeCube);

  renderer.render(scene, camera);
  interactionManager.update();
  // controlsx.update()
  TWEEN.update(time);
});

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  console.log(renderer.getSize());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Helper to autozoom and Focus Images 

let seconds = 0;

function makeZoomAccordingToActive(active) {
  switch (active) {
    case 0:
      resetImages(images, "p1");
      TweenScaleTo(p1, 16, 9);
      cameraTo(p1.position.x, p1.position.y, p1.position.z + 8);
      break;
    case 1:
      resetImages(images, "p2");
      TweenScaleTo(p2, 16, 9);
      cameraTo(p2.position.x, p2.position.y, p2.position.z + 8);
      break;
    case 2:
      resetImages(images, "p3");
      TweenScaleTo(p3, 16, 9);
      cameraTo(p3.position.x, p3.position.y, p3.position.z + 8);
      break;
    case 3:
      resetImages(images, "p4");
      TweenScaleTo(p4, 16, 9);
      cameraTo(p4.position.x, p4.position.y, p4.position.z + 8);
      break;
    default:
      resetImages(images, "p")
      cameraTo(0, 0, 10);
  }
}

function checkSeconds() {
  seconds += 1;
  if (seconds > 5) {
    seconds = 0;
    if (activeCube + 1 > 4) {
      activeCube = 0;
    } else {
      activeCube += 1;
    }
    makeZoomAccordingToActive(activeCube)
  }
}

setInterval(checkSeconds, 1000);
