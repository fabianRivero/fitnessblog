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
        yesButton.href = `https://myfirstfitnessblog.netlify.app/admin-pages/edit-blog/${id}`
        // yesButton.href = `https://localhost:4321/admin-pages/edit-blog/${id}`
    });
}

noButton.addEventListener("click", denyEdition);