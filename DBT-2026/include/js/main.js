(function () {
    "use strict";

    // Spinner Hide Helper (Pure Vanilla JS)
    var spinner = function () {
        setTimeout(function () {
            var spinnerEl = document.getElementById('spinner');
            if (spinnerEl) {
                spinnerEl.classList.remove('show');
            }
        }, 1);
    };
    spinner();

    // Back to top button - Show ONLY when reached the Footer
    (function () {
        function setupBackToTop() {
            const backToTopBtn = document.querySelector('.back-to-top');
            const footer = document.getElementById('global-footer') || document.querySelector('footer');

            if (!backToTopBtn) return;
            backToTopBtn.classList.remove('hidden');

            function updateFooterState() {
                if (!footer || window.innerWidth < 1024) {
                    backToTopBtn.classList.remove('show-btn');
                    return;
                }
                const rect = footer.getBoundingClientRect();
                const vh = window.innerHeight || document.documentElement.clientHeight;
                // Reveal when footer enters viewport
                if (rect.top <= vh) {
                    backToTopBtn.classList.add('show-btn');
                } else {
                    backToTopBtn.classList.remove('show-btn');
                }
            }

            // Window Scroll & Resize
            window.addEventListener('scroll', updateFooterState, { passive: true });
            window.addEventListener('resize', updateFooterState, { passive: true });

            // Hook into Lenis Smooth Scroll
            const hookLenis = () => {
                if (window.lenis && typeof window.lenis.on === 'function') {
                    window.lenis.on('scroll', updateFooterState);
                    return true;
                }
                return false;
            };

            if (!hookLenis()) {
                const lenisInterval = setInterval(() => {
                    if (hookLenis()) clearInterval(lenisInterval);
                }, 150);
                setTimeout(() => clearInterval(lenisInterval), 5000);
            }

            // Intersection Observer
            if (footer && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            backToTopBtn.classList.add('show-btn');
                        } else {
                            updateFooterState();
                        }
                    });
                }, {
                    root: null,
                    threshold: [0, 0.05, 0.1]
                });
                observer.observe(footer);
            }

            // Initial verification
            updateFooterState();

            // Click Scroll-to-Top (Pure Vanilla JS)
            backToTopBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                    window.lenis.scrollTo(0, { duration: 1.2 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                return false;
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupBackToTop);
        } else {
            setupBackToTop();
        }
    })();

})();
