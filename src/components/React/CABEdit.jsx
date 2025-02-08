import { useState, useEffect } from "react";
import Categories from "../React/Categories.jsx";
import { currentDomain, backendDomain } from "../../scripts/urlDomains.js";

const EditArticles = ({ page }) => {

    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getInitialBlogs = async() => {
            try{
                const response = await fetch(`${backendDomain}/api/blogs?pageSize=${page}`);
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
                const response = await fetch(`${backendDomain}/api/blogs?pageSize=${page}`);
                const data = await response.json();
                setBlogs(data.blogs);
            } else{
                const tagsSelected = tags.join(","); 
                const response = await fetch(`${backendDomain}/api/blogs/?pageSize=${page}&tags=${tagsSelected}`);
                const data = await response.json();
                setBlogs(data.blogs);
            }

        }catch(error) {
            console.error('Error al obtener los datos:', error);
            };
        };
        getFilteredBlogs(); 
        }, [tags]);

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
            <article className="article" id="article">
            <a href={`${currentDomain}/admin-pages/edit-blog/${blog.id}`}>
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
            <a href={`${currentDomain}/admin-pages/edit-blog/post/${blog.linkTitle}`}>Ir al blog</a> 
        </div>   
        ))
        }
    </div> 
    </>
    )
}

export default EditArticles;
