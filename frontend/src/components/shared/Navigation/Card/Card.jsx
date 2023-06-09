import React from 'react'
import style from './Card.module.css'
function Card({title,children}) {
    return (
        <div className={style.card}>
                <div className={style.headingWraper}>
                    <h1 className={style.heading}>{title}</h1>
                </div>
                {children}
            </div>
    )
}

export default Card
