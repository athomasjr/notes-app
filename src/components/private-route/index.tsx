import { navigate } from "@reach/router"
import React from "react"

interface IPrivateRouteProps {
  component: React.ComponentType<any>
  isAuthenticated: () => boolean
  location: string
}

export default function PrivateRoute({
  component: Component,
  isAuthenticated,
  location,
  ...rest
}: IPrivateRouteProps) {
  if (!isAuthenticated() && location !== "/") {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}
