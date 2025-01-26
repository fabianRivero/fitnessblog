import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

const blogPunctuation = ({blogId}) => { 

    const [calification, setCalification] = useState(0);
    const [verificator, setVerificator] = useState(false);
    const [user, setUser] = useState("");
    const [blog, setBlog] = useState("");
    const [token, setToken] = useState(null);
    const [thanksMessageStyle, setThanksMessageStyle] = useState({display: "none"});
    const [thanksMessage, setThanksMessage] = useState("");
    const [calificationId, setCalificationId] = useState("");

    useEffect(() => {
        if(!blogId) return;
        const initialCalification = async() => {

                const getToken = localStorage.getItem("key");
                if(getToken){
                    try{
                        const decoded = jwtDecode(getToken);
                        setToken(getToken);
                        const userId = decoded.id;
                        const userData = await fetch(`https://apiblog-zzj1.onrender.com/api/users/${userId}`);
                        const uData = await userData.json();
                        setUser(uData.user);
                        const userCalifications = uData.user.blogsLiked; 
                        const userCalificationsSet = new Set(userCalifications.map((cal) => cal.id));
        
                        const blogData = await fetch(`https://apiblog-zzj1.onrender.com/api/blogs/${blogId}`);
                        const bData = await blogData.json();
                        setBlog(bData.blog);
                        const blogCalifications = bData.blog.usersLikes;
        
                        for (let blogCalification of blogCalifications) {
                            if (userCalificationsSet.has(blogCalification.id)) {
                                setVerificator(true);
                                setCalification(blogCalification.calification);
                                setCalificationId(blogCalification.id);
                                break;
                            }
                        }
        
        
                    }catch(error) {
                        console.error('Error al obtener los datos:', error);
                      };
                }

        };
        initialCalification();
    },[blogId]);
   
    const handleStarClick = (index) => {
        setCalification(index + 1);
    };

    const submitCalification = async (event) => {
        event.preventDefault();

        let newId = uuidv4();
        const newCalification = {
            id: newId,
            userId: user.id,
            blogId: blog.id,
            calification: calification,
        };

        if (!user.id){
            setThanksMessageStyle({display: "block", color: "red"});
            setThanksMessage("Debes estar registrado para calificar un blog.");
        }else if(calification === 0){
            setThanksMessageStyle({display: "block", color: "red"});
            setThanksMessage("Debes puntuar el blog con las estrellas para calificar.");
        }else{
            const insertCalificationToBlog = [...blog.usersLikes, newCalification];
            const insertCalificationToUser = [...user.blogsLiked, newCalification];
            
            const parsedToken = JSON.parse(token).token;                    
            try {
                await fetch(`https://apiblog-zzj1.onrender.com/api/blogs/${blogId}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${parsedToken}`
                    },
                    body: JSON.stringify({ usersLikes: insertCalificationToBlog }),
                });
        
                await fetch(`https://apiblog-zzj1.onrender.com/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${parsedToken}`
                    },
                    body: JSON.stringify({ blogsLiked: insertCalificationToUser }),
                });
        
                setVerificator(true);
                setCalificationId(newId);
                setThanksMessageStyle({display: "block", color: 'green'});
                setThanksMessage("¡Gracias por tu calificación!")
            } catch (error) {
            };
        };
    };

    const ChangeCalification = async(event) => {
        event.preventDefault();
        try {
            const deletedCalification = {
                id: calificationId,
                userId: user.id,
                blogId: blog.id,
                calification: calification,
            };

            const deleteCalificationToBlog = [...blog.usersLikes.filter(item => item.id !== deletedCalification.id)];
            const deleteCalificationToUser = [...user.blogsLiked.filter(item => item.id !== deletedCalification.id)];
            
            const parsedToken = JSON.parse(token).token; 
            await fetch(`https://apiblog-zzj1.onrender.com/api/blogs/${blogId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ usersLikes: deleteCalificationToBlog }),
            });
    
            await fetch(`https://apiblog-zzj1.onrender.com/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parsedToken}`
                },
                body: JSON.stringify({ blogsLiked: deleteCalificationToUser }),
            });
    
            setVerificator(false);
            setCalificationId("");
            setThanksMessageStyle({display: "none"});
            setThanksMessage("")
        } catch (error) {
            console.log(error)
        };
    };

    return (
    <>
        {verificator === false ? (
        <div className="blogPunctuation">
            <h3>¿Cómo calificarías este artículo?</h3>

            <ul className="stars">
            {[...Array(5)].map((_, index) => (
                <li
                key={index}
                className={`star ${index < calification ? "checked" : ""}`}
                onClick={() => handleStarClick(index)}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                </li>
            ))}
            </ul>
            <button className="button" onClick={submitCalification}>Calificar</button>
            <p className="thanks" style={thanksMessageStyle}>{thanksMessage}</p>
        </div>
        ) : (
        <div className="blogPunctuation">
            <h3>Tu calificación</h3>

            <ul className="stars">
            {[...Array(5)].map((_, index) => (
                <li
                key={index}
                className={`star ${index < calification ? "checked" : ""}`}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                </li>
            ))}
            </ul>
            <button className="button" onClick={ChangeCalification}>Cambiar calificación</button>
            <p className="thanks" style={{display: "block", color: "green"}}>¡Gracias por tu calificación!</p>
        </div>
        )}
    </>
    );
};

export default blogPunctuation;

