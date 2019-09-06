import React, {useState}from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../auth/Methode'
import {createCategory} from "./ApiAdmin";
import { Link } from "react-router-dom";

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [sucess, setSuccess] = useState(false)
    

    //USER INFOS AND TOKEN FROM LOCALSTORAGE//

    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
        
    }
    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // MAKE REQUEST TO THE API 
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };
    
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
    const goBack = () => (
        <div>
            <Link to="/admin/dashboard">Back to Dashboard</Link>
        </div>
    )
    
    
    
    

      return (
        <Layout title="Add a Category" description={`Create a new category ${user.name}!`}>
              <div>
                  {showSucess()}
                  {showError()}
                  {newCategoryForm()}
                  {goBack()}
            </div>
        </Layout>
    )
    
}
export default AddCategory;

//NEED TO DOUBLE CHECK ERROR MESSAGE//

