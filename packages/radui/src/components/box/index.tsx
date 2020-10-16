import React from 'react'
import styled from 'styled-components'

export interface BoxProps {
	small?: boolean
	medium?: boolean
	large?: boolean
	prefix?: React.ReactNode
	suffix?: React.ReactNode
}

const getHeight = (props: BoxProps) => {
	if (props.small) {
		return 'var(--height-sm)'
	}
	if (props.large) {
		return 'var(--height-lg)'
	}
	return 'var(--height-base)'
}
const getFontSize = (props: BoxProps) => {}

export const StyledBox = styled.div`
	font-size: ${(props) => getFontSize(props)};
	height: ${(props) => getHeight(props)};
	padding: 0 var(--p-base);
`

export const Box: React.FC = ({ children, ...props }) => {
	return <StyledBox {...props}>{children}</StyledBox>
}
