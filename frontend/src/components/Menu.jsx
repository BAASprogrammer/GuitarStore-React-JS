import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGuitar, faUser, faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <div>
            <div>
                {/* Overlay to close menu when clicking outside */}
                {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
                <button className="menu-toggle-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    ☰
                </button>
            </div>
            <nav className={`header-menu${isMenuOpen ? ' menu-opened' : ' menu-closed'}`}>
                {isMenuOpen && <div className="menu-title center">Menu</div>}
                <Link to="/home" className="menu-link" onClick={() => setIsMenuOpen(false)}>{isMenuOpen && <FontAwesomeIcon icon={faHome} size="sm" className="menu-icon"/>} Inicio</Link>
                <Link to="/products" className="menu-link" onClick={() => setIsMenuOpen(false)}>{isMenuOpen && <FontAwesomeIcon icon={faGuitar} size="sm" className="menu-icon"/>}Productos</Link>
                <Link to="/about" className="menu-link" onClick={() => setIsMenuOpen(false)}>{isMenuOpen && <FontAwesomeIcon icon={faUser} size="sm" className="menu-icon"/>}Nosotros</Link>
                <Link to="/contact" className="menu-link" onClick={() => setIsMenuOpen(false)}>{isMenuOpen && <FontAwesomeIcon icon={faFile} size="sm" className="menu-icon"/>}Contacto</Link>
            </nav>
        </div>
    )
}