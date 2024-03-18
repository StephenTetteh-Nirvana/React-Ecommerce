import "../css/Cart.css"
import {useState,useContext} from "react"
import CloseCart from "../images/close-cart.png"
import {Link} from "react-router-dom"
import EmptyBag from "../images/empty-bag.png"
import CartProduct from "../components/CartProduct.jsx"
import GlobalState from "../GlobalState.js"



const Cart = () => {
  const [closeCart,setCloseCart] = useState(false)

  const { deleteFromCart } = useContext(GlobalState) 

  const cart = JSON.parse(localStorage.getItem("cart"))

  const toggleClose = () =>{
    setCloseCart(!closeCart)
  }



  return (
  <div className={`cart-outer-wrapper ${closeCart ? "closed" : ''}`}>
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
                      <CartProduct key={item.id} item={item}></CartProduct>
                    ))
                )
            }
      </div>
      {cart.length > 0 && <button className="checkout-btn">PROCEED TO CHECKOUT</button>}
      
    </div>
  </div>
  )
}

export default Cart
