// ===== SENHA DO ADMIN =====
// Para trocar a senha, altere o valor abaixo:
const SENHA_ADMIN = "admin123";

// ===== MODAL VER ANIMAL =====
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

// ===== FILTRO =====
// Usa delegação de eventos para funcionar com cards dinâmicos também
document.querySelectorAll(".filtro input").forEach(filtro => {
    filtro.addEventListener("change", filtrar);
});

function filtrar() {
    const todosCards = document.querySelectorAll(".card");

    todosCards.forEach(card => {
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

        card.style.display = (mostrarAnimal && mostrarSexo && mostrarPorte) ? "block" : "none";
    });
}

// ===== LOGIN ADMIN =====
function abrirLogin() {
    document.getElementById("modalLogin").classList.add("show");
    setTimeout(() => document.getElementById("inputSenha").focus(), 100);
}

function fecharLogin() {
    document.getElementById("modalLogin").classList.remove("show");
    document.getElementById("inputSenha").value = "";
    document.getElementById("erroLogin").style.display = "none";
}

function fazerLogin() {
    const senha = document.getElementById("inputSenha").value;
    if (senha === SENHA_ADMIN) {
        sessionStorage.setItem("adminLogado", "true");
        fecharLogin();
        ativarModoAdmin();
    } else {
        document.getElementById("erroLogin").style.display = "block";
        document.getElementById("inputSenha").value = "";
        document.getElementById("inputSenha").focus();
    }
}

function ativarModoAdmin() {
    document.body.classList.add("admin-logado");
    document.getElementById("barraAdmin").classList.add("ativa");
}

function sairAdmin() {
    sessionStorage.removeItem("adminLogado");
    document.body.classList.remove("admin-logado");
    document.getElementById("barraAdmin").classList.remove("ativa");
}

// ===== MODAL ADICIONAR ANIMAL =====
function abrirModalAdd() {
    document.getElementById("modalAdd").classList.add("show");
}

function fecharModalAdd() {
    document.getElementById("modalAdd").classList.remove("show");
    limparFormAdd();
}

function limparFormAdd() {
    document.getElementById("add-nome").value = "";
    document.getElementById("add-animal").value = "cachorro";
    document.getElementById("add-sexo").value = "Macho";
    document.getElementById("add-porte").value = "Pequeno";
    document.getElementById("add-idade").value = "";
    document.getElementById("add-desc").value = "";
    document.getElementById("add-foto").value = "";
    document.getElementById("preview-img").classList.remove("visivel");
}

function previewFoto() {
    const url = document.getElementById("add-foto").value;
    const img = document.getElementById("preview-img");
    if (url) {
        img.src = url;
        img.classList.add("visivel");
    } else {
        img.classList.remove("visivel");
    }
}

// ===== SALVAR ANIMAL =====
function salvarAnimal() {
    const nome = document.getElementById("add-nome").value.trim();
    const animal = document.getElementById("add-animal").value;
    const sexo = document.getElementById("add-sexo").value;
    const porte = document.getElementById("add-porte").value;
    const idade = document.getElementById("add-idade").value.trim();
    const desc = document.getElementById("add-desc").value.trim();
    const foto = document.getElementById("add-foto").value.trim();

    if (!nome || !foto) {
        alert("Por favor, preencha pelo menos o nome e a URL da foto.");
        return;
    }

    const novoAnimal = { nome, animal, sexo, porte, idade, desc, foto, id: Date.now() };

    // Salvar no localStorage
    const animais = JSON.parse(localStorage.getItem("animaisAdicionados") || "[]");
    animais.push(novoAnimal);
    localStorage.setItem("animaisAdicionados", JSON.stringify(animais));

    // Criar card na página
    criarCard(novoAnimal, true);

    fecharModalAdd();
    limparFormAdd();

    // Reaplicar filtros
    filtrar();
}

// ===== CRIAR CARD DINAMICAMENTE =====
function criarCard(dados, novo = false) {
    const container = document.getElementById("listaCards");
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.animal = dados.animal;
    card.dataset.sexo = dados.sexo;
    card.dataset.porte = dados.porte;
    if (dados.id) card.dataset.id = dados.id;

    card.onclick = function () {
        abrirModal(card, dados.nome, dados.idade || "Não informado", dados.sexo, dados.porte, dados.desc || "Sem descrição");
    };

    card.innerHTML = `
        <button class="btn-excluir-card" onclick="excluirCard(event, this, ${dados.id})">×</button>
        ${novo ? '<span class="tag-novo">Novo</span>' : ''}
        <img src="${dados.foto}" alt="${dados.nome}" onerror="this.src='https://placehold.co/300x200?text=Sem+foto'">
        <h3>${dados.nome}</h3>
    `;

    container.appendChild(card);
}

// ===== EXCLUIR CARD =====
function excluirCard(e, btn, id) {
    e.stopPropagation();
    if (!confirm("Tem certeza que deseja remover este animal?")) return;

    btn.closest(".card").remove();

    if (id) {
        let animais = JSON.parse(localStorage.getItem("animaisAdicionados") || "[]");
        animais = animais.filter(a => a.id !== id);
        localStorage.setItem("animaisAdicionados", JSON.stringify(animais));
    }
}

// ===== CARREGAR ANIMAIS SALVOS DO LOCALSTORAGE =====
function carregarAnimaisSalvos() {
    const animais = JSON.parse(localStorage.getItem("animaisAdicionados") || "[]");
    animais.forEach(a => criarCard(a, false));
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
    // Verificar se admin já estava logado nesta sessão
    if (sessionStorage.getItem("adminLogado") === "true") {
        ativarModoAdmin();
    }

    // Carregar animais adicionados pelo admin
    carregarAnimaisSalvos();
});
