

const API = 'http://localhost:8000/api'


//SIGN UP COMPONENT METHODE//


 export const signup = (user) => {
         return fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch (err => {
        console.log(err)
    
        })
        
 }

 //SIGN IN COMPONENT METHODE//
    

 export const signin = (user) => {
         return fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch (err => {
        console.log(err)
    
        })
        
 }
    
// LOCAL STORAGE METHODE//

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

//SIGN OUT//

export const signout = (next) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
          next();
          return fetch(`${API}/signout`, {
              methode: 'GET',
          })
              .then(response => {
                  console.log('signout', response)
              })
              .catch(err => console.log(err));
    }
    
}

//METHODE HIDE LINK NAVBAR//

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false 
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}