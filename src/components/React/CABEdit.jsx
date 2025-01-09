import { useState, useEffect } from "react";
import Categories from "../React/Categories.jsx";

const EditArticles = ({ page }) => {

    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getInitialBlogs = async() => {
            try{
                const response = await fetch(`http://localhost:4000/api/blogs/?page=${page}`);
                const data = await response.json();
                setBlogs(data.blogs)
            }catch(error) {
                console.error('Error al obtener los datos:', error);
              };
            };
            getInitialBlogs(); 
          }, []);

    useEffect(() => {
    const getFilteredBlogs = async() => {
        try{
            if(tags.length === 0) {
                const response = await fetch(`http://localhost:4000/api/blogs/?page=${page}`);
                const data = await response.json();
                setBlogs(data.blogs);
            } else{
                const tagsSelected = tags.join(","); 
                const response = await fetch(`http://localhost:4000/api/blogs/?tags=${tagsSelected}&page=${page}`);
                const data = await response.json();
                setBlogs(data.blogs);
            }

        }catch(error) {
            console.error('Error al obtener los datos:', error);
            };
        };
        getFilteredBlogs(); 
        }, [tags, page]);

        const handleTagClick = (tag) => {
            setTags((prevTags) =>
                prevTags.includes(tag)
                    ? prevTags.filter((t) => t !== tag) 
                    : [...prevTags, tag]
            );
        };
    return(
    <>    
        <Categories tags={tags} handleTagClick={handleTagClick}/>

    <div className="articles"> 
        { 
        blogs.map((blog) => (
        <div className="article-container" key={blog.id}>
            <article className="article">
            <a href={`http://localhost:4321/admin-pages/edit-blog/${blog.id}`}>
            <p className="linkId">{blog.id}</p>
            <div className="articleContainer">
                <div className="imgContainer">
                <img src= {`${blog.cardImage}`} alt=""/>
                </div>
                <span className="date">fecha de publicacion: {blog.publicationDate}</span>
                <ul>
                    {
                        blog.tags.map((tag) => (
                            <li key={tag} className="tag">{tag}</li>
                        ))
                    }
                </ul>
                <h2>{blog.title}</h2>
            </div>
            </a>
            </article>
            <a href={`http://localhost:4321/blog/${blog.id}`}>Ir al blog</a>
        </div>   
        ))
        }
    </div> 
    </>
    )
}

export default EditArticles;