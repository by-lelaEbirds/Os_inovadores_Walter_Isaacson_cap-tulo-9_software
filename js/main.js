// Main JavaScript for Presentation - "Diamante Refinado" Version

// State Management
let currentSlide = 1;
const totalSlides = 8;
let isAnimating = false;
let detailsPanelOpen = false;

// DOM Elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const detailsBtn = document.getElementById('detailsBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const startBtn = document.querySelector('.start-button');
const startMenu = document.getElementById('startMenu');
const clockElement = document.getElementById('clock');
const mainWindow = document.getElementById('mainWindow');
const detailsPanel = document.getElementById('detailsPanel');
const detailsCloseBtn = document.getElementById('detailsCloseBtn');
const detailsTitle = document.getElementById('detailsTitle');
const detailsContent = document.getElementById('detailsContent');
const taskbarApp = document.getElementById('taskbarApp');
const imageOverlay = document.getElementById('imageOverlay'); // **NOVO**

// --- NOVOS Elementos do Menu Iniciar e Desligar ---
const shutdownDialog = document.getElementById('shutdownDialog');
const shutdownCloseBtn = document.getElementById('shutdownCloseBtn');
const shutdownCancelBtn = document.getElementById('shutdownCancelBtn');
const shutdownTurnOffBtn = document.getElementById('shutdownBtnTurnOff');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    logWelcomeMessage();
    
    // Inicializa a apresentação e os listeners do desktop
    initializePresentation();
    attachEventListeners();
    addWindowDragFunctionality();

    // Inicia a apresentação (janela) por padrão
    // Remova esta linha se quiser que comece com a janela fechada
    toggleWindowVisibility(true); 
});

// Initialize Presentation
function initializePresentation() {
    totalSlidesSpan.textContent = totalSlides;
    updateSlideDisplay();
}

// Attach Event Listeners
function attachEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    detailsBtn.addEventListener('click', toggleDetailsPanel);
    detailsCloseBtn.addEventListener('click', closeDetailsPanel);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Start menu
    startBtn.addEventListener('click', toggleStartMenu);
    document.addEventListener('click', handleDocumentClick);

    // Window controls
    document.querySelector('.close-btn').addEventListener('click', closePresentation);
    document.querySelector('.minimize-btn').addEventListener('click', () => toggleWindowVisibility(false));
    document.querySelector('.maximize-btn').addEventListener('click', maximizeWindow);
    taskbarApp.addEventListener('click', () => toggleWindowVisibility());

    // --- Listeners do Novo Menu Iniciar ---
    document.getElementById('startMenuApp').addEventListener('click', () => toggleWindowVisibility(true));
    document.getElementById('startMenuInternet').addEventListener('click', () => showProgramAlert('Internet Explorer', 'Conexão falhou. Verifique seu modem.'));
    document.getElementById('startMenuEmail').addEventListener('click', () => showProgramAlert('Outlook Express', 'Nenhuma nova mensagem.'));
    document.getElementById('startMenuMyDocs').addEventListener('click', () => showProgramAlert('Meus Documentos', 'Esta pasta está vazia.'));
    document.getElementById('startMenuMyPC').addEventListener('click', () => showProgramAlert('Meu Computador', 'Disco Local (C:) - 99% Livre'));
    document.getElementById('startMenuControlPanel').addEventListener('click', () => showProgramAlert('Painel de Controle', 'Funcionalidade em desenvolvimento.'));
    document.getElementById('startMenuSearch').addEventListener('click', () => showProgramAlert('Pesquisar', 'Não foi possível encontrar "clipes de papel".'));

    // Easter Egg Explícito
    document.getElementById('startMenuHelp').addEventListener('click', () => {
        alert('--- 💡 Ajuda e Suporte - Dicas Secretas 💡 ---\n\n' +
              'Você encontrou os segredos!\n\n' +
              '🎮 Tente o "Konami Code":\n' +
              '↑ ↑ ↓ ↓ ← → ← → B A\n\n' +
              '💰 Tente digitar os nomes dos fundadores:\n' +
              '"BILL" ou "GATES"\n\n' +
              'Divirta-se!');
        toggleStartMenu(); // Fecha o menu
    });

    // --- Listeners do Diálogo "Desligar" ---
    document.getElementById('startMenuTurnOff').addEventListener('click', () => {
        shutdownDialog.style.display = 'flex';
        toggleStartMenu(); // Fecha o menu
    });
    shutdownCloseBtn.addEventListener('click', () => shutdownDialog.style.display = 'none');
    shutdownCancelBtn.addEventListener('click', () => shutdownDialog.style.display = 'none');
    shutdownTurnOffBtn.addEventListener('click', () => {
        document.body.innerHTML = '<div style="background:#000; color:#fff; width:100%; height:100vh; display:flex; align-items:center; justify-content:center; font-family:monospace; font-size:16px;">O Windows está sendo desligado...</div>';
    });


    // Desktop shortcuts
    const desktopShortcuts = document.querySelectorAll('.desktop-shortcut');
    desktopShortcuts.forEach((shortcut) => {
        shortcut.addEventListener('dblclick', (e) => {
            const label = e.currentTarget.querySelector('.shortcut-label').textContent;
            handleDesktopShortcut(label);
        });
    });

    // --- **NOVOS** Listeners para Expansão de Imagem ---
    const slideImages = document.querySelectorAll('.slide-image');
    slideImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // Impede que o clique "vaze" para o overlay se a imagem já estiver expandida
            e.stopPropagation(); 
            toggleImageExpand(e.currentTarget);
        });
    });
    // Adiciona listener no overlay para fechar
    imageOverlay.addEventListener('click', closeImageExpand);
}

