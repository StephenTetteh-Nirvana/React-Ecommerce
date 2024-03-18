import { useContext, useEffect, useState } from "react"
import { db,auth } from "../firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc,getDoc,updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import CartLoader from "../components/CartLoader.jsx"
import Delete from "../images/delete-icon.png"
import GlobalState from "../GlobalState"
import "../css/CartProduct.css"

const CartProduct = ({item}) => {

    const { fetchCurrentUserData } = useContext(GlobalState)
    const [deleteProduct,setdeleteProduct] = useState(false)

    const increaseProductQuantity = (productId) =>{
        onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
              setdeleteProduct(true)
              const uid = user.uid;
              const userDocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userDocRef)
              
              if(userDoc.exists()){
                const cartData = userDoc.data().cart;
                const product = cartData.find((p) => p.id === productId)
                if(product){
                    product.quantity += 1;
                    await updateDoc(userDocRef,{ cart:cartData })
                }else{
                    console.log()
                }
                setdeleteProduct(false)
                toast.success("Cart Updated Successfully",{
                    autoClose:1500,
                    position:"top-center"
                })
                fetchCurrentUserData()
            }
        }
            catch(error){
                setdeleteProduct(false)
                toast.error("Oops...An Error Occured",{
                    autoClose:1500
                })
               console.log(error)
            }
        }
        })
    }

    const decreaseProductQuantity = (productId) =>{
        onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
              setdeleteProduct(true)
              const uid = user.uid;
              const userDocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userDocRef)
              
              if(userDoc.exists()){
                const cartData = userDoc.data().cart;
                const product = cartData.find((p) => p.id === productId)
                if(product.quantity > 0){
                    product.quantity -= 1;
                    await updateDoc(userDocRef,{ cart:cartData })
                }else{
                    console.log("product less than 1")
                }
                setdeleteProduct(false)
                toast.success("Cart Updated Successfully",{
                    autoClose:1500,
                    position:"top-center"

                })
                fetchCurrentUserData()
            }
        }
            catch(error){
                setdeleteProduct(false)
                toast.error("Oops...An Error Occured",{
                    autoClose:1500
                })
               console.log(error)
            }
        }
        })
    }

    const deleteFromCart = (productId) =>{
        onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
              setdeleteProduct(true)
              const uid = user.uid;
              const userDocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userDocRef)
              
              if(userDoc.exists()){
                const cartData = userDoc.data().cart;
                const updatedcartArray = cartData.filter((p) => p.id !== productId)
                console.log(updatedcartArray)
                await updateDoc(userDocRef,{
                    cart:updatedcartArray
                })
                toast.success("Cart Updated Successfully",{
                    autoClose:1500,
                    position:"top-center"
                })
                setdeleteProduct(false)
                fetchCurrentUserData()
              }
            }
            catch(error){
                setdeleteProduct(false)
                toast.error("Oops...An Error Occured",{
                    autoClose:1500
                })
               console.log(error)
            }
        }
        })
    }

  return (
    <div>

 
            <div className="cart-product-box">
                <div className="section-one">
                    <div className="cart-product-image-box">
                      <img src={require(`../images/${item.image}`)}/>
                    </div>
                 
                    <div className="cart-product-details-box">
                        <p className="product-name">{item.name}</p>
                        <div className="quantity-box">
                            <button className="minus-button" onClick={()=>decreaseProductQuantity(item.id)}>-</button>
                            <input type="number" 
                            value={item.quantity}
                            onChange={()=>(console.log("quantity"))}/>
                            <button className="plus-button" onClick={()=>increaseProductQuantity(item.id)}>+</button>
                        </div>
                    </div>
                </div>

                <div className="section-two">
                    <p className="price">${item.price}.00</p>
                    <div className="delete-btn">
                        <img src={Delete} onClick={()=>deleteFromCart(item.id)}/>
                    </div>
                </div>
            </div>
              { deleteProduct && <CartLoader/>}
              </div>
  )
}

export default CartProduct
