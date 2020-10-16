import { useState, useEffect } from 'react'

const SCHEME_PREFS = {
	UNSUPPORTED: 0,
	NO_PREFERENCE: 1,
	DARK: 2,
	LIGHT: 3
}
const MOTION_PREFS = {
	UNSUPPORTED: 0,
	NO_PREFERENCE: 1,
	REDUCE: 2
}

const usePrefersMode = () => {
	const [prefs, setPrefs] = useState({
		colorScheme: SCHEME_PREFS.LIGHT,
		reducedMotion: MOTION_PREFS.NO_PREFERENCE
	})

	function handleLightSchemeChange(event) {
		if (event.matches) {
			setPrefs({ ...prefs, colorScheme: SCHEME_PREFS.LIGHT })
		} else {
			setPrefs({ ...prefs, colorScheme: SCHEME_PREFS.DARK })
		}
	}

	function handleReducedMotionChange(event) {
		if (event.matches) {
			setPrefs({ ...prefs, reducedMotion: MOTION_PREFS.REDUCE })
		} else {
			setPrefs({ ...prefs, reducedMotion: MOTION_PREFS.NO_PREFERENCE })
		}
	}

	useEffect(() => {
		const isNoPrefScheme = window.matchMedia(
			'(prefers-color-scheme: no-preference)'
		)
		const isLightScheme = window.matchMedia('(prefers-color-scheme: light)')
		const isDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
		const isUnsuppScheme =
			!isDarkScheme.matches && !isLightScheme.matches && !isNoPrefScheme.matches
		const isNoPrefMotion = window.matchMedia(
			'(prefers-reduced-motion: no-preference)'
		)
		const isReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		)
		const isUnsuppMotion = !isNoPrefMotion.matches && !isReducedMotion.matches

		let colorScheme = SCHEME_PREFS.NO_PREFERENCE
		let reducedMotion = MOTION_PREFS.NO_PREFERENCE
		if (!isUnsuppScheme) {
			if (isLightScheme.matches) {
				colorScheme = SCHEME_PREFS.LIGHT
			} else if (isDarkScheme.matches) {
				colorScheme = SCHEME_PREFS.DARK
			}
		} else {
			colorScheme = SCHEME_PREFS.UNSUPPORTED
		}
		if (!isUnsuppMotion) {
			if (isReducedMotion.matches) {
				reducedMotion = MOTION_PREFS.REDUCE
			}
		} else {
			reducedMotion = MOTION_PREFS.UNSUPPORTED
		}

		setPrefs({
			colorScheme,
			reducedMotion
		})
		isLightScheme.addEventListener('change', handleLightSchemeChange)
		isReducedMotion.addEventListener('change', handleReducedMotionChange)

		return () => {
			isLightScheme.removeEventListener('change', handleLightSchemeChange)
			isReducedMotion.removeEventListener('change', handleReducedMotionChange)
		}
	}, [])

	return prefs
}

export default usePrefersMode
export { SCHEME_PREFS, MOTION_PREFS }
