import { useState, useEffect } from 'react';

const UserLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('key');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

    const handleLoginRedirect = (event) => {
      event.preventDefault()
      window.location.href = "https://myfirstfitnessblog.netlify.app/login"; 
    };
    const handleSignupRedirect = (event) => {
      event.preventDefault()
      window.location.href = "https://myfirstfitnessblog.netlify.app/signup";
    };
    const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem("key")
      window.location.href = "https://myfirstfitnessblog.netlify.app/";
    };

  return (
  <>
    {
      user === null 
      ?
      <div className="user-action-buttons">
        <button onClick={handleLoginRedirect} className="login-button" suppressHydrationWarning>Iniciar sesión</button>
        <button onClick={handleSignupRedirect} className="signup-button" suppressHydrationWarning>Crear cuenta</button>
      </div>
      :
      <div className="user-action-buttons">
        <button onClick={handleLogout} className="logout-button" suppressHydrationWarning>Cerrar sesión</button>
      </div>
    }
  </>  
  );
};

export default UserLogin