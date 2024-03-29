import { useEffect, useState } from "react"
import "../css/Login.css"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { doc,getDoc } from "firebase/firestore"
import { auth,db } from "../firebase.js"
import AuthLoader from "../components/AuthLoader.jsx"

const Login = () => {
  const [ email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()


  const LoginUser = async() =>{
    if(email === "" || password === "" ){
      toast.error("Complete the form",{
        autoClose:1500,
        position:"top-center"
      })
      return;
    }

     try{
      setLoading(true)
      await signInWithEmailAndPassword(auth,email,password)
        const user = auth.currentUser;
        if(user){
          const userDocRef = doc(db,"Users",user.uid)
          const userDoc = await getDoc(userDocRef) 
          if(userDoc.exists){
            console.log(userDoc.data())
          }
          toast.success("Login Successful",{
            autoClose:1500,
            position:"top-center"
          })
          setEmail('')
          setPassword('')
          navigate("/products")
        }
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
        } else if (error.code === 'auth/user-not-found') {
          toast.error("No User Was Found",{
            autoClose:2000,
            position:"top-center"
          })
          }else if (error.code === 'auth/weak-password') {
          toast.error("Password should be atleast 6 characters",{
            autoClose:2000,
            position:"top-center"
          })
        }
        else {
          toast.error("Check your internet connection",{
            autoClose:2000,
            position:"top-center"
          })
        }
    
  }
}

  
  return (
    <div className="main">
          <form className="form" onSubmit={(e)=>e.preventDefault()}>
              <h3>Sign In</h3>

              <input type="text" 
              placeholder="Email"
              className="login-email-input"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="off" 
              required/>

              <input type="password" 
              placeholder="Password"
              className="login-password-input"
              autoComplete="off" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required/>
  
              {loading ? (
              <AuthLoader/>
              ) : (
                <button className="submit-btn" onClick={LoginUser}>Login</button> 
              )}
              
              <h4>Don't Have An Account?
                <span><Link to="/register">Register</Link></span>
              </h4>
            </form>

            
   </div>
)
}
export default Login
