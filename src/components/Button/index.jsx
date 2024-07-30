import React from 'react'
import "./styles.css"

export const Button = ({text, onClick, blue}) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"}
        onClick={onclick}
    >
        {text}
    </div>
  )
}
