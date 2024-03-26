import { createContext,useState } from "react"
import { toast } from "react-toastify"
import { db,auth } from "./firebase.js"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const GlobalState = createContext();

export const CartProvider = ({children}) =>{
     const [userObj,setuserObj] = useState([])
     const [cart,setCart] = useState([])
     const [orders,setOrders] = useState([])
     const [favorites,setFavorites] = useState([])
     const [allProducts,setallProducts] = useState([])
     const [loadedProducts,setloadedProducts] = useState(false)
     const [loading,setLoading] = useState(false)


     const fetchProducts = async () => {
        if(!loadedProducts){
          try{
            const colRef = collection(db, "Products");
            const docRef = await getDocs(colRef);

            const productsFromDB = []

            docRef.forEach((doc) => {
              const productData = {
                id:doc.id,
                name:doc.data().name,
                price:doc.data().price,
                images:doc.data().images,
                quantity:doc.data().quantity
            }
              productsFromDB.push(productData)
              localStorage.setItem("Products",JSON.stringify(productsFromDB))
            })
            setallProducts([...allProducts, ...productsFromDB]) 
            setloadedProducts(true) 
          }catch(error){
             console.log(error)
          }
           
        }
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
       }else{
        console.log("No User")
       }
        })
    }

      const fetchCurrentUserData = () =>{
          onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
                const uid = user.uid;
                const userDocRef = doc(db,"Users",uid)
                const userDoc = await getDoc(userDocRef)
                
                if(userDoc.exists()){
                  const cartData = userDoc.data().cart;
                  const orderData = userDoc.data().order;
                  const favoriteData = userDoc.data().favorites;
                  setCart([...cartData])
                  setOrders([...orderData])
                  setFavorites([...favoriteData])
                  localStorage.setItem("cart",JSON.stringify(cartData))
                  localStorage.setItem("orders",JSON.stringify(orderData))
                  localStorage.setItem("favorites",JSON.stringify(favoriteData))
                }
              }
              catch(error){
                console.log(error)
              }
            }
            else{
        console.log("No User")
       }
          })
      }

      const addToFavorites = (id,image,name,price) => {
          onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
              setLoading(true)
              const uid = user.uid;
              const userDocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userDocRef)
              
              if(userDoc.exists()){
                const favoriteData = userDoc.data().favorites;
                  const newFavorite = {
                    id:id,
                    image:image,
                    name:name,
                    price:price,
                  }
                  favoriteData.push(newFavorite)
                  await updateDoc(userDocRef,{favorites: favoriteData})
                  setLoading(false)
                  toast.success("Added To Favorites",{
                    autoClose:1200
                  })
                  fetchCurrentUserData()
              }
            }catch(error){
             setLoading(false)
             toast.error("Connect To The Internet",{
              autoClose:2000,
              position:"top-center"
             })
             console.log(error)
            } 
          }else{
            setLoading(false)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please create an account first!'
              })
           }
      })
    }

      const fetchFavorites = () =>{
          onAuthStateChanged(auth,async(user)=>{
            if(user){
              try{
              const uid = user.uid;
              const userdocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userdocRef)

              if(userDoc.exists()){
                const favoritesArray = userDoc.data().favorites;
                setFavorites([...favoritesArray])
                localStorage.setItem("favorites",JSON.stringify(favoritesArray))
              }
            }catch(error){
              console.log(error)
          }
        }
        })
}

     
     const addToCart = (id,image,name,price,quantity) => {
        onAuthStateChanged(auth,async (user)=>{
          try{
            setLoading(true)
            if(user){
            const uid = user.uid;
            const userDocRef = doc(db,"Users",uid)
            const userDoc = await getDoc(userDocRef)
            
            if(userDoc.exists()){
              const cartData = userDoc.data().cart;
                const newItem = {
                  id:id,
                  image:image,
                  name:name,
                  price:price,
                  quantity:quantity
                }
                cartData.push(newItem)
                await updateDoc(userDocRef,{cart: cartData})
                setCart([...cart,{cartData}])
                setLoading(false)
                toast.success("Item Added Successfully",{
                  autoClose:1200
                })
                fetchCurrentUserData()
            }
          }else{
            setLoading(false)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please create an account first!'
              })
           }
          }catch(error){
            toast.error("Connect To The Internet",{
              autoClose:2000,
              position:"top-center"
             })
            setLoading(false)
            console.log(error)
          }
        })
      }

      

    return(
        <GlobalState.Provider value={{userObj,cart,setCart,setFavorites,setOrders,favorites,addToCart,addToFavorites,fetchFavorites,fetchProducts,fetchCurrentUserData,fetchCurrentUser,allProducts,loading}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
