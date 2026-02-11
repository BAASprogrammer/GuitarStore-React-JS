import { useCallback } from 'react';

// Custom hook for formatting currency in CLP
export const useCurrencyFormatter = () => {
    const formatCurrency = useCallback((amount) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }, []);

    return formatCurrency;
};