import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import {toast} from "react-toastify"
import "../css/UserCard.css"
import User from "../images/user-two.png"
import Liked from "../images/product-favorite-red.png"
import Orders from "../images/orders.png"
import GlobalState from "../GlobalState"


const UserCard = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const { userObj,fetchCurrentUser } = useContext(GlobalState)

  const navigate = useNavigate()

  const userAuthentication = () =>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsLoggedIn(true)
      }
    })
  }

  const LogOut = async () =>{
    try{
      await signOut(auth)
      toast.success("You Logged Out",{
        autoClose:1000
      })
      navigate("/login")
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCurrentUser()
    userAuthentication()
  },[])


  return (
    <div className="user-card-container">
        <div className="user-card">
            <div className="user-image-section">
                <img src={User} alt="user-image"/>
                <h1>Hello,{userObj.userName}</h1>
            </div>
            
        <div className="favorites-orders-container">

            <Link to="/favorites" style={{ textDecoration: 'none' }}>
                <div className="favorites-box">
                <img src={Liked} alt="liked-icon"/>
                <h3>{favorites.length} Favorites</h3>
                </div>
            </Link>

            <div>
            <img className="orders-icon" src={Orders} alt="orders-icon"/>
            <h3>0 Orders</h3>
            </div>

        </div>
          { isLoggedIn ? (
            <button className="logout-btn" onClick={LogOut}>LogOut</button>
                 
          ) : (
            <Link to="/login">
            <button className="login-signup-btn">Login/SignUp</button>
          </Link>
          )
          }
            
        </div>

        </div>
  )
}

export default UserCard