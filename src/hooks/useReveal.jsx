import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // For stat counters
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          let cur = 0;
          const t = setInterval(() => {
            cur += target / 50;
            if (cur >= target) {
              entry.target.innerText = target;
              clearInterval(t);
            } else {
              entry.target.innerText = Math.floor(cur);
            }
          }, 30);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      counters.forEach(c => counterObserver.unobserve(c));
    };
  }, []);
}
