/**
 * Split-Screen Cinema Studio Engine - Graduate Hall of Fame
 * Module: include/js/modules/graduate.js
 */
(function() {
    function initGraduateStudio(data) {
        const graduates = Array.isArray(data) ? data : (window.__GRADUATES_DATA__ || []);
        if (!graduates.length) return;

        let currentFiltered = [];
        let activeCardIdx = 0;
        let currentLightboxIdx = 0;

        let selectedCategory = window.__GRADUATES_INITIAL_CATEGORY__ || "all";
        let selectedYear = window.__GRADUATES_INITIAL_YEAR__ || "all";
        let selectedLevel = "all";

        // DOM Elements
        const mainImg = document.getElementById("split-main-img");
        const cinemaStage = document.getElementById("split-cinema-stage");
        const badgeText = document.getElementById("split-badge-text");
        const thumbDrawer = document.getElementById("split-thumb-drawer");
        const counterText = document.getElementById("split-counter-text");
        const badgeLevel = document.getElementById("split-sheet-badge-level");
        const btnPrev = document.getElementById("split-nav-prev");
        const btnNext = document.getElementById("split-nav-next");

        // Modal Elements
        const modal = document.getElementById("split-lightbox-modal");
        const lbImg = document.getElementById("split-lb-main-img");
        const lbBadge = document.getElementById("split-lb-badge");
        const lbTitle = document.getElementById("split-lb-title");
        const lbDesc = document.getElementById("split-lb-desc");
        const lbCounter = document.getElementById("split-lb-counter");
        const btnCloseLb = document.getElementById("split-btn-close-lb");
        const btnPrevLb = document.getElementById("split-btn-prev-lb");
        const btnNextLb = document.getElementById("split-btn-next-lb");

        // ── Filter & Build Matching List with Smooth Fade Choreography ─────────
        function filterGraduates(isUserSwitch = false) {
            if (isUserSwitch && typeof gsap !== 'undefined' && mainImg) {
                gsap.to(mainImg, {
                    opacity: 0.15,
                    scale: 0.985,
                    duration: 0.15,
                    ease: "power2.in",
                    onComplete: () => {
                        executeFilterRebuild(true);
                    }
                });
            } else {
                executeFilterRebuild(false);
            }
        }

        function executeFilterRebuild(animateEntrance = false) {
            currentFiltered = [];
            graduates.forEach((item, idx) => {
                const isCatMatch = (selectedCategory === "all" || item.category === selectedCategory);
                const isYearMatch = (selectedYear === "all" || item.year === "all" || item.year === selectedYear);
                const isLevelMatch = (selectedLevel === "all" || item.level === "all" || item.level === selectedLevel);

                if (isCatMatch && isYearMatch && isLevelMatch) {
                    currentFiltered.push({ item, globalIdx: idx });
                }
            });

            activeCardIdx = 0;
            buildThumbnails(animateEntrance);
            updateCinemaView(animateEntrance);
        }

        // ── Build Thumbnail Drawer ─────────────────────────────────────────────
        function buildThumbnails(animateEntrance = false) {
            if (!thumbDrawer) return;
            thumbDrawer.innerHTML = "";

            if (currentFiltered.length === 0) {
                thumbDrawer.innerHTML = `<div style="padding: 10px; color: #94a3b8; font-size: 13px;">ไม่พบข้อมูลในหมวดนี้</div>`;
                return;
            }

            currentFiltered.forEach((entry, i) => {
                const { item } = entry;
                const thumb = document.createElement("div");
                thumb.className = `split-thumb-item ${i === 0 ? 'active' : ''}`;
                thumb.setAttribute("onclick", `window.switchCinemaCard(${i})`);

                const sheetLabel = item.sheet ? item.sheet : `#${i + 1}`;
                thumb.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" class="split-thumb-img" loading="lazy">
                    <span class="split-thumb-label">${sheetLabel}</span>
                `;
                thumbDrawer.appendChild(thumb);
            });

            // Reset scroll position of drawer
            thumbDrawer.scrollLeft = 0;

            if (animateEntrance && typeof gsap !== 'undefined') {
                gsap.fromTo(".split-thumb-item", 
                    { opacity: 0, y: 10, scale: 0.92 }, 
                    { opacity: 1, y: 0, scale: 1, duration: 0.28, stagger: 0.02, ease: "power2.out" }
                );
            }
        }

        // ── Update Main Cinema Stage View with Smooth Crossfade ────────────────
        function updateCinemaView(animate = true) {
            if (!mainImg || currentFiltered.length === 0) return;

            const currentEntry = currentFiltered[activeCardIdx];
            if (!currentEntry) return;

            const { item } = currentEntry;

            if (badgeText) {
                const yearPart = item.year && item.year !== 'all' ? `ปี ${item.year} • ` : '';
                badgeText.textContent = `${yearPart}${item.levelLabel || item.title}`;
            }

            if (counterText) {
                counterText.textContent = `รายการที่ ${activeCardIdx + 1} / ${currentFiltered.length}`;
            }

            if (badgeLevel) {
                badgeLevel.textContent = item.levelLabel || (item.year && item.year !== 'all' ? `รุ่นปี ${item.year}` : 'DBT CVC');
            }

            // Update Thumbnails Active Class & Auto Scroll
            if (thumbDrawer) {
                const thumbs = thumbDrawer.querySelectorAll(".split-thumb-item");
                thumbs.forEach((t, idx) => {
                    t.classList.toggle("active", idx === activeCardIdx);
                    if (idx === activeCardIdx) {
                        const thumbLeft = t.offsetLeft;
                        const drawerCenter = thumbDrawer.offsetWidth / 2;
                        const targetScroll = thumbLeft - drawerCenter + (t.offsetWidth / 2);
                        thumbDrawer.scrollTo({ left: targetScroll, behavior: "smooth" });
                    }
                });
            }

            mainImg.src = item.src;
            mainImg.alt = item.title;

            if (animate && typeof gsap !== 'undefined') {
                gsap.fromTo(mainImg, 
                    { opacity: 0.15, scale: 0.985 }, 
                    { opacity: 1, scale: 1, duration: 0.32, ease: "power2.out" }
                );
                if (badgeText && counterText) {
                    gsap.fromTo([badgeText, counterText], 
                        { opacity: 0.4 }, 
                        { opacity: 1, duration: 0.24, ease: "power2.out" }
                    );
                }
            } else {
                mainImg.style.opacity = 1;
            }
        }

        window.switchCinemaCard = function(index) {
            if (index < 0 || index >= currentFiltered.length || index === activeCardIdx) return;
            activeCardIdx = index;
            updateCinemaView(true);
        };

        // Nav Arrows
        if (btnPrev) {
            btnPrev.addEventListener("click", (e) => {
                e.stopPropagation();
                if (activeCardIdx > 0) {
                    window.switchCinemaCard(activeCardIdx - 1);
                } else {
                    window.switchCinemaCard(currentFiltered.length - 1);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", (e) => {
                e.stopPropagation();
                if (activeCardIdx < currentFiltered.length - 1) {
                    window.switchCinemaCard(activeCardIdx + 1);
                } else {
                    window.switchCinemaCard(0);
                }
            });
        }

        // Click on Cinema Stage to open Lightbox
        if (cinemaStage) {
            cinemaStage.addEventListener("click", () => {
                if (currentFiltered[activeCardIdx]) {
                    window.openSplitLightbox(currentFiltered[activeCardIdx].globalIdx);
                }
            });
        }

        // ── Lightbox Engine ───────────────────────────────────────────────────
        window.openSplitLightbox = function(globalIdx) {
            if (!modal || !lbImg || !graduates[globalIdx]) return;
            currentLightboxIdx = globalIdx;
            updateLightboxContent();

            modal.classList.add("active");
            document.body.style.overflow = "hidden";

            if (typeof gsap !== 'undefined') {
                gsap.fromTo("#split-lb-img-wrap", 
                    { opacity: 0, scale: 0.95, y: 15 }, 
                    { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" }
                );
            }
        };

        window.closeSplitLightbox = function() {
            if (!modal) return;
            if (typeof gsap !== 'undefined') {
                gsap.to("#split-lb-img-wrap", {
                    opacity: 0,
                    scale: 0.96,
                    y: 10,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        modal.classList.remove("active");
                        document.body.style.overflow = "";
                    }
                });
            } else {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        };

        function updateLightboxContent() {
            const item = graduates[currentLightboxIdx];
            if (!item) return;

            lbImg.src = item.src;
            lbImg.alt = item.title;
            const yearPart = item.year && item.year !== 'all' ? `ปีการศึกษา ${item.year} • ` : '';
            if (lbBadge) lbBadge.textContent = `${yearPart}${item.levelLabel || item.title}`;
            if (lbTitle) lbTitle.textContent = item.title;
            if (lbDesc) lbDesc.textContent = item.desc;

            const currentPosInFiltered = currentFiltered.findIndex(entry => entry.globalIdx === currentLightboxIdx);
            const displayIndex = currentPosInFiltered !== -1 ? currentPosInFiltered + 1 : currentLightboxIdx + 1;
            const displayTotal = currentFiltered.length > 0 ? currentFiltered.length : graduates.length;
            if (lbCounter) lbCounter.textContent = `${displayIndex} / ${displayTotal}`;
        }

        function navigateLightbox(direction) {
            if (!currentFiltered.length) return;
            const currentPos = currentFiltered.findIndex(entry => entry.globalIdx === currentLightboxIdx);
            let nextPos;

            if (direction === "next") {
                nextPos = (currentPos + 1) % currentFiltered.length;
            } else {
                nextPos = (currentPos - 1 + currentFiltered.length) % currentFiltered.length;
            }

            currentLightboxIdx = currentFiltered[nextPos].globalIdx;
            activeCardIdx = nextPos;
            updateCinemaView(false);

            if (typeof gsap !== 'undefined') {
                gsap.fromTo("#split-lb-img-wrap", 
                    { opacity: 0.4, scale: 0.98 }, 
                    { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
                );
            }
            updateLightboxContent();
        }

        if (btnCloseLb) btnCloseLb.addEventListener("click", window.closeSplitLightbox);
        if (btnPrevLb) btnPrevLb.addEventListener("click", (e) => { e.stopPropagation(); navigateLightbox("prev"); });
        if (btnNextLb) btnNextLb.addEventListener("click", (e) => { e.stopPropagation(); navigateLightbox("next"); });

        window.addEventListener("keydown", (e) => {
            if (!modal || !modal.classList.contains("active")) return;
            if (e.key === "Escape") window.closeSplitLightbox();
            else if (e.key === "ArrowLeft") navigateLightbox("prev");
            else if (e.key === "ArrowRight") navigateLightbox("next");
        });

        // ── Filter Buttons Setup ──────────────────────────────────────────────
        const categoryButtons = document.querySelectorAll(".split-btn-category");
        const yearButtons = document.querySelectorAll(".split-btn-year");
        const levelButtons = document.querySelectorAll(".split-btn-level");

        if (categoryButtons.length) {
            categoryButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    categoryButtons.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    selectedCategory = btn.getAttribute("data-category");
                    filterGraduates(true);
                });
            });

            // Set initial category active state
            if (selectedCategory) {
                const targetCatBtn = document.querySelector(`.split-btn-category[data-category="${selectedCategory}"]`);
                if (targetCatBtn) {
                    categoryButtons.forEach(b => b.classList.remove("active"));
                    targetCatBtn.classList.add("active");
                }
            }
        }

        yearButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                yearButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedYear = btn.getAttribute("data-year");
                filterGraduates(true);
            });
        });

        levelButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                levelButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedLevel = btn.getAttribute("data-level");
                filterGraduates(true);
            });
        });

        // Initialize Filter & Cinema Stage on load
        filterGraduates(false);

        // Cinematic Staggered Fade-in Entrance Choreography
        function playGraduateEntranceAnimation() {
            if (typeof gsap === 'undefined') return;

            const title = document.querySelector(".split-title");
            const desc = document.querySelector(".split-desc");
            const filtersBox = document.querySelector(".split-filters-box");
            const actionBar = document.querySelector(".split-action-bar");
            const cinemaStage = document.getElementById("split-cinema-stage");
            const thumbDrawer = document.getElementById("split-thumb-drawer");
            const thumbItems = document.querySelectorAll(".split-thumb-item");
            const glow = document.querySelector(".split-ambient-glow");

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // Set initial hidden coordinates
            if (title) gsap.set(title, { opacity: 0, y: -25 });
            if (desc) gsap.set(desc, { opacity: 0, y: 15 });
            if (filtersBox) gsap.set(filtersBox, { opacity: 0, y: 25 });
            if (actionBar) gsap.set(actionBar, { opacity: 0, y: 20 });
            if (cinemaStage) gsap.set(cinemaStage, { opacity: 0, scale: 0.93, y: 35 });
            if (thumbDrawer) gsap.set(thumbDrawer, { opacity: 0, y: 25 });
            if (thumbItems.length) gsap.set(thumbItems, { opacity: 0, scale: 0.9, y: 15 });
            if (glow) gsap.set(glow, { opacity: 0, scale: 0.85 });

            if (title) {
                tl.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.75
                });
            }

            if (desc) {
                tl.to(desc, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65
                }, "-=0.55");
            }

            if (filtersBox) {
                tl.to(filtersBox, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7
                }, "-=0.5");
            }

            if (actionBar) {
                tl.to(actionBar, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, "-=0.45");
            }

            if (cinemaStage) {
                tl.to(cinemaStage, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8
                }, "-=0.75");
            }

            if (thumbDrawer) {
                tl.to(thumbDrawer, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65
                }, "-=0.5");
            }

            if (thumbItems.length) {
                tl.to(thumbItems, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.025
                }, "-=0.45");
            }

            if (glow) {
                tl.to(glow, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2
                }, 0);
            }
        }

        playGraduateEntranceAnimation();

        // BFCache (Back/Forward Navigation) Instant Safety Recovery
        window.addEventListener("pageshow", (e) => {
            if (e.persisted) {
                if (typeof gsap !== 'undefined') {
                    gsap.set([".split-title", ".split-desc", ".split-filters-box", ".split-action-bar", "#split-cinema-stage", "#split-thumb-drawer", ".split-thumb-item", ".split-ambient-glow"], {
                        opacity: 1, x: 0, y: 0, scale: 1
                    });
                }
            }
        });
    }

    window.initGraduateStudio = initGraduateStudio;

    if (window.__GRADUATES_DATA__) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => initGraduateStudio(window.__GRADUATES_DATA__));
        } else {
            initGraduateStudio(window.__GRADUATES_DATA__);
        }
    }
})();
