import React,{Component} from 'react';
import {Link} from 'react-router'



import logo from '../../img/logo.png';

export default class MobileNewsHeader extends Component{
    render(){
        return (
            <div id="mobileheader">
                <header>
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <span>NewsReact</span>
                        </Link>
                    </div>
                </header>
            </div>
        )
    }
}
