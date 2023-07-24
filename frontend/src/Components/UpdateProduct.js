import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(true);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        console.warn(params);
        getDetails();
    }, [])

    const getDetails = async () => {
        let result = await fetch(`http://localhost:8081/products/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        console.warn(result)
        setName(result.name)
        setPrice(result.price)
        setCompany(result.company)
        setCategory(result.category)
    }
    const updateproduct = async () => {
        let result = await fetch(`http://localhost:8081/products/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, company, category }),
            headers: {

                'Content-Type': "application/JSON",

                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`


            }
        })
        result = await result.json();
        navigate("/")
        console.log(result)
        //console.warn(name, price, company, category)
    }


    return (
        <div className="productform">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"></input>
            {/* {error && !name && <span className="invalid-input">Enter valid name!</span>} */}
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price"></input>
            {/* {error && !price && <span className="invalid-input">Enter valid price!</span>} */}
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter company"></input>
            {/* {error && !company && <span className="invalid-input">Enter valid company!</span>} */}
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category"></input>
            {/* {error && !category && <span className="invalid-input">Enter valid category!</span>} */}
            <button onClick={updateproduct} className="btn btn-primary" type="submit">Update Product</button>
        </div>
    )
}
export default UpdateProduct;