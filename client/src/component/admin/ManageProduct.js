import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { isAuthenticated } from "../auth/Methode";
import { Link } from "react-router-dom";
import {getProducts , deleteProduct} from './ApiAdmin';

const ManageProduct = () => {

    const [products, setProducts] = useState([])
    
    const {user,token}= isAuthenticated()
    
    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const eraseProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    },[])
        return (
        <Layout title="Manage Product" description=''>
                <div className='container-ManageProduct'>
                    <h2 className='container-ManageProduct__title'>Total {products.length} products</h2>
                    {products.map((p, i) => (
                            <ul className='container-ManageProduct__title__list'>
                                <li className='container-ManageProduct__title__list__name' key={i}>{p.name}</li>
                                <li className='container-ManageProduct__title__list__name__quantity' >{p.quantity}</li>
                                <li className='container-ManageProduct__title__list__name__quantity__price' >${p.price}</li>
                            <div className='container-btn-Manage'>
                                <Link className='container-btn-Manage__LinkUpdate' to={`/admin/product/update/${p._id}`}>
                                    <button className='container-btn-Manage__LinkUpdate__btnOne' onClick={ ()=>eraseProduct(p._id)}>Update</button>
                                </Link>
                                    <button className='container-btn-Manage__LinkUpdate__btnOne__LinkDelete' onClick={ ()=>eraseProduct(p._id)}>Delete</button>
                            </div>
                             </ul>
                        ))}
            </div>

        </Layout>
    )
}

export default ManageProduct;