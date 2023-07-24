
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
import AddProduct from './Components/Addproduct';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/add" element={<AddProduct></AddProduct>}></Route>
            <Route path="/update/:id" element={<UpdateProduct></UpdateProduct>}></Route>
            <Route path="/logout" element={<h1>logout</h1>}></Route>
            <Route path="/profile" element={<h1>profile</h1>}></Route>

          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>


        </Routes>
      </BrowserRouter>

      <Footer></Footer>
    </div>
  );
}

export default App;
