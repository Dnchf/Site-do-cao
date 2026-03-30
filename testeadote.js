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