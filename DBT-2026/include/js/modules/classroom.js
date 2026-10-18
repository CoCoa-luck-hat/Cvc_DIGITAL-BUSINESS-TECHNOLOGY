/**
 * Architecture Journal Gallery & Filtering Engine
 * Module: include/js/modules/classroom.js
 */
(function() {
    function initClassroomGallery(data, targetRoom = '', initialLimit = 12) {
        const galleryItems = Array.isArray(data) ? data : (window.__CLASSROOM_ITEMS__ || []);
        if (!galleryItems.length) return;

        let currentFilteredIndices = galleryItems.map((_, idx) => idx);
        let currentActiveIndex = 0;
        let currentVisibleLimit = initialLimit;
        const loadStep = 6;

        // 1. Lightbox Navigation
        const lightboxModal = document.getElementById("maj-cinematic-lightbox");
        const lbRoomText = document.getElementById("maj-lb-room-text");
        const lbCounter = document.getElementById("maj-lb-counter");
        const lbImg = document.getElementById("maj-lb-img");
        const btnCloseLb = document.getElementById("maj-btn-close-lb");
        const btnPrevLb = document.getElementById("maj-lb-prev");
        const btnNextLb = document.getElementById("maj-lb-next");

        window.openCinematicLightbox = function(globalIdx) {
            if (!galleryItems[globalIdx]) return;
            
            const pos = currentFilteredIndices.indexOf(globalIdx);
            currentActiveIndex = pos !== -1 ? pos : 0;
            
            updateLightboxContent();
            if (lightboxModal) {
                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden";

                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(lightboxModal, { opacity: 0 }, { opacity: 1, duration: 0.25 });
                    gsap.fromTo(".maj-lb-img-wrap", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
                }
            }
        };

        function updateLightboxContent() {
            const itemIdx = currentFilteredIndices[currentActiveIndex];
            const item = galleryItems[itemIdx];
            if (!item || !lbImg) return;

            lbImg.src = item.src;
            if (lbRoomText) lbRoomText.textContent = `${item.roomLabel} — ${item.buildingLabel}`;
            if (lbCounter) lbCounter.textContent = `${currentActiveIndex + 1} / ${currentFilteredIndices.length}`;

            if (typeof gsap !== 'undefined') {
                gsap.fromTo(lbImg, { opacity: 0.5, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" });
            }
        }

        window.closeCinematicLightbox = function() {
            if (lightboxModal) {
                lightboxModal.classList.remove("active");
                document.body.style.overflow = "";
            }
        };

        if (btnCloseLb) btnCloseLb.addEventListener("click", window.closeCinematicLightbox);

        if (btnPrevLb) {
            btnPrevLb.addEventListener("click", (e) => {
                e.stopPropagation();
                currentActiveIndex = (currentActiveIndex - 1 + currentFilteredIndices.length) % currentFilteredIndices.length;
                updateLightboxContent();
            });
        }

        if (btnNextLb) {
            btnNextLb.addEventListener("click", (e) => {
                e.stopPropagation();
                currentActiveIndex = (currentActiveIndex + 1) % currentFilteredIndices.length;
                updateLightboxContent();
            });
        }

        document.addEventListener("keydown", (e) => {
            if (!lightboxModal || !lightboxModal.classList.contains("active")) return;
            if (e.key === "Escape") window.closeCinematicLightbox();
            if (e.key === "ArrowLeft" && btnPrevLb) btnPrevLb.click();
            if (e.key === "ArrowRight" && btnNextLb) btnNextLb.click();
        });

        let touchStartX = 0;
        if (lightboxModal) {
            lightboxModal.addEventListener("touchstart", (e) => {
                if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
            }, { passive: true });

            lightboxModal.addEventListener("touchend", (e) => {
                if (e.changedTouches.length === 1) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const diffX = touchEndX - touchStartX;
                    if (Math.abs(diffX) > 40) {
                        if (diffX > 0 && btnPrevLb) btnPrevLb.click();
                        else if (btnNextLb) btnNextLb.click();
                    }
                }
            }, { passive: true });
        }

        // 3. Multi-Column Dynamic Balance, Filter & Load More Logic
        const loadMoreWrap = document.getElementById("maj-load-more-wrap");
        const btnLoadMore = document.getElementById("maj-btn-load-more");
        const loadCountBadge = document.getElementById("maj-load-count-badge");

        function distributeTiles(filterVal = "all", isAppending = false) {
            const col0 = document.getElementById("maj-col-0");
            const col1 = document.getElementById("maj-col-1");
            const col2 = document.getElementById("maj-col-2");
            if (!col0) return;

            const width = window.innerWidth;
            const numCols = width >= 1024 ? 3 : (width >= 640 ? 2 : 1);

            // Adjust column visibility
            if (col1) col1.style.display = numCols >= 2 ? "flex" : "none";
            if (col2) col2.style.display = numCols >= 3 ? "flex" : "none";

            const cols = [col0];
            if (numCols >= 2 && col1) cols.push(col1);
            if (numCols >= 3 && col2) cols.push(col2);

            // Filter matching items
            currentFilteredIndices = [];
            const matchingItems = [];

            galleryItems.forEach((item, idx) => {
                const isMatch = (filterVal === "all" || item.room === filterVal || item.building === filterVal);
                if (isMatch) {
                    currentFilteredIndices.push(idx);
                    matchingItems.push({ item, globalIdx: idx });
                }
            });

            // Slice items based on visible limit
            const visibleItems = matchingItems.slice(0, currentVisibleLimit);
            const remainingCount = matchingItems.length - visibleItems.length;

            // Toggle Load More button
            if (loadMoreWrap) {
                if (remainingCount > 0) {
                    loadMoreWrap.style.display = "flex";
                    if (loadCountBadge) {
                        const nextBatch = Math.min(loadStep, remainingCount);
                        loadCountBadge.textContent = `+${nextBatch}`;
                    }
                } else {
                    loadMoreWrap.style.display = "none";
                }
            }

            // Clear existing columns
            cols.forEach(c => c.innerHTML = "");

            // Distribute items evenly across active columns
            visibleItems.forEach((entry, i) => {
                const targetCol = cols[i % numCols];
                const { item, globalIdx } = entry;

                const figure = document.createElement("figure");
                figure.className = "maj-photo-tile";
                figure.setAttribute("onclick", `window.openCinematicLightbox(${globalIdx})`);
                figure.setAttribute("data-idx", globalIdx);
                figure.setAttribute("data-room", item.room);
                figure.setAttribute("data-building", item.building);

                figure.innerHTML = `
                    <img src="${item.src}" alt="${item.caption}" class="maj-tile-img" loading="${i < 6 ? 'eager' : 'lazy'}">
                    <div class="maj-hover-scrim">
                        <div class="maj-hover-top-badges">
                            <span class="maj-badge-building-tag"><i class="fas fa-map-marker-alt"></i> ${item.buildingLabel}</span>
                            <div class="maj-badge-zoom-icon"><i class="fas fa-search-plus"></i></div>
                        </div>
                        <div class="maj-hover-content">
                            <div class="maj-hover-room-code">${item.roomLabel}</div>
                        </div>
                    </div>
                `;
                targetCol.appendChild(figure);
            });

            if (typeof gsap !== 'undefined') {
                if (isAppending) {
                    const newlyAddedTiles = Array.from(document.querySelectorAll(".maj-photo-tile")).slice(currentVisibleLimit - loadStep);
                    gsap.fromTo(newlyAddedTiles, { opacity: 0, y: 25, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" });
                } else {
                    gsap.fromTo(".maj-photo-tile", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: "power2.out" });
                }
            }
        }

        const filterButtons = document.querySelectorAll(".maj-filter-item-btn");
        const btnFilterPrev = document.getElementById("maj-filter-prev");
        const btnFilterNext = document.getElementById("maj-filter-next");
        const filterBar = document.getElementById("maj-filter-bar");
        let activeFilter = "all";

        // Mobile Filter Scroll Arrows
        if (btnFilterPrev && filterBar) {
            btnFilterPrev.addEventListener("click", () => {
                filterBar.scrollBy({ left: -140, behavior: "smooth" });
            });
        }
        if (btnFilterNext && filterBar) {
            btnFilterNext.addEventListener("click", () => {
                filterBar.scrollBy({ left: 140, behavior: "smooth" });
            });
        }

        // Category Filter Buttons
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                activeFilter = btn.getAttribute("data-filter");
                currentVisibleLimit = 12; // Reset limit on category switch
                distributeTiles(activeFilter, false);
            });
        });

        // Load More Click
        if (btnLoadMore) {
            btnLoadMore.addEventListener("click", () => {
                currentVisibleLimit += loadStep;
                distributeTiles(activeFilter, true);
            });
        }

        // Initialize state
        distributeTiles("all", false);

        // Responsive resize listener with debounce
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                distributeTiles(activeFilter, false);
            }, 150);
        });

        // Handle URL Deep Link
        const urlTarget = targetRoom || window.__CLASSROOM_TARGET_ROOM__;
        if (urlTarget) {
            const targetBtn = document.querySelector(`.maj-filter-item-btn[data-filter="${urlTarget}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        }
    }

    window.initClassroomGallery = initClassroomGallery;

    if (window.__CLASSROOM_ITEMS__) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => initClassroomGallery(window.__CLASSROOM_ITEMS__, window.__CLASSROOM_TARGET_ROOM__));
        } else {
            initClassroomGallery(window.__CLASSROOM_ITEMS__, window.__CLASSROOM_TARGET_ROOM__);
        }
    }
})();
