<script lang="ts">
	interface Props {
		percentage: number;
		showText?: boolean;
		size?: 'small' | 'medium' | 'large';
	}

	let { percentage, showText = true, size = 'medium' }: Props = $props();

	let clampedPercentage = $derived(Math.max(0, Math.min(100, percentage)));
	
	let progressColor = $derived(() => {
		if (clampedPercentage === 100) {
			return 'linear-gradient(90deg, #ffd700, #ffed4e)';
		} else if (clampedPercentage >= 80) {
			return 'linear-gradient(90deg, #00c851, #00ff57)';
		} else if (clampedPercentage >= 60) {
			return 'linear-gradient(90deg, #4caf50, #81c784)';
		} else if (clampedPercentage >= 40) {
			return 'linear-gradient(90deg, #ff9800, #ffb74d)';
		} else if (clampedPercentage >= 20) {
			return 'linear-gradient(90deg, #f44336, #ef5350)';
		} else {
			return 'linear-gradient(90deg, #d32f2f, #f44336)';
		}
	});

	let shadowColor = $derived(() => {
		if (clampedPercentage === 100) return 'rgba(255, 215, 0, 0.6)';
		if (clampedPercentage >= 80) return 'rgba(0, 200, 81, 0.4)';
		if (clampedPercentage >= 60) return 'rgba(76, 175, 80, 0.4)';
		if (clampedPercentage >= 40) return 'rgba(255, 152, 0, 0.4)';
		if (clampedPercentage >= 20) return 'rgba(244, 67, 54, 0.4)';
		return 'rgba(211, 47, 47, 0.4)';
	});

	let barHeight = $derived(() => {
		switch (size) {
			case 'small': return '6px';
			case 'large': return '12px';
			default: return '8px';
		}
	});
</script>

<div class="progress-container" class:small={size === 'small'} class:large={size === 'large'}>
	<div class="progress-bar" style="height: {barHeight}">
		<div 
			class="progress-fill" 
			style="width: {clampedPercentage}%; background: {progressColor}; box-shadow: 0 0 10px {shadowColor}"
			class:complete={clampedPercentage === 100}
			aria-label={`Progreso: ${clampedPercentage}%`}
		></div>
	</div>
	{#if showText}
		<div class="progress-text" class:complete={clampedPercentage === 100}>
			{clampedPercentage}%
		</div>
	{/if}
</div>

<style>
	.progress-container {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.progress-container.small {
		gap: 8px;
	}

	.progress-container.large {
		gap: 16px;
	}

	.progress-bar {
		flex: 1;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.progress-fill {
		height: 100%;
		border-radius: 10px;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.3) 50%,
			transparent 100%
		);
		animation: shimmer 2s infinite;
		border-radius: inherit;
	}

	.progress-fill.complete::after {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.6) 50%,
			transparent 100%
		);
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.progress-text {
		color: white;
		font-size: 0.9rem;
		font-weight: bold;
		min-width: 45px;
		text-align: right;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
		transition: all 0.3s ease;
	}

	.progress-text.complete {
		color: #ffd700;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.5), 0 0 8px rgba(255, 215, 0, 0.5);
		transform: scale(1.05);
	}

	.small .progress-text {
		font-size: 0.8rem;
		min-width: 35px;
	}

	.large .progress-text {
		font-size: 1rem;
		min-width: 50px;
	}
</style> 