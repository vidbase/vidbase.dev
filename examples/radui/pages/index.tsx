import React from 'react'
import dynamic from 'next/dynamic'

// import { Button } from '@radui/radui/src'
const Button = dynamic(() => import('@radui/radui').then((mod) => mod.Button), {
	ssr: false
})

const IndexPage = () => {
	return (
		<div>
			Hello <Button>Click</Button>
		</div>
	)
}

export default IndexPage
