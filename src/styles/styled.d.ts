import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: '#222222'
      primaryTextColor: '#ffffff'
      secondaryTextColor: '#888888'
      red: '#EA4228'
      orange: '#F58B19'
      yellow: '#F5CD19'
      lightgreen: '#A5DD19'
      green: '#1BF11C'
      darkGray: '#1e1e1e'
      disabled: 'gray'
    }
  }
}
