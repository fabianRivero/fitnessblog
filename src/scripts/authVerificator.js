import { jwtDecode } from 'jwt-decode';

let authorization = () => {
  try {
    const itemStr = localStorage.getItem('key'); 
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
        window.location.href = '/';  
        return token;
      }
      return token; 
      
       
    }else {
        return null;
    }

} catch (error) {
    return null;
}
}
export default authorization;