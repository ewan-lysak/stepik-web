function handleButtonClick() {
    document.getElementById("unc").scrollIntoView({block: "end", behavior: "smooth"});
}

document.querySelector('.btn-up').addEventListener('click', handleButtonClick);

function hide() {
    if (window.scrollY >= window.outerHeight / 1.5) {
        document.getElementById("btn-up").classList.add('hide');
    }
    else {
        document.getElementById("btn-up").classList.remove('hide');
        
    }
  }
 hide();
  window.addEventListener("scroll", hide);


 

