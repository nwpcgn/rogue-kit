// Message Board State mit Audio-Integration
import {
	playNotificationSound,
	requestAudioPermission
} from './audio-manager.svelte.js'

let messages = $state([])
let isOpen = $state(false)
let nextId = 1

export const addMessage = async (
	content,
	type = 'info',
	duration = 5000,
	playSound = true
) => {
	const message = {
		id: nextId++,
		content,
		type, // 'success', 'error', 'warning', 'info'
		timestamp: new Date(),
		duration
	}

	// Neue Nachricht am Anfang hinzufügen
	messages.unshift(message)

	// Nur die letzten 10 Nachrichten behalten
	if (messages.length > 10) {
		messages = messages.slice(0, 10)
	}

	// Panel automatisch öffnen wenn neue Nachricht
	if (!isOpen) {
		isOpen = true
	}

	// Audio-Benachrichtigung abspielen
	if (playSound) {
		// Stelle sicher, dass Audio-Kontext aktiviert ist
		await requestAudioPermission()
		await playNotificationSound(type)
	}

	// Auto-dismiss nach duration (falls > 0)
	if (duration > 0) {
		setTimeout(() => {
			removeMessage(message.id)
		}, duration)
	}

	return message.id
}

export const removeMessage = (id) => {
	const index = messages.findIndex((msg) => msg.id === id)
	if (index > -1) {
		messages.splice(index, 1)
	}
}

export const clearMessages = () => {
	messages.length = 0
}

export const togglePanel = () => {
	isOpen = !isOpen
}

export const openPanel = () => {
	isOpen = true
}

export const closePanel = () => {
	isOpen = false
}

// Getter-Funktionen für reaktiven Zugriff
export const getMessages = () => messages
export const isPanelOpen = () => isOpen
export const getMessageCount = () => messages.length

// Convenience-Funktionen für verschiedene Nachrichtentypen
export const success = (content, duration, playSound) =>
	addMessage(content, 'success', duration, playSound)
export const error = (content, duration, playSound) =>
	addMessage(content, 'error', duration, playSound)
export const warning = (content, duration, playSound) =>
	addMessage(content, 'warning', duration, playSound)
export const info = (content, duration, playSound) =>
	addMessage(content, 'info', duration, playSound)
