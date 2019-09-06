import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./Home";
import "../style/routes.css"
import Navbar from "./Navbar";
import UserDashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;