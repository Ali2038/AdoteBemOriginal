document.addEventListener("DOMContentLoaded", function () {
    const botaoAbrirFiltros = document.getElementById("abrir-filtros");
    const filtros = document.getElementById("filtros");
    const botaoAplicarFiltros = document.getElementById("aplicar-filtros");

    

    // Exibir e ocultar filtros
    botaoAbrirFiltros.addEventListener("click", function () {
        filtros.style.display = (filtros.style.display === "none" || filtros.style.display === "") ? "block" : "none";
    });

    // Aplicar filtros
    botaoAplicarFiltros.addEventListener("click", function () {
        const nomeFiltro = document.getElementById("filtro-nome").value.toLowerCase();
        const racaFiltro = document.getElementById("filtro-raca").value.toLowerCase();
        const pesoFiltro = document.getElementById("filtro-peso").value;

        const animais = document.querySelectorAll(".animal");

        animais.forEach(animal => {
            const nomeAnimal = animal.querySelector("h3").textContent.toLowerCase();
            const racaAnimal = animal.querySelector("p:nth-child(2)").textContent.toLowerCase();
            const pesoAnimal = animal.querySelector("p:nth-child(3)").textContent.match(/\d+/);

            let exibir = true;

            if (nomeFiltro && !nomeAnimal.includes(nomeFiltro)) exibir = false;
            if (racaFiltro && !racaAnimal.includes(racaFiltro)) exibir = false;
            if (pesoFiltro && pesoAnimal && parseInt(pesoAnimal[0]) !== parseInt(pesoFiltro)) exibir = false;

            animal.style.display = exibir ? "flex" : "none";
        });

        filtros.style.display = "none"; // Esconde os filtros após a busca
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const authButtons = document.getElementById("auth-buttons");
    const userLogo = document.getElementById("user-logo");

    // Simulação: Verifica se o usuário está logado no localStorage
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        authButtons.classList.add("d-none"); // Oculta os botões
        userLogo.classList.remove("d-none"); // Exibe o ícone do usuário
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var userIcon = document.querySelector(".user-icon");
    var userDropdown = document.getElementById("userDropdown");

    // Exibir/Ocultar o modal ao clicar na imagem do usuário
    userIcon.addEventListener("click", function(event) {
        event.stopPropagation(); // Impede que o clique feche imediatamente o modal
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
    });

    // Fechar o modal ao clicar fora dele
    document.addEventListener("click", function(event) {
        if (!userDropdown.contains(event.target) && event.target !== userIcon) {
            userDropdown.style.display = "none";
        }
    });
});




