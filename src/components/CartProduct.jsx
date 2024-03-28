import { useContext } from "react"
import Loader from "../components/Loader.jsx"
import Delete from "../images/delete-icon.png"
import GlobalState from "../GlobalState"
import "../css/CartProduct.css"

const CartProduct = ({item}) => {

    const cart = localStorage.getItem("cart") !== null ?  JSON.parse(localStorage.getItem("cart")):[];

    const {increaseProductQuantity,decreaseProductQuantity,deleteFromCart } = useContext(GlobalState)
                 

  return (
    <div className="cart-product-parent">
            <div className="cart-product-box">
                <div className="section-one">
                    <div className="cart-product-image-box">
                      <img src={require(`../images/${item.image}`)} alt="Item"/>
                    </div>
                 
                    <div className="cart-product-details-box">
                        <p className="product-name">{item.name}</p>
                        <div className="quantity-box">
                            <button className="minus-button" onClick={()=>decreaseProductQuantity(item.id)}>-</button>
                            <input type="number" 
                            value={item.quantity}
                            onChange={(e)=>(console.log("quantity"))}/>
                            <button className="plus-button" onClick={()=>increaseProductQuantity(item.id)}>+</button>
                        </div>
                    </div>
                </div>

                <div className="section-two">
                    <p className="price">${item.price}.00</p>
                    <div className="delete-btn">
                        <img src={Delete} onClick={()=>deleteFromCart(item.id)} alt="delete Icon"/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CartProduct