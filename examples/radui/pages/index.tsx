import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { ButtonProps, ToggleProps } from '@radui/core'
const { Button, Toggle } = {
	Button: dynamic<ButtonProps>(
		() => import('@radui/core').then((mod) => mod.Button),
		{
			ssr: false
		}
	),
	Toggle: dynamic<ToggleProps>(
		() => import('@radui/core').then((mod) => mod.Toggle),
		{
			ssr: false
		}
	)
}

const Section = styled.section`
	display: flex;
	flex-direction: column;
	width: 50%;
`

const Row = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin: 25px auto;
`

const IndexPage = () => {
	return (
		<div style={{ display: 'grid', placeItems: 'center' }}>
			<Head>
				<title>@radui/core example</title>
			</Head>
			<Section>
				<h1>RadUI</h1>
			</Section>
			<Section>
				<h2>Buttons</h2>
				<Row>
					<Button>Primary</Button>
					<Button secondary>Secondary</Button>
					<Button tertiary>Tertiary</Button>
				</Row>
				<Row>
					<Button sm>Small</Button>
					<Button lg>Large</Button>
					<Button xl>Extra Large</Button>
				</Row>
			</Section>
			<Section>
				<h2>Toggles</h2>
				<Row>
					<Toggle sm />
					<Toggle />
					<Toggle lg />
				</Row>
			</Section>
		</div>
	)
}

export default IndexPage
