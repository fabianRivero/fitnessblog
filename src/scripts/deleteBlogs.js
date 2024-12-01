import { jwtDecode } from 'jwt-decode';

const eraseCheckeboxes = document.querySelectorAll('#eraseCheckbox');
const noButton = document.querySelector(".no");
const deletebutton = document.querySelector('.yes');
const greyScreen = document.querySelector(".greyScreen");
const confirmationWindow = document.querySelector(".confirmationWindow");
const submitButton = document.querySelector(".submmitButton");
const submitMessage = document.querySelector(".submitMessage");
let idBlogList = [];

const token = localStorage.getItem("key");
const decoded = jwtDecode(token);

if (decoded.role !== "admin"){
    window.location.href = '/login';
} else if (decoded.role === "admin"){
    for (const checkbox of eraseCheckeboxes) {
        checkbox.addEventListener('click', function(){
            if(checkbox.checked){
                checkbox.nextElementSibling.classList.add("selected");
            }else{
                checkbox.nextElementSibling.classList.remove("selected");
            }
            })
    }
    
    function submitBtn(){
        greyScreen.style.display = "block";
        confirmationWindow.style.display = "block";
    }
    
    function denyOrder(){
        confirmationWindow.style.display = "none";
        greyScreen.style.display = "none";
    }
    
    function getSelectedIds(){
        const selectedIdBlogs = document.querySelectorAll('.selected');
        for (const blogid of selectedIdBlogs) {
            const id = blogid.querySelector('.id');
            idBlogList.push(id.innerHTML);
        }
    }
    
    function deleteSelectedBlogs(){
        submitMessage.style.display = "block";
        confirmationWindow.style.display = "none";
        getSelectedIds();
        for (const id of idBlogList) {
            (async function deleteBlog() {
                try {
                    const response = await fetch(`http://localhost:4000/api/blogs/${id}`,{
                        method: "DELETE",
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(token).token}`
                        },
                    });
                    if (!response.ok) {
                      throw new Error(`Response status: ${response.status}`);
                    }       
                    const json = await response.json();
                    console.log(json);
                } catch (error) {
                    console.error(error.message);
                }
            })();
        }
    }
    
    submitButton.addEventListener("click", submitBtn);
    noButton.addEventListener("click", denyOrder);
    deletebutton.addEventListener('click', deleteSelectedBlogs);   
}

