import React, {useState,useEffect} from "react"
import Layout from './Layout';
import { getProducts } from "./Api";
import Card from './Card';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('solds').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

     const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
     }
    
    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    },[])


    return (
        <Layout title="Home Page" description='Candle'>
            <div className="container-title">
               <h2>New Arrivals</h2>
            </div>
            <div className="container-productByArrival">
                {productsByArrival.map((product, i) => (<Card key={i} product={product}/>))}
            </div>
            <div className="container-title">
              <h2>Best Sellers</h2>  
            </div>
            <div className="container-productBySell">
               {productsBySell.map((product, i) => (<Card key={i} product={product} />))} 
            </div>

        </Layout>
    )
}

export default Home;