// Handle Keyboard Press
function handleKeyPress(event) {
    if (isAnimating) return;

    // Não processa teclas se a janela principal estiver escondida
    if (mainWindow.style.display === 'none') return;

    switch (event.key.toLowerCase()) {
        case 'arrowleft':
            previousSlide();
            break;
        case 'arrowright':
            nextSlide();
            break;
        case 'escape':
            // **NOVO** Fecha a imagem expandida se estiver aberta
            if (imageOverlay.classList.contains('active')) {
                closeImageExpand();
            }
            if (startMenu.classList.contains('active')) {
                startMenu.classList.remove('active');
            }
            if (detailsPanelOpen) {
                closeDetailsPanel();
            }
            if (shutdownDialog.style.display === 'flex') {
                shutdownDialog.style.display = 'none';
            }
            break;
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
        case 'home':
            event.preventDefault();
            goToSlide(1);
            break;
        case 'end':
            event.preventDefault();
            goToSlide(totalSlides);
            break;
        case 'd':
            toggleDetailsPanel();
            break;
    }
}

// --- Funções de Navegação (Sem alterações) ---
function nextSlide() {
    if (currentSlide < totalSlides && !isAnimating) {
        currentSlide++;
        updateSlideDisplay();
    }
}
function previousSlide() {
    if (currentSlide > 1 && !isAnimating) {
        currentSlide--;
        updateSlideDisplay();
    }
}
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides && !isAnimating) {
        currentSlide = slideNumber;
        updateSlideDisplay();
    }
}
function updateSlideDisplay() {
    isAnimating = true;
    closeImageExpand(); // **NOVO** Garante que imagens fechem ao trocar de slide
    slides.forEach(slide => slide.classList.remove('active'));
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    if (activeSlide) activeSlide.classList.add('active');
    currentSlideSpan.textContent = currentSlide;
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    updateDetailsPanel();
    setTimeout(() => { isAnimating = false; }, 400);
}

// --- Funções do Painel de Detalhes (Sem alterações) ---
function toggleDetailsPanel() {
    if (detailsPanelOpen) closeDetailsPanel();
    else openDetailsPanel();
}
function openDetailsPanel() {
    detailsPanel.classList.add('active');
    detailsBtn.classList.add('active');
    detailsPanelOpen = true;
    updateDetailsPanel();
}
function closeDetailsPanel() {
    detailsPanel.classList.remove('active');
    detailsBtn.classList.remove('active');
    detailsPanelOpen = false;
}
function updateDetailsPanel() {
    if (currentSlide >= 1 && currentSlide <= slideDetails.length) {
        const detail = slideDetails[currentSlide - 1];
        detailsTitle.textContent = detail.title;
        detailsContent.innerHTML = `<p>${detail.content}</p>`;
    }
}

// --- Funções do Menu Iniciar e Janela ---
function toggleStartMenu() {
    startMenu.classList.toggle('active');
    startBtn.classList.toggle('active');
}

