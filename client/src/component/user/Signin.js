import React,{useState}from "react";
import Layout from "../Layout";
import { Redirect } from "react-router-dom"
import { signin,authenticate,isAuthenticated } from "../auth/Methode";


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer:false,
    })

    const { email, password, error, loading, redirectToReferrer } = values
    const {user}= isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,err:false, loading:true})
        signin({ email, password })
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading:false})
            } else {
                authenticate(data, ()=> {
                    setValues({
                        ...values,
                        redirectToReferrer:true

                    })
                })
                    
            }
        })

    }
    const showError = () => (
        <div className="alert-SignIn" style={{ display: error ? '' : 'none' }}>
                 {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div>
                <h2>Loading....</h2>
            </div>)
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return<Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="user/dashboard"/>
            }
        }
        if (isAuthenticated()) {
             return <Redirect to="/"/>
            
        }
    }

    const signUpForm = () => (
        <div className="container-signIn">
            <form className="container-signIn__form">
                <div className="container-formSignIn">
                    <label className="container-formSignIn__email">Email</label>
                    <input className="container-formSignIn__email__inputEmail" onChange={handleChange ('email')} type="text" placeholder="Email" value={email} />
                </div>
                <div className="container-formSignIn">
                    <label className="container-formSignIn__email__inputEmail__password">Password</label>
                    <input className="container-formSignIn__email__inputEmail__password__inputPassword" onChange={handleChange ('password')}  type="password" placeholder="Password" value={password} />
                </div>
                <button className="btn-signIn" onClick={clickSubmit}>SignIn</button>
            </form>
        </div>

    )
    return (
        <Layout title="Signup" description='Signup to Local'>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
    </Layout>
    )
}
export default Signin;