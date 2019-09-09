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
        <div className="alert-SignUp" style={{ display: error ? '' : 'none' }}>
                 {error}
        </div>
    )

    const showSucess = () => (
        <div className="sucess-SignUp" style={{ display: sucess ? '' : 'none' }}>
            New account is created.Please  <Link to="/signin">Signin</Link>

        </div>
    )

    const signUpForm = () => (
        <div className="container-signUp">
            <form className="container-signUp__form">
                <div className="container-formSignUp">
                    <label className="container-formSignUp__name">Name</label>
                    <input className="container-formSignUp__name__nameInput" onChange={handleChange('name')}  type="text" placeholder="Name" value={name} />
                </div>
                <div className="container-formSignUp">
                    <label className="container-formSignUp__name__nameInput__email" >Email</label>
                    <input className="container-formSignUp__name__nameInput__email__emailInput" onChange={handleChange ('email')} type="text" placeholder="Email" value={email} />
                </div>
                 <div className="container-formSignUp">
                    <label className="container-formSignUp__name__nameInput__email__emailInput__password">Password</label>
                    <input className="container-formSignUp__name__nameInput__email__emailInput__password__passwordInput" onChange={handleChange ('password')}  type="password" placeholder="Password" value={password} />
                </div>
                <button className="btn-signUp" onClick={clickSubmit}>SignUp</button>
            </form>

        </div>
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