import React from 'react'
import { StyledButton } from './Button.styled'

interface ButtonProps {
  children: React.ReactChild
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  color?: string
}

const Button: React.FC<ButtonProps> = (props) => {
  // return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default Button
