const categories = document.querySelectorAll(".categorie");

for(let categorie of categories){
    categorie.addEventListener('click', function(){        
        categorie.classList.toggle("clicked");

        const selectedTags = document.querySelectorAll(".clicked");
        const blogs = document.querySelectorAll(".article-container");
        if (selectedTags.length === 0) {
            for (const blog of blogs) {
                blog.className= "article-container selected";
            }
        }

        if (selectedTags.length > 0) {

            for (const blog of blogs) {
                let tagVerificator = false;
                const blogTags = blog.querySelectorAll("li");
                let counter = 0;
                for (const blogTag of blogTags) {
                    for (const tag of selectedTags) {
                    if (blogTag.textContent === tag.textContent) {
                        counter++;
                        console.log(counter)
                        console.log(selectedTags)
                        if(counter === selectedTags.length){
                            tagVerificator = true;
                        }
                    }
                }
                if (tagVerificator === true) {
                    blog.className= "article-container selected";
                } 
                
                if(tagVerificator === false){
                    blog.className = "article-container not-selected";
                }
                }
            }
        }

    })
}


