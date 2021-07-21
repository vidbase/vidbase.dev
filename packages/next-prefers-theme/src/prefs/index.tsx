const AVAILABLE_PREFS = {
	theme: {
		query: '(prefers-color-scheme: dark)',
		set: (isMatched: boolean) => (isMatched === true ? 'dark' : 'light')
	},
	motion: {
		query: '(prefers-reduced-motion: reduce)',
		set: (isMatched: boolean) => (isMatched === true ? 'reduce' : 'no-preference')
	},
	contrast: {
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
		query: '(prefers-reduced-data: reduce)',
		set: (isMatched: boolean) => (isMatched === true ? 'reduce' : 'no-preference')
	}
}

export interface PrefsProps {
	theme?: string | null
	motion?: string | null
	contrast?: string | null
	data?: string | null
}

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
	console.log({ output })
	return output
}
