<script>
	import {
		getMessages,
		isPanelOpen,
		getMessageCount,
		removeMessage,
		clearMessages,
		closePanel
	} from './message-board-state.svelte.js'

	function formatTime(date) {
		return date.toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
	}

	function getMessageIcon(type) {
		switch (type) {
			case 'success':
				return '✅'
			case 'error':
				return '❌'
			case 'warning':
				return '⚠️'
			case 'info':
				return 'ℹ️'
			default:
				return '📝'
		}
	}
</script>

Message Board Panel
{#if isPanelOpen()}
	<div class="message-board-overlay" onclick={closePanel}></div>
	<div class="message-board-panel">
		<div class="panel-header">
			<h3>
				Benachrichtigungen
				<span class="message-count">({getMessageCount()})</span>
			</h3>
			<div class="panel-actions">
				<button
					class="clear-btn"
					onclick={clearMessages}
					disabled={getMessageCount() === 0}>
					Alle löschen
				</button>
				<button class="close-btn" onclick={closePanel}>×</button>
			</div>
		</div>

		<div class="messages-container">
			{#if getMessageCount() === 0}
				<div class="no-messages">
					<p>Keine Benachrichtigungen</p>
				</div>
			{:else}
				{#each getMessages() as message (message.id)}
					<div class="message message-{message.type}">
						<div class="message-header">
							<span class="message-icon">
								{getMessageIcon(message.type)}
							</span>
							<span class="message-time">
								{formatTime(message.timestamp)}
							</span>
							<button
								class="remove-btn"
								onclick={() => removeMessage(message.id)}>
								×
							</button>
						</div>
						<div class="message-content">
							{message.content}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style>
	.message-board-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 998;
	}

	.message-board-panel {
		position: fixed;
		top: 0;
		right: 0;
		width: 400px;
		height: 100vh;
		background: white;
		box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
		z-index: 999;
		display: flex;
		flex-direction: column;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.panel-header {
		padding: 1rem;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f8f9fa;
	}

	.panel-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #333;
	}

	.message-count {
		color: #666;
		font-weight: normal;
		font-size: 0.9rem;
	}

	.panel-actions {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.clear-btn {
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
		border: 1px solid #ddd;
		background: white;
		cursor: pointer;
		border-radius: 3px;
	}

	.clear-btn:hover:not(:disabled) {
		background: #f5f5f5;
	}

	.clear-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.close-btn:hover {
		background: #f0f0f0;
	}

	.messages-container {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	.no-messages {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.message {
		margin-bottom: 0.5rem;
		padding: 0.75rem;
		border-radius: 6px;
		border-left: 4px solid;
		background: #f8f9fa;
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.message-success {
		border-left-color: #28a745;
		background: #f8fff9;
	}

	.message-error {
		border-left-color: #dc3545;
		background: #fff8f8;
	}

	.message-warning {
		border-left-color: #ffc107;
		background: #fffef8;
	}

	.message-info {
		border-left-color: #17a2b8;
		background: #f8fcff;
	}

	.message-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		color: #666;
	}

	.message-icon {
		font-size: 1rem;
	}

	.message-time {
		flex: 1;
	}

	.remove-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 1.2rem;
		color: #999;
	}

	.remove-btn:hover {
		background: rgba(0, 0, 0, 0.1);
		color: #666;
	}

	.message-content {
		font-size: 0.9rem;
		line-height: 1.4;
		color: #333;
	}

	/* Responsive */
	@media (max-width: 480px) {
		.message-board-panel {
			width: 100%;
		}
	}
</style>
