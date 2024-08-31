const hamburger = document.querySelector('.hamburger');
const hamburgerLines = document.querySelectorAll(".line");
const navLinks = document.querySelector('.nav-links');
const heroImage = document.getElementById("heroimage"); 
const main = document.getElementById("main");

function extendHamburger() {
  navLinks.classList.toggle('expanded');
  for (let line of hamburgerLines) {
    if(line.style.background === "rgb(173, 173, 173)"){
      setTimeout(() => {
        line.style.background = "black";  
      }, 100); 
    }else{
      setTimeout(() => {
        line.style.background = "rgb(173, 173, 173)";  
      }, 150);
    };       
  };
}

function contractHamburger(){
  if( hamburgerLines[0].style.background === "rgb(173, 173, 173)"){
    navLinks.classList.toggle('expanded');
    for (let line of hamburgerLines) {
      if(line.style.background === "rgb(173, 173, 173)"){
        setTimeout(() => {
          line.style.background = "black";  
        }, 100);
      }
    }
  }
}

hamburger.addEventListener('click', extendHamburger);
heroImage.addEventListener('click', contractHamburger);
main.addEventListener('click', contractHamburger);


