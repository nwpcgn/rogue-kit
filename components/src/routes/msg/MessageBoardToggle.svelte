<script>
	import {
		isPanelOpen,
		getMessageCount,
		togglePanel
	} from './message-board-state.svelte.js'
</script>

<button
	class="message-toggle"
	onclick={togglePanel}
	class:has-messages={getMessageCount() > 0}>
	<span class="icon">📨</span>
	{#if getMessageCount() > 0}
		<span class="badge">{getMessageCount()}</span>
	{/if}
	<span class="text">Nachrichten</span>
</button>

<style>
	.message-toggle {
		position: fixed;
		top: 20px;
		right: 20px;
		background: #007bff;
		color: white;
		border: none;
		padding: 0.75rem 1rem;
		border-radius: 25px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
		z-index: 997;
		transition: all 0.3s ease;
	}

	.message-toggle:hover {
		background: #0056b3;
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
	}

	.message-toggle.has-messages {
		background: #28a745;
		animation: pulse 2s infinite;
	}

	.message-toggle.has-messages:hover {
		background: #1e7e34;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
		}
		50% {
			box-shadow: 0 2px 20px rgba(40, 167, 69, 0.6);
		}
		100% {
			box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
		}
	}

	.icon {
		font-size: 1.1rem;
	}

	.badge {
		background: rgba(255, 255, 255, 0.9);
		color: #333;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: bold;
	}

	.text {
		font-weight: 500;
	}

	@media (max-width: 480px) {
		.message-toggle {
			right: 10px;
			top: 10px;
		}

		.text {
			display: none;
		}
	}
</style>
