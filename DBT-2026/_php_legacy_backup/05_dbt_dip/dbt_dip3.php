<!-- SECTION 3: PURE DIAGRAM SHOWCASE & OFF-SCREEN BOTTOM CARDS GSAP SEQUENCE -->
<style>
/* Seamless Organic S-Curve Wave Divider */
.sec3-top-wave-wrapper {
    position: absolute;
    top: -69px;
    left: 0;
    width: 100%;
    height: 70px;
    overflow: hidden;
    line-height: 0;
    z-index: 15;
    pointer-events: none;
}

.sec3-top-wave-wrapper svg {
    width: 100%;
    height: 100%;
    display: block;
}

/* Scoped Mobile Responsive Styles for Section 3 (< 1024px) */
@media (max-width: 1023px) {
    .sec3-top-wave-wrapper {
        top: -44px;
        height: 45px;
    }
    #sec3-header {
        display: block !important;
        opacity: 1 !important;
        transform: none !important;
        text-align: center !important;
        margin-bottom: 20px !important;
        padding: 0 12px !important;
    }

    #sec3-header h2 {
        font-size: clamp(24px, 5.8vw, 32px) !important;
        line-height: 1.3 !important;
        letter-spacing: -0.5px;
    }

    #sec3-sequence-outer {
        min-height: auto !important;
        height: auto !important;
    }

    #sec3-pinned-view {
        min-height: auto !important;
        height: auto !important;
        padding: 70px 16px 50px !important;
        overflow: visible !important;
        display: block !important;
    }

    #sec3-vertical-wrapper {
        gap: 20px !important;
    }

    #sec3-diagram-card {
        opacity: 1 !important;
        transform: none !important;
        max-width: 100% !important;
        margin: 0 0 10px !important;
        background: #ffffff !important;
        border-radius: 20px !important;
        padding: 14px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
        border: 1px solid rgba(95, 45, 140, 0.15) !important;
        cursor: pointer;
        position: relative;
    }

    #sec3-diagram-card img {
        max-height: none !important;
        border-radius: 12px;
    }

    .sec3-zoom-badge {
        display: inline-flex !important;
        align-items: center;
        gap: 6px;
        position: absolute;
        bottom: 22px;
        right: 22px;
        background: rgba(95, 45, 140, 0.92);
        color: #ffffff;
        font-size: 11.5px;
        font-weight: 600;
        font-family: 'Prompt', sans-serif !important;
        padding: 5px 12px;
        border-radius: 9999px;
        box-shadow: 0 4px 14px rgba(95, 45, 140, 0.35);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }

    #sec3-bottom-cards-row {
        opacity: 1 !important;
        transform: none !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        width: 100% !important;
    }

    #sec3-bottom-cards-row > div {
        flex: 1 1 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        padding: 20px !important;
        border-radius: 20px !important;
    }
}

@media (min-width: 1024px) {
    .sec3-zoom-badge {
        display: none !important;
    }
}

/* Lightbox Modal for Diagram Preview on Mobile */
#sec3-lightbox-modal {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(10, 10, 11, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s ease;
}

#sec3-lightbox-modal.active {
    display: flex;
    opacity: 1;
}

#sec3-lightbox-modal img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    transform: scale(0.92);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

#sec3-lightbox-modal.active img {
    transform: scale(1);
}

.sec3-lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 100000;
}

.sec3-lightbox-close:hover {
    background: #5f2d8c;
    border-color: #5f2d8c;
}
</style>

