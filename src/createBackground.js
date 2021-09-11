import * as THREE from "three";
import pointImg from "../static/favourite.png";

export default function cerateBG() {
  // Create a Particle Buffer Geometry and Sparse it
  const particlesGeomtery = new THREE.BufferGeometry();
  const particlesCount = 500;
  // Texture Loader
  const loader = new THREE.TextureLoader();
  const pointTexture = loader.load(pointImg);

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    // posArray[i] = Math.random()
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeomtery.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.3,
    color: 0xffffff,
    map: pointTexture,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Points(particlesGeomtery, particlesMaterial);

}
