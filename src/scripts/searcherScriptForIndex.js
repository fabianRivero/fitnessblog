const searcherbox = document.getElementById("searcherbox");
const inputSearch = document.getElementById("inputSearch");
const searchResultsIndex = document.getElementById("searchResultsIndex");
const button = document.getElementById("icon-button");
const singleIcon = document.getElementById("singleicon");
const content = document.getElementById("content");
const headerSearch = document.getElementById("headerSearch");

//el addeventlistener
singleIcon.addEventListener("click", mostrar_buscador);
content.addEventListener("click", ocultar_buscador);
inputSearch.addEventListener("focus", mostrar_resultados);
window.addEventListener('resize', ocultar_buscador);
window.addEventListener('resize', ocultar_resultados);


//el addeventlistener para el buscador para tablet horizontal para adelante
headerSearch.addEventListener("focus", mostrar_resultados);
headerSearch.addEventListener("click", mostrar_resultados);
content.addEventListener("click", ocultar_resultados);

//lo que efectua el addeventlistener
function mostrar_buscador() {
    if(searcherbox.className === ''){
        inputSearch.value = "";
        searcherbox.classList.toggle('extended');
        searcherbox.style.top = '450px';
        searcherbox.style.display = 'block'; 
        inputSearch.focus();
    }else{
        searcherbox.style.top = '368px';
        inputSearch.value = "";
        searchResultsIndex.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}

//para ocultar el buscador
function ocultar_buscador(){
    if(searcherbox.className === 'extended'){
        searcherbox.style.top = '368px';
        inputSearch.value = "";
        searchResultsIndex.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}

//para que aparezca los resultados de busqueda
function mostrar_resultados(){

        searchResultsIndex.style.display = "block";
    
}

//para ocultar los resultados de busqueda
function ocultar_resultados(){
    searchResultsIndex.style.display = "none";
}


//para que se haga el filtro de busqueda
document.addEventListener('keyup', (e) =>{


    if(e.target.matches('#inputSearch')){

        document.querySelectorAll('.searchResult').forEach((resultado) =>{
            resultado.textContent.toLowerCase().includes(e.target.value)
            ? resultado.classList.add("selected")
            : resultado.classList.remove("selected");
        })
    }
    if (document.getElementById("inputSearch").value.length === 0) {
        console.log(document.getElementById("inputSearch").value.length)
        for (const resultado of document.querySelectorAll('.searchResult')) {
            resultado.classList.remove("selected");
        }
    }
})
