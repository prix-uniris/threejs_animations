import * as THREE from "three";

export default function createTorusRing () {
    const geometryTorus = new THREE.TorusGeometry(5, 1, 30, 64);
    const material = new THREE.PointsMaterial({
        size: 0.01,
    });
    return new THREE.Points(geometryTorus, material);
}