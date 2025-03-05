document.addEventListener('DOMContentLoaded', () => {
    // Progress tracking
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.survey-section-group');
    let currentStep = 0;

    function updateProgress(stepIndex) {
        steps.forEach((step, index) => {
            if (index < stepIndex) {
                step.classList.add('completed');
            } else if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Choice cards selection
    document.querySelectorAll('.choice-card').forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        card.addEventListener('click', () => {
            radio.checked = true;
            document.querySelectorAll('.choice-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');
        });
    });

    // Rating scale selection
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', () => {
            const input = option.querySelector('input');
            const allOptions = option.closest('.rating-scale').querySelectorAll('.rating-option');
            
            allOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            option.classList.add('selected');
            input.checked = true;
        });
    });

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            content.style.maxHeight = header.classList.contains('active') 
                ? `${content.scrollHeight}px` : '0';
        });
    });

    // Auto-save functionality
    const form = document.getElementById('survey-form');
    const saveTimeout = 1000; // 1 second
    let saveTimer;

    form.addEventListener('input', () => {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            localStorage.setItem('survey-data', JSON.stringify(new FormData(form)));
            showSavedIndicator();
        }, saveTimeout);
    });

    // Add this to create dynamic symbols
    function createFloatingSymbols() {
        const symbolsContainer = document.querySelector('.floating-symbols');
        const symbols = symbolsContainer.innerHTML;
        // Duplicate symbols for better coverage
        symbolsContainer.innerHTML = symbols.repeat(3);
        
        // Randomize initial positions
        document.querySelectorAll('.floating-symbols i').forEach(symbol => {
            symbol.style.left = `${Math.random() * 100}%`;
            symbol.style.top = `${Math.random() * 100}%`;
            symbol.style.animationDelay = `${Math.random() * 10}s`;
        });
    }

    createFloatingSymbols();

    // Clear extra whitespace from textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = textarea.value.trim();
    });
});