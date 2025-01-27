const loginForm = document.querySelector(".form");
import { jwtDecode } from 'jwt-decode';

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch('https://apiblog-zzj1.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  
    });

    if (response.status === 400) {
        alert('Contraseña o email invalidos.');
      } else if (!response.ok) {
        alert('Error en la solicitud: ' + response.status);
      }

    const data = await response.json();
    const token = data.token;
    const payload = jwtDecode(token);

    // Simulando autenticación correcta
    if(!payload){
    }else{
        if (payload.role === "admin") {
            const now = new Date();
            const ttl = 3600000;
            const item = {
                token: data.token,
                expiry: now.getTime() + ttl,
            }
            alert("Login exitoso");
            localStorage.setItem('key', JSON.stringify(item));
            window.location.href = "https://myfirstfitnessblog.netlify.app/admin-pages";
            // window.location.href = "https://localhost:4321/admin-pages";
    
        } else if(payload.role === "user"){
            const now = new Date();
            const ttl = 3600000;
            const item = {
                token: data.token,
                expiry: now.getTime() + ttl,
            }
            alert("Login exitoso");
            localStorage.setItem('key', JSON.stringify(item));
            window.location.href = "https://myfirstfitnessblog.netlify.app/";
            // window.location.href = "https://localhost:4321/";
        }else{
            document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
        }
    }

})