import "../css/CartProduct.css"
import Delete from "../images/delete-icon.png"

const CartProduct = ({item}) => {
  return (
            <div className="cart-product-box">
                <div className="section-one">
                    <div className="cart-product-image-box">
                      <img src={require(`../images/${item.image}`)}/>
                    </div>
                 
                    <div className="cart-product-details-box">
                        <p className="product-name">{item.name}</p>
                        <div className="quantity-box">
                            <button className="minus-button">-</button>
                            <input type="number" value="1"/>
                            <button className="plus-button">+</button>
                        </div>
                    </div>
                </div>

                <div className="section-two">
                    <p className="price">${item.price}.00</p>
                    <div className="delete-btn">
                        <img src={Delete}/>
                    </div>
                </div>
            </div>
  )
}

export default CartProduct
