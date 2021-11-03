import React from "react"
import * as S from "./styles"

export default function SideBar() {
  return (
    <div>
      <S.Header>
        <h1>All Notes</h1>
        <button>Add item</button>
      </S.Header>

      <S.Notes>
        <S.Note>
          <div>
            <strong>TITLE</strong>
            <button>delete</button>
          </div>
          <p>Note Preview</p>
          <small>Last modified [date]</small>
        </S.Note>
      </S.Notes>
    </div>
  )
}
