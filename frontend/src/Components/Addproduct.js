import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(true);
    const navigate = useNavigate();


    const addproduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !company || !category) {
            setError(true)
            return false;
        }
        console.log(name, price, company, category)
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:8081/add-product ', {
            method: 'post',
            body: JSON.stringify({ name, price, company, category, userId }),
            headers: {
                'Content-Type': "application/JSON",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result)
        setName('');
        setPrice('')
        setCompany('')
        setCategory('')
    }

    return (
        <div className="productform">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"></input>
            {/* {error && !name && <span className="invalid-input">Enter valid name!</span>} */}
            <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price"></input>
            {/* {error && !price && <span className="invalid-input">Enter valid price!</span>} */}
            <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter company"></input>
            {/* {error && !company && <span className="invalid-input">Enter valid company!</span>} */}
            <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category"></input>
            {/* {error && !category && <span className="invalid-input">Enter valid category!</span>} */}
            <button onClick={addproduct} className="btn btn-primary" type="submit">Add Product</button>
        </div>
    )
}
export default AddProduct;