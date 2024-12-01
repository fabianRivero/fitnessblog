import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

const commentary = document.querySelector(".commentary");
const sendButton = document.querySelector(".send-button");
const blogId = document.querySelector(".blog-id");

const token = localStorage.getItem("key");

const commentButton= async(event) => {
    event.preventDefault();
    if (!token){
        alert("Debes registrarte para comentar");
    } else if (token){
        try{
            const decoded = jwtDecode(token);
            const userId = decoded.id;   
            const getUser = await fetch(`http://localhost:4000/api/users/${userId}`);
            const getBlog = await fetch(`http://localhost:4000/api/blogs/${blogId.textContent}`);
            
            const blogData = await getBlog.json();
            const blog = blogData.blog
    
            const userData = await getUser.json();
            const user = userData.user;
    
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
                        

            await fetch(`http://localhost:4000/api/blogs/${blogId.textContent}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ usersComments: insertCommentToBlog }),
            });

            await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ blogsCommented: insertCommentToUser }),
            });
            commentary.value = "";

        }catch(error){
            console.log(error)
        };
    };
};

sendButton.addEventListener('click', commentButton);

