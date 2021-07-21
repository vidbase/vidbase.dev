import React, { useEffect } from 'react'
import { usePrefersTheme } from '../src'

function App(props) {
	const { prefs, userPrefs, setPrefs, resetStorage } = usePrefersTheme()

	return (
		<div>
			<h1>Hello there.</h1>
			<p>
				<button
					onClick={() => {
						setPrefs({ theme: prefs.theme == 'dark' ? 'light' : 'dark' })
					}}>
					Toggle Theme
				</button>
				&nbsp;
				{`Current theme: ${userPrefs.theme} (system: ${prefs.theme})`}
			</p>
			<p>
				<button
					onClick={() => {
						setPrefs({ motion: prefs.motion == 'reduce' ? 'no-preference' : 'reduce' })
					}}>
					Toggle Reduced Motion
				</button>
				&nbsp;
				{`Current reduced-motion: ${userPrefs.motion} (system: ${prefs.motion})`}
			</p>
			<p>
				<button
					onClick={() => {
						setPrefs({ contrast: prefs.contrast == 'more' ? 'no-preference' : 'more' })
					}}>
					Toggle Contrast
				</button>
				&nbsp;
				{`Current contrast: ${userPrefs.contrast} (system: ${prefs.contrast})`}
			</p>
			<p>
				<button
					onClick={() => {
						setPrefs({ data: prefs.data == 'reduce' ? 'no-preference' : 'reduce' })
					}}>
					Toggle Reduced Data
				</button>
				&nbsp;{`Current reduced-data: ${userPrefs.data} (system: ${prefs.data})`}
			</p>
			<p>
				<button
					onClick={() => {
						setPrefs({ theme: 'auto', motion: 'auto', contrast: 'auto', data: 'auto' })
					}}>
					Reset All to System Preference
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						resetStorage()
					}}>
					Reset localStorage Cache
				</button>
			</p>
		</div>
	)
}

export default App
