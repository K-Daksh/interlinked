import React from 'react'
import style from './Navigation.module.css'
import {Link} from 'react-router-dom';
//dosent make the page refresh
function Navigation() {
    const brandStyle = {
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'23px',
        display:'flex',
        alignItem:'center'

    }
    const logoText = {
        marginLeft:'10px',
    }
    return (
        <nav className={`${style.navbar} container`}>
            <Link style={brandStyle} to='/'>
                <span style={logoText}>InterLinked</span>

            </Link>
        </nav>
    )
}

export default Navigation
