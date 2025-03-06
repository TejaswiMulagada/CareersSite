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

    // Handle choice card selection
    document.querySelectorAll('.choice-card').forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        // Add initial selected state if radio is checked
        if (radio.checked) {
            card.classList.add('selected');
        }
        
        card.addEventListener('click', () => {
            // Remove selected class from all cards in the same group
            const name = radio.getAttribute('name');
            document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                input.closest('.choice-card').classList.remove('selected');
            });
            
            // Add selected class to clicked card
            card.classList.add('selected');
            radio.checked = true;
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

    // Handle "Other" option for role
    const otherRadio = document.getElementById('role-other-radio');
    const otherText = document.getElementById('role-other-text');

    otherRadio.addEventListener('change', () => {
        if (otherRadio.checked) {
            otherText.style.display = 'block';
            otherText.required = true;
        }
    });

    document.querySelectorAll('input[name="role"]').forEach(radio => {
        if (radio !== otherRadio) {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    otherText.style.display = 'none';
                    otherText.required = false;
                    otherText.value = ''; // Clear the text input
                }
            });
        }
    });

    // Ensure the "Other" text is included in the form submission
    form.addEventListener('submit', (event) => {
        if (otherRadio.checked && otherText.value.trim() !== '') {
            otherRadio.value = `Other: ${otherText.value.trim()}`;
        }
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