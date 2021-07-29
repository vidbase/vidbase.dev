import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { PrefersThemeProvider, usePrefersTheme } from './index'
import { useEffect } from 'react'

function App() {
	const { prefs, userPrefs } = usePrefersTheme()
	return <div>{`Hello theme=${prefs.theme} (system: ${userPrefs.theme})`}</div>
}

function TestSetPrefs(props:any) {
	const { prefs, userPrefs, setPrefs } = usePrefersTheme()
	useEffect(() =>
		setPrefs(props),
		[]
	)
	if (props.theme) {
		return <div>
			{`Hello theme=${prefs.theme} (system: ${userPrefs.theme})`}
		</div>
	} else if (props.contrast) {
		return <div>
			{`Hello contrast=${prefs.contrast} (system: ${userPrefs.contrast})`}
		</div>
	} else if (props.data) {
		return <div>
			{`Hello data=${prefs.data} (system: ${userPrefs.data})`}
	</div>
	} else if (props.motion) {
		return <div>
			{`Hello motion=${prefs.motion} (system: ${userPrefs.motion})`}
		</div>
	} else {
		return <div>
			{`Default value=${prefs}`}
		</div>
	}
}

describe('PrefersThemeProvider', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn()
			}))
		})
	})

	it('should not throw', (done) => {
		expect(() => {
			render(
				<PrefersThemeProvider>
					<App />
				</PrefersThemeProvider>
			)
		}).not.toThrow()
		done()
	})

	it('should respect default prefs (theme=light)', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<App />
			</PrefersThemeProvider>
		)
		expect(getByText('Hello theme=light (system: null)')).toBeInTheDocument()
		done()
	})

	it('should override prefs at the Provider level', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider prefs={{ theme: 'dark' }}>
				<App />
			</PrefersThemeProvider>
		)
		expect(getByText('Hello theme=dark (system: null)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set theme=dark', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs theme='dark'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello theme=dark (system: dark)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set theme=light', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs theme='light'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello theme=light (system: light)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set contrast=more', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs contrast='more'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello contrast=more (system: more)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set contrast=less', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs contrast='less'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello contrast=less (system: less)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set motion=reduce', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs motion='reduce'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello motion=reduce (system: reduce)')).toBeInTheDocument()
		done()
	})

	it('use setPrefs to set data=reduce', (done) => {
		const { getByText } = render(
			<PrefersThemeProvider>
				<TestSetPrefs data='reduce'/>
			</PrefersThemeProvider>
		)
		expect(getByText('Hello data=reduce (system: reduce)')).toBeInTheDocument()
		done()
	})

	it('should throw an error', (done) => {
		const spy = jest.spyOn(console, 'error'); // to prevent logging errors
		spy.mockImplementation(() => {});
		expect(() => render(
			<PrefersThemeProvider>
				<TestSetPrefs theme='invalid-value'/>
			</PrefersThemeProvider>
		)).toThrow()
		spy.mockRestore();
		done()
	})
})
