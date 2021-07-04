import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'

import { SCHEME_PREFS, MOTION_PREFS, CONTRAST_PREFS } from './schemas'

type IPrefersMode = {
	colorScheme: number
	reducedMotion: number
	contrast: number
}

interface usePrefersProps {
	prefs: IPrefersMode
	setPrefs: Function
}

interface IPrefersProviderProps {}

export const getDefaultPrefs = () => {
	return {
		colorScheme: SCHEME_PREFS.LIGHT,
		reducedMotion: MOTION_PREFS.NO_PREFERENCE,
		contrast: CONTRAST_PREFS.NO_PREFERENCE
	}
}

const PrefersContext = createContext<usePrefersProps>({
	prefs: getDefaultPrefs(),
	setPrefs: () => {}
})

const usePrefers = () => {
	useContext(PrefersContext)
}

const PrefersProvider: React.FC<IPrefersProviderProps> = () => {
	const [prefs, setPrefs] = useState(getDefaultPrefs())
	const [overrides, setOverrides] = useState({
		colorScheme: null,
		reducedMotion: null,
		contrast: null
	})

	const handleLightSchemeChange = useCallback(
		(event: MediaQueryListEvent) => {
			if (overrides.colorScheme === null) {
				if (event.matches) {
					setPrefs({ ...prefs, colorScheme: SCHEME_PREFS.LIGHT })
				} else {
					setPrefs({ ...prefs, colorScheme: SCHEME_PREFS.DARK })
				}
			}
		},
		[overrides]
	)

	const handleReducedMotionChange = useCallback(
		(event: MediaQueryListEvent) => {
			if (overrides.reducedMotion === null) {
				if (event.matches) {
					setPrefs({ ...prefs, reducedMotion: MOTION_PREFS.REDUCE })
				} else {
					setPrefs({ ...prefs, reducedMotion: MOTION_PREFS.NO_PREFERENCE })
				}
			}
		},
		[overrides]
	)

	const handleContrastChange = useCallback(
		(event: MediaQueryListEvent) => {
			if (overrides.contrast === null) {
				if (event.matches) {
					setPrefs({ ...prefs, contrast: CONTRAST_PREFS.MORE })
				} else {
					setPrefs({ ...prefs, contrast: CONTRAST_PREFS.LESS })
				}
			}
		},
		[overrides]
	)

	useEffect(() => {
		const isNoPrefScheme = window.matchMedia(
			'(prefers-color-scheme: no-preference)'
		)
		const isLightScheme = window.matchMedia('(prefers-color-scheme: light)')
		const isDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
		const isContrastMore = window.matchMedia('(prefers-contrast: more')
		const isContrastLess = window.matchMedia('(prefers-contrast: less')
		const isUnsuppScheme =
			!isDarkScheme.matches && !isLightScheme.matches && !isNoPrefScheme.matches
		const isNoPrefMotion = window.matchMedia(
			'(prefers-reduced-motion: no-preference)'
		)
		const isReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		)
		const isUnsuppMotion = !isNoPrefMotion.matches && !isReducedMotion.matches

		// Handle cases where browsers don't fully support
		// 	the media queries as defined in the spec
		let colorScheme = SCHEME_PREFS.NO_PREFERENCE
		let reducedMotion = MOTION_PREFS.NO_PREFERENCE
		let contrast = CONTRAST_PREFS.NO_PREFERENCE
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
		if (isContrastLess.matches) {
			contrast = CONTRAST_PREFS.LESS
		}
		if (isContrastMore.matches) {
			contrast = CONTRAST_PREFS.MORE
		}

		setPrefs({
			colorScheme,
			reducedMotion,
			contrast
		})

		isLightScheme.addEventListener('change', handleLightSchemeChange)
		isReducedMotion.addEventListener('change', handleReducedMotionChange)
		isContrastMore.addEventListener('change', handleContrastChange)

		return () => {
			isLightScheme.removeEventListener('change', handleLightSchemeChange)
			isReducedMotion.removeEventListener('change', handleReducedMotionChange)
			isContrastMore.removeEventListener('change', handleContrastChange)
		}
	}, [])

	useEffect(() => {
		// Override the Prefs if any are explicitly defined
		const newPrefs = { ...prefs }
		Object.keys(overrides).forEach((key) => {
			if (overrides[key] !== null && !!parseInt(overrides[key])) {
				newPrefs[key] = overrides[key]
			}
		})
		setPrefs(newPrefs)
	}, [overrides])

	return (
		<PrefersContext.Provider
			value={{
				prefs,
				setPrefs: setOverrides
			}}></PrefersContext.Provider>
	)
}

export {
	PrefersProvider,
	usePrefers,
	SCHEME_PREFS,
	MOTION_PREFS,
	CONTRAST_PREFS
}