function handleDocumentClick(event) {
    // Fecha o Menu Iniciar se clicar fora
    if (!event.target.closest('.start-button') && !event.target.closest('.start-menu')) {
        startMenu.classList.remove('active');
        startBtn.classList.remove('active');
    }
    // Não fecha o painel de detalhes ao clicar nele
    if (!event.target.closest('.details-panel') && !event.target.closest('.details-btn')) {
        // (lógica de fechar painel de detalhes removida daqui para focar no ESC)
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
}

// Fecha a janela (botão X)
function closePresentation() {
    if (confirm('Deseja realmente encerrar a apresentação?')) {
        toggleWindowVisibility(false);
    }
}

// Abre/Fecha a janela (minimizar e barra de tarefas)
function toggleWindowVisibility(forceShow = null) {
    const isHidden = mainWindow.style.display === 'none';
    
    let show = forceShow !== null ? forceShow : isHidden;

    if (show) {
        mainWindow.style.display = 'flex';
        taskbarApp.classList.add('active');
        
        // --- INÍCIO DA CORREÇÃO ---
        // Reseta a posição TOP e LEFT para os valores padrão de centralização
        mainWindow.style.top = '50%';
        mainWindow.style.left = '50%';
        // --- FIM DA CORREÇÃO ---

        // Força a re-aplicação da animação de "aparecer"
        mainWindow.style.animation = 'none';
        setTimeout(() => {
            mainWindow.style.animation = 'windowAppear 0.2s ease-out';
            mainWindow.style.opacity = '1';
            mainWindow.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    } else {
        mainWindow.style.animation = 'windowMinimize 0.2s ease-out forwards';
        setTimeout(() => {
             mainWindow.style.display = 'none';
        }, 200);
        taskbarApp.classList.remove('active');
    }
    
    // Fecha menus ao interagir com a janela
    startMenu.classList.remove('active');
    startBtn.classList.remove('active');
}

// Adiciona animação de minimizar
const minimizeAnimationStyle = document.createElement('style');
minimizeAnimationStyle.textContent = `
    @keyframes windowMinimize {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 100vh) scale(0.5);
        }
    }
`;
document.head.appendChild(minimizeAnimationStyle);


function maximizeWindow() {
    const isMaximized = mainWindow.style.width === '100vw';
    if (isMaximized) {
        mainWindow.style.width = '90%';
        mainWindow.style.height = '80%';
        mainWindow.style.maxWidth = '1100px';
        mainWindow.style.maxHeight = '750px';
        mainWindow.style.top = '50%';
        mainWindow.style.left = '50%';
        mainWindow.style.transform = 'translate(-50%, -50%)';
        mainWindow.style.borderRadius = '8px 8px 0 0';
    } else {
        mainWindow.style.width = '100vw';
        mainWindow.style.height = 'calc(100vh - 30px)'; // Altura total menos a barra de tarefas
        mainWindow.style.maxWidth = 'none';
        mainWindow.style.maxHeight = 'none';
        mainWindow.style.top = '0';
        mainWindow.style.left = '0';
        mainWindow.style.transform = 'none';
        mainWindow.style.borderRadius = '0';
    }
}

// Arrastar Janela
function addWindowDragFunctionality() {
    const titleBar = document.querySelector('.window-title-bar');
    let isDragging = false;
    let initialX, initialY, offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        if (mainWindow.style.width === '100vw') return; // Não arrasta maximizado
        
        isDragging = true;
        const rect = mainWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // Remove 'translate' para usar top/left
        mainWindow.style.transform = 'none';
        mainWindow.style.left = `${rect.left}px`;
        mainWindow.style.top = `${rect.top}px`;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            currentX = e.clientX - offsetX;
            currentY = e.clientY - offsetY;
            mainWindow.style.left = `${currentX}px`;
            mainWindow.style.top = `${currentY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Ícones do Desktop e Alertas
function handleDesktopShortcut(label) {
    const messages = {
        'Meu PC': 'Disco Local (C:) - 99% Livre',
        'Meus Documentos': 'Esta pasta está vazia.',
        'Internet Explorer': 'Conexão falhou. Verifique seu modem.',
        'Lixeira': 'A Lixeira está vazia.'
    };
    showProgramAlert(label, messages[label]);
}

function showProgramAlert(title, message) {
    alert(`--- 🖥️ ${title} ---\n\n${message}`);
    toggleStartMenu();
}


// --- Funções de Swipe (Sem alterações) ---
let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; });
document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});
function handleSwipe() {
    if (mainWindow.style.display === 'none') return;
    if (touchEndX < touchStartX - 50) nextSlide();
    else if (touchEndX > touchStartX + 50) previousSlide();
}

// --- Easter Eggs (Sem alterações) ---
let konamiIndex = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
function activateKonamiEasterEgg() {
    playSound('success');
    showEasterEggMessage('🎮 KONAMI CODE ATIVADO! Bem-vindo ao mundo do Windows XP! 🎮');
    document.body.style.filter = 'hue-rotate(45deg) saturate(1.5)';
    setTimeout(() => { document.body.style.filter = 'none'; }, 3000);
}
let billSequence = '';
document.addEventListener('keydown', (e) => {
    billSequence += e.key.toUpperCase();
    if (billSequence.includes('BILL')) {
        showEasterEggMessage('💰 "A gente entende é de software!" - Bill Gates 💰');
        playSound('success');
        billSequence = '';
    }
    if (billSequence.length > 10) billSequence = billSequence.slice(-10);
});
let gatesSequence = '';
document.addEventListener('keydown', (e) => {
    gatesSequence += e.key.toUpperCase();
    if (gatesSequence.includes('GATES')) {
        showEasterEggMessage('🖥️ "Não somos gurus de hardware, Paul. A gente entende é de software." 🖥️');
        playSound('success');
        gatesSequence = '';
    }
    if (gatesSequence.length > 10) gatesSequence = gatesSequence.slice(-10);
});
function showEasterEggMessage(message) {
    const easterEggDiv = document.createElement('div');
    easterEggDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--xp-blue-gradient-start), var(--xp-blue-dark));
        color: white; padding: 20px 40px; border: 3px solid #FFB74D; border-radius: 8px;
        font-size: 16px; font-weight: bold; text-align: center; z-index: 10000;
        box-shadow: 0 0 20px rgba(16, 132, 215, 0.8); animation: easterEggAppear 0.3s ease-out;
    `;
    easterEggDiv.textContent = message;
    document.body.appendChild(easterEggDiv);
    setTimeout(() => {
        easterEggDiv.style.animation = 'easterEggDisappear 0.3s ease-out forwards';
        setTimeout(() => { easterEggDiv.remove(); }, 300);
    }, 3000);
}
const style = document.createElement('style');
style.textContent = `
    @keyframes easterEggAppear {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes easterEggDisappear {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
`;
document.head.appendChild(style);
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        if (type === 'success') {
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) { console.log('Sound not available'); }
}

// Log Welcome Message
function logWelcomeMessage() {
    console.clear();
    console.log('%c╔════════════════════════════════════════════════════════════╗', 'color: #0053E1; font-weight: bold;');
    console.log('%c║  🖥️  OS INOVADORES - CAPÍTULO 9: SOFTWARE (v2.0) 🖥️      ║', 'color: #0053E1; font-weight: bold;');
    console.log('%c╚════════════════════════════════════════════════════════════╝', 'color: #0053E1; font-weight: bold;');
    console.log('%c\n📚 Desktop carregado com sucesso!\n', 'color: #8BC34A; font-size: 12px; font-weight: bold;');
    console.log('%c🖱️  A apresentação está pronta!', 'color: #FFB74D; font-weight: bold;');
    console.log('%c\n⌨️  CONTROLES DE NAVEGAÇÃO (com a janela aberta):', 'color: #FFB74D; font-weight: bold;');
    console.log('%c  • Setas (← →) - Navegar entre slides', 'color: #000;');
    console.log('%c  • Espaço - Próximo slide', 'color: #000;');
    console.log('%c  • Números (1-8) - Pular para slide específico', 'color: #000;');
    console.log('%c  • Home/End - Primeiro/Último slide', 'color: #000;');
    console.log('%c  • D - Alternar painel de detalhes', 'color: #000;');
    console.log('%c  • ESC - Fechar menus e diálogo de "Desligar"', 'color: #000;');
    console.log('%c\n🤫 Dica Secreta: Clique em Iniciar > Ajuda e Suporte...', 'color: #7F7F7F;');
}


// --- **NOVAS** FUNÇÕES PARA EXPANSÃO DE IMAGEM ---

/**
 * Alterna a expansão de uma imagem.
 * Se a imagem clicada já estiver expandida, fecha.
 * Se outra imagem estiver expandida, fecha a outra e abre esta.
 * Se nenhuma estiver expandida, apenas abre esta.
 */
function toggleImageExpand(img) {
    const currentlyExpanded = document.querySelector('.slide-image.expanded');

    if (currentlyExpanded && currentlyExpanded === img) {
        // Clicou na imagem que já estava expandida: fechar
        img.classList.remove('expanded');
        imageOverlay.classList.remove('active');
    } else if (currentlyExpanded) {
        // Clicou em uma imagem, mas outra estava expandida: trocar
        currentlyExpanded.classList.remove('expanded');
        img.classList.add('expanded');
        imageOverlay.classList.add('active'); // Garante que o overlay continue
    } else {
        // Nenhuma imagem expandida: abrir esta
        img.classList.add('expanded');
        imageOverlay.classList.add('active');
    }
}

/**
 * Fecha qualquer imagem que esteja expandida.
 */
function closeImageExpand() {
    const expandedImg = document.querySelector('.slide-image.expanded');
    if (expandedImg) {
        expandedImg.classList.remove('expanded');
    }
    imageOverlay.classList.remove('active');
}
