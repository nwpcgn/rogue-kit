<script>
	// Neue $state() Version
	let todos = $state([])
	let filter = $state('all')

	function addTodo(text) {
		todos.push({
			id: Date.now(),
			text,
			completed: false
		})
	}

	function toggleTodo(id) {
		const todo = todos.find((item) => item.id === id)
		if (todo) {
			todo.completed = !todo.completed
		}
	}

	// Computed value mit $derived
	const filteredTodos = $derived(() => {
		if (filter === 'active') return todos.filter((todo) => !todo.completed)
		if (filter === 'completed') return todos.filter((todo) => todo.completed)
		return todos
	})
</script>

<div>
	<h2>Mit $state() (neu)</h2>
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
		<button onclick={() => (filter = 'all')}>Alle</button>
		<button onclick={() => (filter = 'active')}>Aktiv</button>
		<button onclick={() => (filter = 'completed')}>Erledigt</button>
	</div>

	<ul>
		{#each filteredTodos as todo}
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

	div {
		max-width: 400px;
		margin: 20px auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	input[type='text'] {
		width: 100%;
		padding: 8px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		margin-right: 5px;
		padding: 5px 10px;
		border: 1px solid #ccc;
		background: #f5f5f5;
		cursor: pointer;
		border-radius: 3px;
	}

	button:hover {
		background: #e5e5e5;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;
		padding: 5px 0;
		border-bottom: 1px solid #eee;
	}

	li input[type='checkbox'] {
		margin-right: 10px;
	}
</style>
