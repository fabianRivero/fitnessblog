const searcherbox = document.getElementById("searcherbox");
const inputSearch = document.getElementById("inputSearch");
const searchresults = document.getElementById("searchresults");
const button = document.getElementById("icon-button");
const singleIcon = document.getElementById("singleicon");
const heroimage = document.getElementById("heroimage");


//el addeventlistener
singleIcon.addEventListener("click", mostrar_buscador);
heroimage.addEventListener("click", ocultar_buscador);
window.addEventListener('resize', ocultar_buscador);

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
        searchresults.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}

//para ocultar el buscador
function ocultar_buscador(){
    if(searcherbox.className === 'extended'){
        searcherbox.style.top = '368px';
        inputSearch.value = "";
        searchresults.style.display = "none"; 
        searcherbox.classList.toggle('extended');
    }
}


//para que se haga el filtro de busqueda

inputSearch.addEventListener('keyup', buscador_interno);

function buscador_interno() {
    filter = inputSearch.value.toLowerCase();
    li = searchresults.getElementsByTagName("li");

    //recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];
        const textValue = a.textContent || a.innerText;

        if(textValue.toLowerCase().indexOf(filter) > -1){
            li[i].style.display = '';
            searchresults.style.display = "block";

        if(inputSearch.value === ""){
            searchresults.style.display = "none";
        }; 
            
        }else{
            li[i].style.display = 'none';
        }
    }
}