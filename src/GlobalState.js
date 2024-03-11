import { createContext,useState } from "react"

const GlobalState = createContext();

export const CartProvider = ({children}) =>{
     const [cart,setCart] = useState([])

     const addToCart = (image,name,price,quantity) =>{
        setCart((oldValue)=>[...oldValue,{image,name,price,quantity}])
     }

    return(
        <GlobalState.Provider value={{cart,addToCart}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalState;
