import React from 'react';
import {
    Link,
} from "react-router-dom";
import './Navbar.scss';
import navbar_utils from "./Navbar_utils"

// Sourced from https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
class Navbar extends React.Component {
    render() {
        return (
                <div id="navbar" className="topnav">
                    <Link to="/" id="homeLink">Home</Link>
                    <Link to="/play" id="playLink">Play</Link>
                    <Link to="/rules" id="rulesLink">Rules</Link>
                    <Link to="" className="icon" onClick={navbar_utils.openMenu}>
                        <i className="fa fa-bars"></i>
                    </Link>
                </div>
        )
    }
}

export default Navbar;