import React from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import { Link } from "react-router-dom";

const UserDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()
    
    const userLinks = () => {
        return (
            <div>
                <h4>Links</h4>
                  <ul>
                    <li><Link to="/cart">My Cart</Link></li>
                    <li><Link to="/profile/update">Update Profile</Link></li>
                </ul>
            </div>
        )
    }
    const userInfos = () => {
        return (
             <div>
                <h3>User Information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        )
    }

    const userHistory = () => {
        return (
               <div>
                <h3>Purchase History</h3>
                <ul>
                    <li>History</li>
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
                <div className="userDashboard-container__column1__columnTwo">
                    {userInfos()}
                    {userHistory()}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;