// Main JavaScript for Presentation - Enhanced Version with Welcome Screen and Details Panel

// State Management
let currentSlide = 1;
const totalSlides = 8;
let isAnimating = false;
let detailsPanelOpen = false;

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const startPresentationBtn = document.getElementById('startPresentationBtn');
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    attachWelcomeScreenListeners();
    updateClock();
    setInterval(updateClock, 1000);
    logWelcomeMessage();
});

// Welcome Screen Listeners
function attachWelcomeScreenListeners() {
    startPresentationBtn.addEventListener('click', startPresentation);
    welcomeScreen.addEventListener('click', (e) => {
        if (e.target === welcomeScreen) {
            startPresentation();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (!welcomeScreen.classList.contains('hidden') && e.key === 'Enter') {
            startPresentation();
        }
    });
}

// Start Presentation
function startPresentation() {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        initializePresentation();
        attachEventListeners();
        addWindowDragFunctionality();
    }, 500);
}

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
    document.querySelector('.minimize-btn').addEventListener('click', minimizeWindow);
    document.querySelector('.maximize-btn').addEventListener('click', maximizeWindow);

    // Desktop shortcuts
    const desktopShortcuts = document.querySelectorAll('.desktop-shortcut');
    desktopShortcuts.forEach((shortcut, index) => {
        shortcut.addEventListener('dblclick', () => {
            handleDesktopShortcut(index);
        });
    });
}

// Handle Keyboard Press
function handleKeyPress(event) {
    if (isAnimating) return;

    switch (event.key.toLowerCase()) {
        case 'arrowleft':
            previousSlide();
            break;
        case 'arrowright':
            nextSlide();
            break;
        case 'escape':
            if (startMenu.classList.contains('active')) {
                startMenu.classList.remove('active');
            }
            if (detailsPanelOpen) {
                closeDetailsPanel();
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

// Navigate to Next Slide
function nextSlide() {
    if (currentSlide < totalSlides && !isAnimating) {
        currentSlide++;
        updateSlideDisplay();
    }
}

// Navigate to Previous Slide
function previousSlide() {
    if (currentSlide > 1 && !isAnimating) {
        currentSlide--;
        updateSlideDisplay();
    }
}

// Go to Specific Slide
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides && !isAnimating) {
        currentSlide = slideNumber;
        updateSlideDisplay();
    }
}

// Update Slide Display
function updateSlideDisplay() {
    isAnimating = true;

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }

    // Update counter
    currentSlideSpan.textContent = currentSlide;

    // Update button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;

    // Update details panel
    updateDetailsPanel();

    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 400);
}

// Toggle Details Panel
function toggleDetailsPanel() {
    if (detailsPanelOpen) {
        closeDetailsPanel();
    } else {
        openDetailsPanel();
    }
}

// Open Details Panel
function openDetailsPanel() {
    detailsPanel.classList.add('active');
    detailsBtn.classList.add('active');
    detailsPanelOpen = true;
    updateDetailsPanel();
}

// Close Details Panel
function closeDetailsPanel() {
    detailsPanel.classList.remove('active');
    detailsBtn.classList.remove('active');
    detailsPanelOpen = false;
}

// Update Details Panel Content
function updateDetailsPanel() {
    if (currentSlide >= 1 && currentSlide <= slideDetails.length) {
        const detail = slideDetails[currentSlide - 1];
        detailsTitle.textContent = detail.title;
        detailsContent.innerHTML = `<p>${detail.content}</p>`;
    }
}

// Toggle Start Menu
function toggleStartMenu() {
    startMenu.classList.toggle('active');
}

// Handle Document Click
function handleDocumentClick(event) {
    if (!event.target.closest('.start-button') && !event.target.closest('.start-menu')) {
        startMenu.classList.remove('active');
    }
    if (!event.target.closest('.details-panel') && !event.target.closest('.details-btn')) {
        // Don't close on details panel click
    }
}

// Update Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
}

// Window Controls
function closePresentation() {
    if (confirm('Deseja realmente encerrar a apresentação?')) {
        alert('Obrigado por assistir! 🎉');
        mainWindow.style.opacity = '0';
        mainWindow.style.transform = 'scale(0.8)';
        setTimeout(() => {
            mainWindow.style.display = 'none';
        }, 300);
    }
}

function minimizeWindow() {
    mainWindow.style.display = mainWindow.style.display === 'none' ? 'flex' : 'none';
}

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
    } else {
        mainWindow.style.width = '100vw';
        mainWindow.style.height = '100vh';
        mainWindow.style.maxWidth = 'none';
        mainWindow.style.maxHeight = 'none';
        mainWindow.style.top = '0';
        mainWindow.style.left = '0';
        mainWindow.style.transform = 'none';
    }
}

