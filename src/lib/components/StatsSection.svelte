<script lang="ts">
	import type { AppStats } from '../types/habit.js';
	import ProgressBar from './ProgressBar.svelte';

	interface Props {
		stats: AppStats;
	}

	let { stats }: Props = $props();
</script>

<div class="stats-section">
	<h2 class="stats-title">📊 Estadísticas</h2>
	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-number">{stats.totalHabits}</div>
			<div class="stat-label">Hábitos Activos</div>
		</div>
		<div class="stat-card">
			<div class="stat-number">{stats.completedToday}</div>
			<div class="stat-label">Completados Hoy</div>
		</div>
		<div class="stat-card">
			<div class="stat-number">{stats.overallCompletion}%</div>
			<div class="stat-label">Tasa General</div>
			<div class="stat-progress">
				<ProgressBar percentage={stats.overallCompletion} showText={false} size="small" />
			</div>
		</div>
	</div>
</div>

<style>
	.stats-section {
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 25px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		margin-bottom: 20px;
	}

	.stats-title {
		color: white;
		font-size: 1.5rem;
		margin-bottom: 20px;
		text-align: center;
		font-weight: bold;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}

	.stat-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 20px;
		border-radius: 15px;
		text-align: center;
		color: white;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.stat-label {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: 10px;
	}

	.stat-progress {
		margin-top: 10px;
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 