const path = require('path')
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.tsx'),
			name: 'next-prefers-theme'
		},
		rollupOptions: {
			external: ['react'],
			output: [
				{
					format: 'esm',
					esModule: true,
					exports: 'named',
					globals: {
						react: 'React'
					}
				},
				{
					format: 'umd',
					inlineDynamicImports: true,
					interop: 'esModule',
					exports: 'named',
					globals: {
						react: 'React'
					}
				}
			]
		}
	}
})
