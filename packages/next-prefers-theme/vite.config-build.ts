const path = require('path')
import { defineConfig } from 'vite'
import reactJsx from 'vite-react-jsx'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), reactJsx()],
	build: {
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, 'src/index.tsx'),
			name: 'next-prefers-theme'
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React'
				}
			}
		}
	}
})
