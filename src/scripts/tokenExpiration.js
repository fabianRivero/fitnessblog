import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem("key");

function isTokenExpired(token) {

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true;
  }
}
if (!token) {
  console.warn("No se encontró un token en el almacenamiento local.");
} else if (isTokenExpired(token)) {
  console.log('El token ha expirado');
  localStorage.removeItem('key');
} else {
  console.log('El token sigue siendo válido');
}