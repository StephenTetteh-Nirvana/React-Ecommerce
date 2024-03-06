import { useState } from "react"
import "../css/Navbar.css"
import Logo from "../images/logo.png"
import User from "../images/user.png"
import ShoppingBag from "../images/cart.png"
import Favorites from "../images/favorites.png"
import {Link} from "react-router-dom"
import MobileNavigations from "../components/MobileNavigations.jsx"
import Cart from "../components/Cart.jsx"

const Navbar = () => {
  const [mobileDisplay,setMobileDisplay] = useState(false);
  const [displayCart,setDisplayCart] = useState(false)

  const toggleCart = () =>{
    setDisplayCart(!displayCart)
  }

  return (
    <div className='nav-container'>
        <div className="first-section">
            <img src={Logo} alt='logo'/>
            <h3>YOU-SHOP</h3>
        </div>

        <div className="second-section">
            <ul>
              <Link className="to-men" to="/men">
               <li>Men</li>
              </Link>

                <Link className="to-women" to="/women">
                 <li>Women</li>
                </Link>

                  <Link className="to-accessories" to="/accessories">
                   <li>Accessories</li>
                  </Link>

                    <Link className="to-kids" to="/kids">
                      <li>Kids</li>
                    </Link>
            </ul>
        </div>



        <div className="user-section">
          <div onClick={toggleCart} className="cart-box">
              <img src={ShoppingBag} alt="user"/>
              <span>1</span>
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
