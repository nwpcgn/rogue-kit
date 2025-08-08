<script module>
	// Geteilter Modal-State mit $state()
	let _open = $state(false)
	let _payload = $state({})
	let _closePromise

	export const openModal = (payload) => {
		_open = true
		_payload = payload
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeModal = () => {
		_open = false
		if (typeof _closePromise === 'function') {
			_closePromise(_payload)
		}
	}

	// Getter-Funktionen für reaktiven Zugriff
	export const isOpen = () => _open
	export const getPayload = () => _payload
</script>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet<[any]>} [children]
	 */
	/** @type {Props} */
	let { children } = $props()
</script>

{#if isOpen()}
	{@render children?.({ payload: getPayload(), close: closeModal })}
{/if}
