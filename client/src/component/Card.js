import React from "react"
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';


const Card = ({ product }) => {
    return (
        <div className='container-card'>
            <div className='container-card__card'>
                    <div className='container-card__card__header'>{product.name}</div>
                <div className='container-card__card__header__body'>
                    <ShowImage item={product} url="products"/>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <Link to='/'>
                    <button>View Product</button>
                    </Link>
                <button>Add product to card</button>

                </div>
            </div>
        </div>
    )
    
}

export default Card