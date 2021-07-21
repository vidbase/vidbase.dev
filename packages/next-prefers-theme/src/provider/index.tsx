import React, { useState, useCallback, createContext, useContext, useEffect } from 'react'

import { PrefQueryData, PrefsProps, DEFAULT_PREFS, DEFAULT_ATTRIBUTES, NULL_PREFS } from '../prefs'
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

export const getStoredPrefs = (key: string | null) => {
	if (!key || typeof window === 'undefined') {
		return undefined
	}
	try {
		const value = localStorage.getItem(key) || undefined
		if (value) {
			return JSON.parse(value)
		}
	} catch {
		return undefined
	}
}

export const setStoredPrefs = (key: string | null, prefs: PrefsProps) => {
	if (!key || typeof window === 'undefined') {
		return
	}
	try {
		localStorage.setItem(key, JSON.stringify(prefs))
	} finally {
		return
	}
}

export const getDefaultOverridePrefs = (cacheKey: string, cacheEnabled = false) => {
	if (cacheEnabled) {
		const data = getStoredPrefs(cacheKey)
		if (data) {
			return data
		}
	}
	return Object.keys(DEFAULT_PREFS).reduce((obj, key) => {
		obj[key] = null
		return obj
	}, {})
}

export interface PrefersThemeContextProps {
	prefs: PrefsProps
	userPrefs: PrefsProps
	setPrefs: Function
	themes: string[]
	resetStorage: Function
}

export const PrefersThemeContext = createContext<PrefersThemeContextProps>({
	prefs: { ...DEFAULT_PREFS },
	userPrefs: { ...NULL_PREFS },
	themes: [],
	setPrefs: () => {},
	resetStorage: () => {}
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
	prefs = { ...NULL_PREFS },
	themes = ['light', 'dark'],
	enforceThemes = true,
	disabledPrefs = [],
	resetValue = 'auto',
	attributes = { ...DEFAULT_ATTRIBUTES },
	cacheKey = 'prefers-theme',
	cacheEnabled = true
}) => {
	const [systemPrefs, setSystemPrefs] = useState({ ...DEFAULT_PREFS })
	const [overridePrefs, setOverridePrefs] = useState(
		getDefaultOverridePrefs(cacheKey, cacheEnabled)
	)

	// Expose indirect set method to the context
	// otherwise, setPrefs({theme: 'light'}) would delete other prefs
	const setOverridePrefsPublic = useCallback(
		(newPrefs) => {
			if (newPrefs.theme && enforceThemes === true) {
				if (themes.concat(resetValue).indexOf(newPrefs.theme) < 0) {
					throw `"${newPrefs.theme} is not in the list of supported themes (${themes})`
				}
			}

			const prefsToUpdate = { ...overridePrefs, ...newPrefs }
			setOverridePrefs(prefsToUpdate)

			// save to localStorage
			if (cacheEnabled === true && cacheKey) {
				setStoredPrefs(cacheKey, prefsToUpdate)
			}
		},
		[overridePrefs]
	)

	const resetStorage = useCallback(() => {
		if (cacheKey) {
			try {
				localStorage.removeItem(cacheKey)
			} catch {
				// do nothing
			}
		}
	}, [cacheKey])

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
					if (isInitial && QueryData[key].set) {
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
			if (attributes[key]) {
				document.body.setAttribute(attributes[key] as string, finalPrefs[key])
			}

			// // save to localStorage
			// if (cacheEnabled === true && cacheKey) {
			// 	try {
			// 		localStorage.setItem(cacheKey, JSON.stringify(finalPrefs))
			// 	} catch {
			// 		// do nothing
			// 	}
			// }
		})

		return finalPrefs
	}

	return (
		<PrefersThemeContext.Provider
			value={{
				prefs: determinePrefs(),
				userPrefs: overridePrefs,
				setPrefs: setOverridePrefsPublic,
				themes,
				resetStorage
			}}>
			{children}
		</PrefersThemeContext.Provider>
	)
}
