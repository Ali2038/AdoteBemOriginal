
function mostrarFormulario(tipo) {
    document.getElementById('form-adotante').style.display = tipo === 'adotante' ? 'block' : 'none';
    document.getElementById('form-tutor').style.display = tipo === 'tutor' ? 'block' : 'none';
}
