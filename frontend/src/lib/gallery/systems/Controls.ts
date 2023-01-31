import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';


let controls: PointerLockControls;
let keys: any;

function createControls(camera: THREE.Camera, mainContainer: HTMLElement) {
    // Perhaps try on demand rendering by adding a listener to the key down event?
    controls = new PointerLockControls(camera, mainContainer);

    // Movement controls
    let keys: boolean[] = [];//Define array
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    //Attach listeners to functions
    const allowedKeys = ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
    function keydown(e: any) {
        if (allowedKeys.includes(e.key))
            keys[e.key] = true;
        console.log(keys)
    }
    function keyup(e: any) {
        if (allowedKeys.includes(e.key))
            keys[e.key] = false;
    }
    controls.tick = (_: number) => {
        if (keys['w'] || keys['ArrowUp']) {
            controls.moveForward(.1);
        }
        if (keys['s'] || keys['ArrowDown']) {
            controls.moveForward(-.1);
        }
        if (keys['a'] || keys['ArrowLeft']) {
            controls.moveRight(-.1);
        }
        if (keys['d'] || keys['ArrowRight']) {
            controls.moveRight(.1);
        }
    };
    // Hiding menu on camera control enabling
    controls.addEventListener('lock', function () {
        // mainContainer.querySelector('menu')!.style.display = 'none';
    });
    controls.addEventListener('unlock', function () {
        // controls.unlock()
        // mainContainer.querySelector('menu')!.style.display = 'block';
    });
    // For enabling camera control
    mainContainer.addEventListener('click', function () {
        controls.lock()
    })
    return controls


}

export { createControls };
