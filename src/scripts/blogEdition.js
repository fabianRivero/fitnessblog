import { jwtDecode } from 'jwt-decode';
import { backendDomain } from './urlDomains.js';

let title = document.querySelector("#blogTitle");
let content = document.querySelector("#blogContent");
let messages = document.querySelectorAll(".submitMessage");
let submit = document.querySelector(".submit");
let noButton = document.querySelector(".no");
let yesButton = document.querySelector(".yes");
let greyScreen = document.querySelector(".greyScreen");
let previousValues = document.querySelector(".previousValues");
let arrowRight = document.querySelector('.arrowRight');
let arrowLeft = document.querySelector('.arrowLeft');
let id = document.querySelector(".id");
let imageInput = document.querySelector('.imageUrl');
let description = document.querySelector("#blogDescription");
const token = localStorage.getItem("key");
const decoded = jwtDecode(token);

if (decoded.role !== "admin"){
    window.location.href = '/login';
} else if (decoded.role === "admin"){
    title.value = "";
    content.value = "";
    
    tinymce.init({
        selector: 'textarea#blogContent',
        branding: false,
        menubar: false,
        toolbar: "undo redo | styles forecolor | bold italic | alignleft aligncenter alignright alignjustify | image",
        statusbar: false,
        plugins: "image",
      });
    
    submit.addEventListener("click", showMessage);
    noButton.addEventListener("click", rejectMessage);
    yesButton.addEventListener("click", editBlog);
    arrowRight.addEventListener("click", showHiddenBar);
    arrowLeft.addEventListener("click", hideHiddenBar);
    
    function showHiddenBar(){
        previousValues.style.display = "block"; 
        arrowLeft.classList.remove("hidden");
        arrowRight.classList.add("hidden");
    }
    
    function hideHiddenBar(){
        previousValues.style.display = "none"; 
        arrowLeft.classList.add("hidden");
        arrowRight.classList.remove("hidden");
    }
    
    
    function showMessage(){
        messages[0].style.display = "block";
        greyScreen.style.display = "block";
    }
    
    function rejectMessage(){
        messages[0].style.display = "none";
        greyScreen.style.display = "none";
    }

    function generateUrlTitle(blogTitle) {
        return blogTitle
            .toLowerCase() 
            .replace(/á|à|ä|â/g, "a") 
            .replace(/é|è|ë|ê/g, "e")
            .replace(/í|ì|ï|î/g, "i")
            .replace(/ó|ò|ö|ô/g, "o")
            .replace(/ú|ù|ü|û/g, "u")
            .replace(/ñ/g, "n") 
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-") 
            .replace(/^-|-$/g, ""); 
    }
    
    async function editBlog(){
    
        messages[0].style.display = "none";
        const selectedTags = Array.from(document.querySelectorAll(".clicked"));
        let validArray = [];
        
        for (let tag of selectedTags) {
            validArray.push(tag.innerText);
        };

        const contentValue= tinymce.get('blogContent').getContent();
    
        const response = await fetch(`${backendDomain}/api/blogs/${id.textContent}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${JSON.parse(token).token}`
            },
            body: JSON.stringify({
                title: title.value,
                linkTitle: generateUrlTitle(title.value.trim()),
                tags: validArray,
                cardImage: imageInput.value,
                description: description.value,
                content: contentValue
            }),
        });
        const jsonresponse = await response.json(); 
        
        let tagsClicked = document.querySelectorAll(".clicked");
    
        for (const tag of tagsClicked) {
            tag.classList.toggle("clicked");
        }
        
        title.value = "";
        content.value = "";
    
        messages[1].style.display = "block";
        
    }
}