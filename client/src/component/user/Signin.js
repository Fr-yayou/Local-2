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
        <div className="alert" style={{ display: error ? '' : 'none' }}>
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

    const signUpForm =() => (
        <form>
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
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
    </Layout>
    )
}
export default Signin;