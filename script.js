document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const proposalCard = document.querySelector('.proposal-card');
    const successMessage = document.querySelector('.success-message');

    // Function to move the No button
    const moveButton = () => {
        // If first time moving, lock position first to enable smooth transition
        if (!noBtn.classList.contains('moving')) {
            const currentRect = noBtn.getBoundingClientRect();
            noBtn.style.left = `${currentRect.left}px`;
            noBtn.style.top = `${currentRect.top}px`;
            noBtn.style.position = 'fixed';
            noBtn.classList.add('moving');
            // Force reflow to insure the browser knows the start position
            void noBtn.offsetWidth;
        }

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Get button dimensions
        const btnRect = noBtn.getBoundingClientRect();
        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;

        // Calculate new position relative to current position to avoid jumping too far
        // Max move distance: 250px
        const maxMove = 250;

        // Get current position (fallback to center if not set)
        let currentLeft = parseFloat(noBtn.style.left) || (viewportWidth / 2 - btnWidth / 2);
        let currentTop = parseFloat(noBtn.style.top) || (viewportHeight / 2 - btnHeight / 2);

        // Generate random offset
        let deltaX = (Math.random() - 0.5) * 2 * maxMove;
        let deltaY = (Math.random() - 0.5) * 2 * maxMove;

        // If movement is too small, force it to be larger
        if (Math.abs(deltaX) < 50) deltaX = deltaX > 0 ? 50 : -50;
        if (Math.abs(deltaY) < 50) deltaY = deltaY > 0 ? 50 : -50;

        let newLeft = currentLeft + deltaX;
        let newTop = currentTop + deltaY;

        // Strictly clamp within viewable area with padding
        const padding = 20;
        newLeft = Math.min(Math.max(padding, newLeft), viewportWidth - btnWidth - padding);
        newTop = Math.min(Math.max(padding, newTop), viewportHeight - btnHeight - padding);

        // Apply new position
        noBtn.style.left = `${newLeft}px`;
        noBtn.style.top = `${newTop}px`;

        // Add a funny text change sometimes
        const funnyTexts = ["No way!", "Think again!", "Trying to click?", "Too slow!", "Nope!"];
        if (Math.random() > 0.7) {
            noBtn.innerText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
        }
    };

    // Move button on mouseover (desktop)
    noBtn.addEventListener('mouseover', moveButton);

    // Move button on touch start (mobile) - creates a tricky game
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveButton();
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        // Confetti effect could go here

        // Hide proposal card
        proposalCard.classList.add('hidden');

        // Show success message
        successMessage.classList.remove('hidden');

        // Create hearts rain effect
        createHeartsRain();
    });

    function createHeartsRain() {
        const heartContainer = document.createElement('div');
        heartContainer.style.position = 'fixed';
        heartContainer.style.top = '0';
        heartContainer.style.left = '0';
        heartContainer.style.width = '100%';
        heartContainer.style.height = '100%';
        heartContainer.style.pointerEvents = 'none';
        heartContainer.style.zIndex = '9999';
        document.body.appendChild(heartContainer);

        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '🙏🏼';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = -10 - Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
            heartContainer.appendChild(heart);
        }

        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '😺';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = -10 - Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
            heartContainer.appendChild(heart);
        }

        // Add style for falling animation dynamically
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes fall {
                to {
                    transform: translateY(110vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});
