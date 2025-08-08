<script>
	import Modal from './Modal.svelte'
	import { openModal } from './modal-state.svelte.js'

	async function showModal() {
		const result = await openModal({
			title: 'Bestätigung',
			message: 'Möchten Sie fortfahren?'
		})
		console.log('Modal geschlossen mit:', result)
	}

	async function showUserModal() {
		const result = await openModal({
			type: 'user-form',
			user: { name: '', email: '' }
		})
		console.log('Benutzer-Modal geschlossen mit:', result)
	}
</script>

<main>
	<h1>Modal System mit $state()</h1>

	<button onclick={showModal}> Bestätigungs-Modal öffnen </button>

	<button onclick={showUserModal}> Benutzer-Modal öffnen </button>

	<Modal>
		{#snippet children({ payload, close })}
			<div class="modal-backdrop">
				<div class="modal">
					{#if payload.type === 'user-form'}
						<h2>Benutzer bearbeiten</h2>
						<form
							onsubmit={(e) => {
								e.preventDefault()
								const formData = new FormData(e.target)
								close({
									name: formData.get('name'),
									email: formData.get('email')
								})
							}}>
							<input
								name="name"
								placeholder="Name"
								value={payload.user?.name || ''}
								required />
							<input
								name="email"
								type="email"
								placeholder="E-Mail"
								value={payload.user?.email || ''}
								required />
							<div class="buttons">
								<button type="submit">Speichern</button>
								<button type="button" onclick={() => close(null)}>
									Abbrechen
								</button>
							</div>
						</form>
					{:else}
						<h2>{payload.title || 'Modal'}</h2>
						<p>{payload.message || 'Inhalt'}</p>
						<div class="buttons">
							<button onclick={() => close(true)}> Ja </button>
							<button onclick={() => close(false)}> Nein </button>
						</div>
					{/if}
				</div>
			</div>
		{/snippet}
	</Modal>
</main>

<style>
	main {
		padding: 2rem;
		font-family: Arial, sans-serif;
	}

	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background: #f5f5f5;
		cursor: pointer;
		border-radius: 4px;
	}

	button:hover {
		background: #e5e5e5;
	}

	:global(.modal-backdrop) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	:global(.modal) {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 90%;
	}

	:global(.modal h2) {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	:global(.modal input) {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	:global(.buttons) {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	:global(.buttons button) {
		margin: 0;
	}
</style>
