import { useContext, useEffect, useState } from "react"
import { RotateCw } from "lucide-react"
import Navbar from "../components/Navbar"
import Product from "../components/Product.jsx"
import ContentLoader from "../components/ContentLoader.jsx"
import GlobalState from "../GlobalState.js"
import "../css/Products.css"

const Products = () => {
  const { fetchProducts,allProducts,loading } = useContext(GlobalState)

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div className="products-wrapper">
      <Navbar/>
      {loading ? (<ContentLoader/>)
      :
      (
      <div className="products-container">
      { allProducts.length > 0 ?
        allProducts.map((item)=>(
          <Product key={item.id} item={item}/>
        ))
        : 
        (
         <div className="badConnectionBox">
           <h1>Check Your Internet Connection</h1>
           <button onClick={()=>fetchProducts()}><RotateCw className="refreshIcon" size={15}/>Retry</button>
         </div>
        )
      }
      </div>
      )
    }
    </div>
  )
}

export default Products
