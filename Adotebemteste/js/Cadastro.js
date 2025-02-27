document.addEventListener("DOMContentLoaded", function () {
    const formAdotante = document.getElementById("form-adotante");
    formAdotante.style.display = "block";
    setTimeout(() => formAdotante.classList.add("mostrar"), 10);
});

function mostrarFormulario(tipo) {
    const formAdotante = document.getElementById("form-adotante");
    const formTutor = document.getElementById("form-tutor");

    if (tipo === "adotante") {
        formTutor.classList.remove("mostrar");
        setTimeout(() => {
            formTutor.style.display = "none";
            formAdotante.style.display = "block";
            setTimeout(() => formAdotante.classList.add("mostrar"), 10);
        }, 300);
    } else {
        formAdotante.classList.remove("mostrar");
        setTimeout(() => {
            formAdotante.style.display = "none";
            formTutor.style.display = "block";
            setTimeout(() => formTutor.classList.add("mostrar"), 10);
        }, 300);
    }
}
