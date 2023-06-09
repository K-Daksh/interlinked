import React from 'react';
import style from './Home.module.css';
import {Link,useHistory} from 'react-router-dom';
import Card from '../../components/shared/Navigation/Card/Card'
import Button from '../../components/shared/Navigation/Button/Button'
function Home() {
    const history = useHistory();
    function startRegister(){
        console.log('hello');
        history.push('/authenticate');
    }
    return (

        <div className={style.cardWrapper}>
            <Card title="Ready to be Linked?">
            <div>
                    <p className={style.text}>InterLinked has crafted an exeptional platform for connecting seemlessly in this cluttered world. Are you ready to witness the magic of integration and inovation?</p>
                </div>
                <div className={style.btnCon}>
                    <Button onClick={startRegister} buttonContent="Get me Linked!!"></Button>
                </div>
                <div>
                    <span>
                        {/* <Link to='/login' className={style.signInLink}>
                            Sign in
                        </Link> */}
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Home
