import {
    claseApi, razaApi, ubicacionApi, monstruoApi, itemApi, personajeApi, misionApi,
} from "../services/apiService.js";

// completá las opciones con los valores reales de tus enums
export const recursos = {
    clase: {
        nombre: "Clase", api: claseApi,
        campos: [
            { name: "tipo", tipo: "select", opciones: ["BARBARO", "BRUJO", "PALADIN", "PICARO", "CAZADOR"] },
            { name: "porcentajeFuerza", tipo: "number" },
            { name: "porcentajeDestreza", tipo: "number" },
            { name: "porcentajeVida", tipo: "number" },
        ],
    },
    raza: {
        nombre: "Raza", api: razaApi,
        campos: [
            { name: "nombre", tipo: "text" },
            { name: "peso", tipo: "number" },
            { name: "altura", tipo: "number" },
            { name: "energiaInicial", tipo: "number" },
            { name: "urlFoto", tipo: "text" },
        ],
    },
    ubicacion: {
        nombre: "Ubicación", api: ubicacionApi,
        campos: [
            { name: "tipo", tipo: "select", opciones: ["ARENA", "TABERNA", "TIENDA"] },
            { name: "nombre", tipo: "text" },
        ],
    },
    monstruo: {
        nombre: "Monstruo", api: monstruoApi,
        campos: [
            { name: "tipo", tipo: "select", opciones: ["GOBLIN", "DRAGON", "LOBO", "BANDIDO", "ZOMBIE"] },
            { name: "vida", tipo: "number" },
            { name: "danio", tipo: "number" },
        ],
    },
    item: {
        nombre: "Item", api: itemApi,
        campos: [
            { name: "tipo", tipo: "select", opciones: ["ESPADA", "ARCO", "BOTA", "ARMADURA", "ESCUDO", "FLECHA", "CASCO", "GUANTE", "PANTALON"], soloCreacion: true },
            { name: "nombre", tipo: "text" },
            { name: "ubicacion", tipo: "select", opciones: ["MANO_DERECHA", "CABEZA", "TORSO", "PIERNAS","MANO_IZQUIERDA"] },
            { name: "peso", tipo: "number" },
            { name: "danio", tipo: "number" },
            { name: "costComp", tipo: "number" },
            { name: "costVent", tipo: "number" },
            { name: "reqFue", tipo: "number" },
            { name: "reqNiv", tipo: "number" },
            { name: "reqDes", tipo: "number" },
            { name: "buffVida", tipo: "number", soloCreacion: true },
            { name: "buffFuerza", tipo: "number", soloCreacion: true },
            { name: "buffDestreza", tipo: "number", soloCreacion: true },
            { name: "buffArmadura", tipo: "number", soloCreacion: true },
        ],
    },
    personaje: {
        nombre: "Personaje", api: personajeApi,
        campos: [
            { name: "nombre", tipo: "text" },
            { name: "energia", tipo: "number", soloCreacion: true },
            { name: "razaId", tipo: "id" },
            { name: "claseId", tipo: "id" },
            { name: "ubicacionId", tipo: "id", soloCreacion: true },
            { name: "fuerza", tipo: "number", soloCreacion: true },
            { name: "destreza", tipo: "number", soloCreacion: true },
            { name: "vida", tipo: "number", soloCreacion: true },
            { name: "armadura", tipo: "number", soloCreacion: true },
        ],
    },
    mision: {
        nombre: "Misión", api: misionApi,
        campos: [
            { name: "nombre", tipo: "text" },
            { name: "tipoMision", tipo: "select", opciones: ["MISION_VENCER", "MISION_IR", "MISION_GANAR", "MISION_OBTENER"], soloCreacion: true },
            { name: "origenMisionId", tipo: "id", soloCreacion: true },
            { name: "recompensaItemId", tipo: "id" },
            { name: "recompensaExp", tipo: "number" },
            { name: "recompensaMonedas", tipo: "number" },
            { name: "desbloqueaIds", tipo: "lista", soloCreacion: true },
            { name: "monstruoAVencerId", tipo: "id", soloCreacion: true },
            { name: "ubicacionAIrId", tipo: "id", soloCreacion: true },
            { name: "itemAObtenerId", tipo: "id", soloCreacion: true },
            { name: "cantGanar", tipo: "number", soloCreacion: true },
        ],
    },
};