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
import { db,auth } from "../firebase.js"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [mobileDisplay,setMobileDisplay] = useState(false);
  const [displayCart,setDisplayCart] = useState(false)
  const [userObj,setuserObj] = useState([])

  const cart = JSON.parse(localStorage.getItem("cart"))
  const {fetchCurrentUserData,fetchFavorites } = useContext(GlobalState)

  const toggleCart = () =>{
     setDisplayCart(!displayCart)
  }

  const fetchCurrentUser = () =>{
    onAuthStateChanged(auth,async (user)=>{
     if(user){
       try{
         const uid = user.uid;
         const colRef = doc(db,"Users",uid)
         const userDoc = await getDoc(colRef)
         if(userDoc.exists){
             const userData = userDoc.data();
             setuserObj(userData)
           }else{
             console.log("document not recieved in time ")
           }
       }
       catch(error){
          console.log(error)
       }
   }
    })
}

  useEffect(()=>{
    fetchCurrentUser()
    fetchFavorites()
    fetchCurrentUserData()
  },[])

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
              <img onClick={()=>toggleCart()} src={ShoppingBag} alt="user"/>
              <span>{cart.length}</span>
          </div>
          
          { displayCart ? (
                <Cart/>
          ) : (
               <h1>False</h1>
          )
        }

          <div className="favorites-box">
            <Link to="/favorites">
              <img src={Favorites} alt="user"/>
            </Link>
          </div>

          <div className="currentUser-info">
            <Link to="/user">
              <img src={User} alt="user"/>
              { userObj ? (
               <span>Hi {userObj.userName}</span>
              ) : (
                <span></span>
              )}
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
