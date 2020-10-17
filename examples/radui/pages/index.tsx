import React from 'react'
import Head from 'next/head'
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
		<div style={{ display: 'grid', placeItems: 'center' }}>
			<Head>
				<title>@radui/core example</title>
			</Head>
			<div
				style={{
					display: 'flex',
					width: '50%',
					justifyContent: 'space-between',
					margin: '150px auto'
				}}>
				<Button>Primary</Button>
				<Button secondary>Secondary</Button>
				<Button tertiary>Tertiary</Button>
			</div>
			<div
				style={{
					display: 'flex',
					width: '50%',
					justifyContent: 'space-between',
					margin: '150px auto'
				}}>
				<Button sm>Small</Button>
				<Button lg>Large</Button>
				<Button xl>Extra Large</Button>
			</div>
		</div>
	)
}

export default IndexPage
