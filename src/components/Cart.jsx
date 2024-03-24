import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import CloseCart from "../images/close-cart.png"
import EmptyBag from "../images/empty-bag.png"
import CartProduct from "../components/CartProduct.jsx"
import "../css/Cart.css"



const Cart = ({setDisplayCart}) => {
  const [closeCart,setCloseCart] = useState(false) 
  const cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")):[]
  const [TotalAmount,setTotalAmount] = useState(0)

  const toggleClose = () =>{
    setCloseCart(!closeCart)
    setDisplayCart(false)
  }


  const totalAmount = () =>{
    try{
        let total = 0;
        cart.forEach((product)=>{
        const sum = product.price * product.quantity;
        total += sum;
      })
      setTotalAmount(total)
      console.log(total)
      }catch(error){
      console.log(error)
    }
  }
          

useEffect(()=>{
    totalAmount()
})




  return (
  <div className={`cart-outer-wrapper ${closeCart ? "closed" : ""}`}>
    <div className={`wrapper ${closeCart ? "closed" : ""}`}>
      <div className="close-cart-box" onClick={toggleClose}>
        <img src={CloseCart} alt="CloseCart"/>
      </div>
      <p className="cart-heading">YOUR BAG ({cart.length} items)</p>

      <div>
          {
                cart.length === 0 ? (
                    <div className="no-items">
                      <div className="empty-bag-box">
                        <img src={EmptyBag} alt="EmptyBag"/>
                      </div>
                    <h1>Your Bag is Empty</h1>
                    <Link to="/products">
                      <button>Shop Now</button>
                    </Link>
                </div>
                ) : ( 
                  <div>
                    <div className="cart-product-container">
                       {
                          cart.map((item)=>(
                            <CartProduct key={item.id} item={item}></CartProduct>
                          ))
                          }
                    </div>
                        
                  <div className="bottom-section">
                        <div>
                          <h2>Total: ${TotalAmount.toLocaleString()}.00</h2>
                        </div>
                        <Link to="/checkout"><button className="checkout-btn">PROCEED TO CHECKOUT</button></Link>
                       </div>
                  </div>
  
                )
            }
      </div>
      
    </div>
  </div>
  )
}

export default Cart