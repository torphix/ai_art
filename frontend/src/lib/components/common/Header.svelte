<script lang="ts">
	import cookie from 'cookie';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import GoogleAuthButton from './GoogleAuthButton.svelte';
	import { isProduction, remotehostname } from '../../../env';
	import { User } from '../../../models/User';
	import { loggedIn } from '../../../stores';
	import { browser } from '$app/env';

	var userDetails: User | null = null;
	let theme:any;

	onMount(() => {
		themeChange(false);
		theme = localStorage.getItem('theme') 
		if (theme === null){
			theme ==='dark'
			localStorage.setItem('theme', 'dark')
		}
		// 👆 false parameter is required for svelte
		// Load user details from cache
		// var details = sessionStorage.getItem('user');
		// details == null ? (userDetails = details) : (userDetails = User.fromJson(details));
	});
	function toggleTheme() {
		if (theme === 'fantasy') localStorage.setItem('theme', 'dark');
		else localStorage.setItem('theme', 'fantasy');
	}

	async function onGoogleAuthSuccess(event: any) {
		const user = event['detail']['user'];
		const token = event['detail']['token'];
		// Cache user to session
		// Save user details
		let response = await fetch(`http://${remotehostname}/accounts/google_login/`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ user: user, user_type: 'creator', token: token }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			// Cache user details
			userDetails = new User(user['id'], data['email'], data['name'], data['profile_image']);
			sessionStorage.setItem('user', userDetails.toJson());

			if (isProduction === false) {
				localStorage.setItem('jwt-access', data['access_token']);
				localStorage.setItem('jwt-refresh', data['refresh_token']);
				console.log(data);
			}

			// Cookie should be set on server side
			// If denied refresh the access token and then try again
			// Log response
			loggedIn.set(true);
			return;
		} else {
			alert('Unable to login, please try again!');
		}
	}
</script>

<div class="navbar bg-base-200 ">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
				<li class:active={$page.url.pathname === '/'}>
					<a sveltekit:prefetch href="/">Browse Models</a>
				</li>
				<li class:active={$page.url.pathname === '/model_upload/upload_type'}>
					<a sveltekit:prefetch href="/creator_dashboard/model_manager_list">Model Manager</a>
				</li>
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl">forked.ai</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0">
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Browse Models</a>
			</li>
			<li class:active={$page.url.pathname === '/model_upload/upload_type'}>
				<a sveltekit:prefetch href="/creator_dashboard/model_manager_list">Model Manager</a>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<i class="icon mr-2">
			<FaSun />
		</i>
		<input
			type="checkbox"
			checked
			data-toggle-theme="dark,fantasy"
			data-act-class="ACTIVECLASS"
			class="toggle toggle-primary mr-2"
			on:click={() => {
				toggleTheme();
			}}
		/>
		<i class="icon mr-5">
			<FaMoon />
		</i>
		{#if userDetails == null}
			<GoogleAuthButton
				on:auth-success={onGoogleAuthSuccess}
				clientId="917317263985-40cvfgqpm6n1u2l6qksss9e1iimu6cpe.apps.googleusercontent.com"
			/>
		{:else}
			<div class="avatar">
				<div class="w-9 rounded-full ring ring-info ring-offset-base-100 ring-offset-2 m-4">
					<img
						src={userDetails.profileImage ? userDetails.profileImage : ''}
						alt="userImageProfile"
					/>
				</div>
			</div>
		{/if}

		<!-- <a href={googleAuthLoginUrl} class="btn ml-5"> <i class='icon mr-4'><FaGoogle/></i> Login </a> -->
	</div>
</div>

<style>
	.icon {
		width: 20px;
	}
	.menu li {
		font-size: 18px;
	}
	.menu li:active {
	}
</style>
