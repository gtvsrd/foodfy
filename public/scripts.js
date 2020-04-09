const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');
const cards = document.querySelectorAll('.card');

for (let content of cards) {
    content.addEventListener("click", function(){
        const id = content.getAttribute("id");
        const title = content.querySelector("h4").innerText;
        const author = content.querySelector("p").innerText;

        modalOverlay.classList.add('active');

        modalContent.querySelector("img").src = `https://raw.githubusercontent.com/kust44/foodfy/master/public/assets/${id}.png`;
        modalContent.querySelector("h4").innerText = `${title}`;
        modalContent.querySelector("p").innerText = `por ${author}`
    })
};

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active");
    modalContent.querySelector("img").src = "";
})