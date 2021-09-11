import {DragControls } from 'three/examples/jsm/controls/DragControls';

export default function createDragController(objects, camera, renderer) {
    return new DragControls( camera , renderer.domElement)
}