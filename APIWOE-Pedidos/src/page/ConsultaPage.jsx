import { useState } from "react";
import { get } from "../services/apiService.js";
import Json from "../components/Json.jsx";

const armarUrl = (path, params, valores) => {
    const query = new URLSearchParams();
    let url = path;
    params.forEach((p) => {
        const v = valores[p.name];
        if (path.includes(`{${p.name}}`)) {
            url = url.replace(`{${p.name}}`, encodeURIComponent(v));
        } else if (v !== "" && v != null) {
            query.append(p.name, v);
        }
    });
    const qs = query.toString();
    return qs ? `${url}?${qs}` : url;
};

const Consulta = ({ consulta }) => {
    const params = consulta.params ?? [];
    const [valores, setValores] = useState(
        Object.fromEntries(params.map((p) => [p.name, p.default ?? ""]))
    );
    const [respuesta, setRespuesta] = useState(null);
    const [loading, setLoading] = useState(false);

    const url = armarUrl(consulta.path, params, valores);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRespuesta(null);
        try {
            const data = await get(url);
            setRespuesta({ ok: true, data: data ?? { mensaje: "Sin contenido" } });
        } catch (err) {
            setRespuesta({ ok: false, status: err.status, data: err.data ?? { message: err.message } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{consulta.nombre}</h2>
            <small>GET {url}</small>

            {params.map((p) => (
                <input
                    key={p.name}
                    type="number"
                    placeholder={p.name}
                    title={p.name}
                    required={p.required}
                    value={valores[p.name]}
                    onChange={(e) => setValores((prev) => ({ ...prev, [p.name]: e.target.value }))}
                />
            ))}

            <button type="submit" disabled={loading}>
                {loading ? "Consultando..." : "Consultar (GET)"}
            </button>

            {respuesta && (
                <Json
                    titulo={respuesta.ok ? "OK" : `Error ${respuesta.status ?? ""}`}
                    data={respuesta.data}
                    error={!respuesta.ok}
                />
            )}
        </form>
    );
};

const ConsultaPage = ({ nombre, consultas }) => (
    <div className="auth-container">
        <h1>{nombre}</h1>
        {consultas.map((c) => <Consulta key={c.path} consulta={c} />)}
    </div>
);

export default ConsultaPage;