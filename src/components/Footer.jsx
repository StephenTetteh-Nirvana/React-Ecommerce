import Logo from "../images/logo.png"
import "../css/Footer.css"

const Footer = () => {
  return (
    <div>
    <div className="newsletter-container">
        <div className="footer-image-section">
            <img src={Logo} alt="logo"/>
            <h3>YOU-SHOP</h3>
        </div>
       
        <div className="newsletter-section">
           <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
            <input type="text" placeholder="Enter Your Email..."/>
            <button>Subscribe</button>
        </div>

        <div className="social-media-section">
          <h2>FOLLOW US</h2>
        </div>
    </div>

    <div className="copyright-section">
      <p>COPYRIGHT &copy; 2024.All Rights Reserved</p>
    </div>

    </div>
   
  )
}

export default Footer
