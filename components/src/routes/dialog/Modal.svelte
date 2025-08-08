<script>
	import { isOpen, getPayload, closeModal } from './modal-state.svelte.js'

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
