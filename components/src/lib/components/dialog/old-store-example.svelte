<script>
	// Alte Store-Version
	import { writable } from 'svelte/store'

	const todos = writable([])
	const filter = writable('all')

	function addTodo(text) {
		todos.update((items) => [
			...items,
			{
				id: Date.now(),
				text,
				completed: false
			}
		])
	}

	function toggleTodo(id) {
		todos.update((items) =>
			items.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		)
	}
</script>

<div>
	<h2>Mit Svelte Stores (alt)</h2>
	<input
		type="text"
		placeholder="Neue Aufgabe..."
		onkeydown={(e) => {
			if (e.key === 'Enter' && e.target.value.trim()) {
				addTodo(e.target.value.trim())
				e.target.value = ''
			}
		}} />

	<div>
		<button onclick={() => filter.set('all')}>Alle</button>
		<button onclick={() => filter.set('active')}>Aktiv</button>
		<button onclick={() => filter.set('completed')}>Erledigt</button>
	</div>

	<ul>
		{#each $todos.filter((todo) => {
			if ($filter === 'active') return !todo.completed
			if ($filter === 'completed') return todo.completed
			return true
		}) as todo}
			<li>
				<input
					type="checkbox"
					checked={todo.completed}
					onchange={() => toggleTodo(todo.id)} />
				<span class:completed={todo.completed}>{todo.text}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.completed {
		text-decoration: line-through;
		opacity: 0.6;
	}
</style>
