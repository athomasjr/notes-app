import React from "react"
import * as S from "./styles"

export default function MainLayout({ children }) {
  return (
    <S.Container>
      <main>{children}</main>
    </S.Container>
  )
}
