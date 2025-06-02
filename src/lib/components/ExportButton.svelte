<script lang="ts">
	import type { Habit } from '../types/habit.js';
	import { ExportService } from '../services/exportService.js';

	interface Props {
		habits: Habit[];
	}

	let { habits }: Props = $props();

	function exportData() {
		ExportService.exportToJSON(habits);
	}
</script>

<div class="export-section">
	<button 
		class="export-btn" 
		onclick={exportData}
		disabled={habits.length === 0}
		aria-label="Exportar datos de hábitos"
	>
		💾 Exportar Datos
	</button>
</div>

<style>
	.export-section {
		text-align: center;
		margin-top: 20px;
	}

	.export-btn {
		background: linear-gradient(45deg, #4834d4, #686de0);
		border: none;
		color: white;
		padding: 12px 25px;
		border-radius: 25px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.export-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(72, 52, 212, 0.4);
	}

	.export-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style> 