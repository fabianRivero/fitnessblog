async function checkServerStatus() {
    const loadingMessage = document.getElementById("loading");
    loadingMessage.style.display = "block"; 

    try {
        await fetch("https://apiblog-zzj1.onrender.com/healthcheck");
    } catch (error) {
        console.log("Esperando que el servidor arranque...");
    }
    
    loadingMessage.style.display = "none";
    location.reload(); 
}

checkServerStatus();
