import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { db,auth } from "../firebase.js"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { collection,doc,setDoc } from "firebase/firestore"
import "../css/Register.css"
import { toast } from "react-toastify"
import CartLoader from "../components/CartLoader.jsx"


const Register = () => {
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const RegisterUser = async () => {
    if(userName === "" || email === "" && password === "" || passwordConfirm === ""){
      toast.error("Complete the form",{
        autoClose:2500,
        pauseOnHover:true,
        position:"top-center"
      })
      
    } else{
      if(password === passwordConfirm){
        try{
          setLoading(true)
          await createUserWithEmailAndPassword(auth,email,password)
          onAuthStateChanged(auth,async(user)=>{
            if(user){
              const colRef = collection(db,"Users")
              const userDoc = doc(colRef,user.uid)
              await setDoc(userDoc,{
                userName:userName,
                cart: [],
                order: [],
                favorites: []
              })
              toast.success("Account created succesfully",{
                autoClose:1000,
                position:"top-center"
              })
              navigate('/login')
            }
            setUserName('')
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
          })
        }
        catch(error){
          console.log(error)
            setLoading(false)
            if (error.code === 'auth/invalid-email') {
              toast.error("Invalid Email",{
                autoClose:2000,
                position:"top-center"
              })
            }else if (error.code === 'auth/invalid-credential') {
                toast.error("Invalid Credentials",{
                  autoClose:2000,
                  position:"top-center"
                })
              } else if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect Password",{
                  autoClose:2000,
                  position:"top-center"
                })
              }
              else if (error.code === 'auth/email-already-exists') {
                toast.error("Email Already Exists",{
                  autoClose:2000,
                  position:"top-center"
                })
                }else if (error.code === 'auth/weak-password') {
                toast.error("Password should be atleast 6 characters",{
                  autoClose:2000,
                  position:"top-center"
                })
              }
              else{
                toast.error("Please check your internet connection",{
                  autoClose:2000,
                  position:"top-center"
                })
              }
        } 
     }else{
      toast.error("Passwords don't match",{
        autoClose:1500,
        position:"top-center"
      })
     }
}
}


  return (
    <div className="main">
        <form className="registerForm" onSubmit={(e)=>e.preventDefault()}>
          <h3>Sign Up</h3>

          <input type="text" 
          placeholder="Username"  
          autoComplete="off"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)} 
          required/>

         <input type="text" 
          placeholder="E-mail"  
          autoComplete="off"
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          required/>

          <input type="password" 
          placeholder="Password"  
          autoComplete="off" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required/>

          <input type="password" 
          placeholder="Confirm Password"  
          autoComplete="off" 
          value={passwordConfirm}
          onChange={(e)=>setPasswordConfirm(e.target.value)}
          required/>
          <button className="register-btn" onClick={()=>RegisterUser()}>Register</button>
          <h4>Already Have An Account?
          <span><Link to="/login">Login</Link></span>
          </h4>
        </form>

        { loading ? (
                    <CartLoader/>
                ) : (
                  console.log("error")
                )}

    </div>
  )
}
export default Register
