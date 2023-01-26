import { action } from '@storybook/addon-actions'
import { ComponentMeta, Story } from '@storybook/react'
import { useState } from 'react'
import {
  StyledButton,
  StyledButtonProps,
} from '../components/Sample/StyledButton'
import MDXDocument from './StyledButton.mdx'

export default {
  title: 'StyledButton',
  component: StyledButton,
  // argTypes: {onClick: {action: 'clicked'}},
  parameters: {
    docs: {
      page: MDXDocument,
    },
  },
} as ComponentMeta<typeof StyledButton>

const incrementAction = action('clicked')

export const Primary: Story<StyledButtonProps> = (props) => {
  const [count, setCount] = useState(0)
  const onClick = (e: React.MouseEvent) => {
    incrementAction(e, count)
    setCount((c) => c + 1)
  }

  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Primary:{count}
    </StyledButton>
  )
}

export const Success: Story<StyledButtonProps> = (props) => {
  return (
    <StyledButton {...props} variant="success">
      Success
    </StyledButton>
  )
}

export const Transparent: Story<StyledButtonProps> = (props) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  )
}
