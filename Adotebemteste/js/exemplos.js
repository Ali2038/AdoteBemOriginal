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
