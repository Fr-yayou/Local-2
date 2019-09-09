import React from 'react'


const API = 'http://localhost:8000/api'

const ShowImage = ({ item, url }) => (
    <div className="ShowImage-container">
        <img  className="ShowImage-container__photo" src={`${API}/${url}/photo/${item._id}`} alt={item.name}/>
    </div>
) 

export default ShowImage;