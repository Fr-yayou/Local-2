import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./Home";
import "../style/routes.css"
import Navbar from "./Navbar";

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;