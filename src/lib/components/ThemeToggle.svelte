<script lang="ts">
	import { themeStore } from '../stores/themeStore.js';

	function toggleTheme() {
		themeStore.toggle();
	}
</script>

<button 
	class="theme-toggle" 
	onclick={toggleTheme}
	aria-label={$themeStore === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
>
	{$themeStore === 'dark' ? '☀️' : '🌙'}
</button>

<style>
	.theme-toggle {
		position: absolute;
		top: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		color: white;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
	}
</style> 