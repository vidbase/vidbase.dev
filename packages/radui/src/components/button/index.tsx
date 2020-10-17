import React from 'react'
import styled, { css } from 'styled-components'
import type {} from 'styled-components/cssprop'
import { Box, BoxProps } from '../box'

export interface BaseButtonProps extends ButtonProps {
	buttonType?: string
}

export const BaseButtonStyles = css<BaseButtonProps>`
	cursor: pointer;

	border: ${({ buttonType }) => `1px solid var(--clr-${buttonType}-border)`};
	outline: none;

	background-color: ${({ buttonType }) => `var(--clr-${buttonType}-bg)`};
	color: ${({ buttonType }) => `var(--clr-${buttonType}-fg)`};

	&:hover {
		background-color: ${({ buttonType }) =>
			`var(--clr-${buttonType}-bg-hover)`};
		color: ${({ buttonType }) => `var(--clr-${buttonType}-fg-hover)`};
	}
	&:active {
		background-color: ${({ buttonType }) =>
			`var(--clr-${buttonType}-bg-active)`};
		box-shadow: ${({ buttonType }) => `var(--clr-${buttonType}-shadow-active)`};
	}
	&:focus {
		border-color: ${({ buttonType }) =>
			`var(--clr-${buttonType}-border-active)`};
	}
`

export interface ButtonProps extends BoxProps {
	primary?: boolean
	secondary?: boolean
	tertiary?: boolean
}

export const StyledButton = styled(Box)<BaseButtonProps>`
	${BaseButtonStyles};
`

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	let buttonType = 'primary'
	if (props.primary !== true) {
		if (props.secondary === true) {
			buttonType = 'secondary'
		}
		if (props.tertiary === true) {
			buttonType = 'tertiary'
		}
	}
	return (
		<StyledButton as="button" {...props} buttonType={buttonType}>
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
