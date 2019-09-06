import React, {useState, useEffect}from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import {createProduct} from "./ApiAdmin";
import { Link } from "react-router-dom";

const AddProduct = () => {
const {user,token,} = isAuthenticated ()
    return (
        <Layout title="Add a Product" description={`Create a new Product ${user.name}!`}>
            <div>
                ......
            </div>
        </Layout>
    )

}

export default AddProduct;