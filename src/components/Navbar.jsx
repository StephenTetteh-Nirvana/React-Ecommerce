import { useState,useEffect,useContext } from "react"
import "../css/Navbar.css"
import Logo from "../images/logo.png"
import User from "../images/user.png"
import ShoppingBag from "../images/cart.png"
import Favorites from "../images/favorites.png"
import {Link} from "react-router-dom"
import MobileNavigations from "../components/MobileNavigations.jsx"
import Cart from "../components/Cart.jsx"
import GlobalState from "../GlobalState.js"

const Navbar = () => {
  const [mobileDisplay,setMobileDisplay] = useState(false);
  const [displayCart,setDisplayCart] = useState(false)

  const toggleCart = () =>{
    setDisplayCart(!displayCart)
  }

  useEffect(() => {
  }, [displayCart]);

  const { cart } = useContext(GlobalState)

  return (
    <div className='nav-container'>
        <div className="first-section">
          <Link to="/">
            <img src={Logo} alt='logo'/>
          </Link>
            <h3>YOU-SHOP</h3>
        </div>

        <div className="user-section">
          <div onClick={toggleCart} className="cart-box">
              <img src={ShoppingBag} alt="user"/>
              <span>{cart.length}</span>
          </div>
          
          {displayCart && <Cart/>}

          <div className="favorites-box">
            <Link to="/favorites">
              <img src={Favorites} alt="user"/>
            </Link>
          </div>

          <div>
            <Link to="/user">
              <img src={User} alt="user"/>
            </Link>
          </div>
         
        </div>

        <div className="hamburger-container">
          <button onClick={()=> setMobileDisplay(!mobileDisplay)}>Open</button>
        </div>

        {mobileDisplay && <MobileNavigations/>}
    </div>
  )
}

export default Navbar
