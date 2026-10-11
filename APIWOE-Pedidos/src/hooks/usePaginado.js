import { useState, useCallback } from "react";

export const usePaginado = (api, tamanioPagina = 10) => {
    const [items, setItems] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargar = useCallback(async (paginaACargar = 0) => {
        setLoading(true);
        setError(null);
        try {
            setItems(await api.getAll(paginaACargar, tamanioPagina));
            setPagina(paginaACargar); // solo avanza si la request salió bien
        } catch (err) {
            setItems([]);
            setError({ status: err.status ?? null, data: err.data ?? { message: err.message } });
        } finally {
            setLoading(false);
        }
    }, [api, tamanioPagina]);

    return { items, pagina, loading, error, cargar };
};