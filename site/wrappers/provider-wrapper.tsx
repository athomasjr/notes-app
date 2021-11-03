import { AuthProvider } from "context/auth"
import { WrapRootElementBrowserArgs } from "gatsby"
import React from "react"

const providerWrapper = ({ element }: WrapRootElementBrowserArgs) => (
  <AuthProvider>{element}</AuthProvider>
)
