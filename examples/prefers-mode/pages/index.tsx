import usePrefersMode, { SCHEME_PREFS, MOTION_PREFS } from 'prefers-mode'

const IndexPage = (props) => {
	const prefs = usePrefersMode()

	const cls = [
		prefs.colorScheme === SCHEME_PREFS.DARK ? 'dark-mode' : 'light-mode',
		prefs.reducedMotion === MOTION_PREFS.REDUCE ? 'reduced-motion' : 'motion'
	].join(' ')

	return <div className={cls}>Hello</div>
}

export default IndexPage
