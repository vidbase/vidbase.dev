import '@radui/radui/css/reset.css'
import '@radui/radui/css/styles.css'
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
