function mostrarRecuperacaoSenha() {
    const loginContainer = document.getElementById("login-container");
    const recuperacaoContainer = document.getElementById("recuperacao-container");
    const loginImage = document.querySelector(".login-image img"); // Seleciona a imagem

    // Aplica o efeito na imagem
    loginImage.classList.add("troca-imagem");

    // Faz a troca dos formulários
    loginContainer.classList.remove("mostrar");
    loginContainer.classList.add("oculto");

    setTimeout(() => {
        loginContainer.style.display = "none";
        recuperacaoContainer.style.display = "block";
        setTimeout(() => recuperacaoContainer.classList.add("mostrar"), 10);
        
        // Remove o efeito na imagem após um pequeno delay para suavizar
        setTimeout(() => loginImage.classList.remove("troca-imagem"), 300);
    }, 300);
}

function mostrarLogin() {
    const loginContainer = document.getElementById("login-container");
    const recuperacaoContainer = document.getElementById("recuperacao-container");
    const loginImage = document.querySelector(".login-image img");

    // Aplica o efeito na imagem
    loginImage.classList.add("troca-imagem");

    // Faz a troca dos formulários
    recuperacaoContainer.classList.remove("mostrar");
    recuperacaoContainer.classList.add("oculto");

    setTimeout(() => {
        recuperacaoContainer.style.display = "none";
        loginContainer.style.display = "block";
        setTimeout(() => loginContainer.classList.add("mostrar"), 10);
        
        // Remove o efeito na imagem após um pequeno delay para suavizar
        setTimeout(() => loginImage.classList.remove("troca-imagem"), 300);
    }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-container").classList.add("mostrar");
});
