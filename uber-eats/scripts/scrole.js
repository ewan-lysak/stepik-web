function handleButtonClick() {
    document.getElementById("unc").scrollIntoView({block: "end", behavior: "smooth"});
}

document.querySelector('.btn-up').addEventListener('click', handleButtonClick);

function hideBlock() {
    if (window.scrollY() >= 1200) {
        document.getElementById("btn-up").style.display = '';
    }
    else {
        document.getElementById("btn-up").style.display = 'none';
    }
  }
  window.scroll(hideBlock);
