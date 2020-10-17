import React from 'react'
import styled, { css } from 'styled-components'
import type {} from 'styled-components/cssprop'
import { Box, BoxProps } from '../box'

export const BaseButtonStyles = css`
	cursor: pointer;

	border: 1px solid transparent;
	outline: none;
`
/*	background-color: ${(props) =>
		props.secondary === true
			? 'var(--clr-secondary-bg)'
			: 'var(--clr-primary-bg)'};
	color: ${(props) =>
		props.secondary === true
			? 'var(--clr-secondary-fg)'
			: 'var(--clr-primary-fg)'};*/

export interface ButtonProps extends BoxProps {
	secondary?: boolean
}

export const StyledButton = styled(Box)<ButtonProps>`
	${BaseButtonStyles};
`

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<StyledButton as="button" {...props}>
			{children}
		</StyledButton>
	)
}

// export interface ButtonWithIconProps extends BoxProps {
// 	before?: JSX.Element[]
// 	after?: JSX.Element[]
// }
// export const StyledButtonWithIcon = styled(Box)<ButtonWithIconProps>`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// `

// export const ButtonWithIcon: React.FC<ButtonProps & ButtonWithIconProps> = ({
// 	children,
// 	...props
// }) => {
// 	return (
// 		<StyledButtonWithIcon as="button">
// 			<span className="btn-before">{props.before}</span>
// 			<span className="btn-main">{children}</span>
// 			<span className="btn-after">{props.after}</span>
// 		</StyledButtonWithIcon>
// 	)
// }
