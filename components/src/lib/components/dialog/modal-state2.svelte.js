/* ---------------------------------- TEST ---------------------------------- */

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
