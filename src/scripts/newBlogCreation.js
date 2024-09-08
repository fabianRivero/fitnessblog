import Blog from "./classes/blog.js"
import id from "./idCreator.js"

let title = document.querySelector("#blogTitle");
let image = document.querySelector("#articleImage");
let content = document.querySelector("#blogContent");
let message = document.querySelector(".submitMessage");
let submit = document.querySelector(".submit");
let noButton = document.querySelector(".no");
let yesButton = document.querySelector(".yes");

title.value = "";
image.value = "";
content.value = "";

submit.addEventListener("click", showMessage);
noButton.addEventListener("click", rejectMessage);
yesButton.addEventListener("click", createNewBlog);

function showMessage(){
    message.style.display = "block";
}

function rejectMessage(){
    message.style.display = "none";
}

function createNewBlog(){
    message.style.display = "none";
    const selectedTags = Array.from(document.querySelectorAll(".clicked"));
    let validArray = [];
    
    for (let tag of selectedTags) {
        validArray.push(tag.innerText);
    };

    const date = new Date();
    const [day, month, year] = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
    ];

    const newBlog = new Blog(
        id(), 
        title.value, 
        `${day}/${month}/${year}`, 
        validArray, 
        image.value, 
        content.value,
    );

    console.log(newBlog);
    
    title.value = "";
    image.value = "";
    content.value = "";
    
    let tagsClicked = document.querySelectorAll(".clicked");

    for (const tag of tagsClicked) {
        tag.classList.toggle("clicked");
    }
}