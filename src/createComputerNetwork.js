import * as THREE from "three";
import img from '../static/pc.png';


const maxParticleCount = 100;
let particleCount = 60;
const r = 20;
const rHalf = r / 2;
const particlesData = [];
let positions, colors;
let particlePositions;
let linesMesh;
let pointCloud;

const effectController = {
    showDots: true,
    showLines: true,
    minDistance: 5,
    limitConnections: false,
    maxConnections: 5,
    particleCount: 10,
  };

export default function createNetwork() {
  // Create a Group to have all network nodes
  const group = new THREE.Group();

  // Loader to load png texture
  const loader = new THREE.TextureLoader();
  const pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 20,
    map: loader.load(img),
    transparent: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false,
  });


  const segments = maxParticleCount * maxParticleCount;

  positions = new Float32Array(segments * 3);
  colors = new Float32Array(segments * 3);

  const particles = new THREE.BufferGeometry();
    particlePositions = new Float32Array(maxParticleCount * 3);

  for (let i = 0; i < maxParticleCount; i++) {
    const x = Math.random() * r - r / 2;
    const y = Math.random() * r - r / 2;
    const z = Math.random() * r - r / 2;

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    // add it to the geometry
    particlesData.push({
      velocity: new THREE.Vector3(
        -1 + Math.random() * 2,
        -1 + Math.random() * 2,
        -1 + Math.random() * 2
      ),
      numConnections: 0,
    });
  }

  particles.setDrawRange(0, particleCount);
  particles.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3).setUsage(
      THREE.DynamicDrawUsage
    )
  );

  // create the particle system
pointCloud = new THREE.Points(particles, pMaterial);
  group.add(pointCloud);

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
  );

  //   geometry.computeBoundingSphere();

  //   geometry.setDrawRange(0, 0);

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

    linesMesh = new THREE.LineSegments(geometry, material);
  group.add(linesMesh);
  animate()
  return group;
}


function animate() {
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;
  
    for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;
  
    for (let i = 0; i < particleCount; i++) {
      // get the particle
      const particleData = particlesData[i];
  
      particlePositions[i * 3] += particleData.velocity.x * 0.05;
      particlePositions[i * 3 + 1] += particleData.velocity.y * 0.05;
      particlePositions[i * 3 + 2] += particleData.velocity.z * 0.05;
  
      if (
        particlePositions[i * 3 + 1] < -rHalf ||
        particlePositions[i * 3 + 1] > rHalf
      )
        particleData.velocity.y = -particleData.velocity.y;
  
      if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
        particleData.velocity.x = -particleData.velocity.x;
  
      if (
        particlePositions[i * 3 + 2] < -rHalf ||
        particlePositions[i * 3 + 2] > rHalf
      )
        particleData.velocity.z = -particleData.velocity.z;
  
      if (
        effectController.limitConnections &&
        particleData.numConnections >= effectController.maxConnections
      )
        continue;
  
      // Check collision
      for (let j = i + 1; j < particleCount; j++) {
        const particleDataB = particlesData[j];
        if (
          effectController.limitConnections &&
          particleDataB.numConnections >= effectController.maxConnections
        )
          continue;
  
        const dx = particlePositions[i * 3] - particlePositions[j * 3];
        const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
        const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
        if (dist < effectController.minDistance) {
          particleData.numConnections++;
          particleDataB.numConnections++;
  
          const alpha = 1.0 - dist / effectController.minDistance;
  
          positions[vertexpos++] = particlePositions[i * 3];
          positions[vertexpos++] = particlePositions[i * 3 + 1];
          positions[vertexpos++] = particlePositions[i * 3 + 2];
  
          positions[vertexpos++] = particlePositions[j * 3];
          positions[vertexpos++] = particlePositions[j * 3 + 1];
          positions[vertexpos++] = particlePositions[j * 3 + 2];
  
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
  
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
  
          numConnected++;
        }
      }
    }
  
    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
  
    pointCloud.geometry.attributes.position.needsUpdate = true;
  
    requestAnimationFrame(animate);
  
}