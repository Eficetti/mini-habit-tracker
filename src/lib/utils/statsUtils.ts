import type { Habit, AppStats } from '../types/habit.js';
import { DateUtils } from './dateUtils.js';

export class StatsUtils {
	static calculateAppStats(habits: Habit[]): AppStats {
		const today = DateUtils.formatDate(new Date());
		const completedToday = habits.filter(habit => 
			habit.completedDates.includes(today)
		).length;

		const overallCompletion = this.calculateOverallCompletion(habits);

		return {
			totalHabits: habits.length,
			completedToday,
			overallCompletion
		};
	}

	private static calculateOverallCompletion(habits: Habit[]): number {
		if (habits.length === 0) return 0;
		
		const last14Days = DateUtils.getLastNDays(14);
		
		let totalPossible = 0;
		let totalCompleted = 0;
		
		habits.forEach(habit => {
			const createdDate = new Date(habit.createdAt);
			createdDate.setHours(0, 0, 0, 0);
			
			last14Days.forEach(day => {
				const normalizedDay = new Date(day);
				normalizedDay.setHours(0, 0, 0, 0);
				
				if (normalizedDay >= createdDate) {
					totalPossible++;
					const dayStr = DateUtils.formatDate(day);
					if (habit.completedDates.includes(dayStr)) {
						totalCompleted++;
					}
				}
			});
		});
		
		if (totalPossible === 0) return 0;
		
		return Math.round((totalCompleted / totalPossible) * 100);
	}
} 