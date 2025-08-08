<script module>
	let iconlist = $state({})

	export function getAll() {
		return iconlist
	}
</script>

<script>
	import { sleep } from '../index'
	import DunIcon from './_rpg-img.svelte'
	import RpgIcon from './_game-icon.svelte'
	import { onMount } from 'svelte'
	let Icons = $state()
	let Imgs = $state()

	const getIds = (sprite) => {
		const symbols = sprite.querySelectorAll('symbol')
		let list = new Set()
		symbols.forEach((symbol) => {
			var path = symbol.querySelectorAll('path')
			list.add(symbol.id)
		})

		if (list.size) {
			console.log('loisfhjk', list.size)
			const arr = Array.from(list)
			return arr
		}
	}

	onMount(async () => {
		let icon = getIds(Icons)
		let imgs = getIds(Imgs)

		iconlist = { icon, imgs }
	})
</script>

<RpgIcon bind:sprite={Icons}></RpgIcon>
<DunIcon bind:sprite={Imgs}></DunIcon>
