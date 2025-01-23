import { useState, useEffect } from "react";

const NewsletterInput = () => {
    const [input, setInput] = useState("");
    const [message, setMessage] = useState(""); 
    const [allMails, setAllMails] = useState([]);
    const [messageStyle, setMessageStyle] = useState({ display: "none" }) 

    useEffect(() => {
        const getMails = async () => {
            try {
                const response = await fetch("https://apiblog-zzj1.onrender.com/api/emails");
                const result = await response.json();
                setAllMails(result);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
        }
        getMails(); 
    }, []);

    const handleSubscribeButton = async () => {
        if (allMails.includes(input)){
            setInput("");
            setMessageStyle({ display: "block", color: "red" });
            setMessage('este Email ya está registrado.')
            setTimeout(() => {
                setMessageStyle({ display: "none" });
                setMessage("");
            }, 4000)
        }else{
            try {
                await fetch('https://apiblog-zzj1.onrender.com/api/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        email: input,
                    }),
                });
                setAllMails((prev) => [...prev, input]);
                setInput("");
                setMessageStyle({ display: "block", color: "green" });
                setMessage("Email registrado exitosamente.")
                setTimeout(() => {
                    setMessageStyle({ display: "none" });
                    setMessage("");
                }, 4000)

              } catch (error) {
                console.error("Error fetching data:", error);
              }
        }
    };
    return (
    <>
        <div id="subscribe">
            <input 
                id="subscriberEmail" 
                type="email" 
                placeholder="Ingresar correo electronico" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />

                <button
                    onClick={handleSubscribeButton} 
                    type="submit"
                    id="subscribe_button" 
                >Suscribirse</button>
        </div>
        <p style={messageStyle}>{message}</p>
        
    </>
    )
}; 

export default NewsletterInput;