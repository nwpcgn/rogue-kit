<script module>
	// import { isOpenV2, getPayloadV2, closeModalV2 } from './modal-state2.svelte.js'
	let _open = $state(false)
	let _payload = $state({})
	let _closePromise

	export const openModalV2 = (component, props = {}) => {
		_open = true
		_payload = { component, props }
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeModalV2 = (response) => {
		_open = false
		if (typeof _closePromise === 'function') {
			_closePromise(response ?? _payload)
		}
	}

	// Getter-Funktionen für reaktiven Zugriff
	export const isOpenV2 = () => _open
	export const getPayloadV2 = () => _payload
</script>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet<[any]>} [children]
	 */
	/** @type {Props} */
	let { children } = $props()
</script>

{#if isOpenV2()}
	{@render getPayloadV2().component?.({
		...getPayloadV2().props,
		close: closeModalV2
	})}
{/if}

<!-- 
<script module>
	import { get, writable } from 'svelte/store'

	let _open = writable(false)
	let _payload = writable({ component: undefined, props: {} })

	let _closePromise

	export const openModalV2 = (component, props = {}) => {
		_open.set(true)
		_payload.set({ component, props })
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeModalV2 = (response) => {
		_open.set(false)
		if (typeof _closePromise === 'function') {
			_closePromise(response ?? get(_payload))
		}
	}
</script>

<script></script>

{#if $_open}
	{@const SvelteComponent = $_payload.component}
	<SvelteComponent {...$_payload.props} close={closeModalV2} />
{/if}
 -->
