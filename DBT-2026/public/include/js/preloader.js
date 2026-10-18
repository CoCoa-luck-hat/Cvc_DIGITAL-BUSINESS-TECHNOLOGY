/**
 * Smart Lightweight Preloader Engine
 * Optimized for Fast Production Loading (Max 1.1s Cap)
 * Department of Digital Business Technology (DBT CVC)
 */
(function initSmartPreloader() {
    const run = () => {
        const overlay = document.getElementById('preloader-overlay');
        if (!overlay) return;

        // 1. Session Guard: If already shown in this browser session, open immediately without blocking
        try {
            if (sessionStorage.getItem('cvc_dbt_preloader_shown') === 'true') {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                document.body.style.overflow = '';
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                return;
            }
        } catch (e) { }

        const curtainTop = document.getElementById('preloader-curtain-top');
        const curtainBottom = document.getElementById('preloader-curtain-bottom');
        const canvas = document.getElementById('preloader-canvas');
        const contentBox = document.getElementById('preloader-content');
        const counterEl = document.getElementById('preloader-counter');
        const logoWrapper = document.querySelector('.preloader-logo-wrapper');
        const titleText = document.getElementById('preloader-title');

        // Prevent body scroll during brief curtain intro
        document.body.style.overflow = 'hidden';

        let isCompleted = false;
        let animFrameId = null;

        const hidePreloader = () => {
            if (isCompleted) return;
            isCompleted = true;

            if (animFrameId) cancelAnimationFrame(animFrameId);
            document.body.style.overflow = '';

            if (window.__cvcPreloadFallbackTimer) {
                clearTimeout(window.__cvcPreloadFallbackTimer);
                window.__cvcPreloadFallbackTimer = null;
            }

            try {
                sessionStorage.setItem('cvc_dbt_preloader_shown', 'true');
            } catch (e) { }

            if (overlay) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.2,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            if (overlay && overlay.parentNode) {
                                overlay.parentNode.removeChild(overlay);
                            }
                            window.dispatchEvent(new Event('resize'));
                            if (typeof ScrollTrigger !== 'undefined') {
                                ScrollTrigger.refresh();
                            }
                        }
                    });
                } else {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    window.dispatchEvent(new Event('resize'));
                }
            }
        };

        if (typeof gsap === 'undefined') {
            hidePreloader();
            return;
        }

        // Canvas Tech Particles (Lightweight & Smooth)
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);

            const handleResize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            };
            window.addEventListener('resize', handleResize, { passive: true });

            const particles = Array.from({ length: 20 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.4 + 0.2
            }));

            function draw() {
                ctx.clearRect(0, 0, width, height);
                particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                });
                if (!isCompleted) animFrameId = requestAnimationFrame(draw);
            }
            draw();
        }

        // 2. CRITICAL ASSET PROGRESS TRACKING (Fonts + Hero Banner Only)
        const currentProgress = { value: 0 };
        let criticalReady = false;

        const updateCounter = (val) => {
            if (counterEl) {
                counterEl.textContent = `${Math.min(100, Math.floor(val))}%`;
            }
        };

        // Fast Smooth Counter Interpolation (0 -> 100% over 0.35s)
        const counterTween = gsap.to(currentProgress, {
            value: 100,
            duration: 0.35,
            ease: 'power2.out',
            onUpdate: () => updateCounter(currentProgress.value),
            onComplete: () => {
                revealStage();
            }
        });

        // Track only essential Web Fonts
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                criticalReady = true;
            }).catch(() => {
                criticalReady = true;
            });
        }

        // Track critical Hero Banner if present
        const heroPreload = document.querySelector('link[rel="preload"][as="image"]');
        if (heroPreload) {
            const heroImg = new Image();
            heroImg.src = heroPreload.href;
            if (heroImg.decode) {
                heroImg.decode().catch(() => {});
            }
        }

        function revealStage() {
            if (isCompleted) return;

            // Play Final Snappy Entrance Sequence
            const tl = gsap.timeline({
                onComplete: hidePreloader
            });

            // 1. Counter Out & Logo Entrance
            tl.to(counterEl, { opacity: 0, scale: 0.85, duration: 0.12, ease: 'power2.in' });
            if (logoWrapper) {
                tl.to(logoWrapper, {
                    opacity: 1,
                    scale: 1.0,
                    duration: 0.2,
                    ease: 'back.out(1.2)'
                }, '<+=0.03');
            }

            if (titleText) {
                tl.set(titleText, { display: 'block' }, '<');
                tl.to(titleText, { opacity: 1, y: 0, duration: 0.15 }, '<');
            }

            // 2. Snappy Curtain Split Opening
            if (contentBox) {
                tl.to(contentBox, { opacity: 0, scale: 0.96, duration: 0.15, ease: 'power2.in' }, '+=0.05');
            }
            if (curtainTop && curtainBottom) {
                tl.to(curtainTop, {
                    yPercent: -100,
                    duration: 0.35,
                    ease: 'power3.inOut',
                    force3D: true,
                    onStart: () => {
                        document.body.style.overflow = '';
                    }
                }, '-=0.05');
                tl.to(curtainBottom, {
                    yPercent: 100,
                    duration: 0.35,
                    ease: 'power3.inOut',
                    force3D: true
                }, '<');
            }
        }

        // Strict Fallback Timer: Network-Adaptive Cap (150ms for slow networks, 450ms max for normal)
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
        const capDuration = isSlow ? 150 : 450;

        setTimeout(() => {
            if (!isCompleted) {
                counterTween.kill();
                updateCounter(100);
                if (isSlow) {
                    hidePreloader();
                } else {
                    revealStage();
                }
            }
        }, capDuration);
    };

    if (document.getElementById('preloader-overlay')) {
        run();
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
