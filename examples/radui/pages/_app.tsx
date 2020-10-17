import '@radui/core/css/reset.css'
import '@radui/core/css/styles.css'
import '../public/theme.scss'

export default function MyApp({
	Component,
	pageProps
}: {
	Component: any
	pageProps: any
}) {
	return <Component {...pageProps} />
}
