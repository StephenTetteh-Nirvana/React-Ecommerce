import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { db,auth } from "../firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection,doc,setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import Logo from "../images/logo.png"
import AuthLoader from "../components/AuthLoader.jsx"
import "../css/Register.css"


const Register = () => {
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')
  const [loading,setLoading] = useState(false)
  const [disabled,setDisabled] = useState(true)
  const [passwordStrength, setPasswordStrength] = useState('');
  const [confirmPasswords,setConfirmPasswords] = useState('')
  const [validEmail,setValidEmail] = useState('')

  const navigate = useNavigate()

  const checkEmailValidity = (emailValue) =>{
    if(emailValue === ""){
     setValidEmail('')
    }else if(emailValue.includes("@gmail.com")){
      setValidEmail("Valid Email")
    }else{
      setValidEmail("Invalid Email(eg.stephen22@gmail.com)")
    }
  }

  const handleEmailChange = (e)=>{
    const emailValue = e.target.value;
    setEmail(emailValue)
    checkEmailValidity(emailValue);
  }

  const checkPasswordStrength = (value) => {
    if (value === '') {
      setPasswordStrength('');
      setDisabled(true)
    } else if (value.length < 6 ) {
      setPasswordStrength('Weak Password');
      setDisabled(true)
    } else {
      setPasswordStrength('Strong Password');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };


  const checkPasswordConfirm = (value) =>{
    if (value === ''){
      setConfirmPasswords(" ")
    }
    else if( value !== password ) {
      setDisabled(true)
      setConfirmPasswords("Passwords don't match")
      setPasswordConfirm(value)
    }
    else{
      setDisabled(false)
      setConfirmPasswords("Passwords Match")
    }
  }

  const handlePasswordConfirm = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    checkPasswordConfirm(value)
  };

  const RegisterUser = async () => {
      try{
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password)
        const user = auth.currentUser;
          if(user){
            const colRef = collection(db,"Users")
            const userDoc = doc(colRef,user.uid)
            await setDoc(userDoc,{
              userName:userName,
              order: []
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

          case 'auth/email-already-exists':
            toast.error("Email Already Exists",{
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
        <form className="registerForm" onSubmit={(e)=>e.preventDefault()}>
          <div className="logoContainer" onClick={()=>navigate("/")}>
            <img src={Logo} alt="logo here"/>
          </div>
          <h3>Sign Up</h3>
          <label>UserName</label>
          <input type="text" 
          placeholder="Username"  
          autoComplete="off"
          value={userName}
          className="register-userName-input"
          onChange={(e)=>setUserName(e.target.value)} 
          required/>

          <label>E-mail</label>
          <input type="text" 
          placeholder="Email"
          className={`register-email-input ${validEmail === "Invalid Email(eg.stephen22@gmail.com)" ? "error" : ""}`}
          value={email}
          onChange={handleEmailChange}
          autoComplete="off" 
          required/>
          {validEmail && 
          <span className={validEmail === "Invalid Email(eg.stephen22@gmail.com)" ? "invalid-email": ""} >
          {validEmail === "Invalid Email(eg.stephen22@gmail.com)" ? 
          "Invalid Email(eg.stephen22@gmail.com)": ""
          }
          </span>
          }

          <label>Password</label>
          <input type="password" 
            placeholder="Password"
            className={`register-password-input ${passwordStrength === "Weak Password" ? "error" :
            passwordStrength === "Strong Password" ? "success" : ""}`} 
            autoComplete="off" 
            value={password}
            onChange={handlePasswordChange}
            required/>
            {passwordStrength && 
              <span className={passwordStrength === "Weak Password" ? "weak-password-span" :
              passwordStrength === "Strong Password" ? "strong-password-span" : ""}>{passwordStrength}</span>
            }

          <label>Confirm Password</label>
          <input type="password" 
          placeholder="Confirm Password"  
          autoComplete="off" 
          value={passwordConfirm}
          className={`register-passwordConfirm-input ${confirmPasswords === "Passwords don't match" ? "error" : 
          confirmPasswords === "Passwords Match" ? "success" : ""}`}
          onChange={handlePasswordConfirm}
          required/>
          { confirmPasswords && 
           <span className={confirmPasswords === "Passwords don't match" ? "no-match" : 
           confirmPasswords === "Passwords Match" ? "match" : ""}>{confirmPasswords}</span>
          }
          { loading ? (
            <AuthLoader/>
          ) : (
            <button 
              className={`register-btn ${disabled ? "disabled" : ""}`} 
              disabled={disabled} 
              onClick={RegisterUser}>Register</button> 
          )
          }
          <h4>Already Have An Account?
          <span><Link className="login-link" to="/login"> Login</Link></span>
          </h4>
        </form>
    </div>
  )
}
export default Register
