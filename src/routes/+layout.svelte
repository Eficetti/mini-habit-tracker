<script lang="ts">
	import { onMount } from 'svelte';
	import { habitStore } from '../lib/stores/habitStore.js';
	import { themeStore } from '../lib/stores/themeStore.js';
	import '../app.css';

	onMount(() => {
		habitStore.init();
		themeStore.init();
	});
</script>

<main>
	<slot />
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		transition: all 0.3s ease;
	}

	:global(body.dark) {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
	}

	main {
		min-height: 100vh;
	}
</style> 