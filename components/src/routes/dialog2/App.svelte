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
		success('Erfolgreich gespeichert!')
		setTimeout(() => error('Ein Fehler ist aufgetreten'), 1000)
		setTimeout(() => warning('Warnung: Speicher fast voll'), 2000)
		setTimeout(() => info('Neue Version verfügbar'), 3000)
	}

	function addRandomMessage() {
		const messages = [
			{ content: 'Datei wurde hochgeladen', type: 'success' },
			{ content: 'Verbindung unterbrochen', type: 'error' },
			{ content: 'Aktualisierung verfügbar', type: 'info' },
			{ content: 'Speicher bei 80%', type: 'warning' },
			{ content: 'Backup erstellt', type: 'success' },
			{ content: 'Login fehlgeschlagen', type: 'error' },
			{ content: 'Neue Nachricht erhalten', type: 'info' },
			{ content: 'Lizenz läuft ab', type: 'warning' }
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
</script>

<main>
	<h1>Message Board System</h1>

	<div class="demo-section">
		<h2>Demo Buttons</h2>
		<div class="button-group">
			<button onclick={() => success('Operation erfolgreich!')}>
				Success Message
			</button>

			<button onclick={() => error('Fehler beim Laden der Daten')}>
				Error Message
			</button>

			<button onclick={() => warning('Warnung: Ungespeicherte Änderungen')}>
				Warning Message
			</button>

			<button onclick={() => info('Info: Neue Features verfügbar')}>
				Info Message
			</button>
		</div>

		<div class="button-group">
			<button onclick={testMessages}> Test Sequence (4 Messages) </button>

			<button onclick={addRandomMessage}> Random Message </button>
		</div>
	</div>

	<div class="info-section">
		<h2>Features</h2>
		<ul>
			<li>✅ Nur die letzten 10 Nachrichten werden angezeigt</li>
			<li>✅ Automatisches Schließen nach 5 Sekunden (konfigurierbar)</li>
			<li>✅ Verschiedene Nachrichtentypen (Success, Error, Warning, Info)</li>
			<li>✅ Seitliches Panel mit Slide-Animation</li>
			<li>✅ Individuelle Nachrichten löschen</li>
			<li>✅ Alle Nachrichten auf einmal löschen</li>
			<li>✅ Responsive Design</li>
			<li>✅ Badge mit Anzahl der Nachrichten</li>
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
		transition: background-color 0.2s;
	}

	button:hover {
		background: #f0f0f0;
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
	h2 {
		color: #333;
	}
</style>
