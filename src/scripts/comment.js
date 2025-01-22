import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

document.addEventListener("DOMContentLoaded", async() => {
    const commentary = document.querySelector(".commentary");
    const sendButton = document.querySelector(".send-button");
    const blogIdElement = document.querySelector(".blog-id");

    const token = localStorage.getItem("key");

    const commentButton= async(event) => {
        event.preventDefault();
        if (!token){
            alert("Debes registrarte para comentar");
            return;
        } 
        
        try{
            const decoded = jwtDecode(token);
            const userId = decoded.id;   
            const [getUser, getBlog] = await Promise.all([
                fetch(`http://localhost:4000/api/users/${userId}`),
                fetch(`http://localhost:4000/api/blogs/${blogIdElement.textContent}`)
            ]);

            const { user } = await getUser.json();
            const { blog } = await getBlog.json();
    
            const newComment = {
                id: uuidv4(),
                userId: user.id,
                publicationDate: `${+new Date().getDate()}/${+new Date().getMonth()+1}/${+new Date().getFullYear()} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
                username: user.name,
                email: user.email,
                comment: commentary.value,
            };

            const insertCommentToBlog = [...blog.usersComments, newComment];
            const insertCommentToUser = [...user.blogsCommented, newComment];
            
            const parsedToken = JSON.parse(token).token;
                        

            const [updateBlog, updateUser] = await Promise.all([
                fetch(`http://localhost:4000/api/blogs/${blogIdElement.textContent}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(token).token}`
                    },
                    body: JSON.stringify({ usersComments: [...blog.usersComments, newComment] }),
                }),
                fetch(`http://localhost:4000/api/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(token).token}`
                    },
                    body: JSON.stringify({ blogsCommented: [...user.blogsCommented, newComment] }),
                }),
            ]);

            if (updateBlog.ok && updateUser.ok) {
                commentary.value = "";
            }

        }catch(error){
        };
    };

    sendButton.addEventListener('click', commentButton);

});


