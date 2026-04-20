const { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } = require('transbank-sdk');

/**
 * Vercel Serverless Function: POST /api/webpay/confirmar
 * Confirma (commit) la transacción después de que Webpay redirige al comercio.
 */
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const { token } = req.body || {};

    if (!token) return res.status(400).json({ error: 'Falta el parámetro token' });

    try {
        const tx = new WebpayPlus.Transaction(
            new Options(
                IntegrationCommerceCodes.WEBPAY_PLUS,
                IntegrationApiKeys.WEBPAY,
                Environment.Integration
            )
        );
        const response = await tx.commit(token);

        const aprobada = response.response_code === 0 && response.status === 'AUTHORIZED';

        return res.status(200).json({
            aprobada,
            status: response.status,
            amount: response.amount,
            buyOrder: response.buy_order,
            sessionId: response.session_id,
            cardNumber: response.card_detail?.card_number,
            authorizationCode: response.authorization_code,
            paymentType: response.payment_type_code,
            transactionDate: response.transaction_date
        });

    } catch (error) {
        console.error('[Webpay confirmar] Error:', error.message);
        return res.status(500).json({ error: 'Error al confirmar transacción', detalle: error.message });
    }
};
