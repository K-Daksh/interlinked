import React, {useState} from 'react'
import Phone from './Phone/Phone'
import Email from './Email/Email'
import style from './StepPhoneEmail.module.css'
const phoneEmailMap = {
    phone:Phone,
    email:Email,
}

function StepPhoneEmail({onNext}) {
    const [type,setType]=useState('phone');
    const Component=phoneEmailMap[type];
    // function onNext(){
    //     setType('email');
    // }
    return (
        <> 
        <div className={style.cardWrapper}>
            <div>
                <div className={style.buttonWrap}>
                    <button className={`${style.button} ${type==='phone'?style.active:''}`} onClick={()=>setType('phone')}>Phone</button>
                    <button className={`${style.button} ${type==='email'?style.active:''}`} onClick={()=>setType('email')}>Email</button>
                </div> 
                
                <Component onNext={onNext}/>
                
            </div>
        </div> 
       

        </>
        
    ) 
}

export default StepPhoneEmail
