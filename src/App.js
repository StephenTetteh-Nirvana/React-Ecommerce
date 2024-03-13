import "./App.css"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import Contact from "./pages/Contact.js"
import NotFound from "./pages/NotFound.js"
import User from "./pages/User.js"
import Products from "./pages/Products.js"
import Favorites from "./pages/Favorites.js"
import ProductPage from "./pages/ProductPage.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"




function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/user" element={<User/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>

        <Route path="/products" element={<Products/>}></Route>
        <Route path="/products/productPage/:id" element={<ProductPage/>}></Route>
        <Route path="/favorites" element={<Favorites/>}></Route>

      </Routes>
    </div>

  
  );
}

export default App;
