// params con {nombre} en el path van en la URL; el resto va como query string
export const consultas = {
    leaderboard: {
        nombre: "Leaderboard",
        consultas: [
            { nombre: "Campeones", path: "/leaderboard/campeones",
                params: [{ name: "pagina", default: 0 }, { name: "tamanioPagina", default: 10 }] },
            { nombre: "Raza líder", path: "/leaderboard/raza-lider" },
            { nombre: "Clase líder", path: "/leaderboard/clase-lider" },
            { nombre: "Más fuerte", path: "/leaderboard/mas-fuerte" },
            { nombre: "Ricky Fort", path: "/leaderboard/ricky-fort" },
        ],
    },
    mochila: {
        nombre: "Mochila",
        consultas: [
            { nombre: "Ver mochila de un personaje", path: "/mochila/{personajeId}",
                params: [{ name: "personajeId", required: true }] },
        ],
    },
};