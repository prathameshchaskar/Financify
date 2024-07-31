import React from 'react'
import "./styles.css"

export const Button = ({disabled, text, onClick, blue}) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"}
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </div>
  )
}
