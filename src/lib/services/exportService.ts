import type { Habit, ExportData } from '../types/habit.js';
import { DateUtils } from '../utils/dateUtils.js';

export class ExportService {
	static exportToJSON(habits: Habit[]): void {
		const data: ExportData = {
			habits,
			exportDate: new Date().toISOString(),
			version: '1.0'
		};
		
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: 'application/json'
		});
		
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `habits-${DateUtils.formatDate(new Date())}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
} 