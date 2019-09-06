import React,{useState} from "react";
import Layout from "../Layout";
import { Link } from 'react-router-dom';
import { signup } from '../auth/Methode';


const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        sucess: false,
    })

    const{name,email,password,sucess,error} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,err:false})
        signup({ name, email, password })
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, sucess:false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    password: '',
                    email: '',
                    error: '',
                    sucess:true
                    
                })
            }
        })

    }
    const showError = () => (
        <div className="alert" style={{ display: error ? '' : 'none' }}>
                 {error}
        </div>
    )

    const showSucess = () => (
        <div className="alert" style={{ display: sucess ? '' : 'none' }}>
            New account is created.Please  <Link to="/signin">Signin</Link>

        </div>
    )

    const signUpForm =() => (
        <form>
            <div>
                <label>Name</label>
                <input onChange={handleChange('name')}  type="text" placeholder="Name" value={name} />
            </div>
            <div>
                <label>Email</label>
                <input onChange={handleChange ('email')} type="text" placeholder="Email" value={email} />
            </div>
             <div>
                <label>Password</label>
                <input onChange={handleChange ('password')}  type="password" placeholder="Password" value={password} />
            </div>
            <button onClick={clickSubmit}>Submit</button>
        </form>
    )
    return (
        <Layout title="Signup" description='Signup to Local'>
            {showSucess()}
            {showError()}
            {signUpForm()}
    </Layout>
    )
}

    export default Signup;