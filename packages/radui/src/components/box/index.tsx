import styled from 'styled-components'

export interface BoxProps {
	sm?: boolean
	lg?: boolean
	xl?: boolean
	height?: string
	colorBase?: {
		text?: string
		background?: string
		border?: string
	}
	colorHover?: {
		text?: string
		background?: string
		border?: string
	}
	colorActive?: {
		text?: string
		background?: string
		border?: string
	}
	p?: string
	before?: JSX.Element[]
	after?: JSX.Element[]
}

const getHeight = (props: BoxProps) => {
	if (props.height) {
		return props.height
	}
	if (props.sm) {
		return 'var(--height-xs)'
	}
	if (props.lg) {
		return 'var(--height-base)'
	}
	if (props.xl) {
		return 'var(--height-lg)'
	}
	return 'var(--height-sm)'
}
const getFontSize = (props: BoxProps) => {
	if (props.sm) {
		return 'calc(var(--height-xs)*var(--scale-text-height))'
	}
	if (props.lg) {
		return 'calc(var(--height-base)*var(--scale-text-height))'
	}
	if (props.xl) {
		return 'calc(var(--height-lg)*var(--scale-text-height))'
	}
	return 'calc(var(--height-sm)*var(--scale-text-height))'
}

export const Box = styled.div<BoxProps>`
	font-size: ${(props) => getFontSize(props)};
	height: ${(props) => getHeight(props)};
	padding: ${(props) => props.p || '0 var(--p-base)'};
`

// export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
// 	let innerProps = {
// 		as: props.as,
// 		sm: props.sm,
// 		lg: props.lg,
// 		xl: props.xl,
// 		height: props.height,
// 		p: props.p
// 	}
// 	return <StyledBox {...innerProps}>{children}</StyledBox>
// }
