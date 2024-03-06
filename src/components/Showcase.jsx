import "../css/Showcase.css"
import Background from "../images/background.png"

const Showcase = () => {
  return (
      <div className="showcase">
          <div className="text-display-section">
                <h1>Nike Jordans</h1>
                <p className="description-title">Description</p>
                <p className="description">
                 Introducing the Nike Retro Shoes, a timeless blend of style and comfort. 
                 These iconic shoes are a tribute to Nike's rich heritage, featuring a classic design that never goes out of fashion. 
                 </p>
                <div>
                  <button>Explore More</button>
                </div>
          </div>

          <div className="image-display-section">
            <img src={Background} alt="background"/>
          </div>
       </div>
  )
}

export default Showcase
