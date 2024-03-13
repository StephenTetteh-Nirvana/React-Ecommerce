import Navbar from "../components/Navbar"
import Product from "../components/Product.jsx"
import "../css/Products.css"
import { useContext, useEffect } from "react"
import GlobalState from "../GlobalState.js"

const Products = () => {
  const { fetchProducts,allProducts } = useContext(GlobalState)

  useEffect(()=>{
    fetchProducts()
  },[])


  return (
    <div className="products-wrapper">
      <Navbar/>
        <div className="products-container">
        {
          allProducts.map((item)=>(
            <Product key={item.id} item={item}/>
          ))
        }
        </div>
    
    </div>
  )
}

export default Products