<div id="sec3-sequence-outer" style="position: relative; z-index: 10; background-color: #f8f9fa !important;">

    <!-- Seamless Organic S-Curve Wave Transition from Section 2 (Dark #0A0A0B) to Section 3 (Light #f8f9fa) -->
    <div class="sec3-top-wave-wrapper">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="sec3-wave-path" d="M0,0 C360,70 680,10 1040,60 C1220,85 1340,30 1440,50 L1440,100 L0,100 Z" fill="#f8f9fa"/>
        </svg>
    </div>

    <div id="sec3-pinned-view" style="min-height: 100vh; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; overflow: hidden; position: relative;">
        <div style="max-width: 1240px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
            
            <!-- Step 1: Section Header (Desktop Only - Hidden on Mobile) -->
            <div style="text-align: center; margin-bottom: 20px; opacity: 0; transform: translateY(-30px); will-change: transform, opacity; position: relative; z-index: 2;" id="sec3-header">
                <h2 style="font-size: 34px; font-weight: 800; color: #5f2d8c !important; margin: 0; font-family: 'Prompt', sans-serif !important;">
                    โครงสร้างหลักสูตร & <span style="color: #1f2937;">คุณสมบัติผู้สมัคร (ปวส.)</span>
                </h2>
            </div>

            <!-- Vertical Stage Container -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; gap: 4px; position: relative;" id="sec3-vertical-wrapper">
                
                <!-- Step 2: Pure Standalone Diagram Showcase -->
                <div id="sec3-diagram-card" style="background: transparent !important; border: none !important; padding: 0 !important; box-shadow: none !important; text-align: center; will-change: transform, opacity; max-width: 1050px; width: 100%; opacity: 0; transform: scale(0.85); margin: 0 auto;">
                    <img src="02_design/โครงสร้างหลักสูตรปวส.webp" alt="ผังโครงสร้างหลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล" loading="lazy" decoding="async" style="width: 100%; max-height: 80vh; height: auto; object-fit: contain; display: block; mix-blend-mode: multiply !important; margin: 0 auto;">
                    <span class="sec3-zoom-badge"><i class="fas fa-search-plus"></i> แตะดูผังเต็มจอ</span>
                </div>

                <!-- Step 3: Bottom Side-by-Side 2 Cards Row -->
                <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; width: 100%; will-change: transform, opacity;" id="sec3-bottom-cards-row">
                    
                    <!-- Card 1: คุณสมบัติกลุ่มผู้จบ ปวช. -->
                    <div style="flex: 1 1 450px; max-width: 580px; min-width: 300px; background-color: #ffffff !important; border-radius: 24px; padding: 24px; border: 1px solid rgba(95, 45, 140, 0.18); box-shadow: 0 15px 35px rgba(0,0,0,0.06); box-sizing: border-box;">
                        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                            <div style="width: 42px; height: 42px; border-radius: 14px; background: rgba(95, 45, 140, 0.1); color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                <i class="fa fa-user-check"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 19px; font-weight: 800; color: #1f2937 !important; margin: 0; font-family: 'Prompt', sans-serif !important;">
                                    ผู้สำเร็จการศึกษา ปวช. ทุกสาขา
                                </h3>
                                <span style="font-size: 12px; color: #6b7280; font-family: 'Prompt', sans-serif !important;">คุณสมบัติและเกณฑ์การรับเข้าศึกษาต่อ</span>
                            </div>
                        </div>
                        
                        <ul style="display: flex; flex-direction: column; gap: 10px; color: #374151 !important; font-size: 13.5px; font-family: 'Prompt', sans-serif !important; padding: 0; margin: 0; list-style: none;">
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>ระดับการศึกษา:</strong> จบ ปวช. สาขาเทคโนโลยีธุรกิจดิจิทัล, คอมพิวเตอร์ธุรกิจ, หรือทุกสาขาวิชา</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>ระยะเวลาศึกษา:</strong> รวม 2 ปีการศึกษา (4 ภาคเรียน) เทียบโอนหน่วยกิตได้ตามเกณฑ์</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>ระบบการเรียน:</strong> เน้นปฏิบัติเข้มข้น 80% ปฏิบัติจริงกับธุรกิจออนไลน์และร้านค้าพันธมิตร</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>โอกาสความก้าวหน้า:</strong> ต่อยอดปริญญาตรี (ทล.บ.) หรือเปิดธุรกิจของตนเองได้ทันที</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Card 2: คุณสมบัติกลุ่มผู้จบ ม.6 / กศน. -->
                    <div style="flex: 1 1 450px; max-width: 580px; min-width: 300px; background-color: #ffffff !important; border-radius: 24px; padding: 24px; border: 1px solid rgba(124, 58, 237, 0.2); box-shadow: 0 15px 35px rgba(0,0,0,0.06); box-sizing: border-box;">
                        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                            <div style="width: 42px; height: 42px; border-radius: 14px; background: rgba(124, 58, 237, 0.1); color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                <i class="fa fa-user-graduate"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 19px; font-weight: 800; color: #1f2937 !important; margin: 0; font-family: 'Prompt', sans-serif !important;">
                                    ผู้สำเร็จการศึกษา ม.6 / กศน.
                                </h3>
                                <span style="font-size: 12px; color: #6b7280; font-family: 'Prompt', sans-serif !important;">เปิดรับทุกแผนการเรียน (มีวิชาปรับพื้นฐาน)</span>
                            </div>
                        </div>

                        <ul style="display: flex; flex-direction: column; gap: 10px; color: #374151 !important; font-size: 13.5px; font-family: 'Prompt', sans-serif !important; padding: 0; margin: 0; list-style: none;">
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>ระดับการศึกษา:</strong> จบ มัธยมศึกษาปีที่ 6 (วิทย์, ศิลป์) หรือ กศน. ทุกแผนการเรียน</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>การปรับพื้นฐาน:</strong> มีการจัดสอนปรับพื้นฐานด้านคอมพิวเตอร์และเครื่องมือดิจิทัลฟรี</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>ระยะเวลาศึกษา:</strong> รวม 2 ปีการศึกษา (4 ภาคเรียน) เรียนครบตามเกณฑ์มาตรฐาน สอศ.</span>
                            </li>
                            <li style="display: flex; align-items: flex-start; gap: 10px;">
                                <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 14px; flex-shrink: 0;"></i>
                                <span><strong>การดูแลนักศึกษา:</strong> มีอาจารย์ที่ปรึกษาคอยดูแลอย่างใกล้ชิดตลอดหลักสูตร</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    </div>
</div>

<!-- Fullscreen Lightbox Modal for Diagram -->
<div id="sec3-lightbox-modal">
    <button class="sec3-lightbox-close" id="sec3-lightbox-close-btn" aria-label="ปิดภาพขยาย">
        <i class="fas fa-times"></i>
    </button>
    <img src="02_design/โครงสร้างหลักสูตรปวส.webp" alt="ผังโครงสร้างหลักสูตร ปวส. ขนาดเต็ม" id="sec3-lightbox-img" loading="lazy" decoding="async">
</div>

<!-- GSAP ScrollTrigger Script for Section 3 Sequence -->
<script>
(function() {
    window.initSec3Sequence = function initSec3Sequence() {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
            setTimeout(initSec3Sequence, 100);
            return;
        }

        // Clean up any stale ScrollTriggers for Section 3
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.id && (st.vars.id.includes('sec3') || st.vars.id.includes('pvs-sec3') || st.vars.id.includes('pvc-sec3'))) {
                st.kill(true);
            }
        });

        let mm = gsap.matchMedia();

        // 1. Desktop Sequence (Pinning & Layered Ascend)
        mm.add("(min-width: 1024px)", () => {
            gsap.set("#sec3-header", { y: -30, opacity: 0 });
            gsap.set("#sec3-diagram-card", { scale: 0.85, opacity: 0 });
            gsap.set("#sec3-bottom-cards-row", { translateY: "100vh", opacity: 0 });

            let tl = gsap.timeline({
                scrollTrigger: {
                    id: "sec3-desktop-sequence",
                    trigger: "#sec3-sequence-outer",
                    pin: true,
                    start: "top top",
                    end: "+=130%",
                    scrub: 0.5,
                    anticipatePin: 1
                }
            });

            // Phase 0: Settle Full Viewport (0.0s -> 0.3s)
            tl.to({}, { duration: 0.3 }, 0);

            // Phase 1: Header Reveal & Pure Standalone Huge Diagram Image Reveal (0.3s -> 0.9s)
            tl.to("#sec3-header", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0.3);

            tl.to("#sec3-diagram-card", {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out"
            }, 0.35);

            // Phase 2: Read Hold Phase (1.0s -> 1.6s)
            tl.to({}, { duration: 0.6 }, 1.0);

            // Phase 3: Header Fade-Out & Pure Diagram Image Shrinks & Shifts Up (1.6s -> 2.2s)
            tl.to("#sec3-header", {
                opacity: 0,
                y: -30,
                duration: 0.6,
                ease: "power1.in"
            }, 1.6);

            tl.to("#sec3-diagram-card", {
                scale: 0.84,
                y: -10,
                duration: 0.7,
                ease: "power1.inOut"
            }, 1.6);

            // Phase 4: Fast H-CARDS ASCEND (2.1s -> 3.2s)
            tl.to("#sec3-bottom-cards-row", {
                opacity: 1,
                translateY: "-38px",
                duration: 1.1,
                ease: "power1.out"
            }, 2.1);
        });

        // 2. Mobile Responsive Flow (< 1024px)
        mm.add("(max-width: 1023px)", () => {
            gsap.set("#sec3-bottom-cards-row", { opacity: 1, translateY: 0 });
            gsap.fromTo("#sec3-bottom-cards-row > div", 
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                    scrollTrigger: {
                        id: "sec3-mobile-cards",
                        trigger: "#sec3-bottom-cards-row",
                        start: "top 92%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // 3. Global Wave Morphing between Section 2 and Section 3
        const wavePath = document.getElementById("sec3-wave-path");
        if (wavePath) {
            gsap.fromTo(wavePath,
                { attr: { d: "M0,25 C360,95 680,35 1040,85 C1220,110 1340,55 1440,75 L1440,100 L0,100 Z" } },
                {
                    attr: { d: "M0,0 C360,40 680,0 1040,30 C1220,55 1340,10 1440,25 L1440,100 L0,100 Z" },
                    ease: "power1.out",
                    scrollTrigger: {
                        id: "sec3-wave-morph",
                        trigger: "#sec3-sequence-outer",
                        start: "top 95%",
                        end: "top 25%",
                        scrub: 1
                    }
                }
            );
        }

        // Lightbox Modal Interactions
        const diagramCard = document.getElementById("sec3-diagram-card");
        const lightboxModal = document.getElementById("sec3-lightbox-modal");
        const closeBtn = document.getElementById("sec3-lightbox-close-btn");

        if (diagramCard && lightboxModal) {
            diagramCard.addEventListener("click", () => {
                if (window.innerWidth < 1024) {
                    lightboxModal.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });

            const closeLightbox = () => {
                lightboxModal.classList.remove("active");
                document.body.style.overflow = "";
            };

            if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
            lightboxModal.addEventListener("click", (e) => {
                if (e.target === lightboxModal) closeLightbox();
            });
        }

        // Defensive refresh to guarantee proper calculations after SPA dynamic switches
        setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh();
            }
        }, 120);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSec3Sequence);
    } else {
        initSec3Sequence();
    }
})();
</script>