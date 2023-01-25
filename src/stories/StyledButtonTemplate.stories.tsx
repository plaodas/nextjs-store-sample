import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StyledButton } from "../components/StyledButton";


export default {
    title: 'StyledButton Template',
    component: StyledButton,
    argTypes: {
        variant: {
            control: {type: 'radio'},
            options:['primary','success','transparent'],
        },
        children: {
            control: {type:'text'},
        }
    },
} as ComponentMeta<typeof StyledButton>

const Template: ComponentStory<typeof StyledButton> = (args) => <StyledButton {...args} />

export const TemplateTest = Template.bind({})

TemplateTest.args = {
    variant:'primary',
    children:'Primary',
}