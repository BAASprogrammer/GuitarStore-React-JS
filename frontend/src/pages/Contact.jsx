import { useState } from "react";
import "../assets/css/contact.css";

export default function Contact(){
    const [error, setError] = useState({});
    const [sendEmail, setSendEmail] = useState("");
    const [formData, setFormData] = useState({
        general: "",
        nombre: "",
        email: "",
        mensaje: ""
    });
    const newErrors = {};
    const validateForm = () => {
        if (formData.nombre.trim() === "" || formData.email.trim() === "" || formData.mensaje.trim() === "") {
            newErrors.general = "Por favor, complete todos los campos.";
            return false;
        }
        if (formData.nombre.trim() === "" || formData.nombre.trim().length < 3) {
            newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Por favor, ingrese un correo electrónico válido.";
            return false;
        }
        if (formData.mensaje.trim() === "" || formData.mensaje.trim().length < 10) {
            newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
            return false;
        }
        setError(newErrors);
        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError({}); // Clear error when user starts typing
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setSendEmail("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.");
            setFormData({
                nombre: "",
                email: "",
                mensaje: ""
            });
            setTimeout(() => {
                setSendEmail("");
            }, 5000);
        }else{
            setError(newErrors);
            setSendEmail("");
        }
    }
    return(
        <section id="contact" className="contact-section position-relative">
            {/* Decorative animated dots (non-interactive, aria-hidden) */}
            <div className="dots-bg z-index-1" aria-hidden>
                <span className="dot dot--1"></span>
                <span className="dot dot--2"></span>
                <span className="dot dot--3"></span>
                <span className="dot dot--4"></span>
                <span className="dot dot--5"></span>
                <span className="dot dot--6"></span>
            </div>

            <div className="contact-container position-relative z-index-10">
                <h2 className="section-title center">Contáctenos</h2>
                <form className="contact-form flex flex-column align-center" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                        {error.nombre && <p className="error-message center">{error.nombre}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {error.email && <p className="error-message center">{error.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea id="mensaje" name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange}></textarea>
                        {error.mensaje && <p className="error-message center">{error.mensaje}</p>}
                    </div>
                    <div>{error.general && <p className="error-message center">{error.general}</p>}</div>
                    <button type="submit" className="submit-button">Enviar</button>
                    {sendEmail && (
                        <div className="success-message-container center">
                            <p className="success-message">{sendEmail}</p>
                            <button type="button" className="close-button" title="Cerrar mensaje" onClick={() => setSendEmail("")}>×</button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}