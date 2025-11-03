# Os Inovadores - Capítulo 9: Software

Uma apresentação web interativa com tema **Windows XP** sobre o Capítulo 9 ("Software") do livro **"Os Inovadores"** de Walter Isaacson.

## 📋 Conteúdo

Esta apresentação cobre os seguintes tópicos:

1. **Título** - A Revolução do Software
2. **Gates & Allen** - A Dupla Dinâmica
3. **Altair BASIC** - O Primeiro Passo
4. **O Debate** - Software é Livre?
5. **MS-DOS** - O Acordo com a IBM
6. **GUI** - O Fim da Linha de Comando
7. **O Legado** - A Arquitetura da Informação
8. **Encerramento** - Obrigado pela Atenção

## 🎨 Design

A apresentação utiliza um tema **Windows XP** nostálgico, com:

- Cores características do Windows XP (azul, prata, cinza)
- Janelas com estilo clássico de desktop
- Barra de tarefas funcional
- Elementos visuais inspirados em interfaces antigas
- Referências a DOS, BASIC e interfaces gráficas

## 🚀 Como Usar

### Navegação Local

1. Abra o arquivo `index.html` em um navegador web
2. Use os seguintes controles para navegar:

#### Teclado
- **Setas Esquerda/Direita**: Navegar entre slides
- **Espaço**: Próximo slide
- **Números (1-8)**: Ir para um slide específico
- **ESC**: Fechar menus

#### Mouse
- Clique em **"Anterior"** ou **"Próximo"** para navegar
- Clique no botão **"Iniciar"** para abrir o menu

#### Toque (Mobile)
- Deslize para a esquerda para o próximo slide
- Deslize para a direita para o slide anterior

## 📁 Estrutura de Arquivos

```
inovadores-software/
├── index.html              # Arquivo HTML principal
├── README.md               # Este arquivo
├── css/
│   ├── xp-theme.css        # Tema Windows XP
│   └── styles.css          # Estilos da apresentação
└── js/
    └── main.js             # Lógica de navegação e interações
```

## 🌐 Deployment no GitHub Pages

### Passo 1: Criar um repositório no GitHub

```bash
# Crie um novo repositório chamado "inovadores-software"
# ou clone este projeto
```

### Passo 2: Fazer upload dos arquivos

```bash
# Copie todos os arquivos para a raiz do repositório
# Certifique-se de que index.html está na raiz
```

### Passo 3: Ativar GitHub Pages

1. Vá para **Settings** do repositório
2. Navegue até **Pages**
3. Em **Source**, selecione **main** (ou **master**)
4. Clique em **Save**

### Passo 4: Acessar a apresentação

Sua apresentação estará disponível em:
```
https://seu-usuario.github.io/inovadores-software/
```

## 🔧 Personalização

### Alterar Cores

Edite as variáveis CSS em `css/xp-theme.css`:

```css
:root {
    --xp-blue: #0a246a;
    --xp-light-blue: #1084d7;
    --xp-silver: #c0c0c0;
    /* ... mais cores ... */
}
```

### Adicionar Novos Slides

1. Adicione um novo `<div class="slide">` em `index.html`
2. Aumente o valor de `totalSlides` em `js/main.js`
3. Estilize conforme necessário

### Modificar Conteúdo

Edite o texto e os elementos dentro de cada `<div class="slide">` em `index.html`.

## 🎯 Recursos

- ✅ Apresentação totalmente estática (sem servidor necessário)
- ✅ Responsiva para dispositivos móveis
- ✅ Tema Windows XP nostálgico
- ✅ Navegação por teclado e mouse
- ✅ Suporte a toque (swipe)
- ✅ Pronta para GitHub Pages
- ✅ Sem dependências externas

## 📚 Referências

- **Livro**: "Os Inovadores" - Walter Isaacson
- **Capítulo**: 9 - Software (páginas 324-385)
- **Tema**: Inspirado em [XP.css](https://github.com/botoxparty/XP.css)

## 🎮 Easter Eggs

- Pressione números (1-8) para pular para slides específicos
- Tente o Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) para uma surpresa!

## 📝 Licença

Esta apresentação é um projeto educacional baseado no livro "Os Inovadores" de Walter Isaacson.

## 🤝 Contribuições

Sinta-se livre para fazer fork, melhorar e compartilhar!

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ e nostalgia do Windows XP**

*"A gente entende é de software." - Bill Gates*
