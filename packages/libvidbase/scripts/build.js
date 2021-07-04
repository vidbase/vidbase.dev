const esbuild = require('esbuild')

const options = {
	entryPoints: ['./src/index.ts'],
	bundle: true,
	minify: true,
	external: ["react", 'react-dom'],
	platform: 'node',
	sourcemap: true
}

esbuild.build({
	...options,
	outfile: './dist/libvidbase.js',
}).catch((err) => {
	console.trace(err)
	process.exit(1)
})

esbuild.build({
	...options,
	outfile: './dist/libvidbase.min.js'
}).catch((err) => {
	console.trace(err)
	process.exit(1)
})