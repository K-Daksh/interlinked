import React, { useState } from 'react'
import Card from '../../../../../components/shared/Navigation/Card/Card'
import Button from '../../../../../components/shared/Navigation/Button/Button'
import style from '../StepPhoneEmail.module.css'
import TextInput from '../../../../../components/shared/Navigation/TextInput/TextInput'
function Email({onNext}) {
    const [Email,setEmail]=useState('');
    return (
        <Card title="Login using Email ID">
            <TextInput value={Email} onChange={(e)=>setEmail(e.target.value)}/>
         <div className={style.actionButtonWrape}>
                <Button buttonContent="Next" onClick={onNext}/>
        </div>
        <div >
            <p className={style.bottomPara}>An OTP will be sent to this e-mail. Please enter the valid OTP once received. *Do not share this OTP with anyone*</p>
        </div>
        </Card>
     )
}

export default Email