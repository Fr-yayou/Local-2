import React from 'react'


const API = 'http://localhost:8000/api'

const ShowImage = ({ item, url }) => (
    <div>
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name}/>
    </div>
) 

export default ShowImage;