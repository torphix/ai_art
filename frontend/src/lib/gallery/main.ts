import { World } from './World';

// create the main function
async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');
  // 1. Create an instance of the World app
  const world = new World(container!);
  // 2. Render the scene
  // start the animation loop
  world.start();

}

export { main }
