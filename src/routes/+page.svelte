<script lang="ts">
	import { derived } from 'svelte/store';
	import { habitStore } from '../lib/stores/habitStore.js';
	import { StatsUtils } from '../lib/utils/statsUtils.js';
	
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import HabitForm from '../lib/components/HabitForm.svelte';
	import HabitCard from '../lib/components/HabitCard.svelte';
	import StatsSection from '../lib/components/StatsSection.svelte';
	import ExportButton from '../lib/components/ExportButton.svelte';

	const appStats = derived(habitStore, $habits => StatsUtils.calculateAppStats($habits));
</script>

<svelte:head>
	<title>Mini Habit Tracker</title>
	<meta name="description" content="Aplicación para seguimiento de hábitos diarios" />
</svelte:head>

<div class="container">
	<ThemeToggle />
	
	<div class="header">
		<h1>📈 Mini Habit Tracker</h1>
		<p>Construye hábitos positivos día a día</p>
	</div>

	<HabitForm />

	{#if $habitStore.length > 0}
		<StatsSection stats={$appStats} />

		<div class="habits-grid">
			{#each $habitStore as habit (habit.id)}
				<HabitCard {habit} />
			{/each}
		</div>

		<ExportButton habits={$habitStore} />
	{:else}
		<div class="empty-state">
			<h3>🎯 ¡Comienza tu primer hábito!</h3>
			<p>Agrega un hábito que quieras desarrollar y comienza a trackear tu progreso.</p>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		min-height: 100vh;
	}

	.header {
		text-align: center;
		margin-bottom: 30px;
	}

	.header h1 {
		color: white;
		font-size: 2.5rem;
		margin-bottom: 10px;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
	}

	.header p {
		color: rgba(255,255,255,0.8);
		font-size: 1.1rem;
	}

	.habits-grid {
		display: grid;
		gap: 20px;
		margin-bottom: 30px;
	}

	.empty-state {
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		padding: 40px;
		font-size: 1.1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		backdrop-filter: blur(10px);
	}

	.empty-state h3 {
		margin-bottom: 15px;
		color: white;
	}

	@media (max-width: 768px) {
		.container {
			padding: 15px;
		}

		.header h1 {
			font-size: 2rem;
		}
	}
</style>
