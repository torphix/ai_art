<script type="ts">
	import FileUpload from '$lib/components/common/FileUpload.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
	/>
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
	<script>
		hljs.highlightAll();
	</script>
</svelte:head>

<section>
	<h1 class="text-center text-4xl mt-5 pt-5 mb-2">Zip file upload requirements</h1>
	<hr />
	<div>
		<div class="card sm:card-side bg-base-100 shadow-xl card-bordered mt-5 ">
			<div class="card-body ">
				<h2 class="text-2xl text-center mb-5 mt-5"><b>1) Add necessary code</b></h2>
				<p class="text-center text-xl">Create a file called inference.py with the following code</p>
				<div class="mockup-code">
					<pre><code id="sourcecode" class="python">
                    def model_fn():
                        model = load_model_here()
                        return model
                    
                    def predict_fn(input_data, model):
                        output_data = model(input_data)
                        return output_data
                    
                    def input_fn(request_body, request_content_type):
                        '''
                        Process input data that arrives in request
                        '''
                        input_data = input_processing(request_body)
                        return input_data

                    def output_fn(output_data):
                        '''
                        Should return a json serializable object
                        '''
                        output_data = postprocessing(output_data)
                        return output_data


                    </code></pre>
					<pre><code id="sourcecode" class="python" /></pre>
				</div>
			</div>
		</div>

		<div class="card sm:card-side bg-base-100 shadow-xl card-bordered mt-5 pt-5">
			<div class="card-body">
				<h2 class="text-2xl text-center"><b>2) Format your code like this</b></h2>
				<p class="text-xl text-center mt-4">
					You can include as many files / folders, whats shown below is the bare minimum that's
					required
				</p>
				<p class="text-xl text-center mt-4">
					Don't fetch large files from remote API's include all large files in this zip file.
				</p>
				<figure>
					<div class="box">
						<ul class="directory-list">
							<li class="folder">
								project_name.tar.gz
								<ul>
									<li class="folder">
										code
										<ul>
											<li>inference.py</li>
											<li>requirements.txt</li>
										</ul>
									</li>
									<li>model_weights.pt</li>
								</ul>
							</li>
						</ul>
					</div>
				</figure>
			</div>
		</div>
	</div>

	<div class="mt-5 pt-5 mb-5 pb-5">
		<FileUpload />
	</div>
</section>

<style>
	.box {
		border-radius: 2px;
		margin: 30px 5%;
		padding: 5%;
	}

	@media (min-width: 544px) {
		.box {
			margin: 40px auto;
			max-width: 440px;
			padding: 40px;
		}
	}
	.directory-list ul {
		margin-left: 10px;
		padding-left: 20px;
		border-left: 1px dashed rgb(136, 123, 123);
	}

	.directory-list li {
		list-style: none;
		color: rgb(119, 119, 119);
		font-size: 17px;
		font-style: italic;
		font-weight: normal;
	}

	.directory-list li:before {
		margin-right: 10px;
		content: '';
		height: 20px;
		vertical-align: middle;
		width: 20px;
		background-repeat: no-repeat;
		display: inline-block;
		/* file icon by default */
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightgrey' d='M85.714,42.857V87.5c0,1.487-0.521,2.752-1.562,3.794c-1.042,1.041-2.308,1.562-3.795,1.562H19.643 c-1.488,0-2.753-0.521-3.794-1.562c-1.042-1.042-1.562-2.307-1.562-3.794v-75c0-1.487,0.521-2.752,1.562-3.794 c1.041-1.041,2.306-1.562,3.794-1.562H50V37.5c0,1.488,0.521,2.753,1.562,3.795s2.307,1.562,3.795,1.562H85.714z M85.546,35.714 H57.143V7.311c3.05,0.558,5.505,1.767,7.366,3.627l17.41,17.411C83.78,30.209,84.989,32.665,85.546,35.714z' /></svg>");
		background-position: center 2px;
		background-size: 60% auto;
	}

	.directory-list li.folder:before {
		/* folder icon if folder class is specified */
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightblue' d='M96.429,37.5v39.286c0,3.423-1.228,6.361-3.684,8.817c-2.455,2.455-5.395,3.683-8.816,3.683H16.071 c-3.423,0-6.362-1.228-8.817-3.683c-2.456-2.456-3.683-5.395-3.683-8.817V23.214c0-3.422,1.228-6.362,3.683-8.817 c2.455-2.456,5.394-3.683,8.817-3.683h17.857c3.422,0,6.362,1.228,8.817,3.683c2.455,2.455,3.683,5.395,3.683,8.817V25h37.5 c3.422,0,6.361,1.228,8.816,3.683C95.201,31.138,96.429,34.078,96.429,37.5z' /></svg>");
		background-position: center top;
		background-size: 75% auto;
	}
</style>
