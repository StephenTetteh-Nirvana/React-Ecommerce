import "../css/FeaturedProducts.css"
import { useEffect, useState } from "react"
import NewProduct from "../components/NewProduct.jsx"
import { db } from "../firebase.js"
import { collection,getDocs } from "firebase/firestore"

const FeaturedProducts = () => {
    
    const [newReleases,setReleases] = useState([])

      
    const featuredImages = [
        {
            src:"background.jpg",
            favorites:false,
            name:"Nike Jordans",
            description:"Introducing the Nike Retro Shoes, a timeless blend of style and comfort.",
            price:50.99
        }
    ]

    const fetchProducts = async () =>{
         const colRef = collection(db,"New Releases")
         const docRef = await getDocs(colRef)

         const products = []
       
         docRef.forEach((product)=>{
            const productData = {
                id:product.id,
                name:product.data().name,
                price:product.data().price,
                src:product.data().src,
                description:product.data().description,
                favorite:product.data().favorite
            }
            products.push(productData)
            console.log(product.id)
         })

         setReleases([...newReleases, ...products])
    }

    useEffect(()=>{
        fetchProducts()
    },[])

   

  return (
    <div>
       <div className='featured-products-container'>
          <h1 className="heading">FEATURED PRODUCTS</h1>
          
          <div className="featured-products">
              { newReleases.map((product,index)=>(
                       <NewProduct product={product} index={index} />
              ))
            
                    
              }
                  
          </div>
             
       </div>
       <div className="hidden"></div>
    </div>
    
  )
}

export default FeaturedProducts
