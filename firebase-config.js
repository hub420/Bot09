

// firebase-config.js
// Configuración de Firebase (usa tus valores del .env)
const firebaseConfig = {
    apiKey: "AIzaSyDoVDY0AVxAEHvZuWUO3zZfg6WBWPQQoNI",
    authDomain: "monteverdebooking.firebaseapp.com",
    projectId: "monteverdebooking",
    storageBucket: "monteverdebooking.appspot.com ",
    messagingSenderId: "1:426724140630:web:2d0831c60f0e9c9c8dfdf7",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-71CQC37SSD"
};
// URL protegida (reemplaza con tu webhook real)
const PROTECTED_URL = "https://n8n.allenweb.click/webhook/c3423ade-d1bd-4bcb-8738-707c1d605b4d/chat";
// Exportar configuración
window.firebaseConfig = firebaseConfig;
window.PROTECTED_URL = PROTECTED_URL;