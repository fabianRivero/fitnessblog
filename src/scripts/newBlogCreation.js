import authorization from "./authVerificator";

let title = document.querySelector("#blogTitle");
let articleImageUrl = document.querySelector("#articleImage");
let description = document.querySelector(".description");
let descriptionContent = description.querySelector("#blogDescription");
let content = document.querySelector("#blogContent");
let messages = document.querySelectorAll(".submitMessage");
let submit = document.querySelector(".submit");
let reject = document.querySelector(".reject");
let noButton = document.querySelector(".no");
let yesButton = document.querySelector(".yes");
let greyScreen = document.querySelector(".greyScreen");

title.value = "";
content.value = "";
articleImageUrl.value = "";
descriptionContent.value = "";

document.addEventListener('DOMContentLoaded', () => {
    if (typeof tinymce !== 'undefined') {
tinymce.init({
    selector: 'textarea#blogContent',
    branding: false,
    menubar: false,
    toolbar: "undo redo | styles forecolor | bold italic | alignleft aligncenter alignright alignjustify | image",
    statusbar: false,
    plugins: "image",
  });
} else {
    console.error('TinyMCE no está definido. Asegúrate de que el script se haya cargado correctamente.');
  }
});

submit.addEventListener("click", submitFunction);
noButton.addEventListener("click", rejectMessage);
yesButton.addEventListener("click", createNewBlog);

function submitFunction(){
    let key = localStorage.getItem("key");
    if (!key){
        reject.style.display = "block";
        greyScreen.style.display = "block";
    } else{
        messages[0].style.display = "block";
        greyScreen.style.display = "block";    
    };
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

async function createNewBlog() {
    messages[0].style.display = "none";

    let blogTitle = title.value.trim();
    let linkTitle = generateUrlTitle(blogTitle);
    const selectedTags = Array.from(document.querySelectorAll(".clicked"));
    let validArray = [];

    for (let tag of selectedTags) {
        validArray.push(tag.innerText);
    }

    const img = () => {
        let selected = articleImageUrl.value.trim();
        return selected; 
    };

    const imageUrl = img();
    const imageUrlPattern = /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i;
    const isValidUrl = imageUrlPattern.test(imageUrl);

    if (!isValidUrl) {
        alert("Por favor, ingresa una URL válida de imagen (terminada en .jpg, .png, .gif, etc.).");
        greyScreen.style.display = "none";
        return; 
    }

    const contentResult = tinymce.activeEditor.getContent();
    const token = authorization();

    const response = await fetch('https://apiblog-zzj1.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
            title: blogTitle,
            linkTitle: linkTitle,
            tags: validArray,
            cardImage: imageUrl,
            content: contentResult,
            description: descriptionContent.value.trim(),
        }),
    });
    
    const jsonresponse = await response.json();

    if (response.ok) {
        title.value = "";
        content.value = "";
        descriptionContent.value = "";
        articleImageUrl.value = "";

        let tagsClicked = document.querySelectorAll(".clicked");
        for (const tag of tagsClicked) {
            tag.classList.toggle("clicked");
        }

        messages[1].style.display = "block";
    } else {
        alert("Hubo un error al crear el blog. Revisa los datos e inténtalo nuevamente.");
    }
};
