import '@radui/radui/src/reset.css'
import '@radui/radui/src/styles.css'
import '../public/theme.css'

export default function MyApp({
	Component,
	pageProps
}: {
	Component: any
	pageProps: any
}) {
	return <Component {...pageProps} />
}
