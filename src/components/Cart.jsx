import "../css/Cart.css"
import {Link} from "react-router-dom"
import {useState} from "react"
import EmptyBag from "../images/empty-bag.png"
import CloseCart from "../images/close-cart.png"
import {useContext} from "react"
import GlobalState from "../GlobalState.js"
import CartProduct from "../components/CartProduct"



const Cart = () => {
  const [closeCart,setCloseCart] = useState(false)

  const src = "background.jpg"

  const { cart } = useContext(GlobalState) 

  const toggleClose = () =>{
    setCloseCart(!closeCart)
  }
  return (
    <div className={`wrapper ${closeCart ? "closed" : ''}`}>
      <div className="close-cart-box" onClick={toggleClose}>
        <img src={CloseCart}/>
      </div>
      <p className="cart-heading">YOUR BAG ({cart.length} items)</p>

      <div className="cart-product-container">
          {
                cart.length == 0 ? (
                    <div className="no-items">
                      <div className="empty-bag-box">
                        <img src={EmptyBag}/>
                      </div>
                    <h1>Your Bag is Empty</h1>
                    <Link to="/products">
                      <button>Shop Now</button>
                    </Link>
                </div>
                ) : ( 
                    cart.map((item)=>(
                      <CartProduct item={item}></CartProduct>
                    ))
                )
            }
      </div>
      
    </div>
  )
}

export default Cart
