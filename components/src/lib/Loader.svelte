<script lang="ts">
</script>

<div class="bg-neutral fixed inset-0 z-40 grid place-content-center">
	<div class="loader loader3">
		<div>
			<div>
				<div>
					<div>
						<div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--col-base: var(--color-primary);
		--col-sec: var(--color-base-100);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes rotate2 {
		0% {
			transform: rotate(0deg);
			border-top-color: var(--col-base);
		}
		50% {
			transform: rotate(180deg);
			border-top-color: var(--col-sec);
		}
		100% {
			transform: rotate(360deg);
			border-top-color: var(--col-base);
		}
	}
	.loader {
		position: relative;
		margin: 75px auto;
		width: 150px;
		height: 150px;
		display: block;
		overflow: hidden;
	}
	.loader div {
		height: 100%;
	}

	.loader3,
	.loader3 div {
		border-radius: 50%;
		padding: 8px;
		border: 2px solid transparent;
		-webkit-animation: rotate linear 3.5s infinite;
		animation: rotate linear 3.5s infinite;
		border-top-color: var(--col-base);
		border-left-color: var(--col-sec);
		-webkit-animation-timing-function: cubic-bezier(0.55, 0.38, 0.21, 0.88);
		animation-timing-function: cubic-bezier(0.55, 0.38, 0.21, 0.88);
		-webkit-animation-duration: 3s;
		animation-duration: 3s;
	}

	div:hover {
		-webkit-animation-play-state: paused;
		animation-play-state: paused;
	}

	.loader,
	.loader * {
		will-change: transform;
	}
</style>
