import React, { useState } from 'react'
import Card from '../../../../../components/shared/Navigation/Card/Card'
import Button from '../../../../../components/shared/Navigation/Button/Button'
import TextInput from '../../../../../components/shared/Navigation/TextInput/TextInput'
import style from '../StepPhoneEmail.module.css'
function Phone({onNext}) {
    const [phoneNumber,setPhoneNumber]=useState('');
    return (
       <Card title="Login using Phone number">
        <TextInput value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <div className={style.actionButtonWrape}>
            <Button buttonContent="Next" onClick={onNext}/>
        </div>
        <div >
            <p className={style.bottomPara}>An OTP will be sent to this number. Please enter the valid OTP once received. *Do not share this OTP with anyone*</p>
        </div>
       </Card>
    )
}

export default Phone
