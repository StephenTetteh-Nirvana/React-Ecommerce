import "../css/Product.css"
import { useContext } from "react"
import GlobalState from "../GlobalState"


const Product = ({item}) => {

    const { addToCart } = useContext(GlobalState)
    console.log("product",item)
  return (
    <div className="product-container">
        <div onClick={()=>addToCart(item.image,item.name,item.price)} className="product-box">
            <div className="first-image-box">
               <img src={require(`../images/${item.image}`)}/>
            </div>
                <div className="product-details">
                    <p>{item.name}</p>
                    <p>${item.price}.00</p>
                </div>
        </div>
    </div>
   
  )
}

export default Product
