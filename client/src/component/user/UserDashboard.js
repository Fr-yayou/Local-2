import React from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import { Link } from "react-router-dom";

const UserDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()
    
    const userLinks = () => {
        return (
            <div className="container-userLink">
                <h4 className="container-userLink__title">Links</h4>
                  <ul className="container-userLink__title__list">
                    <li id="cart"><Link className="container-userLink__title__list__cart"to="/cart">My Cart</Link></li>
                    <li><Link className="container-userLink__title__list__cart__update" to="/profile/update">Update Profile</Link></li>
                </ul>
            </div>
        )
    }
    const userInfos = () => {
        return (
             <div className="container-userInfo">
                <h3 className="container-userInfo__title">User Informations</h3>
                <ul className="container-userInfo__title__list">
                    <li className="container-userInfo__title__list__name">{name}</li>
                    <li className="container-userInfo__title__list__name__email">{email}</li>
                    <li className="container-userInfo__title__list__name__email__role">{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        )
    }

    const userHistory = () => {
        return (
               <div className="container-userHistory">
                <h3 className="container-userHistory__title">Purchase History</h3>
                <ul className="container-userHistory__title__list">
                    <li className="container-userHistory__title__list__histo">History</li>
                </ul>
            </div>
        )
    }
    


    return (
        <Layout title="Dashboard" description={`Welcome ${name}!`}>
            <div className="userDashboard-container">
                <div className="userDashboard-container__columnOne">
                    {userLinks()}
                </div>
                <div className="userDashboard-container__columnOne__columnTwo">
                    {userInfos()}
                </div>
                <div className="userDashboard-container__columnOne__columnTwo__columnThree">
                     {userHistory()}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;