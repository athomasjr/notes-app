import { WrapPageElementBrowserArgs } from "gatsby"
import React from "react"
import { GlobalStyles } from "../../src/styles"

const pageWrapper = ({ element }: WrapPageElementBrowserArgs) => (
  <>
    <GlobalStyles />
    {element}
  </>
)

export default pageWrapper
