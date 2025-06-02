import { writable } from 'svelte/store';
import type { Theme } from '../types/habit.js';
import { StorageService } from '../services/storageService.js';
import { browser } from '$app/environment';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		
		init: () => {
			if (browser) {
				const savedTheme = StorageService.loadTheme();
				set(savedTheme);
				document.body.classList.toggle('dark', savedTheme === 'dark');
			}
		},

		toggle: () => {
			update(currentTheme => {
				const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
				
				if (browser) {
					StorageService.saveTheme(newTheme);
					document.body.classList.toggle('dark', newTheme === 'dark');
				}
				
				return newTheme;
			});
		},

		setTheme: (theme: Theme) => {
			set(theme);
			
			if (browser) {
				StorageService.saveTheme(theme);
				document.body.classList.toggle('dark', theme === 'dark');
			}
		}
	};
}

export const themeStore = createThemeStore(); 