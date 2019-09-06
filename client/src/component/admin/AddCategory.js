import React, {useState}from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import createCategory from "./ApiAdmin";

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState('false')
    const [sucess, setSucess] = useState('false')
    

    //USER INFOS AND TOKEN FROM LOCALSTORAGE//

    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
        
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSucess(false)
        //MAKE REQUEST TO THE API//
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("");
                    setSucess(true);
                }
        })
        
        
        
    }
    
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div>
                <label>Name</label>
                <input type="text" onChange={handleChange} value={name}/>
            </div>
            
            <button>Create Category</button>
        </form>
    )

    const showSucess = () => {
        if (sucess) {
            return <h3>{name} is created</h3>
        }
    }
       const showError = () => {
        if (error) {
            return <h3>Category should be unique</h3>
        }
    }

      return (
        <Layout title="Add a Category" description={`Create a new category ${user.name}!`}>
              <div>
                  {showSucess()}
                  {showError()}
                  {newCategoryForm()}
            </div>
        </Layout>
    )
    
}
export default AddCategory;

