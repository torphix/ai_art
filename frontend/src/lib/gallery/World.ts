import { createCamera } from './components/camera.js';
import { createControls } from './systems/Controls.js';
import { createMeshGroup } from './components/meshGroup.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import type { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
import type { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;
let controls: PointerLockControls

class World {
    constructor(container: Element) {
        // Instantiate core classes
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        //Attach listeners to functions
        controls = createControls(camera, document.getElementById('scene-container')!);

        container.append(renderer.domElement);
        // Instantiate scene objects here
        const meshGroup = createMeshGroup();
        const light = createLights();
        // Create animation loop
        loop = new Loop(camera, scene, renderer);
        // Add the objects you wanted updated every frame here
        loop.updatables.push(meshGroup, controls);


        scene.add(meshGroup, light);

        const resizer = new Resizer(container, camera, renderer);

    }

    render() {
        // draw a single frame
        renderer.render(scene, camera);
    }

    start() {
        // Use loop start for continous animation
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };