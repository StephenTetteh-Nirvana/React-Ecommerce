import { createContext,useEffect,useState } from "react"
import { db,auth } from "./firebase.js"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const GlobalState = createContext();

export const CartProvider = ({children}) =>{
    const [userObj,setuserObj] = useState([])
    const [cart,setCart] = useState([])
    const [orders,setOrders] = useState([])
    const [favorites,setFavorites] = useState([])
    const [allProducts,setallProducts] = useState([])
    const [loadedProducts,setloadedProducts] = useState(false)


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

    const fetchCurrentUser = async () =>{
      const user = auth.currentUser
        if(user){
          try{
            const uid = user.uid;
            const colRef = doc(db,"Users",uid)
            const userDoc = await getDoc(colRef)
            if(userDoc.exists){
                const orderData = userDoc.data().order
                const updated = [...orderData]
                setOrders(updated)
                localStorage.setItem("orders",JSON.stringify(updated))
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
  }

    const addToFavorites = (productId,image,name,price,quantity) => {
      const newItemFavorite = {
        id:productId,
        image:image,
        name:name,
        price:price,
        quantity:quantity
      }
      const updated = [...favorites,newItemFavorite]
      setFavorites(updated)
      localStorage.setItem("favorites",JSON.stringify(updated))
    }

    const deleteFromFavorites = (productId) => {
      const updated = favorites.filter((p) => p.id !== productId)
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }


    const addToCart = (productId,image,name,price,quantity) => {
      const newItem = {
        id:productId,
        image:image,
        name:name,
        price:price,
        quantity:quantity
      }
      const updated = [...cart,newItem]
      setCart(updated)
      localStorage.setItem("cart",JSON.stringify(updated))
      toast.success(`${quantity} ${name} Added`,{
        autoClose:1000,
        position:"top-center"
      })
    }


    const increaseProductQuantity = (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          item.quantity += 1;
        }
        return item;
      });
      
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const decreaseProductQuantity = (productId) => {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          if(item.quantity > 1 ){
            item.quantity -= 1;  
          }
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const deleteFromCart = (productId) => {
      const updatedCart = cart.filter((p) => p.id !== productId)
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    useEffect(()=>{
      const cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : []
      setCart(cart)
      const favorites = localStorage.getItem("favorites") !== null ? JSON.parse(localStorage.getItem("favorites")) : []
      setFavorites(favorites)
    },[])

      

    return(
        <GlobalState.Provider value={{
        userObj,
        setuserObj,
        cart,
        setCart,
        setOrders,
        favorites,
        setFavorites,
        deleteFromFavorites,
        addToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        deleteFromCart,
        addToFavorites,
        deleteFromFavorites,
        fetchProducts,
        fetchCurrentUser,
        allProducts
        }}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
