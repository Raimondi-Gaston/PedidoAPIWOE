import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import RecursoPage from "./page/RecursoPage.jsx";
import { recursos } from "./config/recursos.js";
import Home from "./page/Home.jsx";
import './App.css'

function App() {
    return (
        <>
            <nav style={{ padding: 12 }}>
                <Link to="/">← Inicio</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                {Object.entries(recursos).map(([ruta, cfg]) => (
                    <Route key={ruta} path={`/${ruta}`} element={<RecursoPage {...cfg} />} />
                ))}
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;