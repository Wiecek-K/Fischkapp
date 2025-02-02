import React, { useState } from 'react'

import { Delete } from './icons/Delete'
import { CardButton } from './CardButton'
import { Loader } from './Loader'

import css from './NewCard.module.css'

interface NewCardProps {
  handleCancelBtn(): void
  handleSaveBtn(frontText: string, backText: string): void
}

export const NewCard = ({ handleCancelBtn, handleSaveBtn }: NewCardProps) => {
  const [frontText, setFrontText] = useState('')
  const [backText, setBackText] = useState('')
  const [isFirstSite, setIsFirstSite] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const handleNextBtn = () => {
    setIsFirstSite(false)
  }
  const handleBackBtn = () => {
    setIsFirstSite(true)
  }
  const saveNewCard = () => {
    setIsLoading(true)
    handleSaveBtn(frontText, backText)
  }

  return (
    <>
      <div className={`${css.newCard} ${!isFirstSite ? css.hidden : ''}`}>
        <p className={css.smallText}></p>
        <textarea
          cols={20}
          value={frontText}
          onInput={resizeTextArea}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFrontText(e.target.value)
          }}
        />
        <div className={css.buttonsPanel}>
          <CardButton text="Cancel" position="left" onClick={handleCancelBtn} />
          <CardButton text="Next" position="right" onClick={handleNextBtn} />
        </div>
      </div>

      <div className={`${css.newCard} ${isFirstSite ? css.hidden : ''}`}>
        {!isLoading ? (
          <>
            <button className={css.deleteButton} onClick={handleCancelBtn}>
              <Delete />
            </button>
            <p className={css.smallText}>{frontText}</p>
            <textarea
              cols={20}
              value={backText}
              onInput={resizeTextArea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setBackText(e.target.value)
              }}
            />
            <div className={css.buttonsPanel}>
              <CardButton text="Back" position="left" onClick={handleBackBtn} />
              <CardButton text="Save" position="right" onClick={saveNewCard} />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}
