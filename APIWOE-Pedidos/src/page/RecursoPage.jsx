import { useState } from "react";
import { usePaginado } from "../hooks/usePaginado.js";
import Json from "../components/Json.jsx";

const TAMANIO = 10;

const valorInicial = (c) =>
    c.default ?? (c.tipo === "number" ? 0 : c.tipo === "select" ? c.opciones[0] : "");

const valoresIniciales = (campos) =>
    Object.fromEntries(campos.map((c) => [c.name, valorInicial(c)]));

// del form al body
const convertir = (c, valor) => {
    switch (c.tipo) {
        case "number": return Number(valor) || 0;
        case "id":     return valor === "" || valor == null ? null : Number(valor);
        case "lista":  return String(valor).split(",").map((s) => s.trim()).filter(Boolean).map(Number);
        default:       return valor;
    }
};

// de la respuesta del back al form
const aFormulario = (c, valor) =>
    c.tipo === "lista" ? (valor ?? []).join(",") : (valor ?? "");

const RecursoPage = ({ nombre, api, campos }) => {
    const { items, pagina, loading, error, cargar } = usePaginado(api, TAMANIO);
    const [formData, setFormData] = useState(valoresIniciales(campos));
    const [editandoId, setEditandoId] = useState(null);
    const [idBusqueda, setIdBusqueda] = useState("");
    const [listado, setListado] = useState(false);
    const [respuesta, setRespuesta] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // en modo edición no se mandan los campos marcados soloCreacion
    const armarBody = () =>
        Object.fromEntries(
            campos
                .filter((c) => !(editandoId && c.soloCreacion))
                .map((c) => [c.name, convertir(c, formData[c.name])])
        );

    const limpiar = () => {
        setFormData(valoresIniciales(campos));
        setEditandoId(null);
    };

    const ejecutar = async (fn) => {
        setRespuesta(null);
        try {
            const data = await fn();
            setRespuesta({ ok: true, data: data ?? { mensaje: "Sin contenido" } });
            return { ok: true, data };
        } catch (err) {
            setRespuesta({ ok: false, status: err.status, data: err.data ?? { message: err.message } });
            return { ok: false };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        const { ok } = await ejecutar(() =>
            editandoId ? api.update(editandoId, armarBody()) : api.create(armarBody())
        );
        setEnviando(false);
        if (ok) {
            limpiar();
            if (listado) cargar(pagina);
        }
    };

    const handleTraer = async () => {
        const { ok, data } = await ejecutar(() => api.getById(idBusqueda));
        if (ok && data) {
            setEditandoId(data.id);
            setFormData(Object.fromEntries(campos.map((c) => [c.name, aFormulario(c, data[c.name])])));
        }
    };

    const handleEliminar = async () => {
        if (!window.confirm(`¿Eliminar ${nombre} ${idBusqueda}?`)) return;
        const { ok } = await ejecutar(() => api.remove(idBusqueda));
        if (ok && listado) cargar(pagina);
    };

    const handleListar = () => {
        setListado(true);
        cargar(0);
    };

    const renderCampo = (c) => {
        const comun = {
            key: c.name,
            name: c.name,
            value: formData[c.name],
            onChange: handleChange,
            title: c.name,
            disabled: !!(editandoId && c.soloCreacion),
        };
        if (c.tipo === "select") {
            return (
                <select {...comun}>
                    {c.opciones.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
            );
        }
        const esNumero = c.tipo === "number" || c.tipo === "id";
        return (
            <input
                {...comun}
                type={esNumero ? "number" : "text"}
                step={c.tipo === "number" ? (c.step ?? "any") : undefined}
                placeholder={c.tipo === "lista" ? `${c.name} (ej: 1,2,3)` : c.name}
            />
        );
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>{editandoId ? `Editar ${nombre} #${editandoId}` : `Nuevo/a ${nombre}`}</h1>

                {campos.map(renderCampo)}

                <button type="submit" disabled={enviando}>
                    {enviando ? "Enviando..." : editandoId ? "Guardar cambios (PUT)" : "Crear (POST)"}
                </button>
                {editandoId && <button type="button" onClick={limpiar}>Cancelar edición</button>}
            </form>

            <div>
                <input type="number" placeholder="id" value={idBusqueda}
                       onChange={(e) => setIdBusqueda(e.target.value)} />
                <button type="button" onClick={handleTraer} disabled={!idBusqueda}>Traer (GET)</button>
                <button type="button" onClick={handleEliminar} disabled={!idBusqueda}>Eliminar (DELETE)</button>
            </div>

            {respuesta && (
                <Json titulo={respuesta.ok ? "OK" : `Error ${respuesta.status ?? ""}`}
                      data={respuesta.data} error={!respuesta.ok} />
            )}

            <hr />

            <button type="button" onClick={handleListar} disabled={loading}>
                {loading ? "Cargando..." : `Listar (GET)`}
            </button>

            {error && <Json titulo={`Error ${error.status ?? ""}`} data={error.data} error />}
            {!error && listado && !loading && <Json data={items} />}

            {listado && (
                <div>
                    <button onClick={() => cargar(pagina - 1)} disabled={pagina === 0 || loading}>Anterior</button>
                    <span> Página {pagina} </span>
                    <button onClick={() => cargar(pagina + 1)} disabled={loading || items.length < TAMANIO}>Siguiente</button>
                </div>
            )}
        </div>
    );
};

export default RecursoPage;