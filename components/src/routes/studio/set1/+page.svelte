<script>
	import Modal from '$lib/components/modal.svelte'

	let showModal = $state(false)
	let showConfirmModal = $state(false)
	let showLargeModal = $state(false)

	function handleModalClose() {
		console.log('Modal wurde geschlossen')
	}

	function confirmAction() {
		alert('Aktion bestätigt!')
		showConfirmModal = false
	}
</script>

<main class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-3xl font-bold text-gray-900">Modal Komponente Demo</h1>
		<p>showModal: {showModal}</p>
		<div class="space-y-4">
			<button
				class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				onclick={() => (showModal = true)}>
				Einfaches Modal öffnen
			</button>

			<button
				class="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
				onclick={() => (showConfirmModal = true)}>
				Bestätigungs-Modal öffnen
			</button>

			<button
				class="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
				onclick={() => (showLargeModal = true)}>
				Großes Modal öffnen
			</button>
		</div>
	</div>
</main>

<!-- Einfaches Modal -->
<Modal bind:open={showModal} title="Einfaches Modal" onclose={handleModalClose}>
	{#snippet children()}
		<div class="space-y-4">
			<p class="text-gray-600">
				Dies ist ein einfaches Modal mit einer schönen Animation. Es gleitet von
				oben herab und skaliert dabei sanft ein.
			</p>
			<p class="text-gray-600">
				Du kannst es schließen, indem du auf das X klickst, die Escape-Taste
				drückst oder außerhalb des Modals klickst.
			</p>
			<div class="flex justify-end">
				<button
					class="rounded bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
					onclick={() => (showModal = false)}>
					Schließen
				</button>
			</div>
		</div>
	{/snippet}
</Modal>

<!-- Bestätigungs-Modal -->
<Modal
	bind:open={showConfirmModal}
	title="Aktion bestätigen"
	size="sm"
	closeOnBackdrop={false}>
	{#snippet children()}
		<div class="space-y-4">
			<p class="text-gray-600">
				Bist du sicher, dass du diese Aktion ausführen möchtest? Diese Aktion
				kann nicht rückgängig gemacht werden.
			</p>
			<div class="flex justify-end space-x-3">
				<button
					class="rounded bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
					onclick={() => (showConfirmModal = false)}>
					Abbrechen
				</button>
				<button
					class="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					onclick={confirmAction}>
					Bestätigen
				</button>
			</div>
		</div>
	{/snippet}
</Modal>

<!-- Großes Modal -->
<Modal
	bind:open={showLargeModal}
	title="Großes Modal mit viel Inhalt"
	size="2xl">
	{#snippet children()}
		<div class="space-y-6">
			<div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Überschrift 1</h3>
				<p class="mb-4 text-gray-600">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris.
				</p>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">Überschrift 2</h3>
				<p class="mb-4 text-gray-600">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est
					laborum.
				</p>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold text-gray-900">
					Formular Beispiel
				</h3>
				<form class="space-y-4">
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							placeholder="Dein Name" />
					</div>
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-700">
							E-Mail
						</label>
						<input
							type="email"
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							placeholder="deine@email.de" />
					</div>
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-700">
							Nachricht
						</label>
						<textarea
							rows="4"
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							placeholder="Deine Nachricht..."></textarea>
					</div>
				</form>
			</div>

			<div class="flex justify-end space-x-3 border-t border-gray-200 pt-4">
				<button
					class="rounded bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
					onclick={() => (showLargeModal = false)}>
					Abbrechen
				</button>
				<button
					class="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					onclick={() => (showLargeModal = false)}>
					Speichern
				</button>
			</div>
		</div>
	{/snippet}
</Modal>
