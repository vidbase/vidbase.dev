# `prefers-mode`

A React library for detecting css media query system preferences: `prefers-color-scheme`, `prefers-reduced-motion`, & `prefers-contrast`.

## Usage

```
# Next.js example
import usePrefersMode, { SCHEME_PREFS, MOTION_PREFS, CONTRAST_PREFS } from 'prefers-mode'

const IndexPage = (props) => {
	const prefs = usePrefersMode()

	const cls = [
		prefs.colorScheme === SCHEME_PREFS.DARK ? 'dark-mode' : 'light-mode',
		prefs.reducedMotion === MOTION_PREFS.REDUCE ? 'reduced-motion' : 'motion',
		prefs.contrast === CONTRAST_PREFS.MORE ? 'high-contrast' : 'normal-contrast'
	].join(' ')

	return <div className={cls}>Hello</div>
}

export default IndexPage
```

See [example](../../examples/prefers-mode) for a more detailed working Next.js example.
