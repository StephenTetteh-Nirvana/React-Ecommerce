import { createContext,useState } from "react"
import { db,auth } from "./firebase.js"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";

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

      const addToFavorites = (productId,image,name,price,quantity) => {
        const newItemFavorite = {
          id:productId,
          image:image,
          name:name,
          price:price,
          quantity:quantity
        }
        const updated = [...cart,newItemFavorite]
        setFavorites(updated)
        localStorage.setItem("favorites",JSON.stringify(updated))
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

     
  const addToCart = (productId,image,name,price,quantity) => {
    const newItem = {
      id:productId,
      image:image,
      name:name,
      price:price,
      quantity:quantity
    }
    const updated = [...cart,newItem]
    console.log(cart)
    setCart(updated)
    localStorage.setItem("cart",JSON.stringify(updated))
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
       item.quantity > 1 ? item.quantity -= 1 : "";
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

      

    return(
        <GlobalState.Provider value={{
        userObj,
        setCart,
        setFavorites,
        setOrders,
        addToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        deleteFromCart,
        addToFavorites,
        fetchFavorites,
        fetchProducts,
        fetchCurrentUserData,
        fetchCurrentUser,
        allProducts,
        loading}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
