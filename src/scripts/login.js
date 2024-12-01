const loginForm = document.querySelector(".form");
import { jwtDecode } from 'jwt-decode';

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  
    });
        
    const data = await response.json();
    const token = data.token;
    const payload = jwtDecode(token);

    // Simulando autenticación correcta
    
    if (payload.role === "admin") {
        const now = new Date();
        const ttl = 3600000;
        const item = {
            token: data.token,
            expiry: now.getTime() + ttl,
        }
        alert("Login exitoso");
        localStorage.setItem('key', JSON.stringify(item));
        window.location.href = "http://localhost:4321/admin-pages";

    } else if(payload.role === "user"){
        const now = new Date();
        const ttl = 3600000;
        const item = {
            token: data.token,
            expiry: now.getTime() + ttl,
        }
        alert("Login exitoso");
        localStorage.setItem('key', JSON.stringify(item));
        window.location.href = "http://localhost:4321/";
    }else{
        document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
    }
})