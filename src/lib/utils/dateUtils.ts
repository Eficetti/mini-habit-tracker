export class DateUtils {
	static formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	static isToday(date: Date): boolean {
		const today = new Date();
		return this.formatDate(date) === this.formatDate(today);
	}

	static getDaysInMonth(year: number, month: number): number {
		return new Date(year, month + 1, 0).getDate();
	}

	static getLastNDays(n: number): Date[] {
		const days: Date[] = [];
		const today = new Date();
		
		for (let i = n - 1; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(today.getDate() - i);
			days.push(date);
		}
		
		return days;
	}

	static formatDisplayDate(date: Date): string {
		return date.toLocaleDateString('es-ES', { 
			weekday: 'long', 
			day: 'numeric', 
			month: 'short' 
		});
	}

	static isSameDay(date1: Date, date2: Date): boolean {
		return this.formatDate(date1) === this.formatDate(date2);
	}
} 