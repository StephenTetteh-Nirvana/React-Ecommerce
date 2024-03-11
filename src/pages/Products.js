import { collection, getDocs } from "firebase/firestore"
import Navbar from "../components/Navbar"
import Product from "../components/Product.jsx"
import "../css/Products.css"
import { db } from "../firebase.js"
import { useEffect,useState } from "react"

const Products = () => {

  const [Allproducts,SetAllProducts] = useState([])
   
   

    const fetchProducts = async () => {
      const colRef = collection(db, "Products");
      const docRef = await getDocs(colRef);
       
      const productsFromDB = []

      docRef.forEach((doc) => {
        const productData = doc.data();
        productsFromDB.push(productData)
      })

      SetAllProducts([...Allproducts, ...productsFromDB])  
    }
    
    useEffect(() => {
      fetchProducts();
    }, []);

  return (
    <div className="products-wrapper">
      <Navbar/>
        <div className="products-container">
        {
          Allproducts.map((item)=>(
            <Product key={item.id} item={item}/>
          ))
        }
        </div>
    
    </div>
  )
}

export default Products
