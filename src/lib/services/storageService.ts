import type { Habit, Theme } from '../types/habit.js';

export class StorageService {
	private static readonly HABITS_KEY = 'habits';
	private static readonly THEME_KEY = 'theme';

	static saveHabits(habits: Habit[]): void {
		try {
			localStorage.setItem(this.HABITS_KEY, JSON.stringify(habits));
		} catch (error) {
			console.error('Error saving habits:', error);
		}
	}

	static loadHabits(): Habit[] {
		try {
			const saved = localStorage.getItem(this.HABITS_KEY);
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error('Error loading habits:', error);
			return [];
		}
	}

	static saveTheme(theme: Theme): void {
		try {
			localStorage.setItem(this.THEME_KEY, theme);
		} catch (error) {
			console.error('Error saving theme:', error);
		}
	}

	static loadTheme(): Theme {
		try {
			const saved = localStorage.getItem(this.THEME_KEY);
			return (saved as Theme) || 'light';
		} catch (error) {
			console.error('Error loading theme:', error);
			return 'light';
		}
	}
} 