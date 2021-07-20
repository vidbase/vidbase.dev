import { AppProps } from 'next/app'
import { PrefersProvider } from 'prefers-mode'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PrefersProvider>
			<Component {...pageProps} />
		</PrefersProvider>
	)
}

export default MyApp
