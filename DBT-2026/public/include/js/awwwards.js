/**
 * Awwwards-Level Interactive Script
 * Handles: Custom Cursor, Preloader, Magnetic Buttons, and Page Transitions via GSAP.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 0. CONFIGURE GSAP & SCROLLTRIGGER FOR MOBILE TOOLBAR COLLAPSE STABILITY
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({
            ignoreMobileResize: true,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });
    }

    // 1. DYNAMIC DOM GENERATION FOR AWWWARDS ELEMENTS
    createInteractiveElements();

    // 2. INITIALIZE SERVICES
    initCursor();
    initPreloader();
    initMagneticElements();
    initPageTransitions();
    initSmartNavbar();

    // 3. INITIALIZE SCROLL TRIGGERS & TEXT SPLITTING (Homepage Only Guard)
    if (document.getElementById("majorsSection") || document.querySelector(".home-hero-video") || document.getElementById("careers-reveal-section")) {
        initGlobalBackgroundParallax();
        initHeroParallax();
        initVideoHeroBlinds();
        initStorytellingTransition();
        init3DCardStacking();
        initTextSplitting();
        initHeadingFadeAnimations();
        initCareersWipe();
        initKoraComparisonScroll();
        initGalleryHorizontal();
        init3DSpatialPortalTransitions();
        initStepsPinScroll();
        initRibbonsMomentumHover();
    }
});

/**
 * Dynamically inserts the required HTML structures so templates don't need manual changes.
 */
function createInteractiveElements() {
    // Custom Cursor Elements disabled per user request
    document.body.classList.remove("cursor-active");

    // Cinematic Dark Blinds Transition Container (6 Strips + Center Logo)
    let wrapper = document.getElementById("cinematic-blinds-wrapper");
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "cinematic-blinds-wrapper";
        for (let i = 0; i < 6; i++) {
            const strip = document.createElement("div");
            strip.className = "cinematic-blind-strip";
            wrapper.appendChild(strip);
        }
        const centerBox = document.createElement("div");
        centerBox.className = "cinematic-blinds-center";
        centerBox.innerHTML = `
            <div class="cinematic-blinds-logo">
                <img src="/02_design/DBTLOGO.webp" alt="DBT Logo">
            </div>
        `;
        wrapper.appendChild(centerBox);
        document.body.appendChild(wrapper);
    }

    // Check if we came from a full-page transition
    if (sessionStorage.getItem("cvc_page_transition_active") === "1") {
        sessionStorage.removeItem("cvc_page_transition_active");
        wrapper.classList.add("active");
        const strips = wrapper.querySelectorAll(".cinematic-blind-strip");
        const centerBox = wrapper.querySelector(".cinematic-blinds-center");
        if (typeof gsap !== "undefined" && strips.length) {
            gsap.set(strips, { scaleY: 1, transformOrigin: "bottom" });
            if (centerBox) gsap.set(centerBox, { opacity: 1, scale: 1 });
            setTimeout(() => {
                triggerCinematicBlindsIn();
            }, 60);
        } else {
            resetCinematicBlinds();
        }
    } else {
        resetCinematicBlinds();
    }
}

/**
 * Safely resets and hides the transition blinds overlay
 */
function resetCinematicBlinds() {
    document.body.classList.remove("transition-lock");
    const wrapper = document.getElementById("cinematic-blinds-wrapper");
    if (wrapper) {
        wrapper.classList.remove("active");
        const strips = wrapper.querySelectorAll(".cinematic-blind-strip");
        const centerBox = wrapper.querySelector(".cinematic-blinds-center");
        if (typeof gsap !== "undefined") {
            if (strips.length) {
                gsap.killTweensOf(strips);
                gsap.set(strips, { scaleY: 0, transformOrigin: "top" });
            }
            if (centerBox) {
                gsap.killTweensOf(centerBox);
                gsap.set(centerBox, { opacity: 0 });
            }
        } else {
            strips.forEach(s => s.style.transform = "scaleY(0)");
            if (centerBox) centerBox.style.opacity = "0";
        }
    }
}

/**
 * Triggers Cinematic Dark Blinds closing transition (out)
 */
function triggerCinematicBlindsOut(callback) {
    document.body.classList.add("transition-lock");
    const wrapper = document.getElementById("cinematic-blinds-wrapper");
    if (!wrapper) {
        if (callback) callback();
        return;
    }
    wrapper.classList.add("active");
    const strips = wrapper.querySelectorAll(".cinematic-blind-strip");
    const centerBox = wrapper.querySelector(".cinematic-blinds-center");

    if (typeof gsap !== "undefined" && strips.length) {
        gsap.killTweensOf(strips);
        if (centerBox) gsap.killTweensOf(centerBox);

        gsap.set(strips, { transformOrigin: "top" });
        if (centerBox) gsap.set(centerBox, { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({
            onComplete: () => {
                if (callback) callback();
            }
        });

        tl.fromTo(strips,
            { scaleY: 0 },
            {
                scaleY: 1.05,
                duration: 0.38,
                stagger: 0.035,
                ease: "power4.inOut"
            }
        );

        if (centerBox) {
            tl.to(centerBox, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.4)"
            }, "-=0.25");
        }
    } else {
        if (callback) callback();
    }
}

/**
 * Triggers Cinematic Dark Blinds opening transition (in)
 */
function triggerCinematicBlindsIn() {
    const wrapper = document.getElementById("cinematic-blinds-wrapper");
    if (!wrapper) {
        resetCinematicBlinds();
        return;
    }
    const strips = wrapper.querySelectorAll(".cinematic-blind-strip");
    const centerBox = wrapper.querySelector(".cinematic-blinds-center");

    if (typeof gsap !== "undefined" && strips.length) {
        gsap.killTweensOf(strips);
        if (centerBox) gsap.killTweensOf(centerBox);

        const tl = gsap.timeline({
            onComplete: () => {
                resetCinematicBlinds();
            }
        });

        if (centerBox) {
            tl.to(centerBox, {
                opacity: 0,
                scale: 1.15,
                duration: 0.22,
                ease: "power2.in"
            });
        }

        tl.set(strips, { transformOrigin: "bottom", scaleY: 1.05 })
            .to(strips, {
                scaleY: 0,
                duration: 0.42,
                stagger: 0.035,
                ease: "power4.inOut"
            }, centerBox ? "-=0.1" : 0);
    } else {
        resetCinematicBlinds();
    }
}

// BFCache (Back/Forward Navigation) Safety Trigger
window.addEventListener("pageshow", () => {
    resetCinematicBlinds();
});

/**
 * Smart Hide-on-Scroll and Floating Capsule Navbar transition
 */
let lastScrollTop = 0;
function initSmartNavbar() {
    const navbarWrapper = document.getElementById("main-navbar-wrapper");
    if (!navbarWrapper) return;

    const threshold = 15;
    const floatingThreshold = 80;

    const handleScroll = (scrollTop) => {
        // Hide-on-scroll toggle
        const delta = scrollTop - lastScrollTop;
        if (scrollTop > threshold && delta > 4) {
            // Scrolling down: Hide
            navbarWrapper.classList.add("navbar-hidden");
        } else if (delta < -4 || scrollTop <= threshold) {
            // Scrolling up or near top: Show
            navbarWrapper.classList.remove("navbar-hidden");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        handleScroll(scrollTop);
    }, { passive: true });

    // Support Lenis smooth scroll if active
    if (window.lenis && typeof window.lenis.on === "function") {
        window.lenis.on('scroll', (e) => {
            handleScroll(e.scroll);
        });
    }
}

/**
 * GSAP ScrollTrigger for vertical wipe reveal comparison
 */
function initCareersWipe() {
    const revealSection = document.getElementById("careers-reveal-section");
    if (!revealSection) return;

    const layerAfter = revealSection.querySelector(".layer-after");
    const revealDivider = revealSection.querySelector(".reveal-divider");
    const revealSticky = revealSection.querySelector(".reveal-sticky");
    if (!layerAfter || !revealDivider || !revealSticky) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.innerWidth < 1024;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: revealSection,
                pin: revealSticky,
                start: "top top",
                end: isMobile ? "bottom+=10% bottom" : "bottom bottom",
                scrub: true,
                anticipatePin: 0,
                fastScrollEnd: false,
                preventOverlaps: false,
                invalidateOnRefresh: true
            }
        });

        tl.to(revealDivider, {
            opacity: 1,
            duration: 0.05,
            ease: "none"
        }, 0)
            .to(layerAfter, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none"
            }, 0)
            .to(revealDivider, {
                top: "100%",
                ease: "none"
            }, 0)
            .to(revealDivider, {
                opacity: 0,
                duration: 0.05,
                ease: "none"
            }, ">-0.05");
    }
}


/**
 * Panorama Horizontal Pinned Scroll Gallery
 */
