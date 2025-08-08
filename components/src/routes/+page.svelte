<script>
	import { getAll } from '$lib/assets/sprites.svelte'
	import { openModal } from '$lib/components/dialog/Modal.svelte'
	import { openModalV2 } from '$lib/components/dialog/ModalV2.svelte'
	const showList = () => {
		console.log('show')
		console.log(getAll())
	}

	const open = () => {
		openModalV2(demo, { title: 'Modal-V2' }).then((payload) =>
			openModal('Callback 2 ')
		)
	}
</script>

<section class="active page nwp">
	<article class="article">
		<div class="content">
			<section class="nes-container is-dark with-title">
				<p class="title">Container</p>
				<p>Good morning. Thou hast had a good night's sleep, I hope.</p>
			</section>

			<section class="nes-container is-dark with-title is-rounded">
				<p class="title">Container</p>
				<div>
					<button
						class="nes-btn is-primary"
						onclick={() => openModal('Rabbit =')}>Modal 1</button>
					<button class="nes-btn is-primary" onclick={open}>Modal 2</button>
				</div>
			</section>
			<section class="nes-container with-title">
				<p class="title">Container</p>
				<div>
					<button
						class="nes-btn is-primary"
						onclick={() => openModal('Rabbit =')}>Modal 1</button>
					<button class="nes-btn is-primary" onclick={open}>Modal 2</button>
					<a href="#/dialog" class="nes-btn">Msg 1</a>
					<a href="#/dialog2" class="nes-btn">Msg 2</a>
					<a href="#/msg" class="nes-btn">Msg 3</a>
				</div>
			</section>
		</div>
	</article>
	<aside class="aside bg-teal-800 text-teal-100"></aside>
	<aside class="panel bg-sky-800 text-sky-100">
		<!-- <kbd>panel</kbd> -->
	</aside>
</section>

{#snippet demo({ payload, close })}
	<section class="fixed inset-0 z-40 p-4 grid place-content-center bg-black/80">
		<div class="nes-container">
			<div>
				<button onclick={close}>&times;</button>
				<span>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
					amet error eveniet minus, maxime libero similique voluptates incidunt
					ullam magnam dolore aspernatur assumenda beatae eos dolores, aliquid
					iusto ducimus culpa.
				</span>
			</div>
		</div>
	</section>
{/snippet}
