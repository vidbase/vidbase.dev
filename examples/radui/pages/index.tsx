import React from 'react'
import dynamic from 'next/dynamic'

import { ButtonProps } from '@radui/core'
const Button = dynamic<ButtonProps>(
	() => import('@radui/core').then((mod) => mod.Button),
	{
		ssr: false
	}
)

const IndexPage = () => {
	return (
		<div>
			Hello <Button>Primary</Button>
			<Button secondary>Secondary</Button>
			<Button tertiary>Tertiary</Button>
			<Button xl>Extra Large</Button>
		</div>
	)
}

export default IndexPage
