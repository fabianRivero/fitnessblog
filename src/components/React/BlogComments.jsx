import { useState, useEffect } from 'react';

const BlogComments = ({blogId}) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        const getBlogs = async() => {
        try{
            const response = await fetch(`http://localhost:4000/api/blogs/${blogId}`);
            const data = await response.json();
            setComments(data.blog.usersComments)
        }catch(error) {
            console.error('Error al obtener los datos:', error);
          };
        };
        getBlogs();

        const interval = setInterval(getBlogs, 3000);
        return () => clearInterval(interval); 
      }, [blogId])
      
    return (
        <>
        {
            comments.length === 1
            ?
            <h2 className='comments-title'>{comments.length} Comentario</h2>
            :
            <h2 className='comments-title'>{comments.length} Comentarios</h2>
        }
  
        <div className="comments"> 

        { 
        comments.map((comment) => (
            <div key={comment.id} className="comment">
                <div className='comment-header'>
                <h4>{comment.username}</h4>
                <span className="date">{comment.publicationDate}</span>
                </div>
                <div className="content">
                    <p>{comment.comment}</p>
                </div>
            </div>
        ))
        }
        </div> 
        </>
    );
  };
  
  export default BlogComments