
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { isAuthenticated } from "../auth/Methode";
import { Link } from "react-router-dom";
import { createProduct,getCategories } from './ApiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //LOAD CATEGORIES AND SET FORM DATA //

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values ,error:data.error})
            } else {
                setValues({...values, categories:data, formData: new FormData ()})
            }
        })
    }



    useEffect(() => {
        init()
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const goBack = () => (
        <div className="container-backDash">
            <Link className="container-backDash__dashboard" to="/admin/dashboard">Back to Dashboard</Link>
    </div>
    )

    const showError = () => (
        <div className="container-showError" style={{ display: error ? '': 'none' }}>
            {error}

        </div>
    )
    //DOUBLE CHECK THE BCK END //

    const showSucess = () => (
        <div className="container-showSucess" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div>
            <h2>Loading...</h2>
        </div>)
    )

    const newPostForm = () => (
        <form className="AddProduct-container" onSubmit={clickSubmit}>
            <h4 className="AddProduct-container__title">Post Photo</h4>
            <div>
                <label>
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="container-input">
                <label className="container-input__name">Name</label>
                <input className="container-input__name__type" onChange={handleChange("name")} type="text" value={name}/>
            </div>

            <div  className="container-input">
                <label className="container-input__name">Description</label>
                <textarea className="container-input__name__type" onChange={handleChange("description")} value={description}/>
            </div>

            <div className="container-input">
                <label className="container-input__name">Price</label>
                <input className="container-input__name__type" onChange={handleChange("price")} type="number" value={price}/>
            </div>

            <div className="container-input">
                <label className="container-input__name">Category</label>
                <select className="container-input__name__type" onChange={handleChange("category")}>
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div className="container-input">
                <label className="container-input__name">Shipping</label>
                <select className="container-input__name__type" onChange={handleChange("shipping")}>
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="container-input">
                <label className="container-input__name">Quantity</label>
                <input className="container-input__name__type" onChange={handleChange("quantity")} type="number" value={quantity}/>
            </div>
            <button className="container-btn-AddProduct">Create Product</button>
        </form>
    );

    return (
        <Layout title="Add a new product" description={`Create a new Product ${user.name}!`}>
            <div>
                <div>
                    {showLoading()}
                    {showSucess()}
                    {showError()}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;

