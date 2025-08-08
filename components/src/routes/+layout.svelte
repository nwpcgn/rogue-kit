<script lang="ts">
	import '../app.css'
	import Sprites from '$lib/assets/sprites.svelte'
	import Modal from '$lib/components/dialog/Modal.svelte'
	import ModalV2 from '$lib/components/dialog/ModalV2.svelte'
	let isAuth = $state(false)
	let { children } = $props()
</script>

<div class="wrapper sky nes">
	<main class="animated main">
		{@render children?.()}
	</main>
	<footer>tab</footer>
	<Modal>
		{#snippet children({ payload, close })}
			<section class="fixed inset-0 z-40 grid place-content-center bg-black/80">
				<div class="nes-container nes-form">
					<div>
						<button onclick={close}>&times;</button>
						<span>{payload}</span>
					</div>
				</div>
			</section>
		{/snippet}
	</Modal>
	<ModalV2></ModalV2>
</div>

<Sprites></Sprites>
<!-- <header>top</header>
	<footer class="foo"></footer>
	<header class="bar"></header>
	<aside class="sb1"></aside>
	<aside class="sb2"></aside> -->
