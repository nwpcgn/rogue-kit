<script>
	import MessageBoard from './MessageBoard.svelte'
	import MessageBoardToggle from './MessageBoardToggle.svelte'
	import {
		success,
		error,
		warning,
		info
	} from './message-board-state.svelte.js'

	function testMessages() {
		success('Erfolgreich gespeichert! 🎉')
		setTimeout(() => error('Ein Fehler ist aufgetreten! 💥'), 1000)
		setTimeout(() => warning('Warnung: Speicher fast voll! ⚠️'), 2000)
		setTimeout(() => info('Neue Version verfügbar! 📦'), 3000)
	}

	function addRandomMessage() {
		const messages = [
			{ content: 'Datei wurde erfolgreich hochgeladen', type: 'success' },
			{ content: 'Verbindung zum Server unterbrochen', type: 'error' },
			{ content: 'Neue Aktualisierung verfügbar', type: 'info' },
			{ content: 'Speicher bei 85% - Bitte aufräumen', type: 'warning' },
			{ content: 'Backup erfolgreich erstellt', type: 'success' },
			{ content: 'Login-Versuch fehlgeschlagen', type: 'error' },
			{ content: 'Neue Nachricht von Team erhalten', type: 'info' },
			{ content: 'Lizenz läuft in 7 Tagen ab', type: 'warning' }
		]

		const randomMsg = messages[Math.floor(Math.random() * messages.length)]

		switch (randomMsg.type) {
			case 'success':
				success(randomMsg.content)
				break
			case 'error':
				error(randomMsg.content)
				break
			case 'warning':
				warning(randomMsg.content)
				break
			case 'info':
				info(randomMsg.content)
				break
		}
	}

	function testSilentMessage() {
		info('Diese Nachricht ist stumm 🔇', 5000, false)
	}
</script>

<main>
	<h1>Message Board mit Audio-Benachrichtigungen</h1>

	<div class="demo-section">
		<h2>Demo Buttons</h2>
		<div class="button-group">
			<button onclick={() => success('Operation erfolgreich! 🎉')}>
				Success Message
			</button>

			<button onclick={() => error('Fehler beim Laden der Daten! 💥')}>
				Error Message
			</button>

			<button onclick={() => warning('Warnung: Ungespeicherte Änderungen! ⚠️')}>
				Warning Message
			</button>

			<button onclick={() => info('Info: Neue Features verfügbar! 📦')}>
				Info Message
			</button>
		</div>

		<div class="button-group">
			<button onclick={testMessages}> Test Sequence (4 Messages) </button>

			<button onclick={addRandomMessage}> Random Message </button>

			<button onclick={testSilentMessage}> Silent Message (kein Sound) </button>
		</div>
	</div>

	<div class="info-section">
		<h2>🔊 Audio-Features</h2>
		<ul>
			<li>✅ Verschiedene Sounds für jeden Nachrichtentyp</li>
			<li>✅ Einstellbarer Lautstärke-Regler (0-100%)</li>
			<li>✅ Audio ein/aus schalten</li>
			<li>✅ Sound-Test-Buttons für alle Typen</li>
			<li>✅ Web Audio API mit Fallback</li>
			<li>✅ Einstellungen werden gespeichert (localStorage)</li>
			<li>✅ Automatische Browser-Berechtigung</li>
			<li>✅ Option für stumme Nachrichten</li>
		</ul>

		<h3>🎵 Sound-Design</h3>
		<ul>
			<li><strong>Success:</strong> Aufsteigender, harmonischer Dreiklang</li>
			<li><strong>Error:</strong> Tieferer, warnender Doppelton</li>
			<li><strong>Warning:</strong> Mittlerer Ton mit Wiederholung</li>
			<li><strong>Info:</strong> Sanfter, neutraler Einzelton</li>
		</ul>
	</div>
</main>

Message Board Components
<MessageBoardToggle />
<MessageBoard />

<style>
	main {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		font-family: Arial, sans-serif;
	}

	.demo-section {
		margin: 2rem 0;
		padding: 1.5rem;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		background: #f8f9fa;
	}

	.button-group {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background: white;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	button:hover {
		background: #f0f0f0;
		transform: translateY(-1px);
	}

	.info-section {
		margin: 2rem 0;
		padding: 1.5rem;
		border: 1px solid #d1ecf1;
		border-radius: 8px;
		background: #f8fdff;
	}

	.info-section ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.info-section li {
		margin-bottom: 0.5rem;
	}

	h1,
	h2,
	h3 {
		color: #333;
	}
</style>
