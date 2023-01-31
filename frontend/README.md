# Links
Icons: https://github.com/Introvertuous/svelte-icons


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Gallery section
- Built using three.js
- Organization:
We’ll divide these modules into two categories: components, and systems. Components are anything that can be placed into the scene, like the cube, the camera, and the scene itself, while systems are things that operate on components or other systems. Here, that’s the renderer and the sizing function, which we’ll call a Resizer. Later you might want to add additional categories like utilities, stores, and so on.

- Ensuring smooth animation:
To prevent this, we need to decouple animation speed from frame rate. Here’s how we’ll do it: when we tell an object to .tick forward a frame, we’ll scale the size of the movement by how long the previous frame took. This way, as the frame rate varies, we’ll constantly adjust the size of each .tick so that the animation remains smooth. Our adjustments will always be one frame behind, but the frames are generated so quickly this won’t be visible to the user. This way, animations will run at the same speed on all devices.

