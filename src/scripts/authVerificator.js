import { jwtDecode } from 'jwt-decode';

let authorization = () => {
  try {
    const itemStr = localStorage.getItem('key'); // Obtener el token JWT almacenado
    if (itemStr) {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem("key"); //null si el token expira
        window.location.href = '/login';
        return null;
      }
      const token = item.token;
      const payload = jwtDecode(token);
      if (payload.role !== "admin" && payload.role === "user"){
        console.log("no es token de admin") //null si el token no pertenece a un admin
        window.location.href = '/';  
        return token;
      }
      return token; 
      
       
    }else {
        console.log("no hay token") //null si no hay token  
        return null;
    }

} catch (error) {
    console.log("error") // null si ocurre un error
    return null;
}
}
export default authorization;