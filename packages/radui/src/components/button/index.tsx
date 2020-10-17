import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps } from '../box'

export interface ButtonProps extends BoxProps {}

export const StyledButton = styled(Box)<ButtonProps>``

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<StyledButton as="button" {...props}>
			{children}
		</StyledButton>
	)
}
