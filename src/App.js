import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.js"
import NotFound from "./pages/NotFound.js"
import User from "./pages/User.js"
import Products from "./pages/Products.js"
import Favorites from "./pages/Favorites.js"
import Orders from "./pages/Orders.js"
import Checkout from "./pages/Checkout.js"
import ProductPage from "./pages/ProductPage.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"




function App() {
  return (
    <div className="App">
      <ToastContainer/>
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/user" element={<User/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>

        <Route path="/products" element={<Products/>}></Route>
        <Route path="/products/productPage/:id" element={<ProductPage/>}></Route>
        <Route path="/favorites" element={<Favorites/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
      </Routes>
    </div>

  
  );
}

export default App;
