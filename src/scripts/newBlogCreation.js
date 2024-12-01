import authorization from "./authVerificator";

let title = document.querySelector("#blogTitle");
let articleImageUrl = document.querySelector("#articleImage");
let articleImage = document.querySelector(".articleImage");
let option1 = articleImage.querySelector("#option1");
let option2 = articleImage.querySelector("#option2");
let firstOption = articleImage.querySelector(".first-option");
let secondOption = articleImage.querySelector(".second-option");
let checkboxes = document.querySelectorAll("#checkbox");
let imageOptions = document.querySelector(".imageOptions");
let description = document.querySelector(".description");
let descriptionContent = description.querySelector("#blogDescription");
let content = document.querySelector("#blogContent");
let messages = document.querySelectorAll(".submitMessage");
let submit = document.querySelector(".submit");
let reject = document.querySelector(".reject");
let returnLogin = document.querySelector("return-login");
let noButton = document.querySelector(".no");
let yesButton = document.querySelector(".yes");
let greyScreen = document.querySelector(".greyScreen");

title.value = "";
content.value = "";
articleImageUrl.value = "";
descriptionContent.value = "";

tinymce.init({
    selector: 'textarea#blogContent',
    branding: false,
    menubar: false,
    toolbar: "undo redo | styles forecolor | bold italic | alignleft aligncenter alignright alignjustify | image",
    statusbar: false,
    plugins: "image",
  });

option1.addEventListener("click", function(){
    if(option1.checked){
        firstOption.style.display = 'block';
        secondOption.style.display = 'none';
    }
    if(option2.checked){
        firstOption.style.display = 'none';
        secondOption.style.display = 'block';
    }     
});

option2.addEventListener("click", function(){
    if(option1.checked){
        firstOption.style.display = 'block';
        secondOption.style.display = 'none';
    }
    if(option2.checked){
        firstOption.style.display = 'none';
        secondOption.style.display = 'block';
    }     
});


submit.addEventListener("click", submitFunction);
noButton.addEventListener("click", rejectMessage);
yesButton.addEventListener("click", createNewBlog);

function submitFunction(){
    let key = localStorage.getItem("key");
    console.log(key)
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

async function createNewBlog(){
    messages[0].style.display = "none";
    let blogTitle = title.value.trim();
    let linkTitle = blogTitle.replace(/ /g, "_"); 
    const selectedTags = Array.from(document.querySelectorAll(".clicked"));
    let validArray = [];
    
    for (let tag of selectedTags) {
        validArray.push(tag.innerText);
    }; 

    const img = () => {
        let selected;
        if(option1.checked){
            for(const checkbox of checkboxes){
                if (checkbox.checked) {
                    selected = `../${checkbox.value}`;
                };
            };
        };
        if(option2.checked){
            selected = articleImageUrl.value;
        };
        return selected; 
    };
    const contentResult = tinymce.activeEditor.getContent();
    const token = authorization();

    const response = await fetch('http://localhost:4000/api/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
            title: blogTitle,
            linkTitle: linkTitle,
            tags: validArray,
            cardImage: img(),
            content: contentResult,
            description: descriptionContent.value
        }),
    });
    const jsonresponse = await response.json(); 
    console.log(jsonresponse);

    title.value = "";
    content.value = "";
    descriptionContent.value = "";
    articleImageUrl.value = "";
    
    let tagsClicked = document.querySelectorAll(".clicked");

    for (const tag of tagsClicked) {
        tag.classList.toggle("clicked");
    }
    
    messages[1].style.display = "block";
};
