import { Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home.jsx";
import RecursoPage from "./page/RecursoPage.jsx";
import ConsultaPage from "./page/ConsultaPage.jsx";
import { recursos } from "./config/recursos.js";
import { consultas } from "./config/consultas.js";
import "./App.css";

function App() {
    return (
        <>
            <nav style={{ padding: 12 }}>
                <Link to="/">← Inicio</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />

                {Object.entries(recursos).map(([ruta, cfg]) => (
                    <Route key={ruta} path={`/${ruta}`} element={<RecursoPage key={ruta} {...cfg} />} />
                ))}

                {Object.entries(consultas).map(([ruta, cfg]) => (
                    <Route key={ruta} path={`/${ruta}`} element={<ConsultaPage {...cfg} />} />
                ))}

                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;