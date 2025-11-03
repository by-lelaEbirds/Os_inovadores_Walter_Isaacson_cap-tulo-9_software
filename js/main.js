// Main JavaScript for Presentation

// State Management
let currentSlide = 1;
const totalSlides = 8;

// DOM Elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const startBtn = document.querySelector('.start-button');
const startMenu = document.getElementById('startMenu');
const clockElement = document.getElementById('clock');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePresentation();
    updateClock();
    setInterval(updateClock, 1000);
});

// Initialize Presentation
function initializePresentation() {
    totalSlidesSpan.textContent = totalSlides;
    updateSlideDisplay();
    attachEventListeners();
}

// Attach Event Listeners
function attachEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Start menu
    startBtn.addEventListener('click', toggleStartMenu);
    document.addEventListener('click', handleDocumentClick);

    // Window controls
    document.querySelector('.close-btn').addEventListener('click', () => {
        alert('Apresentação encerrada. Obrigado!');
    });

    document.querySelector('.minimize-btn').addEventListener('click', () => {
        document.getElementById('mainWindow').style.display = 'none';
    });

    document.querySelector('.maximize-btn').addEventListener('click', () => {
        const mainWindow = document.getElementById('mainWindow');
        mainWindow.style.width = mainWindow.style.width === '100%' ? '90%' : '100%';
        mainWindow.style.height = mainWindow.style.height === '100%' ? '80%' : '100%';
    });
}

// Handle Keyboard Press
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case 'Escape':
            if (startMenu.classList.contains('active')) {
                startMenu.classList.remove('active');
            }
            break;
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
    }
}

// Navigate to Next Slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideDisplay();
    }
}

// Navigate to Previous Slide
function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideDisplay();
    }
}

// Go to Specific Slide
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        updateSlideDisplay();
    }
}

// Update Slide Display
function updateSlideDisplay() {
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
}

// Update Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
}

// Add Keyboard Shortcuts Help
function showKeyboardShortcuts() {
    const shortcuts = `
    Atalhos de Teclado:
    ← / → : Navegar entre slides
    Espaço : Próximo slide
    ESC : Fechar menu
    `;
    console.log(shortcuts);
}

// Slide Counter Keyboard
document.addEventListener('keydown', (event) => {
    // Number keys to jump to slide
    if (event.key >= '1' && event.key <= '9') {
        const slideNum = parseInt(event.key);
        if (slideNum <= totalSlides) {
            goToSlide(slideNum);
        }
    }
});

// Prevent right-click context menu (optional, for old-school feel)
document.addEventListener('contextmenu', (event) => {
    // Uncomment the line below to disable right-click
    // event.preventDefault();
});

// Add some Easter eggs
document.addEventListener('keydown', (event) => {
    // Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key === ' ' ? ' ' : e.key.toLowerCase();
        if (key === konamiCode[konamiIndex].toLowerCase() || e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// Easter Egg
function activateEasterEgg() {
    alert('🎉 Você encontrou um Easter Egg! Bem-vindo ao mundo do Windows XP! 🎉');
    document.body.style.filter = 'hue-rotate(45deg)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 2000);
}

// Prevent accidental navigation
window.addEventListener('beforeunload', (event) => {
    // Uncomment to prevent accidental page reload
    // event.preventDefault();
    // event.returnValue = '';
});

// Add touch support for mobile devices
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

// Log initialization
console.log('%c🖥️ OS INOVADORES - CAPÍTULO 9: SOFTWARE', 'color: #1084d7; font-size: 14px; font-weight: bold;');
console.log('%cApresentação iniciada com sucesso!', 'color: #0a246a; font-size: 12px;');
console.log('%cUse as setas do teclado para navegar entre os slides.', 'color: #404040; font-size: 11px;');
console.log('%cPressione números (1-8) para ir para um slide específico.', 'color: #404040; font-size: 11px;');
