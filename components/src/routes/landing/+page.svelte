<script>
	import { getAll } from '$lib/assets/sprites.svelte'

	const showList = () => {
		console.log('show')
		console.log(getAll())
	}
</script>

<section class="center page full">
	<div class="nes-container nes-form">
		<div class="nes-field">
			<label>Email</label>
			<input type="email" class="nes-input" />
		</div>
		<div class="nes-field">
			<label>Password</label>
			<input type="password" class="nes-input" />
		</div>
		<nav></nav>
		<button class="is-primary nes-btn" onclick={showList}>Signin</button>
	</div>
</section>
