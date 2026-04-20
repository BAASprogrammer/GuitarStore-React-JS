const { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } = require('transbank-sdk');

/**
 * Vercel Serverless Function: POST /api/webpay/crear
 * Creates a Webpay Plus transaction (integration/testing environment)
 */
module.exports = async function handler(req, res) {
    // CORS headers for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const { amount, buyOrder, sessionId, returnUrl } = req.body || {};

    if (!amount || !buyOrder || !sessionId || !returnUrl) {
        return res.status(400).json({
            error: 'Faltan parámetros: amount, buyOrder, sessionId, returnUrl'
        });
    }

    try {
        const tx = new WebpayPlus.Transaction(
            new Options(
                IntegrationCommerceCodes.WEBPAY_PLUS,
                IntegrationApiKeys.WEBPAY,
                Environment.Integration
            )
        );
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

        return res.status(200).json({ token: response.token, url: response.url });

    } catch (error) {
        console.error('[Webpay crear] Error:', error.message);
        return res.status(500).json({ error: 'Error al iniciar transacción con Webpay', detalle: error.message });
    }
};
