# Fitness Blog

## Descripción:
[English](#description)  
[Link a la página](https://myfirstfitnessblog.netlify.app/)

Este proyecto es un blog desarrollado en Astro con componentes React. Permite registrar usuarios con diferentes roles dentro del blog.

### Roles:
Los roles de usuario que admite son:  

#### - **Usuarios:**
Estos usuarios se registran a través del botón **Crear cuenta** en el header de la página. Tienen acceso a hacer comentarios y calificar los blogs.
**IMPORTANTE:** Si quieres probar las funcionalidades de este rol sin tener que crear una cuenta nueva, puedes acceder pulsando el boton **Iniciar Sesión** con los siguientes datos:
**Email:** user1@email.com
**Contraseña:** 12345678

#### - **Administrador:**
Este rol está asignado a un usuario específico y no se pueden crear nuevos administradores.  
Tiene acceso a las funciones del rol de usuario y, además, puede acceder a las **páginas de administrador**, donde puede crear, editar y borrar blogs.  
**IMPORTANTE:** Si quieres probar las funcionalidades de este rol sin tener que crear una cuenta nueva, puedes acceder pulsando el boton **Iniciar Sesión** con los siguientes datos:
**Email:** admin@email.com
**Contraseña:** 12345678

---

### Páginas de administrador:
Para acceder a las páginas de administrador, visita:  
[https://myfirstfitnessblog.netlify.app/admin-pages](https://myfirstfitnessblog.netlify.app/admin-pages)  

Solo puedes entrar si iniciaste sesión como administrador. Desde aquí puedes:  

- **Crear un nuevo blog**  
- **Editar un blog existente**  
- **Borrar un blog**

#### Crear nuevo blog:
Al hacer clic en **Crear nuevo blog**, accedes al editor de blogs.  
Los blogs nuevos se mostrarán automáticamente junto con los existentes, gracias a la paginación dinámica de Astro.

#### Editor de blogs:
El editor de blogs incluye los siguientes campos:

- **Título:** Aquí se ingresa el título del blog.  
- **Tags:** Se seleccionan las etiquetas del blog para definir sus temas.  
- **Imagen del artículo:** Se ingresa una URL para la imagen del encabezado del blog.  
- **Descripción:** Breve resumen del blog que aparecerá en la vista previa.  
- **Contenido:** Se puede escribir el contenido del blog con opciones de formato como negrita, subrayado, alineación y agregar imágenes.

#### Borrar blog existente:
Esta página lista todos los blogs disponibles. Para eliminar uno o varios blogs:
1. Marca los checkboxes de los blogs que deseas borrar.  
2. Haz clic en **Eliminar blogs seleccionados**.

#### Editar blog existente:
Para editar un blog, selecciónalo de la lista. Esto abrirá el editor de blogs con una opción adicional para visualizar el contenido actual antes de hacer cambios.

---

## Description:
[Español](#descripción)  
[Link to the page](https://myfirstfitnessblog.netlify.app/)

This project is a blog developed in Astro with React components. It allows users to register with different roles within the blog.

### Roles:
The available user roles are:  

#### Users:
These users register through the **Create Account** button in the website header. They can comment and rate blogs.
**IMPORTANT:** If you want to test the functionalities of this role without creating a new account, you can log in by clicking the "Log In" button with the following credentials:
**Email:** user1@email.com
**Password:** 12345678

#### Administrator:
This role is assigned to a specific user, and new administrators cannot be created.
Administrators have access to all user functionalities and can also access the admin pages, where they can create, edit, and delete blogs.
**IMPORTANT:** If you want to test the functionalities of this role without creating a new account, you can log in by clicking the "Log In" button with the following credentials:
**Email:** admin@email.com
**Password:** 12345678

---

### Admin Pages:
To access the admin pages, visit:  
[https://myfirstfitnessblog.netlify.app/admin-pages](https://myfirstfitnessblog.netlify.app/admin-pages)  

You can only enter if you are logged in as an administrator. From here, you can:  

- **Create a new blog**  
- **Edit an existing blog**  
- **Delete a blog**  

#### Create a new blog:
Clicking **Create New Blog** opens the blog editor.  
New blogs will automatically appear along with existing ones, thanks to Astro's dynamic pagination.

#### Blog Editor:
The blog editor includes the following fields:

- **Title:** Enter the blog title.  
- **Tags:** Select tags to categorize the blog content.  
- **Article Image:** Enter a URL for the header image of the blog.  
- **Description:** A short summary of the blog post, displayed in the preview.  
- **Content:** Write the blog content using formatting options like bold, underline, alignment, and image insertion.

#### Delete an existing blog:
This page lists all available blogs. To delete one or multiple blogs:  
1. Select the checkboxes of the blogs you want to delete.  
2. Click **Delete Selected Blogs**.

#### Edit an existing blog:
To edit a blog, select it from the list. This will open the blog editor, with an additional option to view the current blog content before making changes.


