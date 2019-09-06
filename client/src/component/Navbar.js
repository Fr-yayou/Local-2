import React,{Fragment} from "react"
import { Link, withRouter } from "react-router-dom";
import Logo from "../assets/Local.png"
import {signout,isAuthenticated } from './auth/Methode'

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
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li>
                        <Link className="container-link__list__home" style={isActive(history, '/user/dashboard')} to="/user/dashboard">dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li>
                        <Link className="container-link__list__home" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">dashboard</Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link className="container-link__list__home__signin" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li>
                            <Link className="container-link__list__home__signin__signup" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <div>
                        <li>
                            <span className="container-link__list__home__signin__signup" onClick={() => signout(() => { history.push('/') })} style={{ cursor: 'pointer', color: '' }}>Signout</span>
                        </li>

                    </div>
                )}

            </ul>

        </div>

    </div>
)

export default withRouter(Navbar);