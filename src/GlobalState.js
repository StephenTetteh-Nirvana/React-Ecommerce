import { createContext,useState,useEffect } from "react"
import { db } from "./firebase.js"
import { collection, getDocs } from "firebase/firestore"

const GlobalState = createContext();

export const CartProvider = ({children}) =>{

     const [cart,setCart] = useState([])
     const [allProducts,setallProducts] = useState([])
     const [loadedProducts,setloadedProducts] = useState(false)

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
                images:doc.data().images
            }
              productsFromDB.push(productData)
              localStorage.setItem("Products",JSON.stringify(productsFromDB))
            })
            setallProducts([...allProducts, ...productsFromDB]) 
            setloadedProducts(true) 
        }
      }
      
     const addToCart = (image,name,price) =>{
        setCart((oldValue)=>[...oldValue,{image,name,price}])
        console.log(cart)
     }

    return(
        <GlobalState.Provider value={{cart,addToCart,fetchProducts,allProducts}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
