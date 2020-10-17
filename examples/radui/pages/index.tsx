import React from 'react'
import dynamic from 'next/dynamic'

import { ButtonProps } from '@radui/radui'
const Button = dynamic<ButtonProps>(
	() => import('@radui/radui').then((mod) => mod.Button),
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
