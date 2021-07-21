const AVAILABLE_PREFS = Object.freeze({
	theme: {
		_default: 'light',
		attribute: 'data-theme',
		query: '(prefers-color-scheme: dark)',
		set: (isMatched: boolean) => (isMatched === true ? 'dark' : 'light')
	},
	motion: {
		_default: 'no-preference',
		attribute: 'data-reduced-motion',
		query: '(prefers-reduced-motion: reduce)',
		set: (isMatched: boolean) => (isMatched === true ? 'reduce' : 'no-preference')
	},
	contrast: {
		_default: 'no-preference',
		attribute: 'data-contrast',
		query: '(prefers-contrast: more)',
		set: (isMatched: boolean) => {
			if (isMatched === true) {
				return 'more'
			} else {
				if (window.matchMedia('(prefers-contrast: less)').matches) {
					return 'less'
				}
				return 'no-preference'
			}
		}
	},
	data: {
		_default: 'no-preference',
		attribute: 'data-reduced-data',
		query: '(prefers-reduced-data: reduce)',
		set: (isMatched: boolean) => (isMatched === true ? 'reduce' : 'no-preference')
	}
})

export interface PrefsProps {
	theme?: string | null
	motion?: string | null
	contrast?: string | null
	data?: string | null
}

export const DEFAULT_PREFS: PrefsProps = Object.freeze(
	Object.keys(AVAILABLE_PREFS).reduce((obj, key) => {
		obj[key] = AVAILABLE_PREFS[key]._default
		return obj
	}, {})
)

export const DEFAULT_ATTRIBUTES: PrefsProps = Object.freeze(
	Object.keys(AVAILABLE_PREFS).reduce((obj, key) => {
		obj[key] = AVAILABLE_PREFS[key].attribute
		return obj
	}, {})
)

export const NULL_PREFS: PrefsProps = Object.freeze(
	Object.keys(AVAILABLE_PREFS).reduce((obj, key) => {
		obj[key] = null
		return obj
	}, {})
)

export const PrefQueryData = (
	prefs: PrefsProps,
	disabledPrefs: string[],
	setSystemPrefsPublic: Function
) => {
	const output = {}
	Object.keys(AVAILABLE_PREFS).forEach((key) => {
		output[key] = {
			...AVAILABLE_PREFS[key],
			disabled: disabledPrefs.indexOf(key) >= 0,
			value: prefs[key],
			handler: (event: MediaQueryListEvent) => {
				const toUpdate = {}
				toUpdate[key] = output[key].set(event.matches)
				setSystemPrefsPublic(toUpdate)
			}
		}
	})
	return output
}
