import React from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()
    
    const adminLinks = () => {
        return (
            <div className="container-adminLink">
                <h4 className="container-adminLink__title"> Admin Links</h4>
                  <ul className="container-adminLink__title__list">
                    <li class="space"><Link className="container-adminLink__title__list__cat" to="/create/category">Create Category</Link></li>
                    <li class="space"><Link className="container-adminLink__title__list__cat__prod" to="/create/product">Create Product</Link></li>
                    <li><Link className="container-adminLink__title__list__cat__prod__manage" to="/admin/product">Manage Product</Link></li>
                </ul>
            </div>
        )
    }
    const AdminInfos = () => {
        return (
             <div className="container-adminInfos">
                <h3 className="container-adminInfos__title">User Information</h3>
                <ul className="container-adminInfos__title__list">
                    <li  className="container-adminInfos__title__list__name">{name}</li>
                    <li className="container-adminInfos__title__list__name__email">{email}</li>
                    <li className="container-adminInfos__title__list__name__email__role">{role === 1 ? 'Admin' : 'Registered User'}</li>
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
                <div className="adminDashboard-container__columnOne__columnTwo">
                    {AdminInfos()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;