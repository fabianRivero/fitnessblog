const signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch('http://localhost:4000/api/users');
    const responseInfo = await response.json();
    const actualUsers = responseInfo.users;

    try {  
      if(actualUsers.length === 0){
        await fetch('http://localhost:4000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, role:"user" }),  
        });
        alert("Registro exitoso");
        window.location.href = "http://localhost:4321/";
      }else if(actualUsers.length > 0){
        let verificator = false;
        const data = await response.json();
        const users = data.users;
        for (const us of users) {
          if(us.email === email){
              verificator = true;
          };        
        };
        if(verificator === false) {
          await fetch('http://localhost:4000/api/users/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, password, role:"user" }),  
          });
        alert("Registro exitoso");
        window.location.href = "http://localhost:4321/";

        }else if(verificator === true){
          alert("Este usuario ya existe");
        }else{
            document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
        };
      };
    }catch(error){
      alert("algo ha salido mal");
      console.log(error);
    }; 

    // try {
    //     const response = await fetch('http://localhost:4000/api/users');
    //     let verificator = false;
    //     if(response){
    //       const data = await response.json();
    //       const users = data.users;
    //       for (const us of users) {
    //         if(us.email === email){
    //             verificator = true;
    //         };        
    //       };
    //     };
        
    //     if(verificator === false) {
    //         await fetch('http://localhost:4000/api/users/signup', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, email, password, role:"user" }),  
    //         });
    //       alert("Registro exitoso");
    //       window.location.href = "http://localhost:4321/";

    //     }else if(verificator === true){
    //       alert("Este usuario ya existe");
    //     }else{
    //         document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
    //     };

    // }catch(error){
    //         alert("algo ha salido mal");
    //         console.log(error);
    //     }; 
})