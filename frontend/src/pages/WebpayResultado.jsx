import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCurrency from '../hooks/useCurrency';

/**
 * Webpay Plus payment result page.
 * Webpay redirects here (GET with ?token_ws=...) after payment.
 * This page calls /api/webpay/confirmar to get the result.
 */
export default function WebpayResultado({ emptyCart }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const formatCurrency = useCurrency();
    const [estado, setEstado] = useState('cargando'); // 'cargando' | 'aprobado' | 'rechazado' | 'error'
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        const token = searchParams.get('token_ws');
        const tbkToken = searchParams.get('TBK_TOKEN'); // aborted payment

        // If TBK_TOKEN is present but not token_ws → user aborted the payment
        if (!token && tbkToken) {
            setEstado('rechazado');
            return;
        }

        // If there's no token → direct access to URL without payment
        if (!token) {
            navigate('/');
            return;
        }

        // Confirm the transaction with our serverless backend
        const confirmar = async () => {
            try {
                const res = await fetch('/api/webpay/confirmar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });
                const data = await res.json();

                if (data.aprobada) {
                    setDetalle(data);
                    setEstado('aprobado');
                    emptyCart(); // Empty the cart after successful payment
                } else {
                    setEstado('rechazado');
                }
            } catch (err) {
                console.error('Error al confirmar pago:', err);
                setEstado('error');
            }
        };

        confirmar();
    }, [searchParams, navigate, emptyCart]);

    if (estado === 'cargando') {
        return (
            <div className="webpay-resultado center">
                <div className="webpay-card">
                    <div className="webpay-spinner" aria-label="Procesando pago..." />
                    <h2>Verificando tu pago...</h2>
                    <p>Por favor espera un momento.</p>
                </div>
            </div>
        );
    }

    if (estado === 'aprobado') {
        return (
            <div className="webpay-resultado center">
                <div className="webpay-card webpay-aprobado">
                    <div className="webpay-icon">✓</div>
                    <h2>¡Pago Aprobado!</h2>
                    <p>Gracias por tu compra. Tu pedido ha sido procesado con éxito.</p>
                    {detalle && (
                        <div className="webpay-detalle">
                            <div className="webpay-detalle-row">
                                <span>Monto</span>
                                <strong>{formatCurrency(detalle.amount)}</strong>
                            </div>
                            <div className="webpay-detalle-row">
                                <span>Orden de compra</span>
                                <strong>{detalle.buyOrder}</strong>
                            </div>
                            <div className="webpay-detalle-row">
                                <span>Tarjeta</span>
                                <strong>**** **** **** {detalle.cardNumber}</strong>
                            </div>
                            <div className="webpay-detalle-row">
                                <span>Código autorización</span>
                                <strong>{detalle.authorizationCode}</strong>
                            </div>
                        </div>
                    )}
                    <button className="confirm-purchase-btn" onClick={() => navigate('/')}>
                        Volver a la tienda
                    </button>
                </div>
            </div>
        );
    }

    if (estado === 'rechazado') {
        return (
            <div className="webpay-resultado center">
                <div className="webpay-card webpay-rechazado">
                    <div className="webpay-icon">✕</div>
                    <h2>Pago no completado</h2>
                    <p>Tu pago fue rechazado o cancelado. No se realizó ningún cobro.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="confirm-purchase-btn" onClick={() => navigate('/checkout', { state: { cart: [] } })} style={{ background: 'var(--text-secondary)', maxWidth: '200px' }}>
                            Intentar de nuevo
                        </button>
                        <button className="confirm-purchase-btn" onClick={() => navigate('/')} style={{ maxWidth: '200px' }}>
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="webpay-resultado center">
            <div className="webpay-card webpay-rechazado">
                <div className="webpay-icon">!</div>
                <h2>Error inesperado</h2>
                <p>Ocurrió un error al procesar tu pago. Si el monto fue descontado, contáctanos.</p>
                <button className="confirm-purchase-btn" onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}
