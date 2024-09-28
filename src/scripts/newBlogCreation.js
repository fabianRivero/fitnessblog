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

async function createNewBlog(){

    messages[0].style.display = "none";
    let linkTitle = title.value.replace(/ /g, "_"); 
    const selectedTags = Array.from(document.querySelectorAll(".clicked"));
    let validArray = [];
    
    for (let tag of selectedTags) {
        validArray.push(tag.innerText);
    };

    const img = () => {
        let selected;
        for(const checkbox of checkboxes){
            if (checkbox.checked) {
                selected = checkbox.value;
            };
        };
        return selected;
    };

    const contentResult = tinymce.activeEditor.getContent()

    const response = await fetch('http://localhost:4000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            title: title.value,
            linkTitle: linkTitle,
            tags: validArray,
            cardImage: img(),
            content: contentResult
        }),
    });
    const jsonresponse = await response.json(); 
    console.log(jsonresponse);

    title.value = "";
    content.value = "";
    
    let tagsClicked = document.querySelectorAll(".clicked");

    for (const tag of tagsClicked) {
        tag.classList.toggle("clicked");
    }
    
    messages[1].style.display = "block";
    
}

tinymce.init({
    selector: 'textarea#blogContent',
    branding: false,
    menubar: false,
    toolbar: "undo redo | styles forecolor | bold italic | alignleft aligncenter alignright alignjustify | image",
    statusbar: false,
    plugins: "image",
  });
