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

<section class="nwp page">
	<div class="content space-y-4">
		<header>
			<h2 class="text-center lg:text-3xl">Heading 2</h2>
		</header>
		<div class="is-rounded nes-container with-title">
			<p class="title">Landing</p>
			<p>Good morning. Thou hast had a good night's sleep, I hope.</p>
		</div>
		<div class="is-dark is-rounded nes-container">
			<p>Good morning. Thou hast had a good night's sleep, I hope.</p>
		</div>
		<div class="nes-container">
			<nav class="nav-bar">
				<a class="nes-btn" href="#">Normal</a>
				<button type="button" class="nes-btn is-primary">Primary</button>
				<button type="button" class="nes-btn is-success">Success</button>
				<button type="button" class="nes-btn is-warning">Warning</button>
				<button type="button" class="nes-btn is-error">Error</button>
			</nav>
		</div>
		<div class="nes-container">
			<span class="nes-text is-primary">Primary</span><span
				class="nes-text is-success">Success</span
			><span class="nes-text is-warning">Warning</span><span
				class="nes-text is-error">Error</span
			><span class="nes-text is-disabled">Disabled</span>
		</div>
		<!-- 		<div class="nes-container">
			<section>
				<button
					type="button"
					class="nes-btn is-primary"
					onclick="dialog1.showModal()">
					Open dialog
				</button>
				<dialog class="nes-dialog" id="dialog1">
					<form method="dialog">
						<p class="title">Dialog</p>
						<img src="https://pinegrow.com/placeholders/img16.jpg" />
						<p>Alert: this is a dialog.</p>
						<menu class="dialog-menu">
							<button class="nes-btn">Cancel</button>
							<button class="nes-btn is-primary">Confirm</button>
						</menu>
					</form>
				</dialog>
			</section>
		</div> -->
		<div class="nes-container">
			<div class="nes-field">
				<label for="name_field">Your name</label>
				<input type="text" id="name_field" class="nes-input" />
			</div>
			<label for="textarea_field">Textarea</label>
			<textarea id="textarea_field" class="nes-textarea"></textarea>
			<div
				style="background-color:#212529; padding: 1rem 1.2rem 1rem 1rem;width:calc(100% + 8px)">
				<label for="dark_select" style="color:#fff">nes-select.is-dark</label>
				<div class="nes-select is-dark">
					<select required id="dark_select">
						<option value="" disabled selected hidden>Select...</option>
						<option value="0">To be</option>
						<option value="1">Not to be</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</section>
