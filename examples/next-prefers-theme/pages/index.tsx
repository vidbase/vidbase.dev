import {
	usePrefers,
	SCHEME_PREFS,
	MOTION_PREFS,
	CONTRAST_PREFS
} from 'prefers-mode'

const IndexPage = () => {
	const { prefs, overrides, setOverrides } = usePrefers()

	const colorScheme =
		prefs.colorScheme === SCHEME_PREFS.DARK ? 'dark-mode' : 'light-mode'
	const reducedMotion =
		prefs.reducedMotion === MOTION_PREFS.REDUCE ? 'reduced-motion' : 'motion'
	const contrast =
		prefs.contrast === CONTRAST_PREFS.MORE ? 'high-contrast' : 'normal-contrast'

	const cls = [colorScheme, reducedMotion, contrast].join(' ')

	const toggleColorScheme = () => {
		setOverrides({
			...overrides,
			colorScheme:
				prefs.colorScheme === SCHEME_PREFS.DARK
					? SCHEME_PREFS.LIGHT
					: SCHEME_PREFS.DARK
		})
	}
	const resetColorScheme = () => {
		setOverrides({ ...overrides, colorScheme: 'auto' })
	}

	return (
		<div className={cls}>
			<div>{`Hello, this div has classes: ${cls}`}</div>
			<button onClick={toggleColorScheme}>Toggle Color Scheme</button>
			<button onClick={resetColorScheme}>
				Reset Color Scheme (to System Pref)
			</button>
		</div>
	)
}

export default IndexPage
