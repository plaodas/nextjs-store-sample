// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }



import { addDecorator } from '@storybook/react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme} from '../src/themes'
import * as NextImage from 'next/image'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Robot, Oxygen, Ubuntu, Cantarell, Fira Sana,Droid Sans, Helvetica Neue, sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration:none;
  transition: .25s;
  color: #000;
}
`

addDecorator((story)=>(
  <ThemeProvider theme={theme} >
    <GlobalStyle />
    {story()}
  </ThemeProvider>
))

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => typeof props.src === 'string' ? (
    <OriginalNextImage {...props} unoptimizes blurDataURL={props.src} />
  ) : (
    <OriginalNextImage {...props} unoptimized />
  )
})
