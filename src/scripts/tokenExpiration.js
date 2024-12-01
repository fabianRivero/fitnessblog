import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token) {

  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true;
  }
}

const token = localStorage.getItem("key");

if (isTokenExpired(token)) {
  console.log('El token ha expirado');
  localStorage.removeItem('key');
} else {
  console.log('El token sigue siendo válido');
}