import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faTruck, faShieldHalved, faGuitar, faMusic, faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "./Products";
import HomeGuitar from "../assets/images/home/acoustic-guitar.jpg";
import "../assets/css/home.css";

export default function Home({ dato, cart, addCart }){

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setIsDark(e.matches));
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', e => setIsDark(e.matches));
  }, []);
  return(
    <section id="index" className="index-section">
      {/* Decorative animated guitar dots (non-interactive, aria-hidden) */}
      <div className="guitar-dot-bg" aria-hidden>
        <span className="guitar-dot guitar-dot--1"><FontAwesomeIcon className="guitar-icon" icon={faGuitar} style={{transform: 'rotate(-15deg)'}} /></span>
        <span className="guitar-dot guitar-dot--2">
          <FontAwesomeIcon className={`guitar-icon ${isDark ? 'star-dark' : 'star-light'}`} icon={faStar} />
        </span>
        <span className="guitar-dot guitar-dot--3"><FontAwesomeIcon className="guitar-icon" icon={faMusic} style={{transform: 'rotate(25deg)'}} /></span>
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
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                Explorar Productos
            </button>
            <button className="why-us" title="¿Por qué elegirnos?"
                onClick={() => {
                    const whyChooseUsSection = document.querySelector('.why-choose-us');
                    if (whyChooseUsSection) {
                        whyChooseUsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                Conoce más
            </button>
          </div>
        </div>
        <div>
          <div><img className="guitar-home flex justify-center align-center" src={HomeGuitar} width="60%" alt="Guitarra de Bienvenida" /></div>
        </div>
      </div>
      <div className="home-products-section">
        <Products dato={dato} cart={cart} addCart={addCart} />
      </div>
      <div className="why-choose-us">
        <div>
          <div className="why-choose-us-title center font-weight-600">¿Por qué <span className="why-choose-us-title-end">elegirnos</span>?</div>
        </div>
        <div className="why-choose-us-grid flex flex-wrap justify-center align-center gap-2">
          <div className="why-choose-us-item center">
            <FontAwesomeIcon icon={faCertificate} size="2x" className="wcu-icon" />
            <div className="wcu-item-title font-weight-600">Calidad Garantizada</div>
            <p className="wcu-item-description">Trabajamos con las mejores marcas</p>
          </div>
          <div className="why-choose-us-item center">
            <FontAwesomeIcon icon={faTruck} size="2x" className="wcu-icon" />
            <div className="wcu-item-title font-weight-600">Envío Gratis</div>
            <p className="wcu-item-description">Envío gratis en todo el país</p>
          </div>
          <div className="why-choose-us-item center">
            <FontAwesomeIcon icon={faShieldHalved} size="2x" className="wcu-icon" />
            <div className="wcu-item-title font-weight-600">Garantía Extendida</div>
            <p className="wcu-item-description">2 años en todos nuestros productos</p>
          </div>
        </div>
      </div>
    </section>
  );
}