import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
${reset}

html {
	box-sizing: border-box;
	font-size: 62.5%;
}


`

export default GlobalStyles
