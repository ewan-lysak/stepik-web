const btnUp = document.querySelector(".btn-up");
function handleButtonClick() {
  document
    .querySelector("body")
    .scrollIntoView({ block: "start", behavior: "smooth" });
}

document.querySelector(".btn-up").addEventListener("click", handleButtonClick);

function hide() {
  if (window.scrollY >= window.outerHeight / 1.6) {
    document.querySelector(".btn-up").classList.add("hide");
  } else {
    document.querySelector(".btn-up").classList.remove("hide");
  }
}

hide();
window.addEventListener("scroll", hide);
