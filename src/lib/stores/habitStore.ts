import { writable } from 'svelte/store';
import type { Habit } from '../types/habit.js';
import { StorageService } from '../services/storageService.js';
import { HabitService } from '../services/habitService.js';

function createHabitStore() {
	const { subscribe, set, update } = writable<Habit[]>([]);

	return {
		subscribe,
		
		init: () => {
			const habits = StorageService.loadHabits();
			console.log('Loaded habits:', habits);
			set(habits);
		},

		addHabit: (name: string) => {
			if (!name.trim()) return;
			
			update(habits => {
				const newHabit = HabitService.createHabit(name);
				const updatedHabits = [...habits, newHabit];
				console.log('Adding habit:', newHabit);
				StorageService.saveHabits(updatedHabits);
				return updatedHabits;
			});
		},

		deleteHabit: (id: number) => {
			update(habits => {
				const updatedHabits = habits.filter(habit => habit.id !== id);
				console.log('Deleting habit:', id);
				HabitService.clearStatsCache(id);
				StorageService.saveHabits(updatedHabits);
				return updatedHabits;
			});
		},

		toggleHabit: (habitId: number, date: Date) => {
			console.log('Toggling habit:', habitId, 'for date:', date);
			update(currentHabits => {
				const updatedHabits = currentHabits.map(habit => {
					if (habit.id === habitId) {
						const updatedHabit = HabitService.toggleHabitCompletion(habit, date);
						HabitService.clearStatsCache(habitId);
						return updatedHabit;
					}
					return habit;
				});
				StorageService.saveHabits(updatedHabits);
				return updatedHabits;
			});
		},

		reset: () => {
			const emptyHabits: Habit[] = [];
			StorageService.saveHabits(emptyHabits);
			set(emptyHabits);
		}
	};
}

export const habitStore = createHabitStore(); 