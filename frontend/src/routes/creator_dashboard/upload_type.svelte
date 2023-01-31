<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		// let response = await fetch('http://localhost:8000/accounts/prot/', {
		// 	authorization: true,
		// 	credentials: 'include',
		// 	mode: 'cors'
		// });
		// console.log(await response.json());
	});

	// const name = field('name', '', [required()]);
	// const task = field('task', '', [required()]);
	// const inferenceType = field('inferenceType', '', [required()]);
	// const accessType = field('accessType', '', [required()]);
	// const paymentType = field('paymentType', '', [required()]);
	// const description = field('description', '', [required()]);
	// const gitLink = field('gitLink', '', [required()]);
	// const gitSSH = field('gitSSH', '', [required()]);
	// const uploadForm = form(
	// 	name,
	// 	task,
	// 	inferenceType,
	// 	accessType,
	// 	paymentType,
	// 	description,
	// 	gitLink,
	// 	gitSSH
	// );
	// var largeFileLinks = [{ link: '', path: '' }];
	// async function submitForm() {
	// 	try {
	// 		const response = await fetch(`http://${remotehostname}/ml_models/upload_model/`, {
	// 			method: 'POST',
	// 			credentials: 'same-origin',
	// 			body: JSON.stringify(uploadForm.summary()),
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		}).then((res) => {
	// 			if (res.ok) {
	// 				goto(`/benchmark/${name}`);
	// 			}
	// 		});
	// 	} catch (error) {
	// 		console.error(`Error in load function for /: ${error}`);
	// 	}
	// }
	// function addLargeFile() {
	// 	if (
	// 		largeFileLinks[largeFileLinks.length - 1]['link'] == '' ||
	// 		largeFileLinks[largeFileLinks.length - 1]['path'] == ''
	// 	) {
	// 		alert('Please fill out existing large file inputs before adding more');
	// 	} else {
	// 		largeFileLinks.push({
	// 			link: '',
	// 			path: ''
	// 		});
	// 		largeFileLinks = largeFileLinks;
	// 	}
	// }
</script>

<div class="flex row m-auto main mt-5 pt-5">
	<div class="m-5 card w-100 bg-neutral text-neutral-content col">
		<div class="card-body items-center text-center">
			<h1 class="card-title">Upload zip file</h1>
			<p class="mb-4 mt-4">Compress your code and model into a zip file and upload</p>
			<div class="card-actions justify-end">
				<a sveltekit:prefetch href="/model_upload/zip_upload" class="btn btn-primary">Lets Go!</a>
			</div>
		</div>
	</div>

	<div class="m-5 card w-100 bg-neutral text-neutral-content col">
		<div class="card-body items-center text-center">
			<h2 class="card-title">Upload Link to Git repo</h2>
			<p>Add required code to your repo then upload git link and links to hosted model weights</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Coming Soon</button>
			</div>
		</div>
	</div>
</div>


<style>
	.card{
		margin:30px;
		max-width: 450px;
		min-width: 450px;
		
	}
	.main{
		margin-top:150px;
		margin-bottom: 40%;
}
</style>
<!-- 
<section class="text-center mt-5 pt-5">
	<h1>Model Details</h1>
	<input
		type="text"
		placeholder="Model Name"
		name={$name.value}
		bind:value={$name.value}
		class="input input-bordered input-primary w-full"
	/>
	{#if $uploadForm.hasError('name.required')}
		<div>Name is required</div>
	{/if}
	<input
		type="text"
		placeholder="Task"
		name={$task.value}
		bind:value={$task.value}
		class="input input-bordered input-primary w-full mt-5"
	/>
	<select
		name={$inferenceType.value}
		bind:value={$inferenceType.value}
		id=""
		class="select select-primary w-full mt-5"
	>
		<option value="subscription">Get</option>
		<option value="token">Streaming</option>
	</select>

	<p class="mt-5">Open your API to any interested parties</p>
	<div class="row justify-between">
		<label for="accessType" class="mr-2">Public</label>
		<input
			type="radio"
			name={$accessType.value}
			bind:value={$accessType.value}
			class="radio radio-accent "
			checked
		/>
		<label for="accessType" class="mr-2 ml-5">Private</label>
		<input
			type="radio"
			name={$accessType.value}
			bind:value={$accessType.value}
			class="radio radio-accent"
		/>
	</div>

	<select
		name={$paymentType.value}
		bind:value={$paymentType.value}
		class="select select-primary w-full mt-5"
	>
		<option disabled selected>Payment Type</option>
		<option value="subscription">Subscription</option>
		<option value="token">Token</option>
		<option value="free">Free</option>
	</select>

	<textarea
		name={$description.value}
		bind:value={$description.value}
		id="description"
		rows="10"
		style="width:100%"
		class="textarea textarea-primary mt-5 w-100"
		placeholder="Description of your model. Include input and outputs as well as what it does."
	/>
	<h1 class="mt-4">Model Resources</h1>
	<input
		type="text"
		placeholder="Github Repo Link"
		name={$gitLink.value}
		bind:value={$gitLink.value}
		class="input input-bordered input-primary w-full mt-5"
	/>

	<textarea
		name={$gitSSH.value}
		bind:value={$gitSSH.value}
		id="gitSSH"
		rows="10"
		style="width:100%"
		class="textarea textarea-primary mt-5"
		placeholder="Github SSH key (only if repo access is private otherwise leave blank)"
	/>

	<div class="col" id="largeFileLinks">
		<h1>Link to your large files, specifying the folder path to save to in your repo</h1>

		{#each largeFileLinks as largeFile}
			<div class="row flex justify-between">
				<input
					type="text"
					placeholder="Large File Link"
					name={largeFile['link']}
					bind:value={largeFile['link']}
					on:input={(e) => {
						largeFile['link'] = e.target.value;
					}}
					class="input input-bordered input-primary col-6 w-full mt-5 mr-5"
				/>
				<input
					type="text"
					placeholder="Save path"
					name={largeFile['path']}
					bind:value={largeFile['path']}
					on:input={(e) => {
						largeFile['path'] = e.target.value;
					}}
					class="input input-bordered input-primary col-6 mt-5 w-full ml-5"
				/>
			</div>
		{/each}
	</div>
	<button on:click={addLargeFile} class="btn btn-primary mt-5"> Add Another Large File </button>

	<br />
	<button on:click={submitForm} class="btn btn-outline btn-accent mt-5"> Continue </button>
</section> -->
