import React from "react";
import logo from "../logo.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'reactstrap'

export default class SigninPage extends React.Component{  

    render(){
        return(
            <div className="loginPage">
                <div>
                <img src={logo} alt="company logo"/>
                </div>
                <div className="loginBox">
                    <form className='loginForm'>
                    
                        <div className='divmargin'>
                            <input className="boxInside" type="email" placeholder="Email"/>
                        </div>
                        <div className='divmargin'>
                            <input className="boxInside" type="text" placeholder="Full Name"/>
                        </div>
                        <div className='divmargin'>
                            <input className="boxInside" type="password" placeholder="Password"/>
                        </div>
                            <Button outline color='primary' className='buttonLogin' href='/loginPage'>Back</Button>
                            <Button color='primary' className='buttonLogin'>Sign In</Button>
                    </form>
                </div>
            </div>
        )
    }
}
