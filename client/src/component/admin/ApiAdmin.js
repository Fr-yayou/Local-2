const API = 'http://localhost:8000/api'


//CREATE CATEGORY/


 export const createCategory = (userId, token, category) => {
         return fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json()
        })
        .catch (err => {
        console.log(err)
    
        })
        
 }

 //CREATE NEW PRODUCT

  export const createProduct = (userId, token, product) => {
         return fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                Authorization:`Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json()
        })
        .catch (err => {
        console.log(err)
    
        })
        
  }

  //GET THE CATEGORIES//
 
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
}
  

//METHODE GET PRODUCTS 

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
}


//METHODE GET ONE PRODUCT//

export const getProduct = (productId) => {
    return fetch(`${API}/products ${productId}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
}


//METHODE UPDATE PRODUCT

export const updateProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//DELETE PRODUCT//

export const deleteProduct = (productId, userId, token,product ) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
