import React,{Fragment} from "react"
import { Link, withRouter } from "react-router-dom";
import Logo from "../assets/Local.png"
import {signout,isAuthenticated } from './auth/Methode'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#cf3333' };
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
                        <Link className="container-link__list__home" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li>
                        <Link className="container-link__list__home" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link className="container-link__list__home__signin" style={isActive(history, '/signin')} to="/signin">SignIn</Link>
                        </li>
                        <li>
                            <Link className="container-link__list__home__signin__signup" style={isActive(history, '/signup')} to="/signup">SignUp</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <div>
                        <li>
                            <span className="container-link__list__home__signin__signup" onClick={() => signout(() => { history.push('/') })} style={{ cursor: 'pointer', color: '' }}>SignOut</span>
                        </li>

                    </div>
                )}

            </ul>

        </div>

    </div>
)

export default withRouter(Navbar);