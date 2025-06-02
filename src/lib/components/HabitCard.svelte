<script lang="ts">
	import type { Habit } from '../types/habit.js';
	import { HabitService } from '../services/habitService.js';
	import { habitStore } from '../stores/habitStore.js';
	import CalendarGrid from './CalendarGrid.svelte';
	import ProgressBar from './ProgressBar.svelte';

	interface Props {
		habit: Habit;
	}

	let { habit }: Props = $props();

	let habitStats = $derived(HabitService.getHabitStats(habit));

	function deleteHabit() {
		if (confirm(`¿Estás seguro de que quieres eliminar el hábito "${habit.name}"?`)) {
			habitStore.deleteHabit(habit.id);
		}
	}
</script>

<div class="habit-card">
	<div class="habit-header">
		<div class="habit-name">{habit.name}</div>
		<button 
			class="delete-btn" 
			onclick={deleteHabit} 
			title="Eliminar hábito"
			aria-label={`Eliminar hábito ${habit.name}`}
		>
			❌
		</button>
	</div>
	
	<div class="progress-section">
		<ProgressBar percentage={habitStats.completionRate} />
	</div>
	
	<CalendarGrid {habit} />
	
	<div class="habit-stats">
		<div class="streak">🔥 {habitStats.streak} días</div>
	</div>
</div>

<style>
	.habit-card {
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 25px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
		animation: slideIn 0.5s ease-out;
	}

	.habit-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.habit-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.habit-name {
		color: white;
		font-size: 1.3rem;
		font-weight: bold;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
	}

	.delete-btn {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		color: white;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.delete-btn:hover {
		background: rgba(255, 0, 0, 0.5);
		transform: scale(1.1);
	}

	.progress-section {
		margin-bottom: 20px;
	}

	.habit-stats {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		font-size: 0.9rem;
	}

	.streak {
		background: rgba(255, 255, 255, 0.2);
		padding: 5px 12px;
		border-radius: 15px;
		font-weight: bold;
	}

</style> 