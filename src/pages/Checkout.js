import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc,doc, updateDoc } from "firebase/firestore";
import "../css/Checkout.css"
import CartLoader from "../components/CartLoader";
import Arrow from "../images/icons8-back-arrow-50.png"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
     const cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : []
     const navigate = useNavigate();
     const [orders,setOrders] = useState([])
     const [loading,setLoading] = useState(false)
     const [TotalAmount,setTotalAmount] = useState(0)
     const [email,setEmail] = useState("")
     const [cardDetails,setcardDetails] = useState("")
     const [expDate,setexpDate] = useState("")
     const [cvc,setCvc] = useState("")
     const [fullName,setfullName] = useState("")
     
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
  },[])

  const completePurchase = async () =>{
      if(email === "" || (cardDetails === "" || expDate === "" || cvc === "" || fullName === "")){
         toast.error("Complete The Form",{
          autoClose:1500,
          position:"top-center"
         })
      }else{
        try{
          setLoading(true)
          onAuthStateChanged(auth,async(user)=>{
            if(user){
              const uid = user.uid;
              const docRef = doc(db,"Users",uid)
              const userDoc = await getDoc(docRef)

              if(userDoc.exists){
                const cartData = userDoc.data().cart
                const orderData = userDoc.data().order
                const newOrderArr = [...orderData,...cartData]
                await updateDoc(docRef,{
                  order:newOrderArr,
                  cart:[]
                })

                setLoading(false)
                localStorage.setItem("orders",JSON.stringify(orders))
                toast.success("Order Completed Successfully",{
                  autoClose:2500,
                  position:"top-center"
                })
                navigate("/orders")
                console.log("new order",newOrderArr)
              }
            }
          })

        }catch(error){
          setLoading(false)
          toast.error("Oops...An Error Occurred",{
            autoClose:2000,
            position:"top-center"
          })
          console.log(error)
        } 
      }
  }
          



  return (
    <div>
       <Navbar/>
    <div className="checkout-container">
      <div className="checkout-product-container">
          <h2>Order Summary</h2>
          <div className="order-summary-products-container">
            <ul className="products-table">
              <li>Product</li>
              <li>Name</li>
              <li>Price</li>
              <li>Qty</li>
            </ul>

          <div className="products">
              {
                cart.map((product)=>(
                  <div key={product.id} className="checkout-product-box">

                    <div className="first-section">
                      <img src={require(`../images/${product.image}`)}/>
                    </div>

                    <div className="second-section">
                       <h3>{product.name}</h3>
                    </div>

                    <div className="third-section">
                      <h3>${product.price}.00</h3>
                    </div>

                    <div className="fourth-section">
                      <h3>x {product.quantity}</h3>
                    </div>
                </div>
              ))}
          </div>
        </div>
       
      </div>
    <div className="payment-container">
       <section className="payment-form">
        <h3>PAYMENT DETAILS</h3>
        <p>Complete your purchase by providing your payment details.</p>
        <div className="payment-input-container">
            <div className="input-btn1">
              <label>Email Address</label><br/>
              <input type="text" placeholder="eg.stephen@gmail.com" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="input-btn2" >
                <label>Card Details</label><br/>
                <input type="number" placeholder="4242 4242 4242 4242"  
                value={cardDetails} 
                onChange={(e)=>setcardDetails(e.target.value)}
                />
            </div>

            <div className="input-btn3">
                <label>Exp.Date</label><br/>
                <input type="date" placeholder="MM/YY" 
                value={expDate}
                onChange={(e)=>setexpDate(e.target.value)}
                />
            </div>
            
            <div className="input-btn4">
                <label>CVC</label><br/>
                <input type="number" placeholder="4242" 
                value={cvc} 
                onChange={(e)=>setCvc(e.target.value)}
                />
            </div>

            <div className="input-btn5">
                <label>Full Name</label><br/>
                <input type="text" placeholder="John Doe" 
                value={fullName} 
                onChange={(e)=>setfullName(e.target.value)}
                />
            </div> 
        </div>

        <div className="payment-bottom-section">
            <div className="total-payment-section">
                <div>
                    <p>SubTotal</p>
                    <p>${TotalAmount.toLocaleString()}.00</p>
                </div>

                  <div>
                    <p>Delivery Fee</p>
                    <p>$0.00</p>
                  </div>

                <div className="total">
                    <p>Total</p>
                    <p>${TotalAmount.toLocaleString()}.00</p>
                </div>
            </div>
           <button className="purchase-btn" onClick={completePurchase}>Pay ${TotalAmount.toLocaleString()}.00</button>
        </div>
       </section>
    </div>
    {loading && <CartLoader/>}
  </div>
  </div>
  )
}

export default Checkout
