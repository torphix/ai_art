import { Clock, type PerspectiveCamera, type WebGLRenderer, type Scene } from "three";

const clock = new Clock();


class Loop {
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    updatables: any[];
    constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        // This holds all the objects that need to be updated each frame
        this.updatables = [];

    }

    start() {

        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();

            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
    tick() {
        const delta = clock.getDelta();
        // Note by default this is called 60 times per second
        // Ensure to not perform heavy computation here
        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}

export { Loop };