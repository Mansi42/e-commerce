import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useEffect } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        showProducts()
    }, [])

    const showProducts = async () => {
        let result = await fetch('http://localhost:8081/products ', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        setProducts(result)

    }

    const deleteProduct = async (id) => {
        let result = await fetch(`/products/${id}`, {
            method: "Delete",
            mode: 'cors',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        if (result) {
            alert("item is deleted")
            showProducts()
        }
        // let result = await fetch(`/products/${id}`, {
        //     method: "Delete"
        // })
        // result = await result.json();
        // if (result) {
        //     alert("item is deleted")
        //     showProducts()
        // }
        console.warn(id)
    }
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8081/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            showProducts()
        }
        console.warn(e.target.value)
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" placeholder="Search product" className="searchBox" onChange={searchHandle}></input>
            <ul >
                <li class="list-group-item list-group-item-info">S No.</li>
                <li class="list-group-item list-group-item-info">Name</li>
                <li class="list-group-item list-group-item-info">Price</li>
                <li class="list-group-item list-group-item-info">Company</li>
                <li class="list-group-item list-group-item-info">Category</li>
                <li class="list-group-item list-group-item-info">Operation</li>


            </ul>

            {
                products.length > 0 ? products.map((item, index) =>

                    <ul >

                        <li class="list-group-item list-group-item-info">{index + 1
                        }</li>
                        <li class="list-group-item list-group-item-info">{item.name}</li>
                        <li class="list-group-item list-group-item-info">{item.price}</li>
                        <li class="list-group-item list-group-item-info">{item.company}</li>
                        <li class="list-group-item list-group-item-info">{item.category}</li>
                        <li class="list-group-item list-group-item-info"><button class="btn btn-secondary" onClick={() => deleteProduct(item._id)}>Delete</button>
                            &nbsp; <Link to={"/update/" + item._id}><button class="btn btn-secondary">Update</button> </Link>
                        </li>

                    </ul>
                ) :
                    <h1>No products found</h1>
            }
        </div>
    )
}
export default ProductList;