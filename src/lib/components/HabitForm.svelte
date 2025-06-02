<script lang="ts">
	import { habitStore } from '../stores/habitStore.js';

	let newHabitName = $state('');

	function addHabit() {
		if (newHabitName.trim()) {
			habitStore.addHabit(newHabitName);
			newHabitName = '';
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addHabit();
		}
	}
</script>

<div class="add-habit-form">
	<div class="form-group">
		<input 
			type="text" 
			placeholder="Ej: Beber 8 vasos de agua"
			bind:value={newHabitName}
			onkeypress={handleKeyPress}
			aria-label="Nombre del nuevo hábito"
		>
		<button 
			class="add-btn" 
			onclick={addHabit}
			disabled={!newHabitName.trim()}
		>
			➕ Agregar Hábito
		</button>
	</div>
</div>

<style>
	.add-habit-form {
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 25px;
		margin-bottom: 30px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.form-group {
		display: flex;
		gap: 15px;
		align-items: center;
		flex-wrap: wrap;
	}

	.form-group input {
		flex: 1;
		min-width: 200px;
		padding: 12px 20px;
		border: none;
		border-radius: 25px;
		font-size: 1rem;
		background: rgba(255, 255, 255, 0.9);
		transition: all 0.3s ease;
	}

	.form-group input:focus {
		outline: none;
		transform: scale(1.02);
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
	}

	.add-btn {
		background: linear-gradient(45deg, #ff6b6b, #ee5a24);
		border: none;
		color: white;
		padding: 12px 25px;
		border-radius: 25px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.add-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
	}

	.add-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.form-group {
			flex-direction: column;
		}

		.form-group input {
			min-width: 100%;
		}
	}
</style> 