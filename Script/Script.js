document.addEventListener("DOMContentLoaded", () => {

    let slides = document.querySelectorAll(".slide");
    let index = 0;
    let dotsContainer = document.querySelector(".dots");

    slides.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.addEventListener("click", () => showSlide(i));
        dotsContainer.appendChild(dot);
    });

    let dots = document.querySelectorAll(".dots span");

    function showSlide(i) {
        slides[index].classList.remove("active");
        dots[index].classList.remove("active");

        index = i;

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    document.querySelector(".next").onclick = () => {
        let i = (index + 1) % slides.length;
        showSlide(i);
    };

    document.querySelector(".prev").onclick = () => {
        let i = (index - 1 + slides.length) % slides.length;
        showSlide(i);
    };

    showSlide(0);

});