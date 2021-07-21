import React, { useState, useCallback, createContext, useContext, useEffect } from 'react'

import { PrefQueryData, PrefsProps } from '../prefs'
import { BrowserSupports } from '../utils/browserSupports'

export interface PrefersThemeProviderProps {
	// Override-able Preferences
	prefs?: PrefsProps

	// # Configurable Options
	// ## Theme validation
	themes?: string[]
	enforceThemes?: boolean

	// ## Prefs
	disabledPrefs?: string[]
	resetValue?: string

	// ## Caching
	cacheKey?: string
	cacheEnabled?: boolean

	// ## Body Attributes
	attributes?: {
		[key in keyof PrefsProps]: string
	}
}

export const loadStoredTheme = (key: string | null) => {
	if (!key || typeof window === 'undefined') {
		return undefined
	}
	try {
		return localStorage.getItem(key) || undefined
	} finally {
		return undefined
	}
}

export const getDefaultSystemPrefs = (
	props: PrefsProps,
	cacheKey: string | null,
	cacheEnabled = false
) => {
	return {
		theme: props.theme || (cacheEnabled && loadStoredTheme(cacheKey)) || 'light',
		motion: props.motion || 'no-preference',
		contrast: props.contrast || 'no-preference',
		data: props.data || 'no-preference'
	}
}

export const getDefaultOverridePrefs = () => {
	return {
		theme: null,
		motion: null,
		contrast: null,
		data: null
	}
}

export const getDefaultAttributes = () => {
	return {
		theme: 'data-theme',
		motion: 'data-reduced-motion',
		contrast: 'data-contrast',
		data: 'data-reduced-data'
	}
}

export interface PrefersThemeContextProps {
	prefs: PrefsProps
	setPrefs: Function
	themes: string[]
}

export const PrefersThemeContext = createContext<PrefersThemeContextProps>({
	prefs: getDefaultSystemPrefs({}, null),
	themes: [],
	setPrefs: () => {}
})

export const usePrefersTheme = () => {
	return useContext(PrefersThemeContext)
}

export const setPrefsFactory = (
	key: string,
	value: string | undefined,
	prefs: PrefsProps,
	setPrefs: Function
) => {
	return () => {
		const newPrefs = { ...prefs }
		if (prefs[key] !== value) {
			newPrefs[key] = value
		}
		setPrefs(newPrefs)
	}
}

export const PrefersThemeProvider: React.FC<PrefersThemeProviderProps> = ({
	children,
	prefs = getDefaultOverridePrefs(),
	themes = ['light', 'dark'],
	enforceThemes = true,
	disabledPrefs = [],
	resetValue = 'auto',
	attributes = getDefaultAttributes(),
	cacheKey = 'prefers-theme',
	cacheEnabled = true
}) => {
	const [systemPrefs, setSystemPrefs] = useState(() => {
		return getDefaultSystemPrefs({ ...prefs }, cacheKey, cacheEnabled)
	})
	const [overridePrefs, setOverridePrefs] = useState(getDefaultOverridePrefs())

	// Expose indirect set method to the context
	// otherwise, setPrefs({theme: 'light'}) would delete other prefs
	const setOverridePrefsPublic = useCallback(
		(newPrefs) => {
			if (newPrefs.theme && enforceThemes === true) {
				if (themes.concat(resetValue).indexOf(newPrefs.theme) < 0) {
					throw `"${newPrefs.theme} is not in the list of supported themes (${themes})`
				}
			}
			setOverridePrefs({ ...overridePrefs, ...newPrefs })
		},
		[overridePrefs]
	)

	const setSystemPrefsPublic = useCallback(
		(newPrefs: any) => {
			setSystemPrefs({ ...systemPrefs, ...newPrefs })
		},
		[systemPrefs]
	)

	const init = useCallback(
		(isInitial = true) => {
			return () => {
				const initialSystemPrefs = { ...systemPrefs }
				const queries = {}
				const QueryData = PrefQueryData(prefs, disabledPrefs, setSystemPrefsPublic)

				// Loop over PrefQueryData and add media queries
				Object.keys(QueryData).forEach((key) => {
					// Skip Disabled Prefs
					if (QueryData[key].disabled === true) {
						return
					}

					// Perform Media Queries
					queries[key] = window.matchMedia(QueryData[key].query)

					// Initialize systemPrefs based on Media Query result
					if (QueryData[key].set) {
						initialSystemPrefs[key] = QueryData[key].set(queries[key].matches)
					}

					// Set up Media Query Listeners (if supported)
					if (!isInitial) {
						if (BrowserSupports(queries[key])) {
							queries[key].addEventListener('change', QueryData[key].handler)
						}
					}
				})

				// Apply initial .set() match values to systemPrefs
				if (isInitial) {
					setSystemPrefsPublic(initialSystemPrefs)
				}

				return () => {
					// Cleanup Media Query listeners on unmount
					Object.keys(QueryData).forEach((key) => {
						// Skip Disabled Prefs
						if (QueryData[key].disabled === true) {
							return
						}

						if (!isInitial) {
							if (BrowserSupports(queries[key])) {
								queries[key].removeEventListener('change', QueryData[key].handler)
							}
						}
					})
				}
			}
		},
		[systemPrefs]
	)

	// Run init() once to pull initial values
	useEffect(init(), [])

	// Run init(false) on changes to update the handlers which rely on systemPrefs
	useEffect(init(false), [systemPrefs])

	// Determine the final prefs to use
	const determinePrefs = () => {
		// Start with System Prefs
		const finalPrefs = { ...systemPrefs }

		// Override with Post-Context setPrefs
		// unless provided null or resetToSystemKey ('auto')
		Object.keys(overridePrefs).forEach((key) => {
			if (
				overridePrefs[key] !== resetValue &&
				overridePrefs[key] !== null &&
				typeof overridePrefs[key] !== 'undefined'
			) {
				finalPrefs[key] = overridePrefs[key]
			}
		})

		// Override with Provider-Level prefs if supplied
		Object.keys(prefs).forEach((key) => {
			if (prefs[key]) {
				finalPrefs[key] = prefs[key]
			}
		})

		Object.keys(finalPrefs).forEach((key) => {
			// update body classes
			document.body.setAttribute(attributes[key], finalPrefs[key])

			// save to localStorage
			if (cacheEnabled === true && cacheKey) {
				try {
					localStorage.setItem(cacheKey, finalPrefs.theme)
				} catch {
					// do nothing
				}
			}
		})

		return finalPrefs
	}

	return (
		<PrefersThemeContext.Provider
			value={{ prefs: determinePrefs(), setPrefs: setOverridePrefsPublic, themes }}>
			{children}
		</PrefersThemeContext.Provider>
	)
}
