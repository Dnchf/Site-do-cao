function abrirModal(card, nome, idade, sexo, porte, desc) {
    const modal = document.getElementById("modal");
    const img = card.querySelector("img");

    document.getElementById("modal-img").src = img.src;
    document.getElementById("modal-nome").innerText = nome;
    document.getElementById("modal-idade").innerText = "Idade: " + idade;
    document.getElementById("modal-sexo").innerText = "Sexo: " + sexo;
    document.getElementById("modal-porte").innerText = "Porte: " + porte;
    document.getElementById("modal-desc").innerText = desc;

    modal.classList.add("show");
}

function fecharModal() {
    document.getElementById("modal").classList.remove("show");
}

const filtros = document.querySelectorAll(".filtro input");
const cards = document.querySelectorAll(".card");

filtros.forEach(filtro => {
    filtro.addEventListener("change", filtrar);
});

function filtrar() {
    cards.forEach(card => {

        const animal = card.dataset.animal;
        const sexo = card.dataset.sexo;
        const porte = card.dataset.porte;

        const mostrarAnimal =
            (!document.getElementById("cachorro").checked && !document.getElementById("gato").checked) ||
            (document.getElementById("cachorro").checked && animal === "cachorro") ||
            (document.getElementById("gato").checked && animal === "gato");

        const mostrarSexo =
            (!document.getElementById("Macho").checked && !document.getElementById("Fêmea").checked) ||
            (document.getElementById("Macho").checked && sexo === "Macho") ||
            (document.getElementById("Fêmea").checked && sexo === "Fêmea");

        const mostrarPorte =
            (!document.getElementById("Pequeno").checked && !document.getElementById("Médio").checked && !document.getElementById("Grande").checked) ||
            (document.getElementById("Pequeno").checked && porte === "Pequeno") ||
            (document.getElementById("Médio").checked && porte === "Médio") ||
            (document.getElementById("Grande").checked && porte === "Grande");

        if (mostrarAnimal && mostrarSexo && mostrarPorte) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}