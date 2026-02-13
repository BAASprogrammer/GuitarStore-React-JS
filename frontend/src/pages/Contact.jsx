import { useState, useCallback, useEffect, useRef } from "react";
import "../assets/css/contact.css";
import dataMessage from '../constants/messages';

export default function Contact() {
    const [error, setError] = useState({});
    const [sendEmail, setSendEmail] = useState("");
    const [formData, setFormData] = useState({
        general: "",
        nombre: "",
        email: "",
        mensaje: ""
    });
    const validateForm = useCallback(() => {
        const errors = {};
        if (formData.nombre.trim() === "" || formData.email.trim() === "" || formData.mensaje.trim() === "") {
            errors.general = dataMessage.contact.general;
            return errors;
        }
        if (formData.nombre.trim() === "" || formData.nombre.trim().length < 3) {
            errors.nombre = dataMessage.contact.nombre;
            return errors;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            errors.email = dataMessage.contact.email;
            return errors;
        }
        if (formData.mensaje.trim() === "" || formData.mensaje.trim().length < 10) {
            errors.mensaje = dataMessage.contact.mensaje;
            return errors;
        }
        return null; // No errors
    }, [formData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trimStart() // Trim leading whitespace only to allow typing spaces
        }));
        setError({}); // Clear error when user starts typing
    }, []);

    const timeoutRef = useRef(null);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (!validationErrors) {
            setSendEmail(dataMessage.contact.success);
            setFormData({
                nombre: "",
                email: "",
                mensaje: ""
            });
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setSendEmail("");
                timeoutRef.current = null;
            }, 5000);
        } else {
            setError(validationErrors);
            setSendEmail("");
        }
    }, [validateForm]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <section id="contact" className="contact-section center">
            {/* Decorative animated dots (non-interactive, aria-hidden) */}
            <div className="dots-bg z-index-1" aria-hidden>
                <span className="dot dot--1"></span>
                <span className="dot dot--2"></span>
                <span className="dot dot--3"></span>
                <span className="dot dot--4"></span>
                <span className="dot dot--5"></span>
                <span className="dot dot--6"></span>
            </div>

            <div className="contact-hero-container">
                <h1 className="contact-title">Contácta<span className="title-accent">nos<span className="title-underline"></span></span></h1>
                <p className="contact-subtitle">Estamos aquí para ayudarte a encontrar tu sonido perfecto</p>
            </div>

            <div className="contact-container glassmorphism-card position-relative z-index-10">
                <form className="contact-form flex flex-column align-center" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre artístico..." value={formData.nombre} onChange={handleChange} />
                            {error.nombre && <p className="error-message center">{error.nombre}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="guitarrista@ejemplo.com" value={formData.email} onChange={handleChange} />
                            {error.email && <p className="error-message center">{error.email}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje">¿En qué podemos ayudarte?</label>
                        <textarea id="mensaje" name="mensaje" rows="4" placeholder="Cuéntanos tus dudas o proyectos musicales..." value={formData.mensaje} onChange={handleChange}></textarea>
                        {error.mensaje && <p className="error-message center">{error.mensaje}</p>}
                    </div>

                    <div>{error.general && <p className="error-message center">{error.general}</p>}</div>

                    <button type="submit" className="submit-button">
                        Enviar Consulta
                    </button>

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