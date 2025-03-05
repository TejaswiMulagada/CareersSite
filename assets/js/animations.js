/* filepath: /Users/tejumulagada/Desktop/TechProjects/tejaswimulagada/animations.js */
document.addEventListener('DOMContentLoaded', () => {
    function createFloatingSymbols() {
        const container = document.querySelector('.floating-symbols');
        if (!container) return;
        
        // Clear any existing symbols
        container.innerHTML = '';
        
        const symbols = [
            'fa-puzzle-piece', 'fa-chess-knight', 'fa-code-branch', 
            'fa-sitemap', 'fa-project-diagram', 'fa-chess-board',
            'fa-tasks', 'fa-cogs', 'fa-cube', 'fa-network-wired'
        ];
        
        // Create more symbols for better visual effect
        for (let i = 0; i < 30; i++) {
            const symbol = document.createElement('i');
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.className = `fas ${randomSymbol}`;
            
            // Randomize position, size, and animation timing
            const randomSize = Math.random() * (45 - 25) + 25;
            symbol.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${randomSize}px;
                opacity: 0.08;
                animation: float ${20 + Math.random() * 10}s linear infinite;
                animation-delay: -${Math.random() * 20}s;
            `;
            
            container.appendChild(symbol);
        }
    }

    createFloatingSymbols();
    // Recreate on resize for responsiveness
    window.addEventListener('resize', createFloatingSymbols);
});

// Add animation keyframes to the stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); }
        25% { transform: translate(10px, -10px) rotate(90deg) scale(1.1); }
        50% { transform: translate(20px, 0px) rotate(180deg) scale(1); }
        75% { transform: translate(10px, 10px) rotate(270deg) scale(0.9); }
        100% { transform: translate(0, 0) rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);