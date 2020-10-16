import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps } from '../box'

interface ButtonProps {}

export const StyledButton = styled(Box)``

export const Button: React.FC<BoxProps & ButtonProps> = ({ children }) => {
	return <StyledButton as="button">{children}</StyledButton>
}
