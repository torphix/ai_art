<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
	import GeneralMessage from '../common/GeneralMessage.svelte';
	import TokenomicsForm from './TokenomicsForm.svelte';
	import { postData } from '../../../api';

	export let tokenFunc: string;
	export let requirements: string;
	export let modelName: string;
	export let modelOverview: string;

	let executingCode = false;
	let sampleRequestBody: string;

	let accessType = 'private';
	let apiUrl: string | null;
	let apiKey: string | null;
	let benchmarkResults: string | any[] = [];
	let averageBenchmarkTime = 0;
	let benchmarkInProgress = false;

	let nSampleTokens = -1;
	let errorMessage = '';
	// Token options
	let tokenCost: number;
	let tokenPrice: number;
	let buyopt1Quantity: number;
	let buyopt2Quantity: number;
	let buyopt3Quantity: number;
	let buyopt1Price: number;
	let buyopt2Price: number;
	let buyopt3Price: number;

	async function createModel() {
		try {
			console.log(tokenCost)
			await postData(
				'ml_models/create_model_overview_and_tokens/',
				JSON.stringify({
					name: modelName,
					description: modelOverview,
					url: apiUrl,
					accessKey:apiKey,
					accessType: accessType,
					costPerToken: tokenCost,
					tokenPrice: tokenPrice,
					buyOpts: [
						{ quantity: buyopt1Quantity, cost: buyopt1Price },
						{ quantity: buyopt2Quantity, cost: buyopt2Price },
						{ quantity: buyopt3Quantity, cost: buyopt3Price }
					]
				}),
				{
					'Content-Type': 'application/json'
				},
				true
			);
		} catch (e) {
			console.log(e);
		}
	}

	function checkJSON() {
		try {
			let obj = JSON.parse(sampleRequestBody);
			let pretty = JSON.stringify(obj, undefined, 4);
			errorMessage = '';
			//@ts-ignore
		} catch (e) {
			errorMessage = 'JSON Error';
		}
	}

	async function testTokenFunction() {
		try {
			executingCode = true;
			if (tokenFunc == '') {
				throw Error('Please enter a valid calculate_tokens function');
			} else {
				errorMessage = '';
			}
			let pyodide: any;
			let pyodide_loaded: boolean = false;
			//@ts-ignore
			pyodide = await loadPyodide();
			await pyodide.loadPackage('micropip');
			const micropip = pyodide.pyimport('micropip');

			if (requirements.length !== 0) {
				let requirementsList = requirements.split('\n').map((r) => micropip.install(r));
				let requirementsPromises = await Promise.all(requirementsList);
			}
			tokenFunc += `\nimport json\ninput_data = json.loads(${JSON.stringify(
				sampleRequestBody
			)})\nn_tokens = calculate_tokens(input_data)`;
			//@ts-ignore
			pyodide = await loadPyodide();
			await pyodide.runPythonAsync(tokenFunc).then(() => {
				console.log(pyodide.globals.toJs().get('n_tokens'));
				nSampleTokens = pyodide.globals.toJs().get('n_tokens');
			});
			pyodide_loaded = true;
			executingCode = false;
		} catch (e: any) {
			console.log(e);
			errorMessage = e;
			executingCode = false;
		}
	}
	async function benchmarkModel() {
		benchmarkInProgress = true;
		try {
			benchmarkResults = [];
			errorMessage = '';
			if (sampleRequestBody === null || apiUrl === null) {
				throw Error('Provide API URL and request body when benchmarking model');
			}
			let headers = {};
			if (apiKey !== null) {
				headers = {
					Authorization: apiKey
				};
			}

			let responseResults = [];
			for (let i = 0; i !== 3; i++) {
				let start = Date.now();
				// const res = await fetch(apiUrl, {
				// 	method: 'POST',
				// 	body: apiRequestBody,
				// 	headers: headers
				// });
				let end = Date.now();
				let infTime = end - start;
				// if (res.ok) {
				responseResults.push(infTime);
				// } else {
				// throw Error(await res.json());
				// }
			}
			benchmarkResults = responseResults;
			averageBenchmarkTime =
				benchmarkResults.reduce((partialSum, a) => partialSum + a, 0) / benchmarkResults.length;
			benchmarkInProgress = false;
		} catch (e) {
			console.log(e);
			errorMessage = e.toString();
			benchmarkInProgress = false;
		}
	}