// Add Window Drag Functionality
function addWindowDragFunctionality() {
    const titleBar = document.querySelector('.window-title-bar');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX - mainWindow.offsetLeft;
        initialY = e.clientY - mainWindow.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            mainWindow.style.position = 'fixed';
            mainWindow.style.left = currentX + 'px';
            mainWindow.style.top = currentY + 'px';
            mainWindow.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Handle Desktop Shortcuts
function handleDesktopShortcut(index) {
    const messages = [
        '💻 Meu PC - Sistema de Arquivos',
        '📁 Meus Documentos - Vazio',
        '🌐 Internet Explorer - Conectando...',
        '🗑️ Lixeira - Vazia'
    ];
    alert(messages[index]);
}

// Keyboard Shortcuts for Slide Navigation
document.addEventListener('keydown', (event) => {
    // Number keys to jump to slide
    if (event.key >= '1' && event.key <= '9') {
        const slideNum = parseInt(event.key);
        if (slideNum <= totalSlides) {
            goToSlide(slideNum);
        }
    }
});

// Add Touch Support for Mobile Devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    } else if (touchEndX > touchStartX + 50) {
        previousSlide();
    }
}

// Easter Eggs and Fun Features
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
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 3000);
}

// Easter Egg: Type "BILL" to trigger
let billSequence = '';
document.addEventListener('keydown', (e) => {
    billSequence += e.key.toUpperCase();
    if (billSequence.includes('BILL')) {
        showEasterEggMessage('💰 "A gente entende é de software!" - Bill Gates 💰');
        playSound('success');
        billSequence = '';
    }
    if (billSequence.length > 10) {
        billSequence = billSequence.slice(-10);
    }
});

// Easter Egg: Type "GATES" to trigger
let gatesSequence = '';
document.addEventListener('keydown', (e) => {
    gatesSequence += e.key.toUpperCase();
    if (gatesSequence.includes('GATES')) {
        showEasterEggMessage('🖥️ "Não somos gurus de hardware, Paul. A gente entende é de software." 🖥️');
        playSound('success');
        gatesSequence = '';
    }
    if (gatesSequence.length > 10) {
        gatesSequence = gatesSequence.slice(-10);
    }
});

// Show Easter Egg Message
function showEasterEggMessage(message) {
    const easterEggDiv = document.createElement('div');
    easterEggDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1084d7, #0a246a);
        color: white;
        padding: 20px 40px;
        border: 3px solid #ffff00;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(16, 132, 215, 0.8);
        animation: easterEggAppear 0.3s ease-out;
    `;
    easterEggDiv.textContent = message;
    document.body.appendChild(easterEggDiv);

    setTimeout(() => {
        easterEggDiv.style.animation = 'easterEggDisappear 0.3s ease-out forwards';
        setTimeout(() => {
            easterEggDiv.remove();
        }, 300);
    }, 3000);
}

// Add CSS for Easter Egg Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes easterEggAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes easterEggDisappear {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Play Sound (simple beep)
function playSound(type) {
    // Create a simple beep using Web Audio API
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
    } catch (e) {
        // Fallback if Web Audio API is not available
        console.log('Sound not available');
    }
}

// Log Welcome Message
function logWelcomeMessage() {
    console.clear();
    console.log('%c╔════════════════════════════════════════════════════════════╗', 'color: #1084d7; font-weight: bold;');
    console.log('%c║  🖥️  OS INOVADORES - CAPÍTULO 9: SOFTWARE  🖥️             ║', 'color: #1084d7; font-weight: bold;');
    console.log('%c╚════════════════════════════════════════════════════════════╝', 'color: #1084d7; font-weight: bold;');
    console.log('%c\n📚 Apresentação iniciada com sucesso!\n', 'color: #00ff00; font-size: 12px; font-weight: bold;');
    console.log('%c⌨️  CONTROLES DE NAVEGAÇÃO:', 'color: #ffff00; font-weight: bold;');
    console.log('%c  • Setas (← →) - Navegar entre slides', 'color: #00ff00;');
    console.log('%c  • Espaço - Próximo slide', 'color: #00ff00;');
    console.log('%c  • Números (1-8) - Pular para slide específico', 'color: #00ff00;');
    console.log('%c  • Home/End - Primeiro/Último slide', 'color: #00ff00;');
    console.log('%c  • D - Alternar painel de detalhes', 'color: #00ff00;');
    console.log('%c  • ESC - Fechar menus', 'color: #00ff00;');
    console.log('%c\n🎮 EASTER EGGS:', 'color: #ffff00; font-weight: bold;');
    console.log('%c  • Digite "BILL" ou "GATES" para mensagens especiais', 'color: #00ff00;');
    console.log('%c  • Tente o Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00ff00;');
    console.log('%c\n💡 Dica: Clique e arraste a janela para mover!', 'color: #ffff00;');
    console.log('%c\n', 'color: #1084d7;');
}

// Prevent accidental navigation
window.addEventListener('beforeunload', (event) => {
    // Uncomment to prevent accidental page reload
    // event.preventDefault();
    // event.returnValue = '';
});

// Log presentation info
console.log('%cDesenvolvido com ❤️ e nostalgia do Windows XP', 'color: #1084d7; font-style: italic;');
console.log('%c"A gente entende é de software." - Bill Gates', 'color: #00ff00; font-style: italic;');
