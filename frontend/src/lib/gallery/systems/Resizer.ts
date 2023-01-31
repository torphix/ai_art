import type { PerspectiveCamera, WebGLRenderer } from "three";

const setSize = (container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};
class Resizer {
    // @ts-ignore
    constructor(container, camera, renderer) {
        // Set intial size
        setSize(container, camera, renderer);
        // set the size again if a resize occurs
        window.addEventListener("resize", () => {
            setSize(container, camera, renderer);
            // perform any additional resizing actions
            this.onResize();
        });
    }
    onResize() { }

}

export { Resizer };