import React from 'react'
import style from './Button.module.css'
function Button({buttonContent,onClick}) {
    return (
        <button onClick={onClick} className={style.button}> 
            <span>{buttonContent}</span>
        </button>
    )
}

export default Button
