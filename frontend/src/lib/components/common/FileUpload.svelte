<script lang="ts">
	import { Loading } from 'notiflix/build/notiflix-loading-aio';
	import { goto } from '$app/navigation';
	import {
		abortMultiPartFileUpload,
		multipartFileUploadS3Start,
		multipartFileUploadS3UploadParts,
		postData
	} from '../../../api';
	import GeneralMessage from './GeneralMessage.svelte';

	let uploadingFile = false;
	let files: FileList | null = null;
	let errorMessages: string;
	let chunkSize = 5 * 1024 * 1024;
	let uploadId = '';

	$: if (files) {
		const tarFile = files.item(0);
		if (tarFile?.name.endsWith('tar.gz') == false) {
			errorMessages = 'Please upload a tar.gz file';
		} else {
			errorMessages = '';
		}
	}

	function progressCallback(percentage: number) {
		console.log(percentage);
		var elem = document.getElementById('barStatus');
		elem!.style.width = percentage + '%';
		var text = document.getElementById('barPercentageText');
		text!.innerText = percentage.toString() + '%';
	}

	const startFileUpload = async () => {
		try {
			uploadingFile = true;
			const tarFile = files!.item(0);
			if (tarFile !== null) {
				const resData = await multipartFileUploadS3Start(tarFile, chunkSize);
				uploadId = resData['UploadId'];
				await multipartFileUploadS3UploadParts(
					tarFile,
					progressCallback,
					chunkSize,
					resData['urls'],
					resData['UploadId']
				).then((_) => {
					uploadingFile = false;
					goto('model_upload/benchmark_model/');
				});
			}
		} catch (e) {
			uploadingFile = false;
			console.log(e);
			errorMessages = `Error: ${e}`;
		}
	};

	const abortFileUpload = async () => {
		try {
			const tarFile = files!.item(0);
			if (tarFile !== null) {
				const abortRes = await abortMultiPartFileUpload(tarFile.name, uploadId)
				if (abortRes.ok) {
					uploadingFile = false;
					location.reload();
				}
			}
		} catch (e) {
			console.log(e);
			errorMessages = `Error: ${e}`;
		}
	};
</script>

<div class="">
	<GeneralMessage message={errorMessages} colorCode={'error'}/>
	{#if uploadingFile === false}
		<div class="fileupload m-auto ">
			<label
				class="flex justify-center w-full h-80 px-4 transition bg-base-200 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointe focus:outline-none"
			>
				<span class="flex items-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						/>
					</svg>

					<span class="font-medium">
						{#if files == null || errorMessages.length != 0}
							Upload compressed folder (should be compressed with tar)
							<span class="text-blue-600 underline">browse</span>
							<br />
						{:else}
							{files?.item(0)?.name}
						{/if}
					</span>
				</span>
				<input type="file" name="file_upload" class="hidden" bind:files />
			</label>
			{#if files != null && errorMessages.length == 0}
				<div class="flex flex-col items-center mt-5">
					<form on:submit|preventDefault={startFileUpload}>
						<button type="submit" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary mt-5"
							>Upload File</button
						>
						<br />
					</form>
				</div>
				<p class="text-center mt-5 pt-5">
					Depending on file size may take a while please don't navigate away or refresh
				</p>
			{/if}
		</div>
	{:else}
		<button class="btn btn-circle m-auto text-center btn-primary flex items-center" on:click={abortFileUpload}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
	{/if}

	<div class="flex row">
		<div id="progressBar" class="mt-5">
			<div id="barStatus">
				<div class="ml-5 text-primary" id="barPercentageText">0%</div>
			</div>
		</div>
		{#if uploadingFile}
		<div class="spinner mt-5 ml-5" />
			
		{/if}
	</div>
</div>

<style>
	#progressBar {
		border-radius: 8px;
		margin-top: 20px;
		position: relative;
		width: 95%;
		height: 25px;
		background-color: #ddd;
	}

	#barStatus {
		position: absolute;
		border-radius: 8px;
		width: 0%;
		height: 100%;
		background-color: rgb(45, 80, 194);
	}
	.spinner {
		position: relative;
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}
	.spinner::before,
	.spinner:after {
		content: '';
		position: absolute;
		border-radius: inherit;
	}
	.spinner:before {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(0deg, #ff00cc 0%, #333399 100%);
		animation: spin 0.5s infinite linear;
	}
	.spinner:after {
		width: 85%;
		height: 85%;
		background-color: rgb(54, 54, 54);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
