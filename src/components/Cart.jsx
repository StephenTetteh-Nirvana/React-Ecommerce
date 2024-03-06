import "../css/Cart.css"
import {Link} from "react-router-dom"
import {useState} from "react"
import EmptyBag from "../images/empty-bag.png"
import CloseCart from "../images/close-cart.png"



const Cart = () => {
  const [closeCart,setCloseCart] = useState(false)

  const src = "background.jpg"

  const toggleClose = () =>{
    setCloseCart(true)
  }
    const cart = [
      {
        name:"NIKE",
        price:50.99,
        source:src,
        quantity:1,
      }
   
    ]
  return (
    <div className={`wrapper ${closeCart ? "closed" : ''}`}>
      <div className="close-cart-box" onClick={toggleClose}>
        <img src={CloseCart}/>
      </div>
        {
            cart.length == 0 ? (
                <div className="no-items">
                  <div className="empty-bag-box">
                    <img src={EmptyBag}/>
                  </div>
                <h1>Your Bag is Empty</h1>
                <Link to="/men">
                  <button>Shop Now</button>
                </Link>
            </div>
            ) : ( 
                cart.map((cart)=>(
                    <div>
                      <h1>YOUR BAG</h1>
                      <div>
                        <img src={require(`../images/${cart.source}`)}/>
                        <h1>{cart.name}</h1>
                      </div>
                     
                       
                       <h1>{cart.price}</h1>
                       <h1>{cart.quantity}</h1>
                       </div> 
                ))
  
            )
        }
       
      
    </div>
  )
}

export default Cart
