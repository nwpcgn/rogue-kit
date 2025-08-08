<script>
	import {
		isAudioEnabled,
		getVolume,
		setAudioEnabled,
		setVolume,
		testSound,
		areSoundsLoaded,
		initializeAudio,
		loadAudioSettings
	} from './audio-manager.svelte.js'

	let showSettings = $state(false)

	// Lade Einstellungen beim Start
	$effect(() => {
		loadAudioSettings()
		initializeAudio()
	})

	function handleVolumeChange(event) {
		const newVolume = parseFloat(event.target.value)
		setVolume(newVolume)
	}

	function toggleAudio() {
		setAudioEnabled(!isAudioEnabled())
	}
</script>

<div class="audio-settings">
	<button
		class="settings-toggle"
		onclick={() => (showSettings = !showSettings)}
		title="Audio-Einstellungen">
		🔊
	</button>

	{#if showSettings}
		<div class="settings-panel">
			<div class="settings-header">
				<h4>Audio-Einstellungen</h4>
				<button class="close-btn" onclick={() => (showSettings = false)}
					>×</button>
			</div>

			<div class="setting-item">
				<label class="setting-label">
					<input
						type="checkbox"
						checked={isAudioEnabled()}
						onchange={toggleAudio} />
					Audio-Benachrichtigungen aktivieren
				</label>
			</div>

			<div class="setting-item">
				<label class="setting-label">
					Lautstärke: {Math.round(getVolume() * 100)}%
				</label>
				<input
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={getVolume()}
					onchange={handleVolumeChange}
					disabled={!isAudioEnabled()}
					class="volume-slider" />
			</div>

			<div class="setting-item">
				<label class="setting-label">Sound-Tests:</label>
				<div class="test-buttons">
					<button
						onclick={() => testSound('success')}
						disabled={!isAudioEnabled() || !areSoundsLoaded()}
						class="test-btn success">
						✅ Success
					</button>
					<button
						onclick={() => testSound('error')}
						disabled={!isAudioEnabled() || !areSoundsLoaded()}
						class="test-btn error">
						❌ Error
					</button>
					<button
						onclick={() => testSound('warning')}
						disabled={!isAudioEnabled() || !areSoundsLoaded()}
						class="test-btn warning">
						⚠️ Warning
					</button>
					<button
						onclick={() => testSound('info')}
						disabled={!isAudioEnabled() || !areSoundsLoaded()}
						class="test-btn info">
						ℹ️ Info
					</button>
				</div>
			</div>

			{#if !areSoundsLoaded()}
				<div class="loading-indicator">
					<span>🔄 Lade Audio-System...</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.audio-settings {
		position: relative;
	}

	.settings-toggle {
		background: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		cursor: pointer;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.settings-toggle:hover {
		background: #e9ecef;
		transform: scale(1.05);
	}

	.settings-panel {
		position: absolute;
		top: 50px;
		right: 0;
		background: white;
		border: 1px solid #dee2e6;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		padding: 1rem;
		min-width: 300px;
		z-index: 1000;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.settings-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #e9ecef;
	}

	.settings-header h4 {
		margin: 0;
		font-size: 1rem;
		color: #333;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: #666;
	}

	.close-btn:hover {
		background: #f8f9fa;
		color: #333;
	}

	.setting-item {
		margin-bottom: 1rem;
	}

	.setting-label {
		display: block;
		font-size: 0.9rem;
		color: #555;
		margin-bottom: 0.5rem;
		cursor: pointer;
	}

	.setting-label input[type='checkbox'] {
		margin-right: 0.5rem;
	}

	.volume-slider {
		width: 100%;
		margin-top: 0.5rem;
	}

	.test-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.test-btn {
		padding: 0.5rem;
		border: 1px solid #dee2e6;
		background: white;
		cursor: pointer;
		border-radius: 4px;
		font-size: 0.8rem;
		transition: all 0.2s ease;
	}

	.test-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.test-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.test-btn.success:hover:not(:disabled) {
		background: #f8fff9;
		border-color: #28a745;
	}

	.test-btn.error:hover:not(:disabled) {
		background: #fff8f8;
		border-color: #dc3545;
	}

	.test-btn.warning:hover:not(:disabled) {
		background: #fffef8;
		border-color: #ffc107;
	}

	.test-btn.info:hover:not(:disabled) {
		background: #f8fcff;
		border-color: #17a2b8;
	}

	.loading-indicator {
		text-align: center;
		padding: 0.5rem;
		color: #666;
		font-size: 0.8rem;
		border-top: 1px solid #e9ecef;
		margin-top: 1rem;
		padding-top: 1rem;
	}
</style>
