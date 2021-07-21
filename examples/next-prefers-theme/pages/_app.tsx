import { AppProps } from 'next/app'
import { PrefersThemeProvider } from 'next-prefers-theme'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PrefersThemeProvider themes={['light', 'dark', '']}>
			<Component {...pageProps} />
		</PrefersThemeProvider>
	)
}

export default MyApp
