import "../css/FavoriteProduct.css"
import { Link } from "react-router-dom"


const FavoriteProduct = ({product}) => {
  return (
    <div className="favorite-product-box">

        <div className="product-first-section">
            <Link to={`/products/productPage/${product.id}`}>
                <div className="product-image-box">
                    <img src={require(`../images/${product.image}`)}/>
                </div>
            </Link>
            

            <div className="product-info">
                <h3 className="name">{product.name}</h3>
                <h3 className="price">${product.price}.00</h3>
            </div>
        </div>

        <div className="product-buttons-box">
           <button className="remove-btn">Remove</button>
        </div>
      
    </div>
  )
}

export default FavoriteProduct
