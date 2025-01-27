const signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    // Primer fetch para obtener los usuarios actuales
    const usersResponse = await fetch('https://apiblog-zzj1.onrender.com/api/users');
    const responseInfo = await usersResponse.json();
    const actualUsers = responseInfo.users;

    if (actualUsers.length === 0) {
      const signupResponse = await fetch('https://apiblog-zzj1.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (signupResponse.ok) {
        alert("Registro exitoso");
        window.location.href = "https://myfirstfitnessblog.netlify.app/";
        // window.location.href = "https://localhost:4321/";
      } else {
        console.error("Error al registrar:", await signupResponse.text());
        alert("Hubo un problema al registrar");
      }
    } else {
      let userExists = actualUsers.some(user => user.email === email);

      if (userExists) {
        alert("Este usuario ya existe");
      } else {
        const signupResponse = await fetch('https://apiblog-zzj1.onrender.com/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (signupResponse.ok) {
          alert("Registro exitoso");
          window.location.href = "https://myfirstfitnessblog.netlify.app/";
          // window.location.href = "https://localhost:4321/";
        } else {
          console.error("Error al registrar:", await signupResponse.text());
          alert("Hubo un problema al registrar");
        }
      }
    }
  } catch (error) {
    console.error("Error en el proceso:", error);
    alert("Algo ha salido mal");
  }
});
