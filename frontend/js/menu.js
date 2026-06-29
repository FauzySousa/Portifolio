let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overlay-menu");
let btnFechar = document.querySelector(".btn-fechar");
let linksMenu = document.querySelectorAll(".menu-mobile a");

btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
  document.body.classList.add("menu-aberto");
});

btnFechar.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  document.body.classList.remove("menu-aberto");
});
overlay.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  document.body.classList.remove("menu-aberto");
});

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("abrir-menu");
    document.body.classList.remove("menu-aberto");
  });
});
