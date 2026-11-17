// ==========================================================
// form.js | Lógica do Pop-up, Validação e Modal de Sucesso
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Elementos do Pop-up Principal ---
    // Seleciona TODOS os botões que abrem o orçamento (header, mobile e hero)
    const botoesAbrirForm = document.querySelectorAll(".btn-abrir-orcamento");
    const formSection = document.getElementById("orcamento");
    const btnFecharForm = document.getElementById("btn-fechar-form");

    // --- 2. Elementos do Formulário e Modal de Sucesso ---
    const form = document.getElementById("form-orcamento");
    const modalSucesso = document.getElementById("modal-sucesso");
    const btnFecharModal = document.getElementById("btn-fechar-modal");

    // --- 3. Lógica para Abrir e Fechar o Pop-up Principal ---
    // Abre o pop-up ao clicar em qualquer um dos botões
    botoesAbrirForm.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede que a tela pule pro topo
            formSection.classList.add("ativo");
        });
    });

    // Fecha o pop-up no botão "X"
    if (btnFecharForm) {
        btnFecharForm.addEventListener("click", () => {
            formSection.classList.remove("ativo");
        });
    }

    // Fecha o pop-up se o usuário clicar fora do card branco (no fundo transparente)
    formSection.addEventListener("click", (evento) => {
        if (evento.target === formSection) {
            formSection.classList.remove("ativo");
        }
    });

    // --- 4. Lógica de Envio e Sucesso ---
    form.addEventListener("submit", (evento) => {
        evento.preventDefault(); 

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (nome !== "" && email !== "" && mensagem !== "") {
            // Exibe o modal de sucesso
            modalSucesso.classList.add("ativo");
            form.reset();
        }
    });

    // Fecha o modal de sucesso e já fecha o formulário inteiro junto para voltar ao site
    btnFecharModal.addEventListener("click", () => {
        modalSucesso.classList.remove("ativo");
        formSection.classList.remove("ativo");
    });
});