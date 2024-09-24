let title = document.querySelector("#blogTitle");
let checkboxes = document.querySelectorAll("#checkbox");
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

title.value = "";
content.value = "";

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

async function editBlog(){

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

    const response = await fetch(`http://localhost:4000/api/blogs/${id.textContent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            title: title.value,
            linkTitle: linkTitle,
            tags: validArray,
            cardImage: img(),
            content: content.value
        }),
    });
    const jsonresponse = await response.json(); 
    console.log(jsonresponse);
    
    let tagsClicked = document.querySelectorAll(".clicked");

    for (const tag of tagsClicked) {
        tag.classList.toggle("clicked");
    }
    
    title.value = "";
    content.value = "";

    messages[1].style.display = "block";
    
}

    
