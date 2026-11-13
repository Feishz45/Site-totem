// ==========================================================
// form.js | Lógica de validação e modal do formulário
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-orcamento");
    const modal = document.getElementById("modal-sucesso");
    const btnFecharModal = document.getElementById("btn-fechar-modal");

    // Escuta o evento de envio do formulário
    form.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Impede o recarregamento padrão da página

        // Captura os valores (caso precise enviar para uma API futuramente)
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Validação extra (o HTML5 já bloqueia, mas é uma camada extra de segurança)
        if (nome !== "" && email !== "" && mensagem !== "") {
            // Exibe o modal adicionando a classe "ativo"
            modal.classList.add("ativo");
            
            // Limpa o formulário
            form.reset();
        }
    });

    // Escuta o clique do botão de fechar o modal
    btnFecharModal.addEventListener("click", () => {
        modal.classList.remove("ativo");
    });
});