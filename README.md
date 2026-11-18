# SOLARTTM — Totens de Carregamento Solar

Landing page institucional e técnica do projeto **SOLARTTM (TTM-Solar)**, uma solução de totens autônomos de recarga sustentável alimentados por energia solar para espaços públicos e privados.

## Funcionalidades

* **Navegação Responsiva:** Cabeçalho fixo com menu desktop e gaveta lateral (*drawer*) para dispositivos móveis, com rolagem suave entre seções.
* **Galeria Interativa (Carrossel):** Exibição de fotos reais de aplicação e diagramas técnicos (Vista Explodida e Vista X-Ray dos componentes internos), com suporte a autoplay, teclado, toque (*swipe*) e indicadores visuais[cite: 9].
* **Pop-up de Orçamento:** Modal interativo acionado pelos botões de chamada (*CTA*), com validação de campos e janela de confirmação de envio.
* **Diferenciais Técnicos:** Apresentação visual dos pilares do projeto (autonomia *off-grid*, conectividade Wi-Fi integrada e resistência climática) com animações de rolagem (*AOS*).

## Estrutura do Projeto

```text
Site-totem/
├── css/                # Folhas de estilo modularizadas por seção
│   ├── carrossel.css
│   ├── destaques.css
│   ├── footer.css
│   ├── form.css
│   ├── header.css
│   ├── hero.css
│   └── styles.css
├── images/             # Fotos do produto e diagramas técnicos (STEP/X-Ray)
├── js/                 # Scripts de interatividade
│   ├── carrossel.js
│   ├── form.js
│   ├── main.js
│   └── menu.js
├── index.html          # Estrutura principal da aplicação
└── README.md           # Documentação do repositório
