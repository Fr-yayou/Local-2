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
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";


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
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/product" exact component={ManageProduct} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;