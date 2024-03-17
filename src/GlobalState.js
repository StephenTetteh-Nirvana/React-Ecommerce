import { createContext,useState } from "react"
import { toast } from "react-toastify"
import { db,auth } from "./firebase.js"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";

const GlobalState = createContext();

export const CartProvider = ({children}) =>{
  

     const [cart,setCart] = useState([])
     const [favorites,setFavorites] = useState([])
     const [allProducts,setallProducts] = useState([])
     const [loadedProducts,setloadedProducts] = useState(false)
     const [addToCartLoader,setaddToCartLoader] = useState(false)

     const fetchProducts = async () => {
        if(!loadedProducts){
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
        }
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
                  const favoriteData = userDoc.data().favorites;
                  setCart([...cartData])
                  setFavorites([...favoriteData])
                  localStorage.setItem("cart",JSON.stringify(cartData))
                  localStorage.setItem("favorites",JSON.stringify(favoriteData))
                }
              }
              catch(error){
                console.log(error)
              }
            }
          })
      }

      const addToFavorites = (id,image,name,price) => {
          onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
              setaddToCartLoader(true)
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
                  setaddToCartLoader(false)
                  toast.success("Added To Favorites")
                  fetchCurrentUserData()
              }
            }catch(error){
             setaddToCartLoader(false)
             toast.error("Please Connect To The Internet",{
              autoClose:2000,
              position:"top-center"
             })
             console.log(error)
            } 
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
            setaddToCartLoader(true)
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
                setaddToCartLoader(false)
                toast.success("Item Added Successfully")
                fetchCurrentUserData()
            }
          }
          }catch(error){
            toast.error("Please Connect To The Interner",{
              autoClose:2000,
              position:"top-center"
             })
            setaddToCartLoader(false)
            console.log(error)
          }
        })
      }

     const increaseQuantity = (productId) => {
      onAuthStateChanged(auth,async (user)=>{
        if(user){
          try{
            const uid = user.uid;
            const userDocRef = doc(db,"Products",uid)
            const userDoc = await getDoc(userDocRef)
            
            if(userDoc.exists()){
              const quantityData = userDoc.data().quantity;
              console.log(quantityData)
              console.log(productId)
            }
          }catch(error){
            console.log(error)
          }
        }
      })
    }

    return(
        <GlobalState.Provider value={{cart,favorites,addToCart,addToFavorites,fetchFavorites,fetchProducts,fetchCurrentUserData,increaseQuantity,allProducts,addToCartLoader}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
