import React from "react"
import { Link, withRouter } from "react-router-dom";
import Logo from "../assets/Local.png"

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' };
    }
    else {
        return { color: '' };
    }
}

const Navbar = ({history}) => (
    <div className="Navbar-container">
        <div className="container-logo">
            <img className="container-logo__cat" src={Logo} alt="logo"/>
        </div>
        <div className="container-link">
            <ul className="container-link__list">
                <li>
                    <Link className="container-link__list__home" style={isActive(history,'/')} to="/">Home</Link>
                </li>
                <li>
                     <Link className="container-link__list__home__signin" style={isActive(history,'/signin')}  to="/signin">Signin</Link>
                </li>
                <li>
                     <Link className="container-link__list__home__signin__signup" style={isActive(history,'/signup')}   to="/signup">Signup</Link>
                </li>

            </ul>

        </div>

    </div>
)

export default withRouter(Navbar);