import { useState,useContext } from "react"
import { Link } from "react-router-dom"
import Logo from "../images/logo.png"
import User from "../images/user.png"
import ShoppingBag from "../images/cart.png"
import Favorites from "../images/favorites.png"
import Cart from "../components/Cart.jsx"
import GlobalState from "../GlobalState.js"
import "../css/Navbar.css"

const Navbar = () => {
  const [displayCart,setDisplayCart] = useState(false)
  const {cart} = useContext(GlobalState)

  const toggleCart = () =>{
    setDisplayCart(!displayCart)
  }

  return (
    <div className='nav-container'>
      <div className="first-section">
        <Link to="/">
          <img src={Logo} alt='logo'/>
        </Link>
        <h3>YOU-SHOP</h3>
      </div>

      <div className="user-section">
        <div className="cart-box">
            <img onClick={toggleCart} src={ShoppingBag} alt="user"/>
            <span>{cart.length}</span>
        </div>
        
        { displayCart && <Cart setDisplayCart={setDisplayCart}/> }

        <div className="favorites-box">
          <Link to="/favorites">
            <img src={Favorites} alt="user"/>
          </Link>
        </div>

        <div className="currentUser-info">
          <Link to="/user">
            <img src={User} alt="user"/>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Navbar
