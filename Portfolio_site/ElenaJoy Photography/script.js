const nav = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = document.querySelectorAll('.nav-links li a');

burger.addEventListener("click", ()=>{
    nav.classList.toggle('nav-open');
    burger.classList.toggle('toggle');
});

links.forEach(link => {
    link.addEventListener("click", ()=>{
        nav.classList.toggle('nav-open');
        burger.classList.toggle('toggle'); 
    });
});