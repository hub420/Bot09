// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Inicializar Firebase
const app = initializeApp(window.firebaseConfig);
const auth = getAuth(app);

// Estado de autenticación
let currentUser = null;

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateUI(user);
});

// Función de login
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Usuario autenticado:", user.email);
        return { success: true, user: user };
        
    } catch (error) {
        console.error("Error en login:", error);
        return { 
            success: false, 
            error: getErrorMessage(error.code) 
        };
    }
}

// Función de registro
async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Usuario registrado:", user.email);
        return { success: true, user: user };
        
    } catch (error) {
        console.error("Error en registro:", error);
        return { 
            success: false, 
            error: getErrorMessage(error.code) 
        };
    }
}

// Función de logout
async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Usuario desconectado");
        return { success: true };
    } catch (error) {
        console.error("Error en logout:", error);
        return { success: false, error: error.message };
    }
}

// Verificar si usuario está autenticado
function isAuthenticated() {
    return currentUser !== null;
}

// Obtener usuario actual
function getCurrentUser() {
    return currentUser;
}

// Redireccionar si está autenticado
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = window.PROTECTED_URL;
        return true;
    }
    return false;
}

// Actualizar interfaz basada en estado de autenticación
function updateUI(user) {
    const loginForm = document.getElementById('loginForm');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (user) {
        // Usuario autenticado
        if (loginForm) loginForm.style.display = 'none';
        if (getStartedBtn) {
            getStartedBtn.textContent = 'Go to Dashboard';
            getStartedBtn.onclick = () => window.location.href = window.PROTECTED_URL;
        }
        
        // Mostrar info del usuario
        if (userInfo) {
            userInfo.innerHTML = `
                <div class="text-white">
                    Bienvenido: ${user.email}
                    <button class="btn btn-sm btn-outline-light ms-2" onclick="handleLogout()">Cerrar Sesión</button>
                </div>
            `;
            userInfo.style.display = 'block';
        }
    } else {
        // Usuario no autenticado
        if (getStartedBtn) {
            getStartedBtn.textContent = 'Get Started';
            getStartedBtn.onclick = toggleLoginForm;
        }
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Traducir errores de Firebase
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/email-already-in-use': 'El email ya está registrado',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/invalid-email': 'Email inválido',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión'
    };
    
    return errorMessages[errorCode] || 'Error desconocido';
}

// Mostrar/ocultar formulario de login
function toggleLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm.style.display === 'none' || loginForm.style.display === '') {
        loginForm.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
    }
}

// Manejar envío del formulario
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');
    
    if (!email || !password) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    showMessage('Iniciando sesión...', 'loading');
    
    const result = await loginUser(email, password);
    
    if (result.success) {
        showMessage('¡Autenticación exitosa! Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = window.PROTECTED_URL;
        }, 1500);
    } else {
        showMessage(result.error, 'error');
    }
}

// Manejar logout
async function handleLogout() {
    const result = await logoutUser();
    if (result.success) {
        showMessage('Sesión cerrada exitosamente', 'success');
    }
}

// Mostrar mensajes
function showMessage(message, type) {
    const messageDiv = document.getElementById('loginMessage');
    if (!messageDiv) return;
    
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'loading': 'alert-info'
    };
    
    messageDiv.innerHTML = `
        <div class="alert ${alertClass[type]} alert-dismissible fade show" role="alert">
            ${message}
            ${type !== 'loading' ? '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' : ''}
        </div>
    `;
}

// Exportar funciones globalmente
window.loginUser = loginUser;
window.registerUser = registerUser;
window.logoutUser = logoutUser;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.toggleLoginForm = toggleLoginForm;
window.redirectIfAuthenticated = redirectIfAuthenticated;

// Auto-redireccionar si ya está autenticado
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento para que Firebase inicialice
    setTimeout(() => {
        if (isAuthenticated()) {
            console.log("Usuario ya autenticado, mostrando opción de dashboard");
        }
    }, 1000);
});