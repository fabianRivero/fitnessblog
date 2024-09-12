let images = document.querySelectorAll('.image');

for(let image of images){
    image.addEventListener('click', function(){        
        image.previousElementSibling.checked = true;
    });


}

