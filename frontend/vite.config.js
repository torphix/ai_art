import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ["codemirror", "@codemirror/lang-python", "@codemirror/theme-one-dark", "@codemirror/lang-json"/* ... */],
	},
};

export default config;
