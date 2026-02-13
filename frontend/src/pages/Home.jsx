import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faTruck, faShieldHalved, faGuitar, faMusic, faHeadphones, faShoppingCart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Products from "./Products";
import HomeGuitar from "../assets/images/home/acoustic-guitar.jpg";
import "../assets/css/home.css";

export default function Home({ dato, cart, addCart }) {

  return (
    <section id="index" className="index-section">
      {/* Decorative animated guitar dots (non-interactive, aria-hidden) */}
      <div className="guitar-dot-bg" aria-hidden>
        <span className="guitar-dot guitar-dot--1">
          <FontAwesomeIcon className="guitar-icon" icon={faGuitar} style={{ transform: 'rotate(-15deg)' }} />
        </span>
        <span className="guitar-dot guitar-dot--2">
          <FontAwesomeIcon className="headphones-icon" icon={faHeadphones} />
        </span>
        <span className="guitar-dot guitar-dot--3">
          <FontAwesomeIcon className="music-icon" icon={faMusic} style={{ transform: 'rotate(25deg)' }} />
        </span>
        <span className="guitar-dot guitar-dot--4">
          <FontAwesomeIcon className="guitar-icon" icon={faGuitar} />
        </span>
        <span className="guitar-dot guitar-dot--5">
          <FontAwesomeIcon className="headphones-icon" icon={faHeadphones} />
        </span>
        <span className="guitar-dot guitar-dot--6">
          <FontAwesomeIcon className="music-icon" icon={faMusic} />
        </span>
      </div>
      <div className="grid welcome-container justify-center align-center">
        <div>
          <div className="welcome-title font-weight-800">Bienvenido a <span className="store-title">GuitarStore</span></div>
          <div className="welcome-txt">Calidad, variedad y el sonido que buscas</div>
          <div className="welcome-animation align-center gap-2">
            <span className="welcome-line"></span><span className="welcome-guitar">🎸</span>
          </div>
          <div className="flex button-home-container">
            <button className="view-products" title="Explorar Nuestro Catálogo"
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}>
              Ver Productos <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button className="why-us" title="¿Por qué elegirnos?"
              onClick={() => {
                const whyChooseUsSection = document.querySelector('.why-choose-us');
                if (whyChooseUsSection) {
                  whyChooseUsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}>
              Conoce más <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
        </div>
        <div>
          <div><img className="guitar-home flex justify-center align-center" src={HomeGuitar} alt="Guitarra de Bienvenida" /></div>
        </div>
      </div>
      <div className="home-products-section">
        <Products dato={dato} cart={cart} addCart={addCart} />
      </div>
      <div className="why-choose-us">
        <div>
          <div className="why-choose-us-title center font-weight-600">¿Por qué <span className="why-choose-us-title-end">elegirnos</span>?</div>
        </div>
        <div className="why-choose-us-grid flex flex-wrap justify-center gap-2">
          <div className="why-choose-us-item center">
            <div className="wcu-icon-container">
              <FontAwesomeIcon icon={faCertificate} size="2x" className="wcu-icon" />
            </div>
            <div className="wcu-item-title font-weight-600">Calidad Garantizada</div>
            <p className="wcu-item-description">Trabajamos con las mejores marcas</p>
          </div>
          <div className="why-choose-us-item center">
            <div className="wcu-icon-container">
              <FontAwesomeIcon icon={faTruck} size="2x" className="wcu-icon" />
            </div>
            <div className="wcu-item-title font-weight-600">Envío Gratis</div>
            <p className="wcu-item-description">Envío gratis en todo el país</p>
          </div>
          <div className="why-choose-us-item center">
            <div className="wcu-icon-container">
              <FontAwesomeIcon icon={faShieldHalved} size="2x" className="wcu-icon" />
            </div>
            <div className="wcu-item-title font-weight-600">Garantía Extendida</div>
            <p className="wcu-item-description">2 años en todos nuestros productos</p>
          </div>
        </div>
      </div>
    </section>
  );
}