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
