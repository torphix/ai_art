<script>
	import { onMount } from 'svelte';
	import { main } from '../../lib/gallery/main';
	onMount(async () => {
		await main();
	});
</script>

<svelte:head>
	<title>Gallery.js Sveltekit</title>
	<meta name="description" content="Gallery.js example app built with Svelte" />
</svelte:head>

<div id="scene-container"></div>

<div id='gallery-menu'></div>


<style>
	#scene-container {
		width: 100%;
		height: 100vh;
	}
</style>