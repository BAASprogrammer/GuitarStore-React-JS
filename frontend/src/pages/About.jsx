import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../assets/css/about.css";

export default function About() {
    return (
        <section id="about" className="about-section center py-4">
            <div className="about-container">
                <h2 className="section-title center">Nosotros</h2>
                <p className="ppal-text about-text">
                    En Tienda de Guitarras, somos apasionados por la música y nos dedicamos a ofrecer las mejores guitarras y accesorios para músicos de todos los niveles. Nuestra misión es proporcionar productos de alta calidad a precios competitivos, junto con un servicio al cliente excepcional.
                </p>
                <p className="ppal-text about-text">
                    Nuestro equipo está compuesto por músicos experimentados que entienden las necesidades de nuestros clientes. Estamos comprometidos a brindar asesoramiento experto y apoyo en cada paso del camino.
                </p>
                <p className="ppal-text about-text">
                    Gracias por elegir Tienda de Guitarras. Esperamos ser parte de tu viaje musical.
                </p>
            </div>
            <div className="social-icons flex justify-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="align-center justify-center">
                    <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="align-center justify-center">
                    <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="align-center justify-center">
                    <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="align-center justify-center">
                    <FaYoutube />
                </a>
            </div>
        </section>
    );
}