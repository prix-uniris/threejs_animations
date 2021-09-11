import * as THREE from 'three';

export default function createPlaneWTexture(h, w, texture){
    const geometry = new THREE.PlaneGeometry( h, w );
    const material = new THREE.MeshBasicMaterial( {map: texture} );
    return new THREE.Mesh( geometry, material );
}