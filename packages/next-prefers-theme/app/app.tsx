import React, { useEffect } from 'react'
import { usePrefersTheme } from '../src'

function App(props) {
	const { prefs, setPrefs } = usePrefersTheme()

	return (
		<div>
			<h1>Hello there.</h1>
			<p>{`Current theme: ${prefs.theme}`}</p>
			<p>{`Current motion: ${prefs.motion}`}</p>
			<p>{`Current contrast: ${prefs.contrast}`}</p>
			<p>{`Current data: ${prefs.data}`}</p>
			<button
				onClick={() => {
					setPrefs({ theme: prefs.theme == 'dark' ? 'light' : 'dark' })
				}}>
				Toggle Theme
			</button>
			<button
				onClick={() => {
					setPrefs({ theme: 'auto' })
				}}>
				Reset Theme to System Preference
			</button>
		</div>
	)
}

export default App