function initGalleryHorizontal() {
    const track = document.querySelector(".gallery-horizontal-track");
    const sticky = document.querySelector(".gallery-sticky");
    const section = document.getElementById("gallery-horizontal-section");
    if (!track || !sticky || !section) return;

    if (window.innerWidth < 1024) {
        if (typeof gsap !== "undefined") {
            gsap.set(track, { clearProps: "all" });
            gsap.set(sticky, { clearProps: "all" });
        }
        return;
    }

    const cards = track.querySelectorAll(".panorama-card");
    const rulerItems = document.querySelectorAll(".ruler-item");
    if (!cards.length) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Reset track position and sticky properties
        gsap.set(track, { x: 0 });
        gsap.set(sticky, { scale: 1, borderRadius: "0px", opacity: 1 });

        const getScrollAmount = () => {
            return -(track.scrollWidth - window.innerWidth);
        };

        const galleryTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: sticky,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Normalize progress over 75% scroll movement so last card holds for remaining 25% (~1.5-2 steps)
                    const normProgress = Math.min(1, self.progress / 0.75);
                    const activeIndex = Math.min(
                        Math.floor(normProgress * cards.length),
                        cards.length - 1
                    );

                    rulerItems.forEach((item, idx) => {
                        if (idx === activeIndex) {
                            item.classList.add("active");
                        } else {
                            item.classList.remove("active");
                        }
                    });
                }
            }
        });

        // Horizontal scroll movement (0% -> 75% of section height)
        galleryTl.to(track, {
            x: getScrollAmount,
            ease: "none",
            duration: 0.75
        })
            // Card 06 Hold Phase (75% -> 100% of section height: stays 100% locked and steady)
            .to(track, {
                x: getScrollAmount,
                ease: "none",
                duration: 0.25
            });

        // Entrance Staggered Reveal Animation for Gallery Header and Panorama Cards
        const headerContainer = section.querySelector(".gallery-header-anim");
        if (headerContainer) {
            gsap.fromTo(headerContainer,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (cards.length) {
            gsap.fromTo(cards,
                { y: 70, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }

    // 3D Reveal animation for section_steps title & subtle wave parallax
    const stepsTitleWrap = document.querySelector(".steps-title");
    const stepsHeader = stepsTitleWrap ? stepsTitleWrap.querySelector(".heading-xl") : null;
    const waveBorder = document.querySelector(".section-border.is-steps .section-border-svg");
    const stepsSection = document.querySelector(".section_steps");

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        if (stepsHeader && stepsTitleWrap) {
            gsap.fromTo(stepsHeader,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stepsTitleWrap,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (waveBorder && stepsSection) {
            gsap.set(waveBorder, { transformOrigin: "center bottom" });
            gsap.to(waveBorder, {
                scaleY: 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: stepsSection,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: 0.5
                }
            });
        }
    }
}


/**
 * Custom Cursor Logic
 */
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

function initCursor() {
    // Custom cursor disabled per user request
    return;
    const ring = document.querySelector(".custom-cursor-ring");

    if (!dot || !ring) return;

    // Track mouse coordinates
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate position for center dot
        gsap.set(dot, { x: mouseX, y: mouseY });
    });

    // Smooth lerp for ring follower
    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(0.7, gsap.ticker.deltaRatio()); // framerate independent lerp
        ringX += (mouseX - ringX) * dt;
        ringY += (mouseY - ringY) * dt;
        gsap.set(ring, { x: ringX, y: ringY });
    });

    // Bind Hover States
    bindCursorHovers();
}

function bindCursorHovers() {
    const ring = document.querySelector(".custom-cursor-ring");
    if (!ring) return;

    // Remove old classes
    ring.classList.remove("cursor-hover", "cursor-magnetic-hover");

    // Standard hoverables
    const hoverables = document.querySelectorAll("a, button, select, input[type='submit'], [role='button'], .lightbox");
    hoverables.forEach(item => {
        item.addEventListener("mouseenter", () => {
            if (item.hasAttribute("data-magnetic")) {
                ring.classList.add("cursor-magnetic-hover");
            } else {
                ring.classList.add("cursor-hover");
            }
        });
        item.addEventListener("mouseleave", () => {
            ring.classList.remove("cursor-hover", "cursor-magnetic-hover");
        });
    });
}

/**
 * 100% Authentic Lama Lama (js-loader / ll-loader) Preloader Sequence
 */
function initPreloader() {
    const preloader = document.querySelector(".js-loader") || document.getElementById("preloader");
    if (!preloader) {
        triggerHeroReveal();
        return;
    }

    const counter = preloader.querySelector(".js-progress") || document.getElementById("preloadCounter");
    const loaderData = { progress: 0 };

    const tl = gsap.timeline({
        onComplete: () => {
            finishPreloader();
        }
    });

    tl.to(loaderData, {
        progress: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
            if (counter) counter.innerText = Math.round(loaderData.progress);
        }
    });

    function finishPreloader(isSkipped = false) {
        tl.kill();

        window.removeEventListener("keydown", handleSkipKeys);
        preloader.removeEventListener("click", handlePreloaderClick);

        // Smooth Opacity Fade Out (1-to-1 with lamalama.com exit)
        gsap.to(preloader, {
            opacity: 0,
            duration: isSkipped ? 0.35 : 0.65,
            ease: "power2.out",
            onComplete: () => {
                preloader.remove();
                document.body.classList.remove("preloader-active");
                triggerHeroReveal();
            }
        });
    }

    // Skip Handlers
    function handleSkipKeys(e) {
        if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
            e.preventDefault();
            finishPreloader(true);
        }
    }

    function handlePreloaderClick() {
        finishPreloader(true);
    }

    window.addEventListener("keydown", handleSkipKeys);
    preloader.addEventListener("click", handlePreloaderClick);
}



/**
 * 100% Authentic Lama Lama Hero Reveal Sequence
 */
function triggerHeroReveal() {
    const heroVideo = document.querySelector(".home-hero-video");
    const navbar = document.getElementById("main-navbar-wrapper");
    const lines = document.querySelectorAll(".hero-line-animate");
    const subtitle = document.getElementById("heroSubtitle");
    const cta = document.getElementById("heroCtaGroup");
    const scrollIndicator = document.getElementById("heroScrollIndicator");

    // 1. Hero Video 3D Camera Zoom Reveal & Mobile Low-Power-Mode Playback Wake
    if (heroVideo) {
        gsap.fromTo(heroVideo,
            { scale: 1.15, transformOrigin: "center center" },
            { scale: 1.0, duration: 1.4, ease: "power3.out" }
        );

        const vidSrc = heroVideo.querySelector('source[src]');
        if (vidSrc) {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const touchWake = () => {
                        heroVideo.play().catch(() => {});
                        window.removeEventListener("touchstart", touchWake);
                        window.removeEventListener("pointerdown", touchWake);
                    };
                    window.addEventListener("touchstart", touchWake, { passive: true });
                    window.addEventListener("pointerdown", touchWake, { passive: true });
                });
            }
        }
    }

    // 2. Navbar Spring Drop Entrance
    if (navbar) {
        gsap.fromTo(navbar,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: "power4.out", delay: 0.15, onComplete: () => gsap.set(navbar, { clearProps: "transform,y" }) }
        );
    }

    // 3. Masked 3D Line Text Reveal
    if (lines.length) {
        lines.forEach((line, index) => {
            if (line.dataset.maskDone) return;
            line.dataset.maskDone = "true";

            const text = line.innerText;
            line.innerHTML = `<span class="hero-mask-wrap"><span class="hero-mask-inner">${text}</span></span>`;

            const inner = line.querySelector(".hero-mask-inner");
            gsap.fromTo(inner,
                { yPercent: 110, rotateX: -35, opacity: 0 },
                { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.2 + (index * 0.14) }
            );
        });
    }

    // 4. Subtitle, CTA Group & Scroll Indicator Reveal
    if (subtitle) {
        gsap.fromTo(subtitle,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.45 }
        );
    }
    if (cta) {
        gsap.fromTo(cta,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.6 }
        );
    }
    if (scrollIndicator) {
        gsap.fromTo(scrollIndicator,
            { opacity: 0 },
            { opacity: 1, duration: 1.1, ease: "power2.out", delay: 0.75 }
        );
    }
}

/**
 * Magnetic Button effect for immersive UI depth
 */
