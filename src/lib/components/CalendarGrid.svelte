<script lang="ts">
	import type { Habit } from '../types/habit.js';
	import { DateUtils } from '../utils/dateUtils.js';
	import { HabitService } from '../services/habitService.js';
	import { habitStore } from '../stores/habitStore.js';

	interface Props {
		habit: Habit;
		days?: number;
	}

	let { habit, days = 14 }: Props = $props();

	let calendarDays = $derived(DateUtils.getLastNDays(days));

	function toggleDay(date: Date) {
		habitStore.toggleHabit(habit.id, date);
	}
</script>

<div class="calendar-grid">
	{#each calendarDays as date}
		{@const isCompleted = HabitService.isCompletedOnDate(habit, date)}
		{@const isToday = DateUtils.isToday(date)}
		<button 
			class="calendar-day"
			class:completed={isCompleted}
			class:today={isToday}
			onclick={() => toggleDay(date)}
			title={DateUtils.formatDisplayDate(date)}
			aria-label={`${isCompleted ? 'Desmarcar' : 'Marcar'} hábito para ${DateUtils.formatDisplayDate(date)}`}
		>
			{date.getDate()}
		</button>
	{/each}
</div>

<style>
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 15px;
	}

	.calendar-day {
		aspect-ratio: 1;
		border: none;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.calendar-day:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
	}

	.calendar-day.completed {
		background: linear-gradient(45deg, #00c851, #007e33);
		transform: scale(1.05);
	}

	.calendar-day.today {
		border: 2px solid rgba(255, 255, 255, 0.6);
	}

	@media (max-width: 768px) {
		.calendar-grid {
			gap: 5px;
		}
	}
</style> 