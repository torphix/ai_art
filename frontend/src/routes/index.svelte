<script lang="ts">
	import MediaQuery from '$lib/components/common/MediaQuery.svelte';

	const data = [
		{
			img_src: 'images/reading_robot.png',
			img_pos: 'left',
			card_header: 'Provide model details',
			card_body: ['Describe the task that your model does so users can easily find your model.'],
			card_subtext: '',
			time: '~ 5-10 mins'
		},
		{
			img_src: 'images/math_robot.png',
			img_pos: 'right',
			card_header: 'Calculate Compute Costs',
			card_body: ['We benchmark how long each inference call takes on CPU & GPU runtimes.'],
			card_subtext: '',
			time: '~ 10-15 mins'
		},
		{
			img_src: 'images/money_robot.png',
			img_pos: 'left',
			card_header: 'Define cost per inference',
			card_body: ['Decide how much to charge users per inference call'],
			card_subtext:
				'eg: One inference call takes 2000ms ~ $0.000004 + Your fee = $ Total cost per inference call',
			time: '~ 10-15 mins'
		},
		{
			img_src: 'images/market_robot.png',
			img_pos: 'right',
			card_header: 'Upload to marketplace',
			card_body: [
				'Select additional output filters such as toxicity & biase',
				'Choose if you want to make the model availble privately or publicly.',
				'Users buy tokens to use your model and you are paid out at the end of each month.'
			],
			card_subtext: '',
			time: '~ 8-12 mins'
		},
		{
			img_src: 'images/stats_robot.png',
			img_pos: 'left',
			card_header: 'Dashboard Analytics',
			card_body: [
				`Monitor useage of your API, what options are most popular, failure cases and output logs`
			],
			card_subtext: '',
			time: '~ 8-12 mins'
		}
	];
</script>

<div class="body">
	<div class="hero m-5 p-5">
		<div class="hero-content text-center">
			<div class="">
				<h1 class="text-6xl font-bold">
					<span class="text-primary">Deploy</span> & rent <br /> your model in
					<span class="text-secondary">3 clicks</span>
				</h1>
				<p class="subtext mt-5  text-xl w-100">
					- Provide model details - <br />
					- Calculate compute per inference call - <br />
					- Define cost per inference - <br />
					- Upload to the marketplace -
				</p>
				<br />
				<button class="btn btn-primary mr-4">Upload Model</button>
				<button class="btn btn-info">Browse Models</button>
			</div>
		</div>
	</div>
	<br />
	<hr />

	<div class="details mt-5 pt-5">
		{#each data as card}
			<!-- Calculate compute -->
			<div class="card sm:card-side bg-base-100 shadow-xl card-bordered mt-5 pt-5">
				{#if card['img_pos'] == 'left'}
					<MediaQuery query="(min-width: 750px)" let:matches>
						{#if matches}
							<figure><img src={card['img_src']} alt="background image" class="img " /></figure>
						{/if}
					</MediaQuery>
				{/if}
				<div class="card-body ">
					<h1 class="card-title text-4xl">{card['card_header']}</h1>
					<p class="text-xl mt-5">
						{#each card['card_body'] as body_text, i}
							{body_text} <br />
						{/each}
					</p>
					{#if card['card_subtext'] != ''}
						<p>{card['card_subtext']}</p>
					{/if}
					<div class="card-actions justify-end">{card['time']}</div>
				</div>
				{#if card['img_pos'] == 'right'}
					<MediaQuery query="(min-width: 750px)" let:matches>
						{#if matches}
							<figure><img src={card['img_src']} alt="background image" class="img " /></figure>
						{/if}
					</MediaQuery>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col items-center">
		<a sveltekit:prefetch href="/model_upload" class="btn btn-primary btn-wide "
			>Let's get started</a
		>
	</div>
</div>

<style>
	.body{
		width:80%;
		margin: auto;
	}
	.hero {
		margin-top: 50px;
	}
	.subtext {
		margin-top: 30px;
	}
	.details {
		margin-top: 50px;
	}
	.card {
		height: 300px;
		margin-bottom: 50px;
	}
	.img {
		width: 320px;
	}
	.body {
		margin-bottom: 150px;
	}
</style>
