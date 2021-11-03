import { LoginForm, SignUpForm } from "components"
import React, { useState } from "react"
import * as S from "./styles"

export default function Auth() {
  const [signUp, setSignUp] = useState(true)
  const toggleSignUp = () => {
    setSignUp(prevState => !prevState)
  }

  const auth = signUp ? <SignUpForm /> : <LoginForm />
  const toggleAction = signUp ? (
    <S.ToggleAction>
      Already have an account? <span onClick={toggleSignUp}>Log in</span>
    </S.ToggleAction>
  ) : (
    <S.ToggleAction>
      Don't have an account yet? <span onClick={toggleSignUp}>Sign up</span>
    </S.ToggleAction>
  )

  return (
    <S.AuthContainer>
      {auth}
      {toggleAction}
    </S.AuthContainer>
  )
}
