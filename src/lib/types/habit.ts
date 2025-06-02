export interface Habit {
	id: number;
	name: string;
	completedDates: string[];
	createdAt: string;
}

export interface HabitStats {
	streak: number;
	completionRate: number;
}

export interface AppStats {
	totalHabits: number;
	completedToday: number;
	overallCompletion: number;
}

export interface ExportData {
	habits: Habit[];
	exportDate: string;
	version: string;
}

export type Theme = 'light' | 'dark'; 