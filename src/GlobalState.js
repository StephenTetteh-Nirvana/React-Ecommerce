import { createContext,useState } from "react"
import { toast } from "react-toastify"
import { db,auth } from "./firebase.js"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";

const GlobalState = createContext();

export const CartProvider = ({children}) =>{
  

     const [cart,setCart] = useState([])
     const [favorite,setFavorite] = useState([])
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

      const fetchCurrentUserCartData = () =>{
          onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
                const uid = user.uid;
                const userDocRef = doc(db,"Users",uid)
                const userDoc = await getDoc(userDocRef)
                
                if(userDoc.exists()){
                  const cartData = userDoc.data().cart;
                  setCart([...cartData])
                  localStorage.setItem("cart",JSON.stringify(cartData))
                  console.log("Cart Array:",cart)
                }
              }
              catch(error){
                console.log(error)
              }
            }
          })
      }

      const addToFavorites = (id,image,name,price) => {
        try{
          setaddToCartLoader(true)
          onAuthStateChanged(auth,async (user)=>{
            if(user){
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
                  setCart([...favorite,{favoriteData}])
                  console.log(favorite)
                  setaddToCartLoader(false)
                  toast.success("Added To Favorites")
              }
            }
          })
        }catch(error){
          console.log(error)
        }
         
       }

     
     const addToCart = (id,image,name,price,quantity) => {
      try{
        setaddToCartLoader(true)
        onAuthStateChanged(auth,async (user)=>{
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
                console.log(cart)
                setaddToCartLoader(false)
                toast.success("Item Added Successfully")
                fetchCurrentUserCartData()
            }
          }
        })
      }catch(error){
        console.log(error)
      }
       
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
        <GlobalState.Provider value={{cart,addToCart,addToFavorites,fetchProducts,fetchCurrentUserCartData,increaseQuantity,allProducts,addToCartLoader}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
