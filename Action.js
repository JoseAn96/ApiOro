const sc = document.querySelector(".navv");

window.addEventListener('scroll', () =>{
    sc.classList.toggle('navv-scroll',window.scrollY > 40);
});

const navM = document.querySelector('ul');
const btnBurguer = document.querySelector('.burguer');

btnBurguer.addEventListener('click', () =>{
    navM.classList.toggle('active'); /* Creo una clase en ul */
});

const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');
const a5 = document.getElementById('a5'); 


a1.addEventListener('click', () =>{
    navM.classList.toggle('active');
});

a2.addEventListener('click', () =>{
    navM.classList.toggle('active');
});

a3.addEventListener('click', () =>{
    navM.classList.toggle('active');
});

a4.addEventListener('click', () =>{
    navM.classList.toggle('active');
}); 

a5.addEventListener('click', () =>{
    navM.classList.toggle('active');
});
