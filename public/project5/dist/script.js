// Initialize Lucide icons
lucide.createIcons();

// Form submission handler
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Это демонстрационная версия для портфолио. Отправка заявок отключена.');
        form.style.display = 'none';
        if (successMessage) successMessage.classList.remove('hidden');
    });
}

// Intercept non-anchor link clicks for portfolio showcase
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        // Allow anchor links for smooth scrolling within the page
        if (href && href.startsWith('#')) {
            return;
        }
        e.preventDefault();
        alert('Это демонстрационная версия для портфолио. Переход по ссылкам отключен.');
    }
});

// Infinite 3D Carousel Logic
const carouselItems = document.querySelectorAll('.carousel-3d-item');
const totalItems = carouselItems.length;
let currentIndex = 0;

function updateCarousel() {
    const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
    
    // adjust translations based on screen size
    const translateOffset1 = isMobile ? '35%' : '65%';
    const translateOffset2 = isMobile ? '70%' : '110%';
    const scale1 = isMobile ? 0.85 : 0.9;
    const scale2 = isMobile ? 0.7 : 0.7;
    const translateZ1 = isMobile ? '-80px' : '-120px';
    const translateZ2 = isMobile ? '-150px' : '-250px';

    carouselItems.forEach((item, index) => {
        let offset = (index - currentIndex) % totalItems;
        if (offset < 0) offset += totalItems; 
        if (offset > totalItems / 2) offset -= totalItems;

        item.classList.remove('pointer-events-none');
        
        if (offset === 0) {
            item.style.transform = 'translateX(0) scale(1) translateZ(0)';
            item.style.zIndex = 10;
            item.style.opacity = 1;
        } else if (offset === 1) {
            item.style.transform = `translateX(${translateOffset1}) scale(${scale1}) translateZ(${translateZ1})`;
            item.style.zIndex = 5;
            item.style.opacity = 0.25; 
        } else if (offset === -1) {
            item.style.transform = `translateX(-${translateOffset1}) scale(${scale1}) translateZ(${translateZ1})`;
            item.style.zIndex = 5;
            item.style.opacity = 0.25;
        } else {
            item.style.transform = `translateX(${offset > 0 ? translateOffset2 : '-' + translateOffset2}) scale(${scale2}) translateZ(${translateZ2})`;
            item.style.zIndex = 1;
            item.style.opacity = 0;
            item.classList.add('pointer-events-none');
        }
    });
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
}

carouselItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if(currentIndex !== index) {
            // Вычисляем кратчайший путь при клике
            let diff = (index - currentIndex) % totalItems;
            if (diff < -Math.floor(totalItems/2)) diff += totalItems;
            if (diff > Math.floor(totalItems/2)) diff -= totalItems;
            
            currentIndex = (currentIndex + diff + totalItems) % totalItems;
            updateCarousel();
        }
    });
});

// Touch Swipe Logic (Infinite)
let touchStartX = 0;
let touchEndX = 0;
const carouselContainer = document.querySelector('.carousel-3d-container');

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            currentIndex = (currentIndex + 1) % totalItems; 
            updateCarousel();
        }
        if (touchEndX - touchStartX > 50) {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems; 
            updateCarousel();
        }
    }, {passive: true});
}

// Инициализация карусели
updateCarousel();

// Пересчет при изменении размера окна (для адаптива)
window.addEventListener('resize', updateCarousel);
