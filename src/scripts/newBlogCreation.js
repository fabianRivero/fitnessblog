import Blog from "./classes/blog.js"
import id from "./idCreator.js"

let title = document.querySelector("#blogTitle");
let checkboxes = document.querySelectorAll("#checkbox");
let content = document.querySelector("#blogContent");
let messages = document.querySelectorAll(".submitMessage");
let submit = document.querySelector(".submit");
let noButton = document.querySelector(".no");
let yesButton = document.querySelector(".yes");
let greyScreen = document.querySelector(".greyScreen");

title.value = "";
content.value = "";

submit.addEventListener("click", showMessage);
noButton.addEventListener("click", rejectMessage);
yesButton.addEventListener("click", createNewBlog);



function showMessage(){
    messages[0].style.display = "block";
    greyScreen.style.display = "block";

}

function rejectMessage(){
    messages[0].style.display = "none";
    greyScreen.style.display = "none";
}

function createNewBlog(){
    messages[0].style.display = "none";
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

    const blogDate = `${day}/${month}/${year}`;

    const blogId = id();

    const img = () => {
        let selected;
        for(const checkbox of checkboxes){
            if (checkbox.checked) {
                selected = checkbox.value;
            };
        };
        return selected;
    };

    const newBlog = new Blog(
        blogId, 
        title.value, 
        blogDate, 
        validArray, 
        img(), 
        content.value,
        date,
    );

    console.log(newBlog);
    localStorage.setItem(`blog: ${title.value}, ${blogDate}`, JSON.stringify(newBlog));

    title.value = "";
    content.value = "";
    
    let tagsClicked = document.querySelectorAll(".clicked");

    for (const tag of tagsClicked) {
        tag.classList.toggle("clicked");
    }
    
    messages[1].style.display = "block";
}

    
