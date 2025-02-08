import { useState, useEffect } from "react";
import Categories from "../React/Categories.jsx";
import { currentDomain, backendDomain } from "../../scripts/urlDomains.js";

const DeleteArticles = ({ page }) => {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [token, setToken] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [selectedIds, setSelectedIds] = useState([]); 

    useEffect(() => {
        const getInitialBlogs = async () => {
            try {
                const getToken = localStorage.getItem("key");
                setToken(getToken);
                const response = await fetch(`${backendDomain}/api/blogs?pageSize=${page}`);
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        getInitialBlogs();
    }, []);

    useEffect(() => {
        const getFilteredBlogs = async () => {
            try {
                if (tags.length === 0) {
                    const response = await fetch(`${backendDomain}/api/blogs?pageSize=${page}/`);
                    const data = await response.json();
                    setBlogs(data.blogs);

                } else {
                    const tagsSelected = tags.join(",");
                    const response = await fetch(
                        `${backendDomain}/api/blogs?pageSize=${page}&tags=${tagsSelected}`
                    );
                    const data = await response.json();
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        getFilteredBlogs();
    }, [tags]);

    useEffect(() => {
    }, [selectedIds, showConfirmation]);


    const handleTagClick = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleCheckboxChange = (id) => {
        setSelectedCheckboxes((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDeleteClick = () => {
        const ids = Object.keys(selectedCheckboxes).filter((id) => selectedCheckboxes[id]);
        if (ids.length === 0) {
            alert("No has seleccionado ningún blog.");
            return;
        }
    
        setSelectedIds(ids); 
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
    try {
        let calificactionsArray = [];
        let commentsArray = [];
        const parsedToken = JSON.parse(token).token;

        // 1. Eliminar los blogs seleccionados y recopilar datos relacionados
        for (const id of selectedIds) {
            const getData = await fetch(`${backendDomain}/api/blogs/${id}`);
            const data = await getData.json();

            calificactionsArray = [...calificactionsArray, ...data.blog.usersLikes];
            commentsArray = [...commentsArray, ...data.blog.usersComments];

            const response = await fetch(`${backendDomain}/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar los blogs.");
            }
        }

        console.log("Calificaciones recopiladas:", calificactionsArray);
        console.log("Comentarios recopilados:", commentsArray);

        // 2. Obtener usuarios únicos que interactuaron con los blogs (calificaciones y comentarios)
        const getUsersFromInteractions = async (interactionsArray) => {
            const users = [];
            for (const interaction of interactionsArray) {
                const response = await fetch(`${backendDomain}/api/users/${interaction.userId}`);
                const getUser = await response.json();
                users.push(getUser.user);
            }
            // Filtrar usuarios únicos por ID
            return users.filter((obj, index, self) => index === self.findIndex((t) => t.id === obj.id));
        };

        const usersForCalifications = await getUsersFromInteractions(calificactionsArray);
        const usersForComments = await getUsersFromInteractions(commentsArray);

        console.log("Usuarios para calificaciones:", usersForCalifications);
        console.log("Usuarios para comentarios:", usersForComments);

        // 3. Actualizar los usuarios eliminando las referencias a las calificaciones y comentarios
        const updateUser = async (userId, updatedField) => {
            const response = await fetch(`${backendDomain}/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${parsedToken}`,
                },
                body: JSON.stringify(updatedField),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar el usuario ${userId}.`);
            }
        };

        // 3.1 Actualizar comentarios
        for (const user of usersForComments) {
            const commentsToRemove = commentsArray.map(comment => comment.id);
            const updatedComments = user.blogsCommented.filter(
                comment => !commentsToRemove.includes(comment.id)
            );

            await updateUser(user.id, { blogsCommented: updatedComments });
        }

        // 3.2 Actualizar calificaciones
        for (const user of usersForCalifications) {
            const calificationsToRemove = calificactionsArray.map(calification => calification.id);
            const updatedCalifications = user.blogsLiked.filter(
                calification => !calificationsToRemove.includes(calification.id)
            );

            await updateUser(user.id, { blogsLiked: updatedCalifications });
        }

       alert("¡Blogs eliminados con éxito!");

        // Recargar la lista de blogs actualizada
        const response = await fetch(`${backendDomain}/api/blogs?pageSize=${page}`);
        const data = await response.json();
        setBlogs(data.blogs);

        // Reiniciar los estados relacionados
        setSelectedCheckboxes({});
        setSelectedIds([]);
        setShowConfirmation(false);
        
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
};


    const cancelDelete = () => {
        setShowConfirmation(false); // Cierra el aviso sin eliminar
    };

    return (
        <>
            <Categories tags={tags} handleTagClick={handleTagClick}/>

            <div className="articles">
                {blogs.map((blog) => (
                    <div className="article-container" key={blog.id}>
                        <input
                            type="checkbox"
                            id={`${blog.id}`}
                            className={selectedCheckboxes[blog.id] ? "selected" : ""}
                            onChange={() => handleCheckboxChange(blog.id)}
                            checked={!!selectedCheckboxes[blog.id]}
                        />
                        <article className="article">
                            <p className="id">{blog.id}</p>
                            <a href={`${currentDomain}/admin-pages/delete-blog/post/${blog.linkTitle}`} className="articleContainer">
                                <div className="imgContainer">
                                    <img src={`${blog.cardImage}`} alt="" />
                                </div>
                                <span className="date">
                                    Fecha de publicación: {blog.publicationDate}
                                </span>
                                <ul>
                                    {blog.tags.map((tag) => (
                                        <li key={tag} className="tag">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
                            </a>
                        </article>
                    </div>
                ))}
            </div>

            <div className="submmitButton-container">
                <button className="submitButton" onClick={handleDeleteClick}>
                    Eliminar blogs seleccionados
                </button>
            </div>

            {showConfirmation && (
                <div className={`confirmationWindow ${showConfirmation ? "show" : ""}`}>
                    <p>¿Estás seguro de que deseas eliminar los blogs seleccionados?</p>
                    <div className="answer">
                        <button className="yes Button" onClick={confirmDelete}>
                            Sí
                        </button>
                        <button className="no Button" onClick={cancelDelete}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteArticles;
