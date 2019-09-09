import React from "react"
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';


const Card = ({ product }) => {
    return (
        <div className='container-card'>
            <div className='container-card__card'>
                <div className='container-card__card__header'>
                    <h2 className='container-card__card__header__title'>{product.name}</h2>
                </div>
                <div className='container-card__card__header__title__body'>
                    <ShowImage item={product} url="products"/>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <div className="container-btn-card">
                        <Link id="btn" to='/'>
                            <button className="container-btn-card__viewProduct">Product</button>
                        </Link>
                        <button className="container-btn-card__viewProduct__cart">Add to Cart</button>
                    </div>

                </div>
            </div>
        </div>
    )
    
}

export default Card