function initMagneticElements() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const magneticItems = document.querySelectorAll("[data-magnetic]");

    magneticItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            // Calculate distance relative to center
            const xOffset = relX - rect.width / 2;
            const yOffset = relY - rect.height / 2;

            // Pull the parent element
            gsap.to(item, {
                x: xOffset * 0.35,
                y: yOffset * 0.35,
                duration: 0.3,
                ease: "power2.out"
            });

            // Pull inner content/text slightly less to create 3D depth
            const textContent = item.querySelector("span, i, div");
            if (textContent) {
                gsap.to(textContent, {
                    x: xOffset * 0.15,
                    y: yOffset * 0.15,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        item.addEventListener("mouseleave", () => {
            // Elastic release on leave
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });

            const textContent = item.querySelector("span, i, div");
            if (textContent) {
                gsap.to(textContent, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    });
}

/**
 * Helper to update the top page progress bar
 */
function setPageProgress(percent, opacity = 1) {
    const bar = document.getElementById("page-progress-bar");
    if (!bar) return;
    bar.style.opacity = opacity;
    bar.style.width = percent + "%";
}

let isPageTransitioning = false;

/**
 * Standard Multi-Page Navigation Engine (Full Page Reload)
 * Clean, native browser navigation with disk-cached assets and zero PJAX/SPA lockup risks.
 */
function initPageTransitions() {
    // Ensure blinds overlay is reset on init
    resetCinematicBlinds();
    setPageProgress(100, 0);
    setTimeout(() => setPageProgress(0, 0), 200);

    // Subtle instant visual response on internal link click
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const url = link.getAttribute("href");
        const target = link.getAttribute("target");

        // Skip external, blank targets, hashes, and download links
        if (!url ||
            url.startsWith("#") ||
            url.startsWith("javascript:") ||
            url.startsWith("mailto:") ||
            url.startsWith("tel:") ||
            target === "_blank" ||
            link.hasAttribute("download") ||
            url.includes("admission.vec.go.th") ||
            url.includes("cvc.ac.th/webcvc")) {
            return;
        }

        // Show immediate top progress bar for instant feedback while browser navigates
        setPageProgress(45, 1);
        // Native browser navigation will execute smoothly without e.preventDefault()
    });
}

/**
 * Backward-compatible helper for programmatic page navigation
 */
function performPageSwap(url) {
    if (!url) return;
    setPageProgress(60, 1);
    window.location.href = url;
}

/**
 * Extracts and executes all <script> tags within a dynamic container element
 */
function executeContainerScripts(container) {
    if (!container) return;
    const scripts = Array.from(container.querySelectorAll("script"));
    scripts.forEach(oldScript => {
        if (oldScript.src) {
            if (!document.querySelector(`script[src="${oldScript.src}"]`)) {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                document.head.appendChild(newScript);
            }
        } else {
            try {
                const runFn = new Function(oldScript.textContent);
                runFn.call(window);
            } catch (e) {
                try {
                    window.eval(oldScript.textContent);
                } catch (err) {
                    console.warn("Inline script exec non-fatal:", err);
                }
            }
        }
    });
}

/**
 * Re-runs scripts and event bindings for dynamic page content
 */
function reinitPageScripts() {
    // 1. Re-bind custom cursor hover hooks
    bindCursorHovers();

    // 2. Re-bind magnetic buttons hooks
    initMagneticElements();

    // 3. Re-initialize WOW.js
    if (typeof WOW !== "undefined") {
        new WOW().init();
    }

    // 4. Re-initialize Owl Carousels
    if (typeof jQuery !== "undefined" && jQuery.fn.owlCarousel) {
        // Main slider
        jQuery(".header-carousel").owlCarousel({
            animateOut: 'fadeOut',
            items: 1,
            margin: 0,
            stagePadding: 0,
            autoplay: true,
            smartSpeed: 500,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ]
        });

        // Testimonials slider
        jQuery(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            center: false,
            dots: false,
            loop: true,
            margin: 25,
            nav: true,
            navText: [
                '<i class="fa fa-arrow-right"></i>',
                '<i class="fa fa-arrow-left"></i>'
            ],
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 2 },
                1200: { items: 2 }
            }
        });
    }

    // 5. Re-initialize Lightbox
    if (typeof lightbox !== "undefined") {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }

    // 6. Kill and re-create ScrollTrigger scroll-linked animations
    if (typeof ScrollTrigger !== "undefined") {
        try {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        } catch (e) {
            console.warn("ScrollTrigger kill non-fatal:", e);
        }
    }

    // Force scroll top 0 again before constructing section ScrollTriggers
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.lenis) {
        window.lenis.scroll = 0;
        if (typeof window.lenis.scrollTo === "function") {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }

    // 7. Re-apply card tilt interactions in test.js
    if (typeof initTiltEffect === "function") {
        initTiltEffect();
    }

    // 8. Re-apply all scroll triggers & text splitting ONLY if on Homepage
    const isHomePage = !!(document.getElementById("majorsSection") || document.querySelector(".home-hero-video") || document.getElementById("careers-reveal-section"));
    if (isHomePage) {
        if (typeof initGlobalBackgroundParallax === "function") initGlobalBackgroundParallax();
        if (typeof initHeroParallax === "function") initHeroParallax();
        if (typeof initVideoHeroBlinds === "function") initVideoHeroBlinds();
        if (typeof initStorytellingTransition === "function") initStorytellingTransition();
        if (typeof init3DCardStacking === "function") init3DCardStacking();
        if (typeof initTextSplitting === "function") initTextSplitting();
        if (typeof initHeadingFadeAnimations === "function") initHeadingFadeAnimations();
        if (typeof initCareersWipe === "function") initCareersWipe();
        if (typeof initKoraComparisonScroll === "function") initKoraComparisonScroll();
        if (typeof initGalleryHorizontal === "function") initGalleryHorizontal();
        if (typeof init3DSpatialPortalTransitions === "function") init3DSpatialPortalTransitions();
        if (typeof initStepsPinScroll === "function") initStepsPinScroll();
        if (typeof initRibbonsMomentumHover === "function") initRibbonsMomentumHover();
    }

    // 9. Re-initialize subpage sections strictly in top-to-bottom DOM hierarchy order
    // Section 1: Hero Section
    if (typeof window.initMwgHeroSection === "function") {
        const heroSec = document.querySelector(".h-hero");
        if (heroSec) {
            delete heroSec.dataset.initialized;
            window.initMwgHeroSection(true);
        }
    }

    // Section 2: PVC Fees & Benefits Orbit Wheel
    if (typeof initPvcHTextsAndCards === "function") initPvcHTextsAndCards();

    // Section 3: PVC Curriculum 3D Card Stacking Sequence
    if (typeof window.initSec3Sequence === "function") {
        window.initSec3Sequence();
    }

    // Section 5: Admission Monster Text Horizontal Scroll & Hero CTA Card
    if (typeof initMwgHLatestAndPricing === "function") initMwgHLatestAndPricing();

    // Section 6: Faculty & Teachers Stage
    if (document.getElementById("faculty-fullscreen-stage") && typeof window.initFacultyPortfolioStage === "function") {
        window.initFacultyPortfolioStage(true);
    }

    // Section 7: Classroom & Architecture Journal Gallery
    if (document.getElementById("maj-architecture-journal") && typeof window.initClassroomGallery === "function") {
        window.initClassroomGallery(window.__CLASSROOM_ITEMS__, window.__CLASSROOM_TARGET_ROOM__);
    }

    // Section 8: Graduate & Alumni Archive
    if (document.getElementById("split-graduate-studio") && typeof window.initGraduateStudio === "function") {
        window.initGraduateStudio(window.__GRADUATES_DATA__);
    }

    // Section 9: Activities & Events Gallery
    if (document.getElementById("evt-activity-journal") && typeof window.initEventGallery === "function") {
        window.initEventGallery(window.__EVENT_ITEMS__);
    }

    // 10. Refresh Lenis Smooth Scroll & ScrollTrigger calculations after dynamic DOM updates
    if (window.lenis && typeof window.lenis.resize === "function") {
        window.lenis.resize();
    }

    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
        requestAnimationFrame(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh(true);
        });
        setTimeout(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh(true);
        }, 200);
    }

    const newImages = Array.from(document.querySelectorAll("#swup-container img"));
    if (newImages.length) {
        let loadedImgCount = 0;
        const checkAllImagesLoaded = () => {
            loadedImgCount++;
            if (loadedImgCount >= newImages.length || loadedImgCount >= 4) {
                if (window.lenis && typeof window.lenis.resize === "function") {
                    window.lenis.resize();
                }
                if (typeof ScrollTrigger !== "undefined") {
                    ScrollTrigger.refresh();
                }
            }
        };
        newImages.forEach(img => {
            if (img.complete) {
                checkAllImagesLoaded();
            } else {
                img.addEventListener("load", checkAllImagesLoaded, { once: true });
                img.addEventListener("error", checkAllImagesLoaded, { once: true });
            }
        });
    }
}

/**
 * Global Background Parallax using GSAP ScrollTrigger
 */
