import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { PrefersThemeProvider, usePrefersTheme } from '../src'

import App from './app'

function _App({ Component, pageProps }) {
	return (
		<PrefersThemeProvider>
			<Component {...pageProps} />
		</PrefersThemeProvider>
	)
}

if (typeof document !== 'undefined') {
	ReactDOM.render(<_App Component={App} pageProps={{}} />, document.getElementById('root'))
}
