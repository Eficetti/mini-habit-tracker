import type { Habit, HabitStats } from '../types/habit.js';
import { DateUtils } from '../utils/dateUtils.js';

const statsCache = new Map<string, { stats: HabitStats; lastUpdated: number; completedDatesHash: string }>();

export class HabitService {
	static createHabit(name: string): Habit {
		return {
			id: Date.now(),
			name: name.trim(),
			completedDates: [],
			createdAt: new Date().toISOString()
		};
	}

	static toggleHabitCompletion(habit: Habit, date: Date): Habit {
		const dateStr = DateUtils.formatDate(date);
		const isCompleted = habit.completedDates.includes(dateStr);

		return {
			...habit,
			completedDates: isCompleted
				? habit.completedDates.filter(d => d !== dateStr)
				: [...habit.completedDates, dateStr]
		};
	}

	static calculateStreak(habit: Habit): number {
		if (habit.completedDates.length === 0) return 0;

		const sortedDates = habit.completedDates
			.map(dateStr => new Date(dateStr))
			.sort((a, b) => a.getTime() - b.getTime());

		if (sortedDates.length === 0) return 0;
		if (sortedDates.length === 1) return 1;

		let maxStreak = 1;
		let currentStreak = 1;

		for (let i = 1; i < sortedDates.length; i++) {
			const currentDate = sortedDates[i];
			const previousDate = sortedDates[i - 1];

			const daysDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));

			if (daysDiff === 1) {
				currentStreak++;
				maxStreak = Math.max(maxStreak, currentStreak);
			} else {
				currentStreak = 1;
			}
		}

		return maxStreak;
	}

	static calculateCompletionRate(habit: Habit): number {
		const last14Days = DateUtils.getLastNDays(14);
		const createdDate = new Date(habit.createdAt);

		createdDate.setHours(0, 0, 0, 0);

		let possibleDays = 0;
		let completedDays = 0;

		for (const day of last14Days) {
			const normalizedDay = new Date(day);
			normalizedDay.setHours(0, 0, 0, 0);

			if (normalizedDay >= createdDate) {
				possibleDays++;
				const dayStr = DateUtils.formatDate(day);
				if (habit.completedDates.includes(dayStr)) {
					completedDays++;
				}
			}
		}

		if (possibleDays === 0) return 0;
		return Math.round((completedDays / possibleDays) * 100);
	}

	static getHabitStats(habit: Habit): HabitStats {
		const completedDatesHash = habit.completedDates.sort().join(',');
		const cacheKey = `${habit.id}`;
		const now = Date.now();

		const cached = statsCache.get(cacheKey);
		if (cached &&
			cached.completedDatesHash === completedDatesHash &&
			(now - cached.lastUpdated) < 60000) {
			return cached.stats;
		}

		const streak = this.calculateStreak(habit);
		const completionRate = this.calculateCompletionRate(habit);

		const stats: HabitStats = {
			streak,
			completionRate
		};

		statsCache.set(cacheKey, {
			stats,
			lastUpdated: now,
			completedDatesHash
		});

		console.log(`Stats for ${habit.name}: streak=${streak}, rate=${completionRate}%`);

		return stats;
	}

	static clearStatsCache(habitId?: number): void {
		if (habitId) {
			statsCache.delete(`${habitId}`);
		} else {
			statsCache.clear();
		}
	}

	static isCompletedOnDate(habit: Habit, date: Date): boolean {
		const dateStr = DateUtils.formatDate(date);
		return habit.completedDates.includes(dateStr);
	}

	static debugStreakCalculation(habit: Habit): any {
		if (habit.completedDates.length === 0) {
			return { streak: 0, reason: 'No completed dates' };
		}

		const sortedDates = habit.completedDates
			.map(dateStr => new Date(dateStr))
			.sort((a, b) => a.getTime() - b.getTime());

		const debug = {
			habitName: habit.name,
			completedDates: habit.completedDates,
			sortedDates: sortedDates.map(d => DateUtils.formatDate(d)),
			maxStreak: 0,
			streakDetails: [],
			allStreaks: []
		};

		if (sortedDates.length === 1) {
			return { ...debug, maxStreak: 1, reason: 'Only one date completed' };
		}

		let maxStreak = 1;
		let currentStreak = 1;
		let currentStreakStart = 0;

		for (let i = 1; i < sortedDates.length; i++) {
			const currentDate = sortedDates[i];
			const previousDate = sortedDates[i - 1];
			const daysDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));


			if (daysDiff === 1) {
				currentStreak++;

				if (currentStreak > maxStreak) {
					maxStreak = currentStreak;
				}
			} else {
				currentStreak = 1;
				currentStreakStart = i;
			}
		}

		return { ...debug, maxStreak };
	}
} 