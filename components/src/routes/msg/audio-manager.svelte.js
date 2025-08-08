// Audio Manager für Benachrichtigungssounds
let audioEnabled = $state(true)
let volume = $state(0.7)
let soundsLoaded = $state(false)

// Audio-Objekte für verschiedene Nachrichtentypen
const audioSources = {
	success: '/success-sound-wave.png',
	error: '/error-sound-wave.png',
	warning: '/warning-sound-wave.png',
	info: '/info-sound-wave.png'
}

// Erstelle Audio-Objekte mit Web Audio API für bessere Kontrolle
let audioContext
let audioBuffers = {}

// Fallback: Einfache Audio-Objekte für Browser ohne Web Audio API
const simpleAudioObjects = {}

// Initialisierung der Audio-Systeme
export const initializeAudio = async () => {
	try {
		// Versuche Web Audio API zu verwenden
		audioContext = new (window.AudioContext || window.webkitAudioContext)()
		await loadAudioBuffers()
	} catch (error) {
		console.warn('Web Audio API nicht verfügbar, verwende fallback:', error)
		initializeSimpleAudio()
	}
	soundsLoaded = true
}

// Lade Audio-Buffers für Web Audio API
const loadAudioBuffers = async () => {
	// Da wir keine echten Audio-Dateien haben, simulieren wir verschiedene Töne
	const sampleRate = audioContext.sampleRate

	// Success: Angenehmer aufsteigender Ton
	audioBuffers.success = createToneBuffer(
		audioContext,
		[523.25, 659.25, 783.99],
		0.3,
		sampleRate
	)

	// Error: Tieferer, warnender Ton
	audioBuffers.error = createToneBuffer(
		audioContext,
		[220, 196],
		0.5,
		sampleRate
	)

	// Warning: Mittlerer Ton mit Wiederholung
	audioBuffers.warning = createToneBuffer(
		audioContext,
		[440, 440],
		0.4,
		sampleRate
	)

	// Info: Sanfter, neutraler Ton
	audioBuffers.info = createToneBuffer(audioContext, [349.23], 0.3, sampleRate)
}

// Erstelle Ton-Buffer für Web Audio API
const createToneBuffer = (context, frequencies, duration, sampleRate) => {
	const buffer = context.createBuffer(1, duration * sampleRate, sampleRate)
	const data = buffer.getChannelData(0)

	for (let i = 0; i < data.length; i++) {
		let sample = 0
		const time = i / sampleRate

		frequencies.forEach((freq, index) => {
			const envelope = Math.exp(-time * 3) // Fade out
			const noteStart = (duration / frequencies.length) * index
			const noteEnd = (duration / frequencies.length) * (index + 1)

			if (time >= noteStart && time < noteEnd) {
				sample +=
					Math.sin(2 * Math.PI * freq * (time - noteStart)) * envelope * 0.3
			}
		})

		data[i] = sample * volume
	}

	return buffer
}

// Fallback: Einfache Audio-Objekte
const initializeSimpleAudio = () => {
	// Erstelle einfache Beep-Sounds mit Data URLs
	const createBeepDataUrl = (frequency, duration) => {
		const sampleRate = 8000
		const samples = duration * sampleRate
		const buffer = new ArrayBuffer(44 + samples * 2)
		const view = new DataView(buffer)

		// WAV Header
		const writeString = (offset, string) => {
			for (let i = 0; i < string.length; i++) {
				view.setUint8(offset + i, string.charCodeAt(i))
			}
		}

		writeString(0, 'RIFF')
		view.setUint32(4, 36 + samples * 2, true)
		writeString(8, 'WAVE')
		writeString(12, 'fmt ')
		view.setUint32(16, 16, true)
		view.setUint16(20, 1, true)
		view.setUint16(22, 1, true)
		view.setUint32(24, sampleRate, true)
		view.setUint32(28, sampleRate * 2, true)
		view.setUint16(32, 2, true)
		view.setUint16(34, 16, true)
		writeString(36, 'data')
		view.setUint32(40, samples * 2, true)

		// Audio-Daten
		for (let i = 0; i < samples; i++) {
			const sample =
				Math.sin((2 * Math.PI * frequency * i) / sampleRate) *
				0.3 *
				Math.exp((-i / samples) * 3)
			view.setInt16(44 + i * 2, sample * 32767, true)
		}

		const blob = new Blob([buffer], { type: 'audio/wav' })
		return URL.createObjectURL(blob)
	}

	simpleAudioObjects.success = new Audio(createBeepDataUrl(523.25, 0.3))
	simpleAudioObjects.error = new Audio(createBeepDataUrl(220, 0.5))
	simpleAudioObjects.warning = new Audio(createBeepDataUrl(440, 0.4))
	simpleAudioObjects.info = new Audio(createBeepDataUrl(349.23, 0.3))

	// Setze Lautstärke
	Object.values(simpleAudioObjects).forEach((audio) => {
		audio.volume = volume
	})
}

// Spiele Sound ab
export const playNotificationSound = async (type = 'info') => {
	if (!audioEnabled || !soundsLoaded) return

	try {
		if (audioContext && audioBuffers[type]) {
			// Web Audio API
			const source = audioContext.createBufferSource()
			const gainNode = audioContext.createGain()

			source.buffer = audioBuffers[type]
			gainNode.gain.value = volume

			source.connect(gainNode)
			gainNode.connect(audioContext.destination)

			source.start()
		} else if (simpleAudioObjects[type]) {
			// Fallback
			const audio = simpleAudioObjects[type].cloneNode()
			audio.volume = volume
			await audio.play()
		}
	} catch (error) {
		console.warn('Fehler beim Abspielen des Sounds:', error)
	}
}

// Audio-Einstellungen
export const setAudioEnabled = (enabled) => {
	audioEnabled = enabled
	// Speichere Einstellung im localStorage
	localStorage.setItem('messageBoard_audioEnabled', enabled.toString())
}

export const setVolume = (newVolume) => {
	volume = Math.max(0, Math.min(1, newVolume))

	// Update Web Audio API buffers
	if (audioContext) {
		// Buffers müssen neu erstellt werden für neue Lautstärke
		loadAudioBuffers()
	}

	// Update simple audio objects
	Object.values(simpleAudioObjects).forEach((audio) => {
		audio.volume = volume
	})

	// Speichere Einstellung im localStorage
	localStorage.setItem('messageBoard_volume', volume.toString())
}

export const testSound = (type = 'info') => {
	playNotificationSound(type)
}

// Lade Einstellungen aus localStorage
export const loadAudioSettings = () => {
	const savedAudioEnabled = localStorage.getItem('messageBoard_audioEnabled')
	const savedVolume = localStorage.getItem('messageBoard_volume')

	if (savedAudioEnabled !== null) {
		audioEnabled = savedAudioEnabled === 'true'
	}

	if (savedVolume !== null) {
		volume = parseFloat(savedVolume)
	}
}

// Getter-Funktionen
export const isAudioEnabled = () => audioEnabled
export const getVolume = () => volume
export const areSoundsLoaded = () => soundsLoaded

// Browser-Berechtigung für Audio (für moderne Browser)
export const requestAudioPermission = async () => {
	if (audioContext && audioContext.state === 'suspended') {
		try {
			await audioContext.resume()
			return true
		} catch (error) {
			console.warn('Audio-Kontext konnte nicht aktiviert werden:', error)
			return false
		}
	}
	return true
}
