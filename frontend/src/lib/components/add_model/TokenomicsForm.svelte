<script lang="ts">
	export let tokenCost: number;
	export let tokenPrice: number;

	export let buyopt1Quantity: number;
	export let buyopt2Quantity: number;
	export let buyopt3Quantity: number;
	export let buyopt1Price: number;
	export let buyopt2Price: number;
	export let buyopt3Price: number;
	
</script>

<div class="content mt-10 pt-5">
	<h1 class="mt-5 mb-2 pt-3 text-center text-3xl">User managment & Tokenomics</h1>
	<hr class="mb-2" />
	<p class="text-center">
		Note tokens can be any arbitrary unit of measurement eg: 1 token might be equivalent to 100 text
		tokens
	</p>
	<!-- Show tokenomics form -->
	<div class="flex justify-between mt-4">
		<div class="form-control mt-5">
			<label class="label">
				<span class="label-text">How much 1 token costs you</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="0.01" class="input input-bordered" bind:value={tokenCost} />
				<span>USD</span>
			</label>
		</div>

		<div class="form-control mt-5">
			<label class="label">
				<span class="label-text">How much you'd like to charge per token</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="0.03" class="input input-bordered" bind:value={tokenPrice}/>
				<span>USD</span>
			</label>
		</div>
	</div>

	<!-- Buy opt 1 -->
	<div class="flex justify-between">
		<div class="form-control">
			<label class="label">
				<span class="label-text">Quantity Of Tokens</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: 10" class="input input-bordered" bind:value={buyopt1Quantity}/>
				<span># Tokens</span>
			</label>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Cost for bundle</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: $5" class="input input-bordered" bind:value={buyopt1Price}/>
				<span>USD</span>
			</label>
		</div>
	</div>

	<!-- Buy opt 2 -->
	<div class="flex justify-between">
		<div class="form-control">
			<label class="label">
				<span class="label-text">Quantity Of Tokens</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: 10" class="input input-bordered" bind:value={buyopt2Quantity}/>
				<span># Tokens</span>
			</label>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Cost for bundle</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: $5" class="input input-bordered" bind:value={buyopt2Price}/>
				<span>USD</span>
			</label>
		</div>
	</div>

	<!-- Buy opt 3 -->
	<div class="flex justify-between">
		<div class="form-control">
			<label class="label">
				<span class="label-text">Quantity Of Tokens</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: 10" class="input input-bordered" bind:value={buyopt3Quantity}/>
				<span># Tokens</span>
			</label>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Cost for bundle</span>
			</label>
			<label class="input-group">
				<input type="number" placeholder="eg: $5" class="input input-bordered" bind:value={buyopt3Price}/>
				<span>USD</span>
			</label>
		</div>
	</div>

</div>
