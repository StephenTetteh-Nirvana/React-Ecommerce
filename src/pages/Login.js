import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc,getDoc } from "firebase/firestore"
import { auth,db } from "../firebase.js"
import Logo from "../images/logo.png"
import AuthLoader from "../components/AuthLoader.jsx"
import "../css/Login.css"

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
      switch(error.code){
        case 'auth/invalid-email':
          toast.error("Invalid Email",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        case 'auth/invalid-credential':
          toast.error("Invalid Credentials",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        case 'auth/email-already-in-use': 
          toast.error("Email Already Exists",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        case 'auth/wrong-password': 
          toast.error("Incorrect Password",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        case 'auth/user-not-found':
          toast.error("No user was found",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        case 'auth/weak-password':
          toast.error("Password should be atleast 6 characters",{
            autoClose:2000,
            position:"top-center"
          })
          break;

        default: 
        toast.error("Please check your internet connection",{
          autoClose:2000,
          position:"top-center"
        })
        break;
      }
  }finally{
    setLoading(false)
  }
}

  
  return (
    <div className="main">
      <form className="form" onSubmit={(e)=>e.preventDefault()}>
        <div className="logoContainer" onClick={()=>navigate("/")}>
         <img src={Logo} alt="logo here"/>
        </div>
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
          <span><Link className="register-link" to="/register"> Register</Link></span>
        </h4>
        </form>

            
   </div>
)
}
export default Login
