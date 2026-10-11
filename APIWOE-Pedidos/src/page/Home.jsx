import { Link } from "react-router-dom";
import { recursos } from "../config/recursos.js";
import { consultas } from "../config/consultas.js";

const Home = () => (
    <div className="auth-container">
        <h1>World of EPERS</h1>

        <h2>Recursos (CRUD)</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {Object.entries(recursos).map(([ruta, cfg]) => (
                <li key={ruta}>
                    <Link to={`/${ruta}`}>{cfg.nombre}</Link>
                </li>
            ))}
        </ul>

        <h2>Consultas (GET)</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {Object.entries(consultas).map(([ruta, cfg]) => (
                <li key={ruta}>
                    <Link to={`/${ruta}`}>{cfg.nombre}</Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Home;