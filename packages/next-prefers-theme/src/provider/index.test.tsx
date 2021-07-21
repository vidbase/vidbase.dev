import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { PrefersThemeProvider, usePrefersTheme } from './index'

function App() {
	const { prefs, userPrefs } = usePrefersTheme()
	return <div>{`Hello theme=${prefs.theme} (system: ${userPrefs.theme})`}</div>
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
})
