import { useState, useEffect } from "react";
import Categories from "../React/Categories.jsx";

const DeleteArticles = ({ page }) => {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [token, setToken] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // Controla el diálogo de confirmación
    const [selectedIds, setSelectedIds] = useState([]); // IDs seleccionados para eliminar

    useEffect(() => {
        const getInitialBlogs = async () => {
            try {
                const getToken = localStorage.getItem("key");
                setToken(getToken);
                const response = await fetch(`https://apiblog-zzj1.onrender.com/api/blogs?pageSize=${page}`);
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
                    const response = await fetch(`https://apiblog-zzj1.onrender.com/api/blogs?pageSize=${page}/`);
                    const data = await response.json();
                    setBlogs(data.blogs);
                    setBlogComments(data.blogs.usersComments);
                    setBlogCalifications(data.blogs.usersLikes);

                } else {
                    const tagsSelected = tags.join(",");
                    const response = await fetch(
                        `https://apiblog-zzj1.onrender.com/api/blogs?pageSize=${page}&tags=${tagsSelected}`
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
        // Obtén los IDs seleccionados
        const ids = Object.keys(selectedCheckboxes).filter((id) => selectedCheckboxes[id]);
        if (ids.length === 0) {
            alert("No has seleccionado ningún blog.");
            return;
        }
    
        setSelectedIds(ids); // Actualiza el estado con los IDs seleccionados
        setShowConfirmation(true); // Muestra el cuadro de confirmación
    };

    const confirmDelete = async () => {
        try {
            let calificactionsArray = [];
            let commentsArray = [];

            for (const id of selectedIds) {
  
                const getData = await fetch(`https://apiblog-zzj1.onrender.com/api/blogs/${id}`)
                const data = await getData.JSON();
                const califications = data.blog.usersLikes;
                calificactionsArray = [...calificactionsArray, califications];
                 
                const comments = data.blog.usersComments;
                commentsArray = [...commentsArray, comments];

                const response = await fetch(`https://apiblog-zzj1.onrender.com/api/blogs/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token).token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar los blogs.");
                };
            };

            let usersForCalifications = [];
            let usersForComments = [];
            let removeComments = [];
            let removeCalifications = [];

            for (const calification of calificactionsArray){
                const response = await fetch((`https://apiblog-zzj1.onrender.com/api/users/${calification.userId}`));
                const getUser = await response.JSON();
                const user = getUser.user;
                usersForCalifications = [...usersForCalifications, user];
            };

            for (const comment of commentsArray){
                const response = await fetch((`https://apiblog-zzj1.onrender.com/api/users/${comment.userId}`));
                const getUser = await response.JSON();
                const user = getUser.user;
                usersForComments = [...usersForComments, user];
            };

            for (const user of usersForComments){
                for(const comment of commentsArray){
                    removeComments = [...user.blogsCommented.filter(item => item.id !== comment.id)];
                };
            };

            for (const user of usersForCalifications){
                for(const calification of calificactionsArray){
                    removeCalifications = [...user.blogsLiked.filter(item => item.id !== calification.id)];
                };
            };

            const parsedToken = JSON.parse(token).token; 
            await fetch(`https://apiblog-zzj1.onrender.com/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ usersComments: removeComments }),
            });
            await fetch(`https://apiblog-zzj1.onrender.com/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ usersForCalifications: removeCalifications }),
            });
    
            await fetch(`https://apiblog-zzj1.onrender.com/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ blogsLiked: deleteCalificationToUser }),
            });


            // Actualizar la lista de blogs eliminando los seleccionados
            setBlogs((prevBlogs) =>
                prevBlogs.filter((blog) => !selectedIds.includes(blog.id.toString()))
            );

            // Limpiar los checkboxes seleccionados
            setSelectedCheckboxes({});
            alert("Blogs eliminados exitosamente.");
        } catch (error) {
            console.error("Error al eliminar los blogs:", error);
            alert("Hubo un error al eliminar los blogs.");
        } finally {
            setShowConfirmation(false); // Oculta el aviso de confirmación
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
                            {/* <a href={`https://myfirstfitnessblog.netlify.app/admin-pages/delete-blog/post/${blog.linkTitle}`} className="articleContainer"> */}
                            <a href={`https://localhost:4321/admin-pages/delete-blog/post/${blog.linkTitle}`} className="articleContainer">
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