function initGlobalBackgroundParallax() {
    const gridBg = document.getElementById("globalGridBg");
    if (!gridBg) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(gridBg, {
            y: "15vh",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }
}

/**
 * Hero Section Elements Parallax - delegated to initVideoHeroBlinds to avoid duplicate timeline conflict
 */
function initHeroParallax() {
    // Coordinated directly inside initVideoHeroBlinds for synchronized pinning & blind reveals
}

/**
 * 3D Card Deck Stacking Animation using GSAP ScrollTrigger Master Timeline
 */
function init3DCardStacking() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const titleStage = document.getElementById("majorsTitleStage");
    const titleContent = document.getElementById("majorsTitleContent");
    const wrapper = document.getElementById("majorsCardsWrapper");
    const cards = gsap.utils ? gsap.utils.toArray("#majorsSection .majors-card") : Array.from(document.querySelectorAll("#majorsSection .majors-card") || []);

    // 1. Fullscreen Title Pinning & Scrubbed Timeline
    if (titleStage && titleContent) {
        const isMobile = window.innerWidth < 768;
        const endVal = isMobile ? "+=45%" : "+=120%";
        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: titleStage,
                start: "top top",
                end: endVal,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true
            }
        });

        titleTl
            .fromTo(titleContent,
                { opacity: 0, scale: 0.88, y: 0 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
            )
            .to(titleContent, { opacity: 1, scale: 1, y: 0, duration: 1 })
            .to(titleContent,
                { opacity: 0, scale: 1.25, y: 0, duration: 1, ease: "power2.in" }
            );
    }

    // 2. Master 3D Card Deck Stacking - Discrete Snapshot Trigger Engine (elastic.out physics)
    if (wrapper && cards && cards.length >= 2) {
        const isMobile = window.innerWidth < 768;
        const getTopOffset = () => {
            const vh = window.innerHeight;
            const cardH = cards[0] && cards[0].offsetHeight ? cards[0].offsetHeight : 450;
            const minOffset = isMobile ? 65 : 110;
                return Math.max(minOffset, Math.round((vh - cardH) / 2));
            };

            // Set explicit initial visual states for all stacked cards
            gsap.set(cards[0], { autoAlpha: 1, scale: 1, y: 0, pointerEvents: "auto", transformOrigin: "center center" });
            for (let i = 1; i < cards.length; i++) {
                gsap.set(cards[i], { autoAlpha: 0, scale: 0.94, y: 50, pointerEvents: "none", transformOrigin: "center center" });
            }

            const numCards = cards.length;
            const scrollDistance = isMobile ? `+=${numCards * 70}%` : `+=${numCards * 85}%`;
            let activeCardIdx = 0;

            const transitionToCard = (targetIdx, direction) => {
                if (targetIdx === activeCardIdx) return;
                const prevIdx = activeCardIdx;
                activeCardIdx = targetIdx;

                cards.forEach((card, idx) => {
                    if (idx === targetIdx) {
                        // Entrance Animation
                        if (direction > 0) {
                            // Forward entrance: Elastic spring-in from bottom
                            gsap.fromTo(card,
                                { y: 50, scale: 0.94, autoAlpha: 0 },
                                {
                                    y: 0,
                                    scale: 1,
                                    autoAlpha: 1,
                                    pointerEvents: "auto",
                                    duration: 0.75,
                                    ease: "elastic.out(1, 0.75)",
                                    overwrite: "auto"
                                }
                            );
                        } else {
                            // Reverse entrance: Smooth glide back into active focus
                            gsap.to(card, {
                                y: 0,
                                scale: 1,
                                autoAlpha: 1,
                                pointerEvents: "auto",
                                duration: 0.4,
                                ease: "power2.out",
                                overwrite: "auto"
                            });
                        }
                    } else if (idx === prevIdx) {
                        // Exit Animation
                        if (direction > 0) {
                            // Forward exit: Float up and fade out
                            gsap.to(card, {
                                y: -30,
                                scale: 0.92,
                                autoAlpha: 0,
                                pointerEvents: "none",
                                duration: 0.35,
                                ease: "power2.inOut",
                                overwrite: "auto"
                            });
                        } else {
                            // Reverse exit: Drop down and fade out
                            gsap.to(card, {
                                y: 40,
                                scale: 0.94,
                                autoAlpha: 0,
                                pointerEvents: "none",
                                duration: 0.3,
                                ease: "power2.inOut",
                                overwrite: "auto"
                            });
                        }
                    } else {
                        // Other inactive cards
                        gsap.set(card, {
                            autoAlpha: 0,
                            pointerEvents: "none",
                            y: idx > targetIdx ? 50 : -30,
                            scale: 0.94
                        });
                    }
                });
            };

            ScrollTrigger.create({
                trigger: wrapper,
                start: () => `top ${getTopOffset()}px`,
                end: scrollDistance,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: false,
                preventOverlaps: false,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Compute threshold-based active card index
                    const rawProgress = self.progress;
                    const computedIdx = Math.min(numCards - 1, Math.max(0, Math.floor(rawProgress * numCards)));

                    if (computedIdx !== activeCardIdx) {
                        transitionToCard(computedIdx, self.direction);
                    }
                }
            });
        }
}

/**
 * Character-by-Character Scroll-Driven Text Splitting Animation
 */
function initTextSplitting() {
    const splitTargets = document.querySelectorAll(".split-text");
    if (!splitTargets.length) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        splitTargets.forEach(el => {
            if (el.dataset.splitInitialized) return;
            el.dataset.splitInitialized = "true";

            const text = el.textContent.trim();

            // Safe segmentation for Thai combining vowels and tone marks
            let segments;
            if (typeof Intl !== "undefined" && Intl.Segmenter) {
                const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
                segments = [...segmenter.segment(text)].map(s => s.segment);
            } else {
                segments = [...text];
            }

            el.innerHTML = "";

            segments.forEach(char => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                el.appendChild(span);
            });

            const chars = el.querySelectorAll("span");
            gsap.from(chars, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    end: "top 62%",
                    scrub: 1,
                    invalidateOnRefresh: true
                },
                y: 50,
                opacity: 0,
                rotateX: -55,
                stagger: 0.02,
                ease: "power2.out"
            });
        });
    }
}

/**
 * Scrubbed Scroll-Driven Fade In & Fade Out Animation for Headings & Badges
 */
function initHeadingFadeAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Standard dual-phase (fade in & fade out) for non-sticky section headings
    const fadeTargets = document.querySelectorAll(".fade-heading");
    fadeTargets.forEach(el => {
        if (el.dataset.fadeAnimInitialized) return;
        el.dataset.fadeAnimInitialized = "true";

        // Set initial hidden & slightly dropped state
        gsap.set(el, { opacity: 0, y: 35, rotateX: -12, transformPerspective: 1000 });

        // Create scrubbed dual-phase timeline for enter (fade in) & exit (fade out)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top 92%",   // Begins fading in as element enters viewport bottom
                end: "bottom 8%",   // Finishes fading out as element leaves viewport top
                scrub: 0.6,         // Smooth scrub matching scroll speed
                invalidateOnRefresh: true,
                fastScrollEnd: true,
                preventOverlaps: true
            }
        });

        // Phase 1: Fade IN + slide up from below (0% -> 35% of timeline)
        tl.to(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.35,
            ease: "power2.out"
        })
            // Phase 2: Hold fully visible in center of screen (35% -> 65% of timeline)
            .to(el, {
                opacity: 1,
                y: 0,
                duration: 0.30
            })
            // Phase 3: Fade OUT + slide slightly upward as it exits top (65% -> 100% of timeline)
            .to(el, {
                opacity: 0,
                y: -30,
                duration: 0.35,
                ease: "power1.in"
            });
    });

    // Fade IN ONLY (No fade out) for headings in sticky sections (Gallery & Careers)
    const fadeInOnlyTargets = document.querySelectorAll(".fade-heading-in-only");
    fadeInOnlyTargets.forEach(el => {
        if (el.dataset.fadeAnimInitialized) return;
        el.dataset.fadeAnimInitialized = "true";

        gsap.set(el, { opacity: 0, y: 35, rotateX: -12, transformPerspective: 1000 });

        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 65%",
                scrub: 0.6,
                invalidateOnRefresh: true
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "power2.out"
        });
    });
}

/**
 * Animated Hero Louver Blinds scroll animation
 */
function initVideoHeroBlinds() {
    const hero = document.querySelector(".home-hero-container");
    const cover = document.querySelector(".home-hero-cover");
    if (!hero || !cover) return;

    let blindsCount = window.innerWidth <= 767 ? 25 : (window.innerWidth <= 1024 ? 35 : 52);
    const stripWidthPercent = 100 / blindsCount;

    cover.innerHTML = "";
    for (let i = 0; i < blindsCount; i++) {
        const strip = document.createElement("div");
        strip.classList.add("blind-strip-v");
        strip.style.left = `${i * stripWidthPercent}%`;
        strip.style.width = `calc(${stripWidthPercent}% + 1px)`;
        strip.style.top = "0";
        strip.style.height = "100%";
        strip.style.background = "#5f2d8c"; // Digital Violet
        strip.style.transformOrigin = "left center";
        strip.style.transform = "rotateY(-90deg)";
        strip.style.opacity = "0";
        strip.style.position = "absolute";
        strip.style.transformStyle = "preserve-3d";
        cover.appendChild(strip);
    }

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const isTouchDevice = window.innerWidth < 1024;
        const endDistance = isTouchDevice ? "+=100%" : "+=220%";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heroScrollTrack",
                pin: "#heroScrollTrack .sticky-viewport",
                start: "top top",
                end: endDistance,
                scrub: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true
            }
        });

        // Rotate blinds closed and fade in to cover, starting after 35% delay (or 20% on touch devices)
        const blindsStart = isTouchDevice ? 0.20 : 0.35;
        const blindsDuration = isTouchDevice ? 0.75 : 0.65;
        const contentFadeDuration = isTouchDevice ? 0.30 : 0.40;

        tl.fromTo(".blind-strip-v",
            {
                rotationY: -90,
                opacity: 0
            },
            {
                rotationY: 0,
                opacity: 1,
                stagger: isTouchDevice ? 0.003 : 0.005,
                ease: "power2.out",
                duration: blindsDuration
            },
            blindsStart
        )
            // Fade out hero content group in the first 30-40% of scroll
            .to("#heroContentGroup", {
                opacity: 0,
                scale: 0.85,
                y: -80,
                autoAlpha: 0,
                ease: "power1.in",
                duration: contentFadeDuration
            }, 0)
            // Fade out scroll indicator in the first 20% of scroll
            .to("#heroScrollIndicator", {
                opacity: 0,
                autoAlpha: 0,
                ease: "power1.in",
                duration: 0.2
            }, 0);
    }
}

