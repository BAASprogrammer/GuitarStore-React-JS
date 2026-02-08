import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <div>
            <div>
                {/* Overlay to close menu when clicking outside */}
                {isMenuOpen && <div className={`menu-overlay${!isMenuOpen ? ' menu-overlay-closed' : ''}`}></div>}
                <button className="menu-toggle-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    ☰
                </button>
            </div>
            <nav className={`header-menu${isMenuOpen ? ' menu-opened' : ' menu-closed'}`}>
                <Link to="/home" className="menu-link" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                <Link to="/products" className="menu-link" onClick={() => setIsMenuOpen(false)}>Productos</Link>
                <Link to="/about" className="menu-link" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                <Link to="/contact" className="menu-link" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
            </nav>
        </div>
    )
}