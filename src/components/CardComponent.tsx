import React, { useState, useRef } from 'react'
import { CardDefault } from './CardDefault'
import { CardEdit } from './CardEdit'

interface TProps {
  cardText: string
}

export const CardComponent: React.FC<TProps> = ({ cardText }) => {
  const [text, setText] = useState(cardText)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef('')

  const handleSaveBtn = () => {
    if (inputRef.current) {
      setText(inputRef.current)
    }
    setIsEditing(false)
  }
  
  return !isEditing ? (
    <CardDefault
      text={text}
      onEditBtnClick={() => {
        setIsEditing(true)
      }}
    />
  ) : (
    <CardEdit
      text={text}
      onCancelBtnClick={() => {
        setIsEditing(false)
      }}
      onSaveBtnClick={handleSaveBtn}
      onInputChange={(e) => {
        if (e.target) {
          inputRef.current = e.target.value
        }
      }}
    />
  )
}
