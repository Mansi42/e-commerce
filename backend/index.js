const express = require('express')
const ObjectID = require('mongodb').ObjectID
const cors = require("cors")
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "DELTE", "POST"]
}))

app.post("/register", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
            res.send({ result: 'something went wrong , please try later !' })
        }
        res.send({ result, auth: token })
    })

})

app.post("/login", async (req, res) => {
    let user = await User.findOne(req.body).select("-password")
    if (req.body.password && req.body.email) {
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: 'something went wrong , please try later !' })
                }
                res.send({ user, auth: token })
            })

        } else {
            res.send({ result: 'no user found' })
        }
    } else {
        res.send({ result: 'no user found' })
    }



})

app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result);

})

app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ Result: "No product find" })
    }

})

app.delete("/products/:id", verifyToken, async (req, res) => {
    console.log(req.params.id)
    let result = await Product.deleteOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no record found!" })
    }

})


app.get("/products/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    res.send(result)

})

app.put("/products/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    })
    res.send(result)

})
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result)

})

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        console.warn("middleware called", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please add valid token" })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }


}





app.listen(8081);