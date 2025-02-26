// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example function to add experience cards dynamically
function addExperienceCards() {
    const experienceData = [
        {
            company: 'Company Name 1',
            title: 'Job Title 1',
            logo: 'path/to/logo1.png',
            description: 'Description of your role and achievements at Company 1'
        },
        {
            company: 'Company Name 2',
            title: 'Job Title 2',
            logo: 'path/to/logo2.png',
            description: 'Description of your role and achievements at Company 2'
        }
        // Add more experiences as needed
    ];

    const container = document.querySelector('.cards-container');
    
    experienceData.forEach(exp => {
        const card = `
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${exp.logo}" alt="${exp.company}" class="company-logo">
                        <h3>${exp.company}</h3>
                        <p>${exp.title}</p>
                    </div>
                    <div class="flip-card-back">
                        <p>${exp.description}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Call the function when the page loads
window.addEventListener('load', addExperienceCards);