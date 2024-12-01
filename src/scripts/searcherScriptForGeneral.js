const searcherbox = document.getElementById("searcherbox");
const inputSearch = document.getElementById("inputSearch");
const searchresultsGeneral = document.getElementById("searchResultsGeneral");
const button = document.getElementById("icon-button");
const singleIcon = document.getElementById("singleicon");
const content = document.getElementById("content");
const headerSearch = document.getElementById("headerSearch");
//const adminpage = document.querySelector('.adminPage');

//el addeventlistener
singleIcon.addEventListener("click", mostrar_buscador);
content.addEventListener("click", ocultar_buscador);
inputSearch.addEventListener("focus", mostrar_resultados);
window.addEventListener('resize', ocultar_buscador);
window.addEventListener('resize', ocultar_resultados);
//adminpage.addEventListener('click', ocultar_resultados);

//el addeventlistener para el buscador para tablet horizontal para adelante
headerSearch.addEventListener("focus", mostrar_resultados);
headerSearch.addEventListener("click", mostrar_resultados);
content.addEventListener("click", ocultar_resultados);

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
        searchresultsGeneral.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}

//para ocultar el buscador
function ocultar_buscador(){
    if(searcherbox.className === 'extended'){
        searcherbox.style.top = '-100px';
        inputSearch.value = "";
        searchresultsGeneral.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}

//para que aparezca los resultados de busqueda
function mostrar_resultados(){
    setTimeout(() => {
        searchresultsGeneral.style.display = "block";
    }, 500);
        
}
//para ocultar los resultados de busqueda
function ocultar_resultados(){
    searchresultsGeneral.style.display = "none";
}


//para que se haga el filtro de busqueda
document.addEventListener('keyup', (e) =>{

    if(e.target.matches('#inputSearch')){
        document.querySelectorAll('.searchResult').forEach((resultado) =>{
        resultado.textContent.toLowerCase().includes(e.target.value)
        ? resultado.className = "searchResult selected"
        : resultado.className ="searchResult";
        })
    }
    if (document.getElementById("inputSearch").value.length === 0) {
        for (const resultado of document.querySelectorAll('.searchResult')) {
            resultado.className ="searchResult";
        }
    }

    if(e.target.matches('#headerSearch')){
        document.querySelectorAll('.searchResult').forEach((resultado) =>{
        resultado.textContent.toLowerCase().includes(e.target.value)
        ? resultado.className = "searchResult selected"
        : resultado.className ="searchResult";
        })
    }
    if (document.getElementById("headerSearch").value.length === 0) {
        for (const resultado of document.querySelectorAll('.searchResult')) {
            resultado.className ="searchResult";
        }
    }
})
