import React, { useState } from 'react'
import Button from '../../../../components/shared/Navigation/Button/Button';
import Card from '../../../../components/shared/Navigation/Card/Card';
import TextInput from '../../../../components/shared/Navigation/TextInput/TextInput';
import style from '../StepOtp/StepOtp.module.css'
function StepOtp() {
    const [otp,setOtp]=useState('');
    return (
       <div className={style.container}>
        <Card title="Enter the OTP here">
        <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
        <div className={style.actionButtonWrape}>
            <Button buttonContent="Next"/>
        </div>
        <div >
            <p className={style.bottomPara}>An OTP will be sent to this number. Please enter the valid OTP once received. *Do not share this OTP with anyone*</p>
        </div>
       </Card>
       </div>
    )
}

export default StepOtp

