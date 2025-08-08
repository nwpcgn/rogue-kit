<script module>
	import { get, writable } from 'svelte/store'

	const _open = writable(false)
	const _payload = writable({})

	let _closePromise

	export const openModal = (payload) => {
		_open.set(true)
		_payload.set(payload)
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeModal = () => {
		_open.set(false)
		if (typeof _closePromise === 'function') {
			_closePromise(get(_payload))
		}
	}
</script>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet<[any]>} [children]
	 */

	/** @type {Props} */
	let { children } = $props()
</script>

{#if $_open}
	{@render children?.({ payload: $_payload, close: closeModal })}
{/if}
