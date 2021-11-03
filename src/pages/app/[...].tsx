import { Router } from "@reach/router"
import { Profile } from "components"
import React from "react"

const App = () => {
  return (
    <>
      <Router basepath="/app">
        <Profile path="/profile" />
      </Router>
    </>
  )
}
export default App
