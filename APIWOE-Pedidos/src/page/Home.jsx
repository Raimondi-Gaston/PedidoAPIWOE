import { Link } from "react-router-dom";
import { recursos } from "../config/recursos.js";

const Home = () => (
    <div className="auth-container">
        <h1>World of EPERS</h1>
        <p>Elegí un recurso:</p>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {Object.entries(recursos).map(([ruta, cfg]) => (
                <li key={ruta}>
                    <Link to={`/${ruta}`}>{cfg.nombre}</Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Home;