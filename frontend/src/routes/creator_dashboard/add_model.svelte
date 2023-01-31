<script lang="ts">
	import ZipUpload from './zip_upload.svelte';
	import SelfHosted from '../../lib/components/add_model/SelfHosted.svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { python } from '@codemirror/lang-python';
	import { oneDark } from '@codemirror/theme-one-dark';

	let selectedUploadOpt = 'selfHosted';

	// Code upload values
	let tokenFunc = '';
	let requirements = '';
	let modelName = '';
	let modelOverview = '';
</script>

<div class="content m-auto mt-20 ">
	<h2 class="text-3xl text-center mb-2">Model Overview</h2>
	<hr />
	<input
		bind:value={modelName}
		type="text"
		placeholder="Model Name"
		class="input input-bordered input-secondary w-full mt-10 "
	/>
	<textarea
		bind:value={modelOverview}
		class="textarea textarea-accent mt-5 mb-10 "
		placeholder="Model Description / Overview"
	/>
	<br />

	<h2 class="text-3xl text-center mb-2">Upload Token Calculation Function</h2>
	<hr />
	<p class="text-xl text-center m-5 pr-5 pl-5">
		Upload a function that takes in your inference input and outputs the number of tokens to charge
		the user per inference call.
	</p>
	<p class="text-xl text-center m-5 pr-5 pl-5">
		The function should be called calculate_tokens and should return one variable n_tokens
	</p>
	<CodeMirror
		bind:value={tokenFunc}
		lang={python()}
		theme={oneDark}
		tabSize={4}
		placeholder={'\ndef calculate_tokens(json_data:dict):\n \ttokens = tokenize(json_data["text"])\n\tn_tokens = len(tokens) * 0.01\n\treturn n_tokens\n\n'}
	/>
	<br />
	<CodeMirror
		bind:value={requirements}
		theme={oneDark}
		tabSize={4}
		placeholder={'requirements.txt'}
	/>

	<br /><br /><br /> <br />
	<!-- Options to choose which type of model upload -->
	<h2 class="text-3xl text-center mb-2">Choose what type of model you want to upload</h2>
	<hr />
	<div class="form-control mt-5">
		<label class="label cursor-pointer">
			<span class="label-text text-xl mr-5"
				>You have a hosted endpoint API and want an access & user manager</span
			>
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-red-500"
				checked
				on:change={() => {
					selectedUploadOpt = 'selfHosted';
				}}
			/>
		</label>
	</div>
	<!-- <div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text text-xl mr-5"
				>You want to upload all model files and execution code to an autoscaling GPU where you are
				charged per request
			</span>
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-blue-500"
				on:change={() => {
					selectedUploadOpt = 'uploadFiles';
				}}
			/>
		</label>
	</div> -->
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text text-xl">Upload A Github Link & Links to hosted model weights </span>
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-primary-500"
				on:change={() => {
					selectedUploadOpt = 'linkFiles';
				}}
			/>
		</label>
	</div>
	<hr class="mt-4" />
	<!-- Upload a remote already hosted URL -->
	{#if selectedUploadOpt == 'selfHosted'}
		<SelfHosted {modelName} {modelOverview} {tokenFunc} {requirements} />
	{:else if selectedUploadOpt == 'uploadFiles'}
		<ZipUpload />
	{:else if selectedUploadOpt == 'linkFiles'}{/if}
	<!-- Upload a zip file and serverless inference -->
</div>

<!-- 
    - Upload a function that takes in the inference input and outputs the number of tokens to charge the user
    - Then you select how much to charge per token
    - And select how many tokens to sell at a time
-->
<style>
	.textarea {
		width: 100%;
		height: 150px;
	}
</style>
