const editableBlogs = document.querySelectorAll(".article");
const confirmationWindow = document.querySelector(".confirmationWindow"); 
const greyScreen = document.querySelector(".greyScreen");
const noButton = document.querySelector(".no");
const yesButton = document.querySelector("#yes");

function preSelectBlog(){
    confirmationWindow.style.display = "block";
    greyScreen.style.display = "block";
}

function denyEdition(){
    confirmationWindow.style.display = "none";
    greyScreen.style.display = "none";
}

for (const blog of editableBlogs) {
    blog.addEventListener("click", function(){
        (preSelectBlog)();
        yesButton.href = `http://localhost:4321/admin-pages/edit-blog/${id}`
    });
}

noButton.addEventListener("click", denyEdition);