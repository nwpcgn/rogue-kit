<script>
	import { tick } from 'svelte'

	let {
		open = $bindable(false),
		title = '',
		children,
		onclose = () => {},
		closeOnBackdrop = true,
		closeOnEscape = true,
		size = 'md'
	} = $props()

	let dialog = $state()
	let isAnimating = $state(false)

	// Size variants
	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		full: 'max-w-full mx-4'
	}

	// Watch for open state changes
	$effect(() => {
		if (open && dialog) {
			showModal()
		} else if (!open && dialog) {
			hideModal()
		}
	})

	async function showModal() {
		if (!dialog) return

		isAnimating = true
		dialog.showModal()

		// Trigger animation after dialog is shown
		await tick()
		dialog.classList.add('modal-open')

		// Animation duration should match CSS transition
		setTimeout(() => {
			isAnimating = false
		}, 300)
	}

	async function hideModal() {
		if (!dialog) return

		isAnimating = true
		dialog.classList.remove('modal-open')

		// Wait for animation to complete before closing
		setTimeout(() => {
			dialog.close()
			isAnimating = false
		}, 300)
	}

	function handleClose() {
		open = false
		onclose()
	}

	function handleBackdropClick(event) {
		if (!closeOnBackdrop) return

		// Only close if clicking on the dialog itself (backdrop)
		if (event.target === dialog) {
			handleClose()
		}
	}

	function handleKeydown(event) {
		if (!closeOnEscape) return

		if (event.key === 'Escape') {
			event.preventDefault()
			handleClose()
		}
	}
</script>

<dialog
	bind:this={dialog}
	class="modal backdrop:bg-black/50 backdrop:backdrop-blur-sm"
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}>
	<div class="modal-content {sizeClasses[size]}">
		<div class="modal-header">
			{#if title}
				<h2 class="modal-title">{title}</h2>
			{/if}
			<button
				type="button"
				class="modal-close-btn"
				onclick={handleClose}
				aria-label="Modal schließen">
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="modal-body">
			{@render children()}
		</div>
	</div>
</dialog>
