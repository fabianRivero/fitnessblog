const searcherbox = document.getElementById("searcherbox");
const inputSearch = document.getElementById("inputSearch");
const button = document.getElementById("icon-button");
const singleIcon = document.getElementById("singleicon");
const content = document.getElementById("content");
const headerSearch = document.getElementById("headerSearch");
const articles = document.querySelectorAll('.article-container');

//el addeventlistener
singleIcon.addEventListener("click", mostrar_buscador);
content.addEventListener("click", ocultar_buscador);
window.addEventListener('resize', ocultar_buscador);

//el addeventlistener para el buscador para tablet horizontal para adelante


//lo que efectua el addeventlistener
function mostrar_buscador() {
    if(searcherbox.className === ''){
        inputSearch.value = "";
        searcherbox.classList.toggle('extended');
        searcherbox.style.top = '40px';
        searcherbox.style.display = 'block'; 
        inputSearch.focus();
    }else{
        searcherbox.style.top = '-100px';
        inputSearch.value = "";
        searcherbox.classList.toggle('extended');
    }
}

//para ocultar el buscador
function ocultar_buscador(){
    if(searcherbox.className === 'extended'){
        searcherbox.style.top = '-100px';
        inputSearch.value = "";
        searcherbox.classList.toggle('extended');
    }
}

//para que aparezca los resultados de busqueda

//para ocultar los resultados de busqueda

//para que se haga el filtro de busqueda

document.addEventListener('keyup', (e) =>{

    for (const article of articles) { 
        if(e.target.matches('#inputSearch')){
            const articleTitle = article.querySelector('h2').textContent.toLowerCase();
            articleTitle.includes(e.target.value)
            ? article.className = "article-container selected"
            : article.className ="article-container not-selected";
        }
        if (document.getElementById("inputSearch").value.length === 0) {
            article.className ="article-container";
        }

        if(e.target.matches('#headerSearch')){
            const articleTitle = article.querySelector('h2').textContent.toLowerCase();
            articleTitle.includes(e.target.value)
            ? article.className = "article-container selected"
            : article.className ="article-container not-selected";
        }
        if (document.getElementById("headerSearch").value.length === 0) {
            article.className ="article-container";
        }
    }
})