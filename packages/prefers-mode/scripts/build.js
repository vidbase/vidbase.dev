const esbuild = require('esbuild')

const options = {
	entryPoints: ['./src/index.tsx'],
	bundle: true,
	external: ['react', 'react-dom'],
	platform: 'node'
}

esbuild
	.build({
		...options,
		outfile: './dist/prefers-mode.js'
	})
	.catch((err) => {
		console.trace(err)
		process.exit(1)
	})

esbuild
	.build({
		...options,
		minify: true,
		sourcemap: true,
		outfile: './dist/prefers-mode.min.js'
	})
	.catch((err) => {
		console.trace(err)
		process.exit(1)
	})
