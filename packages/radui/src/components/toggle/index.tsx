import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps } from '../box'

export interface ToggleProps extends BoxProps {
	name?: string
	checked?: boolean
	width?: string
}

const getWidth = (props: ToggleProps) => {
	if (props.width) {
		return props.width
	}
	if (props.sm) {
		return `calc(var(--height-xs) * var(--toggle-aspect))`
	}
	if (props.lg) {
		return `calc(var(--height-base) * var(--toggle-aspect))`
	}
	if (props.xl) {
		return `calc(var(--height-lg) * var(--toggle-aspect))`
	}
	return `calc(var(--height-sm) * var(--toggle-aspect))`
}

export const StyledToggleLabel = styled(Box)<ToggleProps>`
	position: relative;
	display: inline-flex;
	white-space: nowrap;
	vertical-align: middle;
	width: ${(props) => getWidth(props)};
	padding: 0;

	input.toggle-checkbox {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-slider {
		color: transparent;
		user-select: none;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		cursor: pointer;
	}
	.toggle-slider::before,
	.toggle-slider::after {
		content: '';
		display: block;
		position: absolute;
		cursor: pointer;
	}
	.toggle-slider::before {
		width: 100%;
		height: 100%;
		background-color: #dedede;
		border-radius: 999em;
		transition: background-color var(--transition-duration)
			var(--transition-easing);
	}
	.toggle-slider::after {
		top: 0;
		left: 0;
		width: 54%;
		height: 100%;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 0 0.117rem rgba(0, 0, 0, 0.5);
		transition: left var(--transition-duration) var(--transition-easing);
	}
	.toggle-checkbox:checked + .toggle-slider::before {
		background-color: var(--clr-primary-bg);
	}
	.toggle-checkbox:checked + .toggle-slider::after {
		left: 50%;
	}
`

export const Toggle: React.FC<ToggleProps> = ({ children, ...props }) => {
	return (
		<StyledToggleLabel as="label" {...props}>
			<input
				className="toggle-checkbox"
				type="checkbox"
				name={props.name}
				checked={props.checked}
			/>
			<span className="toggle-slider">{children}</span>
		</StyledToggleLabel>
	)
}
