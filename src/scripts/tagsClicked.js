let tags = document.querySelectorAll('.categorie');

for(let tag of tags){
    tag.addEventListener('click', function(){        
        tag.classList.toggle("clicked")
    })
}


