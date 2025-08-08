// place files you want to import through the `$lib` alias in this folder.
//@index('./*x*/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

//@endindex



//@index('./utils/x*.js', (f, _) => `export { default as ${f.name} } from '${f.path}'`)

//@endindex
export { default as randNum } from './utils/randNum'
export { default as shuffle } from './utils/shuffle'
export { default as sleep } from './utils/sleep'
export { default as uuid } from './utils/uuid'
export const nav = [
	{
		slug: 'start',
		name: 'Lobby',
		icon: 'rpg-lobby',
		title: 'Dungerue Manner',
		type: 'view'
	},
	{
		slug: 'map',
		name: 'Region',
		icon: 'rpg-map',
		title: 'Dungeon Map',
		type: 'view'
	},
	{
		slug: 'arena',
		name: 'Arena',
		icon: 'rpg-arena',
		title: 'Battleground',
		type: 'view'
	},
	{
		slug: 'settings',
		name: 'Settings',
		icon: 'rpg-settings',
		title: 'Death Screen',
		type: 'view'
	}
]
