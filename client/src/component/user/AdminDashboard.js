import React from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()
    
    const adminLinks = () => {
        return (
            <div>
                <h4> Admin Links</h4>
                  <ul>
                    <li><Link to="/create/category">Create Category</Link></li>
                    <li><Link to="/create/product">Create Product</Link></li>
                </ul>
            </div>
        )
    }
    const AdminInfos = () => {
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
    


    return (
        <Layout title="Dashboard" description={`Welcome ${name}!`}>
            <div className="adminDashboard-container">
                <div className="adminDashboard-container__columnOne">
                    {adminLinks()}
                </div>
                <div className="adminDashboard-container__column1__columnTwo">
                    {AdminInfos()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;