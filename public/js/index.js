const openNavBtn = document.querySelector('.open-nav');
const respoNav = document.querySelector('.respo-nav');
const linkBtn = document.querySelectorAll('.respo-nav div a');
const leftKeyBtn = document.querySelector('.left-key');
const rightKeyBtn = document.querySelector('.right-key');
const serviceInner = document.querySelector('.service-inner');
const bodyLayer = document.querySelector('.body-layer');
const popUp = document.querySelector('.pop-up');
const modalBtn = document.querySelector('#modal-btn');
const divSize = document.querySelector('.sizeWidth');
const seeServices = document.querySelector('#see-services');

// contact info
// const contactName = document.querySelector('#contactName');
// const contactEmail = document.querySelector('#contactEmail');
// const contactSubject = document.querySelector('#contactSubject');
// const contactMessage = document.querySelector('#contactMessage');

openNavBtn.addEventListener('click', (e) => {
    respoNav.classList.toggle('show');
})

linkBtn.forEach(link => {
    link.addEventListener('click', () => {
        respoNav.classList.toggle('show');
    })
})

modalBtn.addEventListener('click', () => {
    bodyLayer.classList.remove('show-body-layer');
    popUp.classList.remove('show-pop-up');
})

rightKeyBtn.addEventListener('click', () => {
    serviceInner.scrollBy(divSize.offsetWidth , 0);
})

leftKeyBtn.addEventListener('click', () => {
    serviceInner.scrollBy(-divSize.offsetWidth , 0);
})

seeServices.addEventListener('click', () => {
    location.href = '#service'
})