</script>

<svelte:head>
	<script async src="https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js"></script>
</svelte:head>

<div class="content mt-10 w-100">
	<p class="text-2xl text-center mb-4">
		Enter your API details below and we will send some test inferences to the endpoint
	</p>
	<form action="">
		<input
			bind:value={apiUrl}
			type="text"
			placeholder="Endpoint URL"
			class="input input-bordered input-primary  w-100 mb-4"
		/>
		<input
			bind:value={apiKey}
			type="text"
			placeholder="API Key (optional if endpoint is protected)"
			class="input input-bordered input-info  w-100 mb-4"
		/>

		<p class="mt-4 mb-4">Sample Input to send in request, should be a JSON serializable object</p>
		<CodeMirror
			on:change={() => checkJSON()}
			bind:value={sampleRequestBody}
			theme={oneDark}
			tabSize={4}
			placeholder={'{\n\t"sample_input_data":"your input data here"\n}'}
			lang={json()}
			styles={{
				'&': {
					maxWidth: '100%',
					minHeight: '150px'
				}
			}}
		/>
		<br />
		<!-- Errors -->
		{#if errorMessage !== ''}
			<GeneralMessage message={errorMessage} colorCode={'error'} />
		{:else if nSampleTokens !== -1}
			<GeneralMessage
				message={`Sample input generated: ${nSampleTokens} tokens`}
				colorCode={'info'}
			/>
		{/if}
		<!-- Action buttons Benchmark & Token Code test -->

		<div class="flex justify-between">
			<input
				type="file"
				class="file-input file-input-bordered file-input-primary w-full max-w-xs mt-5"
			/>
			<!-- Benchmark Button -->
			{#if benchmarkInProgress}
				<button class="btn btn-success loading mt-5">Benchmarking...</button>
			{:else}
				<button class="btn btn-info mt-5" on:click|preventDefault={async () => benchmarkModel()}>
					Benchmark (Will Make 3 Calls to your API)
				</button>
			{/if}

			<!-- Token Button -->
			{#if executingCode}
				<button class="btn btn-success loading mt-5">Testing Code</button>
			{:else}
				<button
					class="btn btn-success mt-5"
					on:click|preventDefault={() => {
						testTokenFunction();
					}}
				>
					Test Token Function
				</button>
			{/if}
		</div>

		<!-- Benchmark Results -->
		{#if benchmarkResults.length > 0}
			<div class="overflow-x-auto mt-5 pt-5">
				<table class="table table-compact w-full">
					<thead>
						<tr>
							<th>Request #</th>
							<th>Compute Seconds</th>
						</tr>
					</thead>
					<tbody>
						{#each benchmarkResults as result, i}
							<tr>
								<td>{i}</td>
								<td>{result}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>Average:</td>
							<td>{averageBenchmarkTime}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}

		<div class="opts">
			<!-- Accesibility options -->
			<div class="form-control mt-5 pt-5">
				<label class="label cursor-pointer">
					<span class="label-text">List Model On Market (Others can rent your API from you)</span>
					<input
						type="radio"
						name="radio-10"
						class="radio checked:bg-red-500"
						on:click={() => {
							accessType = 'public';
						}}
						checked
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Keep model private (Only those with API key can access)</span>
					<input
						type="radio"
						name="radio-10"
						class="radio checked:bg-blue-500"
						on:click={() => {
							accessType = 'private';
						}}
						checked
					/>
				</label>
			</div>
		</div>

		<TokenomicsForm
			bind:tokenCost={tokenCost}
			bind:tokenPrice={tokenPrice}
			bind:buyopt1Quantity={buyopt1Quantity}
			bind:buyopt2Quantity={buyopt2Quantity}
			bind:buyopt3Quantity={buyopt3Quantity}
			bind:buyopt1Price={buyopt1Price}
			bind:buyopt2Price={buyopt2Price}
			bind:buyopt3Price={buyopt3Price}
		/>

		<div class="flex justify-center mb-10">
			<button
				class="btn btn-primary text-center mt-5"
				on:click|preventDefault={async () => await createModel()}>Create Model</button
			>
		</div>
	</form>
</div>

<style>
	.input {
		width: 100%;
	}
</style>