/**
 * Storytelling Section curved top boundary & image clip-path reveal scroll animation
 */
function initStorytellingTransition() {
    const radiusSection = document.querySelector(".radius-section");
    if (!radiusSection) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Responsive target radius when flattened
        let targetRadius = "150px";
        if (window.innerWidth <= 767) {
            targetRadius = "50px";
        } else if (window.innerWidth <= 1024) {
            targetRadius = "100px";
        }

        // Animate curved top radius as it enters view
        gsap.to(radiusSection, {
            borderTopLeftRadius: targetRadius,
            borderTopRightRadius: targetRadius,
            scrollTrigger: {
                trigger: radiusSection,
                start: "top 95%",
                end: "+=600",
                scrub: true
            }
        });

        // Animate the image clip path reveal
        const revealWrapper = radiusSection.querySelector(".general-reveal-img");
        const img = revealWrapper ? revealWrapper.querySelector("img") : null;
        if (revealWrapper && img) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: radiusSection,
                    start: "top 65%",
                    toggleActions: "play none none none"
                }
            })
                .fromTo(revealWrapper,
                    { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" },
                    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power2.out" }
                )
                .fromTo(img,
                    { scale: 1.4 },
                    { scale: 1, duration: 1.2, ease: "power2.out" },
                    0
                );
        }

        // Animate the text entries
        const subtitle = radiusSection.querySelector(".story-subtitle");
        const paragraph = radiusSection.querySelector(".story-p");
        const button = radiusSection.querySelector(".story-button");

        if (subtitle || paragraph || button) {
            const tlText = gsap.timeline({
                scrollTrigger: {
                    trigger: radiusSection,
                    start: "top 70%"
                }
            });

            if (subtitle) {
                tlText.from(subtitle, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            if (paragraph) {
                tlText.from(paragraph, {
                    y: 25,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, subtitle ? "-=0.3" : "0");
            }
            if (button) {
                tlText.from(button, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, paragraph ? "-=0.3" : "0");
            }
        }
    }
}

/**
 * Seamless 3D Spatial Portal Transitions connecting major sections
 */
function init3DSpatialPortalTransitions() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const spatialSections = document.querySelectorAll(".portal-spatial-section");
    spatialSections.forEach(section => {
        gsap.fromTo(section,
            {
                scale: 0.95,
                opacity: 0.85,
                rotateX: -4,
                transformPerspective: 1200
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 0.8,
                    invalidateOnRefresh: true
                },
                scale: 1,
                opacity: 1,
                rotateX: 0,
                ease: "power2.out"
            }
        );
    });
}

/**
 * Pizza Amici Steps Pinned Orbit Carousel GSAP Animation
 */
