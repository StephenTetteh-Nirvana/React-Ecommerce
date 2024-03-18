import {useState,useContext,useEffect} from "react"
import {Link} from "react-router-dom"
import { db,auth } from "../firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc,getDoc} from "firebase/firestore"
import CloseCart from "../images/close-cart.png"
import EmptyBag from "../images/empty-bag.png"
import CartProduct from "../components/CartProduct.jsx"
import GlobalState from "../GlobalState.js"
import "../css/Cart.css"



const Cart = () => {
  const [closeCart,setCloseCart] = useState(false)
  const { deleteFromCart,fetchCurrentUserData } = useContext(GlobalState) 
  const cart = JSON.parse(localStorage.getItem("cart"))
  const [TotalAmount,setTotalAmount] = useState(0)

  const toggleClose = () =>{
    setCloseCart(!closeCart)
  }


  const totalAmount = () =>{
    onAuthStateChanged(auth,async (user)=>{
        if(user){
          try{
          const uid = user.uid;
          const userDocRef = doc(db,"Users",uid)
          const userDoc = await getDoc(userDocRef)
          const cartData = userDoc.data().cart;
          let total = 0
          cartData.forEach((product)=>{
            const sum = product.price * product.quantity;
            total += sum;
          })
          setTotalAmount(total)
          fetchCurrentUserData()
          console.log(TotalAmount)
          }catch(error){
            console.log(error)
          }
        }
    })
}

useEffect(()=>{
    totalAmount()
})




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
      {cart.length > 0 && (
      
      <div>
          <div>
            <h2>Total: ${TotalAmount.toLocaleString()}.00</h2>
          </div>
           <button className="checkout-btn" onClick={()=>deleteFromCart(item.id)}>PROCEED TO CHECKOUT</button>  
      </div>
           
      )
    }
      
    </div>
  </div>
  )
}

export default Cart
