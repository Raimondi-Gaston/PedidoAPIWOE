const apiUrl = "http://localhost:8080";

const request = async (method, url, data = null) => {
    const response = await fetch(`${apiUrl}${url}`, {
        method,
        headers: data != null ? { "Content-Type": "application/json" } : undefined,
        body: data != null ? JSON.stringify(data) : undefined,
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const error = new Error(body?.msg || body?.message || `Error de API: ${response.status}`);
        error.status = response.status;
        error.data = body;
        throw error;
    }

    return body;
};

const crud = (recurso) => ({
    getAll: (pagina = 0, tamanioPagina = 10) =>
        request("GET", `/${recurso}?pagina=${pagina}&tamanioPagina=${tamanioPagina}`),
    getById: (id) => request("GET", `/${recurso}/${id}`),
    create: (data) => request("POST", `/${recurso}`, data),
    update: (id, data) => request("PUT", `/${recurso}/${id}`, data),
    remove: (id) => request("DELETE", `/${recurso}/${id}`),
});

export const monstruoApi = crud("monstruo");
export const itemApi = crud("item");
export const claseApi = crud("clase");
export const razaApi = crud("raza");
export const personajeApi = crud("personaje");
export const ubicacionApi = crud("ubicacion");
export const misionApi = crud("mision");

// Para no romper lo que ya tenés en Test
export const getClases = claseApi.getAll;