function initStepsPinScroll() {
    if (window.innerWidth < 1024) return;
    const pinSection = document.querySelector(".steps-pin-height");
    const container = document.querySelector(".steps-container");
    if (!pinSection || !container) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const circle1 = document.querySelector(".steps-circle.is-01");
        const circle2 = document.querySelector(".steps-circle.is-02");
        const circle3 = document.querySelector(".steps-circle.is-03");
        const circle4 = document.querySelector(".steps-circle.is-04");
        const pizza = document.querySelector(".steps-pizza");

        // Clear pre-existing inline style transforms to prevent double stacking
        [circle1, circle2, circle3, circle4, pizza].forEach(el => {
            if (el) {
                gsap.set(el, { clearProps: 'all' });
                delete el._gsap;
                el.style.transform = '';
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinSection,
                pin: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.1,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // Phase 1: Slide in immediately from screen edge into column positions (0% to 20% of scroll)
        if (circle1) {
            tl.fromTo(circle1,
                { transform: "translate(10%, 0%) rotate(20deg)" },
                { transform: "translate(-7%, 0%) rotate(-4deg)", ease: "none", duration: 0.2 }, 0);
        }
        if (circle2) {
            tl.fromTo(circle2,
                { transform: "translate(15%, 0%) rotate(22deg)" },
                { transform: "translate(-2.3%, 0%) rotate(-1.5deg)", ease: "none", duration: 0.2 }, 0);
        }
        if (circle3) {
            tl.fromTo(circle3,
                { transform: "translate(20%, 0%) rotate(24deg)" },
                { transform: "translate(2.3%, 0%) rotate(1.5deg)", ease: "none", duration: 0.2 }, 0);
        }
        if (circle4) {
            tl.fromTo(circle4,
                { transform: "translate(25%, 0%) rotate(26deg)" },
                { transform: "translate(7%, 0%) rotate(4deg)", ease: "none", duration: 0.2 }, 0);
        }

        // Phase 2: Rotate cards along arc while staying fixed in columns (20% to 70% of scroll)
        if (circle1) {
            tl.to(circle1, { transform: "translate(-7%, 0%) rotate(-6deg)", ease: "none", duration: 0.5 }, 0.2);
        }
        if (circle2) {
            tl.to(circle2, { transform: "translate(-2.3%, 0%) rotate(-2deg)", ease: "none", duration: 0.5 }, 0.2);
        }
        if (circle3) {
            tl.to(circle3, { transform: "translate(2.3%, 0%) rotate(2deg)", ease: "none", duration: 0.5 }, 0.2);
        }
        if (circle4) {
            tl.to(circle4, { transform: "translate(7%, 0%) rotate(6deg)", ease: "none", duration: 0.5 }, 0.2);
        }

        // Phase 3: Simultaneous Sinking Exit Animation (70% to 100% of scroll)
        if (circle1) {
            tl.to(circle1, { transform: "translate(-7%, 85vh) rotate(-6deg)", ease: "power1.in", duration: 0.3 }, 0.7);
        }
        if (circle2) {
            tl.to(circle2, { transform: "translate(-2.3%, 85vh) rotate(-2deg)", ease: "power1.in", duration: 0.3 }, 0.7);
        }
        if (circle3) {
            tl.to(circle3, { transform: "translate(2.3%, 85vh) rotate(2deg)", ease: "power1.in", duration: 0.3 }, 0.7);
        }
        if (circle4) {
            tl.to(circle4, { transform: "translate(7%, 85vh) rotate(6deg)", ease: "power1.in", duration: 0.3 }, 0.7);
        }

        // Continuous Emblem Rotation (0% to 100%)
        if (pizza) {
            tl.fromTo(pizza,
                { rotate: 20 },
                { rotate: -20, ease: "none", duration: 1.0 }, 0);
        }
    }
}

/**
 * Section Ribbons Momentum Cursor Tilt Interaction
 */
function initRibbonsMomentumHover() {
    const ribbons = document.querySelectorAll(".ribbon-wrap");
    if (!ribbons.length) return;

    ribbons.forEach(wrap => {
        const target = wrap.querySelector(".ribbon");
        if (!target) return;

        wrap.addEventListener("mousemove", (e) => {
            const rect = wrap.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            const tiltX = relY * -4;
            const tiltY = relX * 10;

            if (typeof gsap !== "undefined") {
                gsap.to(target, {
                    rotate: tiltX,
                    x: tiltY,
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                target.style.transform = `rotate(${tiltX}deg) translateX(${tiltY}px)`;
            }
        });

        wrap.addEventListener("mouseleave", () => {
            if (typeof gsap !== "undefined") {
                gsap.to(target, {
                    rotate: 0,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            } else {
                target.style.transform = `rotate(0deg) translateX(0px)`;
            }
        });
    });
}



/**
 * GSAP ScrollTrigger for Kora Framer Comparison Section ("What changes when you work with us.")
 */
function initKoraComparisonScroll() {
    const section = document.getElementById("koraComparisonSection");
    if (!section) return;

    const stickyViewport = section.querySelector(".kora-sticky-viewport");
    const titleBox = document.getElementById("koraTitleBox");
    const titleLine1 = document.getElementById("koraTitleLine1");
    const titleLine2 = document.getElementById("koraTitleLine2");
    const cardsContainer = document.getElementById("koraCardsContainer");
    const cardBefore = document.getElementById("koraCardBefore");
    const cardMiddle = document.getElementById("koraCardMiddle");
    const cardAfter = document.getElementById("koraCardAfter");

    if (!stickyViewport || !titleBox || !titleLine1 || !titleLine2 || !cardsContainer || !cardBefore) return;

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const isDesktop = window.innerWidth >= 1024;
        const isTwoCards = !cardMiddle && !!cardAfter;
        const shiftX = isDesktop ? (isTwoCards ? 195 : 380) : 0;
        const shiftY = isDesktop ? 0 : 320;
        const splitTextShift = isDesktop ? 220 : 80;

        // Initial States
        gsap.set(titleBox, { opacity: 1 });
        gsap.set(titleLine1, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(titleLine2, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(cardsContainer, { opacity: 1, scale: 1, y: 0 });

        // Card 1 starts hidden in Center
        gsap.set(cardBefore, { opacity: 0, scale: 0.95, x: 0, y: 0 });

        // Card 2 starts hidden off to the Right
        if (cardMiddle) {
            gsap.set(cardMiddle, { opacity: 0, scale: 0.9, x: isDesktop ? 200 : 0, y: isDesktop ? 0 : shiftY });
        }

        // Card 3 starts hidden further to the Right (or Card 2 in 2-card mode)
        if (cardAfter) {
            gsap.set(cardAfter, { opacity: 0, scale: 0.88, x: isDesktop ? (isTwoCards ? 200 : shiftX + 200) : 0, y: isDesktop ? 0 : shiftY * 2 });
        }

        const scrubVal = isDesktop ? 0.7 : 0.6;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: stickyViewport,
                start: "top top",
                end: "bottom bottom",
                scrub: scrubVal,
                invalidateOnRefresh: true
            }
        });

        if (isDesktop) {
            // Desktop: 2-column or 3-column simultaneous reveal
            tl.to(titleLine1, { opacity: 1, x: 0, y: 0, duration: 0.10 }, 0)
                .to(titleLine2, { opacity: 1, x: 0, y: 0, duration: 0.10 }, 0)
                .to(titleLine1, {
                    x: -splitTextShift,
                    y: -180,
                    opacity: 0,
                    ease: "power2.inOut",
                    duration: 0.25
                }, 0.10)
                .to(titleLine2, {
                    x: splitTextShift,
                    y: -180,
                    opacity: 0,
                    ease: "power2.inOut",
                    duration: 0.25
                }, 0.10)
                .to(cardBefore, {
                    opacity: 1,
                    scale: 1.0,
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.25
                }, 0.10)
                .to(cardBefore, {
                    x: -shiftX,
                    y: 0,
                    opacity: 1,
                    ease: "power2.inOut",
                    duration: 0.40
                }, 0.35);

            if (cardMiddle) {
                tl.to(cardMiddle, {
                    opacity: 1,
                    scale: 1.0,
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.40
                }, 0.35);
            }

            if (cardAfter) {
                tl.to(cardAfter, {
                    opacity: 1,
                    scale: 1.0,
                    x: shiftX,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.40
                }, 0.35);
            }

            tl.to({}, { duration: 0.20 });
        } else {
            // Mobile: Sequential Card Deck Stacking (1 by 1 with generous reading hold)
            tl.to(titleLine1, { opacity: 1, duration: 0.15 }, 0)
                .to(titleLine2, { opacity: 1, duration: 0.15 }, 0)
                .to(titleLine1, { y: -40, opacity: 0, ease: "power2.inOut", duration: 0.30 }, 0.20)
                .to(titleLine2, { y: -40, opacity: 0, ease: "power2.inOut", duration: 0.30 }, 0.20)
                // Card 1: ปวช. Entrance & Reading Hold
                .to(cardBefore, { opacity: 1, scale: 1.0, x: 0, y: 0, ease: "power2.out", duration: 0.40 }, 0.30)
                .to({}, { duration: 0.80 });

            if (isTwoCards) {
                // In 2-card mode: Card 1 Exit -> Card 2 (ปวส.) Entrance & Reading Hold
                tl.to(cardBefore, { opacity: 0, scale: 0.92, y: -30, ease: "power2.inOut", duration: 0.50 })
                    .to(cardAfter, { opacity: 1, scale: 1.0, x: 0, y: 0, ease: "power2.out", duration: 0.50 }, "<0.10")
                    .to({}, { duration: 0.80 });
            } else {
                if (cardMiddle) {
                    // Card 1 Exit -> Card 2 (ปวส.) Entrance & Reading Hold
                    tl.to(cardBefore, { opacity: 0, scale: 0.92, y: -30, ease: "power2.inOut", duration: 0.50 })
                        .to(cardMiddle, { opacity: 1, scale: 1.0, x: 0, y: 0, ease: "power2.out", duration: 0.50 }, "<0.10")
                        .to({}, { duration: 0.80 });
                }

                if (cardAfter) {
                    // Card 2 Exit -> Card 3 (ป.ตรี) Entrance & Reading Hold
                    if (cardMiddle) {
                        tl.to(cardMiddle, { opacity: 0, scale: 0.92, y: -30, ease: "power2.inOut", duration: 0.50 });
                    }
                    tl.to(cardAfter, { opacity: 1, scale: 1.0, x: 0, y: 0, ease: "power2.out", duration: 0.50 }, "<0.10")
                        .to({}, { duration: 0.80 });
                }
            }
        }
    } else {
        // Fallback for non-GSAP environments
        if (cardBefore) cardBefore.style.opacity = "1";
        if (cardMiddle) cardMiddle.style.opacity = "1";
        if (cardAfter) cardAfter.style.opacity = "1";
    }
}

/**
 * MADEWITHGSAP EXACT: H-TEXTS & H-CARDS DYNAMIC RE-CENTERING FAN & IMPACT EXPLOSION
 */
function initPvcHTextsAndCards() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mainSection = document.querySelector('#pvc-fees-section');
    if (!mainSection) return;

    // Clean up any existing ScrollTriggers on this section
    ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === 'pvc-fees-pin' || st.vars.id === 'pvc-fees-master') {
            st.kill();
        }
    });

    const pinHeight = mainSection.querySelector('.pin-height');
    const container = mainSection.querySelector('.pvc-stage-container') || mainSection.querySelector('.container');
    const textsWrapper = mainSection.querySelector('.pvc-h-texts-wrapper');
    const cardsWrapper = mainSection.querySelector('.pvc-h-cards-wrapper');
    const titleContainers = mainSection.querySelectorAll('.title-l, .title-mob');
    const circlesContainer = mainSection.querySelector('.circles');
    const circles = Array.from(mainSection.querySelectorAll('.circle'));

    if (!pinHeight || !container || !textsWrapper || !cardsWrapper) return;

    // Helper: Split text into grapheme clusters for Thai support
    function splitWordsToChars(containerEl) {
        if (!containerEl) return [];
        const words = containerEl.querySelectorAll('.mwg-word');
        const targetElements = (words && words.length) ? Array.from(words) : [containerEl];
        const chars = [];

        targetElements.forEach(wordEl => {
            const rawText = wordEl.getAttribute('data-raw-text') || wordEl.textContent;
            wordEl.setAttribute('data-raw-text', rawText);
            wordEl.textContent = "";

            let graphemes = [];
            if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
                graphemes = Array.from(segmenter.segment(rawText), s => s.segment);
            } else {
                graphemes = rawText.split("");
            }

            graphemes.forEach(ch => {
                const span = document.createElement("span");
                span.className = "char";
                span.textContent = ch === " " ? "\u00A0" : ch;
                wordEl.appendChild(span);
                chars.push(span);
            });
        });
        return chars;
    }

    const isMobile = window.innerWidth < 900;
    const activeTitle = isMobile ? mainSection.querySelector('.title-mob') : mainSection.querySelector('.title-l');
    const allChars = splitWordsToChars(activeTitle);

    // Initial state: Wrapper starts hidden for scroll entrance, all characters at resting pos
    if (textsWrapper) gsap.set(textsWrapper, { opacity: 0 });
    gsap.set(allChars, { visibility: "visible", opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
    gsap.set(cardsWrapper, { y: window.innerHeight, autoAlpha: 1 });

    // Generate 360-degree scatter vectors for impact explosion
    const scatterVectors = allChars.map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 900 + Math.random() * 900;
        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: (Math.random() - 0.5) * 720,
            scale: 0.8 + Math.random() * 1.2
        };
    });

    let isExploded = false;

    // Trigger 1.3s cinematic shockwave scatter explosion
    function explodeText() {
        allChars.forEach((ch, i) => {
            const v = scatterVectors[i] || { x: (Math.random() - 0.5) * 1200, y: (Math.random() - 0.5) * 1200, rotation: 180, scale: 1.5 };
            gsap.to(ch, {
                x: v.x * (1.1 + Math.random() * 0.4),
                y: v.y * (1.1 + Math.random() * 0.4),
                rotation: v.rotation * 1.2,
                scale: v.scale * 1.3,
                opacity: 0,
                duration: 1.3,
                ease: "power3.out",
                stagger: {
                    amount: 0.15,
                    from: "center"
                },
                overwrite: "auto"
            });
        });
    }

    // Smooth Shockwave Vacuum Reassemble when scrolling back up
    function assembleText() {
        allChars.forEach((ch) => {
            gsap.to(ch, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto"
            });
        });
    }

    const numCards = circles ? circles.length : 0;
    if (!numCards) return;

    // Pre-computed Dynamic Re-centering Fan Coordinate Tables for 1, 2, 3, and 4 cards (Optimized for 340px card width)
    const fanStates = {
        1: [
            { x: 0, y: 0, rot: 0 }
        ],
        2: [
            { x: -96.3, y: 4.0, rot: -4.8 },
            { x: 96.3, y: 4.0, rot: 4.8 }
        ],
        3: [
            { x: -152.0, y: 10.0, rot: -7.5 },
            { x: 0, y: 0, rot: 0 },
            { x: 152.0, y: 10.0, rot: 7.5 }
        ],
        4: [
            { x: -210.0, y: 19.0, rot: -10.5 },
            { x: -70.0, y: 2.1, rot: -3.5 },
            { x: 70.0, y: 2.1, rot: 3.5 },
            { x: 210.0, y: 19.0, rot: 10.5 }
        ]
    };

    // Stage 1 Entrance Thresholds for Cards 0, 1, 2, 3 (Optimized for Extended H-TEXTS Hold Phase)
    const CARD_THRESHOLDS = [0.22, 0.38, 0.54, 0.68];
    const STAGE2_START = 0.80;
    const STAGE2_SPREAD_DURATION = 0.08; // 0.80 -> 0.88 is un-fanning, 0.88 -> 1.00 is generous 4-col reading hold (~72vh)

    let lastActiveCount = 0; // 0 = none, 1 = 1 card, 2 = 2 cards, 3 = 3 cards, 4 = 4 cards
    let wasInStage2 = false; // Flag to detect transition between Stage 2 and Stage 1

    // Initial state: Card 0 centered, all others hidden
    circles.forEach((c, idx) => {
        gsap.set(c, { rotation: 0 });
        const media = c.querySelector('.media');
        if (media) {
            if (idx === 0) {
                c.classList.add('on');
                gsap.set(media, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, xPercent: -50, yPercent: -50 });
            } else {
                c.classList.remove('on');
                gsap.set(media, { x: 0, y: 0, rotation: 0, scale: 0.65, opacity: 0, xPercent: -50, yPercent: -50 });
            }
        }
    });

    // Animate cards dynamically when state changes (e.g. 1 -> 2 -> 3 -> 4)
    function applyFanState(activeK, isForward) {
        if (activeK < 1) activeK = 1;
        if (activeK > 4) activeK = 4;
        const stateConfig = fanStates[activeK];

        circles.forEach((c, idx) => {
            const media = c.querySelector('.media');
            if (!media) return;

            if (idx < activeK) {
                c.classList.add('on');
                const target = stateConfig[idx];

                if (isForward && idx === activeK - 1 && activeK > 1) {
                    // New card drops in from top with elastic bounce (Only on forward scroll)
                    gsap.fromTo(
                        media,
                        { x: target.x, y: target.y - 140, rotation: target.rot, scale: 0.85, opacity: 0, xPercent: -50, yPercent: -50 },
                        {
                            x: target.x,
                            y: target.y,
                            rotation: target.rot,
                            scale: 1,
                            opacity: 1,
                            xPercent: -50,
                            yPercent: -50,
                            ease: 'elastic.out(1, 0.6)',
                            duration: 1.0,
                            overwrite: 'auto'
                        }
                    );
                } else {
                    // Existing cards smoothly adjust position & angle (or when scrolling backwards)
                    gsap.to(media, {
                        x: target.x,
                        y: target.y,
                        rotation: target.rot,
                        scale: 1,
                        opacity: 1,
                        xPercent: -50,
                        yPercent: -50,
                        duration: isForward ? 0.5 : 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            } else {
                // Card is exiting (scroll back up) -> Instant Sync Fade (0.15s)
                if (c.classList.contains('on')) {
                    gsap.to(media, {
                        y: 25,
                        scale: 0.7,
                        opacity: 0,
                        xPercent: -50,
                        yPercent: -50,
                        duration: 0.15,
                        ease: 'power2.out',
                        overwrite: 'auto',
                        onComplete: () => {
                            if (idx >= activeK) c.classList.remove('on');
                        }
                    });
                } else {
                    c.classList.remove('on');
                    gsap.set(media, { opacity: 0, xPercent: -50, yPercent: -50 });
                }
            }
        });
    }

    // ─── MASTER ScrollTrigger ─────────────────────────────────────────────
    ScrollTrigger.create({
        id: 'pvc-fees-master',
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: container,
        scrub: true,
        onUpdate: (self) => {
            const prog = self.progress; // 0 → 1
            const currentIsMobile = window.innerWidth < 900;

            // 0. Scroll-Linked Gradual Headline Fade In (0% → 4%) / Holds clean in center throughout 4% → 14%
            const textFadeProg = Math.min(1, Math.max(0, prog / 0.04));
            if (textsWrapper) {
                gsap.set(textsWrapper, { opacity: textFadeProg });
            }

            // 1. Card 1 Ascends from bottom to center (14% → 22%)
            const ascendProg = Math.min(1, Math.max(0, (prog - 0.14) / 0.08));
            gsap.set(cardsWrapper, { y: (1 - ascendProg) * window.innerHeight });

            // 2. Card Collision Impact Shockwave Text Explosion (Triggers at 22% after generous H-TEXTS reading hold)
            if (prog >= 0.22 && !isExploded) {
                isExploded = true;
                explodeText();
            } else if (prog < 0.18 && isExploded) {
                isExploded = false;
                assembleText();
            }

            if (currentIsMobile) {
                // ── MOBILE ADAPTIVE MODE (Single Focus Card Transitions) ──
                if (prog >= 0.22) {
                    const mobileProg = Math.min(1, Math.max(0, (prog - 0.22) / 0.75)); // 0 → 1
                    const slotSize = 1.0 / numCards;
                    const activeIdx = Math.min(numCards - 1, Math.floor(mobileProg / slotSize));
                    const localProg = Math.min(1, (mobileProg - activeIdx * slotSize) / slotSize);

                    circles.forEach((c, idx) => {
                        const media = c.querySelector('.media');
                        if (!media) return;

                        if (idx === activeIdx) {
                            c.classList.add('on');
                            // Smooth fast entrance (15%), generous steady reading hold (70%), smooth exit (15%)
                            const entrance = Math.min(1, localProg / 0.15);
                            const exit = localProg > 0.85 ? (localProg - 0.85) / 0.15 : 0;
                            const cardScale = idx === numCards - 1 ? 1 : 1 - exit * 0.08;
                            const cardOpacity = idx === numCards - 1 ? 1 : 1 - exit;

                            gsap.set(c, { rotation: 0 });
                            gsap.set(media, {
                                x: 0,
                                y: (1 - entrance) * 24 - exit * 24,
                                xPercent: -50,
                                yPercent: -50,
                                scale: 0.94 + 0.06 * entrance * cardScale,
                                opacity: entrance * cardOpacity,
                                rotation: 0
                            });
                        } else {
                            c.classList.remove('on');
                            gsap.set(media, { opacity: 0, xPercent: -50, yPercent: -50 });
                        }
                    });
                    gsap.set(circlesContainer, { rotation: 0 });
                }
            } else {
                // ── DESKTOP MODE (Dynamic Re-centering Fan + 4-Col Spread-Out) ──
                const cardWidth = 340;
                const gap = 26;
                const spreadSpacing = Math.min(cardWidth + gap, (window.innerWidth - 60) / 4);
                const spreadOffsets = [
                    -1.5 * spreadSpacing,
                    -0.5 * spreadSpacing,
                    0.5 * spreadSpacing,
                    1.5 * spreadSpacing
                ];
                const isScrollingForward = self.direction > 0;

                // Handle transition from Stage 2 back to Stage 1 when scrolling up past 80%
                if (prog < STAGE2_START && wasInStage2) {
                    wasInStage2 = false;
                    lastActiveCount = 0; // Force immediate recalculation of fan state
                }

                // Stage 1: Dynamic Re-centering Fan (22% → 80%)
                if (prog < STAGE2_START && numCards > 0) {
                    let currentK = 1;
                    if (prog >= CARD_THRESHOLDS[3]) currentK = 4;
                    else if (prog >= CARD_THRESHOLDS[2]) currentK = 3;
                    else if (prog >= CARD_THRESHOLDS[1]) currentK = 2;
                    else currentK = 1;

                    if (currentK !== lastActiveCount) {
                        applyFanState(currentK, isScrollingForward && currentK > lastActiveCount);
                        lastActiveCount = currentK;
                    }
                    gsap.set(circlesContainer, { rotation: 0 });
                }

                // Stage 2: Spread-out 4-col row (80% → 100%, un-fans from 80% → 88%, holds from 88% → 100%)
                if (prog >= STAGE2_START && numCards > 0) {
                    wasInStage2 = true;
                    const s2 = Math.min(1, Math.max(0, (prog - STAGE2_START) / STAGE2_SPREAD_DURATION));

                    circles.forEach(c => c.classList.add('on'));
                    gsap.set(circlesContainer, { rotation: 0 });

                    const finalFan = fanStates[4];
                    circles.forEach((c, i) => {
                        const media = c.querySelector('.media');
                        if (media) {
                            const pos = finalFan[i];
                            const curX = (1 - s2) * pos.x + s2 * spreadOffsets[i];
                            const curY = (1 - s2) * pos.y + s2 * 0;
                            const curRot = (1 - s2) * pos.rot + s2 * 0;

                            gsap.set(media, {
                                x: curX,
                                y: curY,
                                rotation: curRot,
                                xPercent: -50,
                                yPercent: -50,
                                opacity: 1,
                                scale: 1
                            });
                        }
                    });
                }
            }
        }
    });
}



function initMwgHLatestAndPricing() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const latestSection = document.querySelector('#pvc-admission-latest');
    if (!latestSection) return;

    // 1. Grapheme Text Reveal for Title 1
    const graphemeTitle = latestSection.querySelector('.mwg-grapheme-title');
    if (graphemeTitle) {
        const textNodes = [];
        graphemeTitle.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                const text = node.textContent;
                const wrapper = document.createElement('span');
                let graphemes = [];
                if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                    const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
                    graphemes = Array.from(segmenter.segment(text), s => s.segment);
                } else {
                    graphemes = text.split("");
                }
                graphemes.forEach(ch => {
                    const span = document.createElement("span");
                    span.className = "mwg-grapheme-char";
                    span.style.display = "inline-block";
                    span.style.opacity = "0";
                    span.textContent = ch === " " ? "\u00A0" : ch;
                    wrapper.appendChild(span);
                    textNodes.push(span);
                });
                node.replaceWith(wrapper);
            } else if (node.nodeType === 1) {
                const text = node.textContent;
                node.textContent = "";
                let graphemes = [];
                if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                    const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
                    graphemes = Array.from(segmenter.segment(text), s => s.segment);
                } else {
                    graphemes = text.split("");
                }
                graphemes.forEach(ch => {
                    const span = document.createElement("span");
                    span.className = "mwg-grapheme-char";
                    span.style.display = "inline-block";
                    span.style.opacity = "0";
                    span.textContent = ch === " " ? "\u00A0" : ch;
                    node.appendChild(span);
                    textNodes.push(span);
                });
            }
        });

        if (textNodes.length) {
            gsap.to(textNodes, {
                opacity: 1,
                stagger: { each: 0.02, from: "random" },
                ease: "power1.out",
                scrollTrigger: {
                    trigger: graphemeTitle,
                    start: "top 80%",
                    end: "bottom 30%",
                    scrub: true
                }
            });
        }
    }

    // 2. Monster Horizontal Scroll Text Translation (.l-sentence - 100% Full Scroll)
    const monsterText = latestSection.querySelector('.mwg-monster-text');
    const pinHeight = latestSection.querySelector('.mwg_landing4 .pin-height');
    const container = latestSection.querySelector('.mwg_landing4 .container');

    if (monsterText && pinHeight && container) {
        // Set explicit initial state upfront to eliminate any 1-frame text warp
        gsap.set(monsterText, { opacity: 1, x: () => window.innerWidth });

        let monsterTl = gsap.timeline({
            scrollTrigger: {
                trigger: pinHeight,
                start: "top top",
                end: "bottom bottom",
                pin: container,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // Continuous full horizontal scroll starting strictly from the right edge to left
        monsterTl.fromTo(monsterText,
            {
                x: () => window.innerWidth,
                opacity: 1
            },
            {
                x: () => -(monsterText.scrollWidth + window.innerWidth * 0.2),
                opacity: 1,
                duration: 1.0,
                ease: "none"
            },
            0
        );
    }

    // 3. SVG Curve Bezier Morph Animation & Card Elevation on Scroll
    const curvePath = document.querySelector('#pricing-curve-path');
    const pricingCardSec = document.querySelector('#pvc-admission-card');
    const innerCard = document.querySelector('#pvc-pricing-inner-card');
    const topPricing = document.querySelector('.h-top-pricing');

    if (curvePath && pricingCardSec && topPricing) {
        const isMobile = window.innerWidth < 1024;
        const curveTl = gsap.timeline({
            scrollTrigger: {
                trigger: topPricing,
                start: isMobile ? "top 90%" : "top 80%",
                endTrigger: pricingCardSec,
                end: isMobile ? "top 50%" : "top 30%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // Dynamic Bezier Morphing: Extended 160% full bleed width to eliminate straight seams!
        curveTl.fromTo(curvePath,
            { attr: { d: isMobile ? "M0 280 C480 220, 1160 220, 1640 280 L1640 280 L0 280 Z" : "M0 280 C480 220, 1160 220, 1640 280 L1640 280 L0 280 Z" } },
            { attr: { d: isMobile ? "M0 280 C480 0, 1160 0, 1640 280 L1640 280 L0 280 Z" : "M0 280 C480 15, 1160 15, 1640 280 L1640 280 L0 280 Z" }, ease: "power1.out" },
            0
        );

        // Smooth Card Elevation & Fade-In
        if (innerCard) {
            curveTl.fromTo(innerCard,
                { y: isMobile ? 35 : 80, opacity: isMobile ? 0.7 : 0.4, scale: 0.96 },
                { y: isMobile ? -15 : -110, opacity: 1, scale: 1, ease: "power1.out" },
                0
            );
        }
    }
}

function initPvcMwgHeroSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const heroSec = document.querySelector('#pvc-mwg-hero-section');
    if (!heroSec) return;

    const titleLeft = heroSec.querySelector('.hero-title-left');
    const titleRight = heroSec.querySelector('.hero-title-right');
    const subBar = heroSec.querySelector('.h-hero-sub-bar');

    if (titleLeft && titleRight) {
        gsap.to([titleLeft, titleRight, subBar], {
            opacity: 0,
            y: -50,
            ease: "power1.out",
            scrollTrigger: {
                trigger: heroSec,
                start: "top top",
                end: "bottom 40%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }
}

/**
 * Mobile Steps Slider Controller & Scroll Pinning
 */
function initMobileStepsSlider() {
    const track = document.querySelector('.mobile-steps-track');
    const counter = document.getElementById('mobileStepCounter');
    const prevBtn = document.getElementById('prevMobileStepBtn');
    const nextBtn = document.getElementById('nextMobileStepBtn');
    const stepsSection = document.querySelector('.section_steps');

    if (!track || !counter) return;

    const cards = track.querySelectorAll('.mobile-step-card');
    const total = cards.length;
    if (!total) return;

    let currentIndex = 0;

    const updateCounter = () => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIndex = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const diff = Math.abs(trackCenter - cardCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
            }
        });

        currentIndex = closestIndex;
        const numStr = String(currentIndex + 1).padStart(2, '0');
        const totalStr = String(total).padStart(2, '0');
        counter.textContent = `[ ${numStr} / ${totalStr} ]`;
    };

    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateCounter, 50);
        updateCounter();
    }, { passive: true });

    const scrollToCard = (index) => {
        const targetCard = cards[index];
        if (targetCard && track) {
            const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
            const trackCenter = track.clientWidth / 2;
            const targetScrollLeft = cardCenter - trackCenter;
            track.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
            currentIndex = index;
            const numStr = String(currentIndex + 1).padStart(2, '0');
            const totalStr = String(total).padStart(2, '0');
            counter.textContent = `[ ${numStr} / ${totalStr} ]`;
        }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            } else {
                scrollToCard(total - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex < total - 1) {
                scrollToCard(currentIndex + 1);
            } else {
                scrollToCard(0);
            }
        });
    }

    updateCounter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPvcMwgHeroSection();
        initPvcHTextsAndCards();
        initMwgHLatestAndPricing();
        initMobileStepsSlider();
    });
} else {
    initPvcMwgHeroSection();
    initPvcHTextsAndCards();
    initMwgHLatestAndPricing();
    initMobileStepsSlider();
}

// Dynamic ScrollTrigger Recalculation for Slow Network Image Loading
(function() {
    let refreshTimeout = null;
    const scheduleRefresh = () => {
        if (typeof ScrollTrigger === 'undefined') return;
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
            try {
                ScrollTrigger.refresh();
            } catch (e) {}
        }, 180);
    };

    window.addEventListener('load', scheduleRefresh, { passive: true });
    document.addEventListener('load', (e) => {
        if (e.target && e.target.tagName === 'IMG') {
            scheduleRefresh();
        }
    }, true);
})();