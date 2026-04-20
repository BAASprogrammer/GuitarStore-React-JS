import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCurrency from '../hooks/useCurrency';

export default function Checkout({ emptyCart }) {
    const navigate = useNavigate();
    const location = useLocation();
    const formatCurrency = useCurrency();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cart = useMemo(() => location.state?.cart || [], [location.state]);

    const totalPrice = useMemo(() =>
        cart.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0),
        [cart]);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccion: '',
        ciudad: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nombre.trim() || formData.nombre.trim().length < 3)
            newErrors.nombre = 'Ingresa tu nombre completo (mín. 3 caracteres)';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Ingresa un correo electrónico válido';
        if (!formData.direccion.trim() || formData.direccion.trim().length < 5)
            newErrors.direccion = 'Ingresa una dirección válida';
        if (!formData.ciudad.trim())
            newErrors.ciudad = 'Ingresa tu ciudad';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setApiError('');

        try {
            // Determine the return URL (where Webpay redirects after payment)
            const returnUrl = `${window.location.origin}/webpay/resultado`;

            // Call our serverless function
            const res = await fetch('/api/webpay/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalPrice,
                    buyOrder: `Orden-${Date.now()}`,
                    sessionId: `Session-${Date.now()}`,
                    returnUrl
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Server error');
            }

            const { token, url } = await res.json();

            // Redirect to Webpay using a POST form (required by Transbank)
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = url;
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'token_ws';
            input.value = token;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();

        } catch (err) {
            console.error('Error starting payment:', err);
            setApiError('No se pudo conectar con el servicio de pago. Intenta nuevamente.');
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <h2 className="checkout-title">Tu carrito está vacío</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Agrega productos antes de proceder al pago.
                </p>
                <button className="confirm-purchase-btn" style={{ maxWidth: '280px', margin: '0 auto' }}
                    onClick={() => navigate('/products')}>
                    Ver productos
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Finalizar Compra</h2>

            <div className="checkout-grid">

                {/* ── Shipping Form ── */}
                <section className="checkout-section">
                    <h3>Información de Envío</h3>
                    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="checkout-nombre">Nombre Completo</label>
                            <input
                                id="checkout-nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Juan Pérez"
                                className={errors.nombre ? 'input-error' : ''}
                                autoComplete="name"
                            />
                            {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkout-email">Email</label>
                            <input
                                id="checkout-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="juan@ejemplo.com"
                                className={errors.email ? 'input-error' : ''}
                                autoComplete="email"
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkout-direccion">Dirección</label>
                            <input
                                id="checkout-direccion"
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                placeholder="Av. Principal 123"
                                className={errors.direccion ? 'input-error' : ''}
                                autoComplete="street-address"
                            />
                            {errors.direccion && <span className="form-error">{errors.direccion}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkout-ciudad">Ciudad</label>
                            <input
                                id="checkout-ciudad"
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleInputChange}
                                placeholder="Santiago"
                                className={errors.ciudad ? 'input-error' : ''}
                                autoComplete="address-level2"
                            />
                            {errors.ciudad && <span className="form-error">{errors.ciudad}</span>}
                        </div>

                        {/* API Error */}
                        {apiError && (
                            <div className="checkout-api-error">⚠ {apiError}</div>
                        )}

                        <button
                            type="submit"
                            className="confirm-purchase-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? '⏳ Conectando con Webpay...'
                                : `Pagar con Webpay ${formatCurrency(totalPrice)}`}
                        </button>

                        <button
                            type="button"
                            className="back-to-store-btn"
                            onClick={() => navigate(-1)}
                            disabled={isSubmitting}
                        >
                            ← Volver al carrito
                        </button>
                    </form>
                </section>

                {/* ── Order Summary ── */}
                <section className="checkout-section">
                    <h3>Resumen del Pedido</h3>
                    <div className="checkout-summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="checkout-item">
                                <div className="checkout-item-info">
                                    <img
                                        src={require(`../assets/images/products/${item.imagen}`)}
                                        alt={item.nombre}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <div className="checkout-item-details">
                                        <h4>{item.nombre}</h4>
                                        <span>Cantidad: {item.cantidad || 1}</span>
                                        <span className="checkout-item-unit">
                                            {formatCurrency(item.precio)} c/u
                                        </span>
                                    </div>
                                </div>
                                <div className="checkout-item-price">
                                    {formatCurrency(item.precio * (item.cantidad || 1))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-subtotal-row">
                        <span>Subtotal ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="checkout-subtotal-row checkout-shipping-row">
                        <span>Envío</span>
                        <span className="shipping-free">Gratis</span>
                    </div>
                    <div className="checkout-total-row">
                        <span>Total</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>

                    {/* Webpay Badge */}
                    <div className="webpay-badge">
                        <span>🔒 Pago seguro con</span>
                        <strong>Webpay Plus</strong>
                    </div>
                </section>
            </div>
        </div>
    );
}
