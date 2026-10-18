<!-- SECTION 4: PVS IT TECH STACK SINGLE ROW MARQUEE SHOWCASE -->
<style>
@keyframes pvsTechMarqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.pvs-tech-marquee-container {
    background-color: #ffffff !important;
    padding: 50px 0 60px 0;
    position: relative;
    z-index: 10;
    overflow: hidden;
    border-bottom: 1px solid #e5e7eb;
}

.pvs-tech-marquee-row {
    display: flex;
    overflow: hidden;
    user-select: none;
    width: 100%;
    position: relative;
}

.pvs-tech-marquee-track {
    display: flex;
    flex-shrink: 0;
    gap: 60px;
    align-items: center;
    min-width: 100%;
    will-change: transform;
    animation: pvsTechMarqueeLeft 25s linear infinite;
}

.pvs-tech-marquee-row:hover .pvs-tech-marquee-track {
    animation-play-state: paused !important;
}

.pvs-tech-icon-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 10px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
    cursor: pointer;
    flex-shrink: 0;
}

.pvs-tech-icon-item:hover {
    transform: scale(1.22) translateY(-4px);
    filter: drop-shadow(0 8px 18px rgba(95, 45, 140, 0.4));
}

.pvs-tech-icon-item img {
    height: 56px;
    max-width: 140px;
    width: auto;
    object-fit: contain;
    display: block;
    background: transparent !important;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08));
    transition: transform 0.3s ease;
}

.pvs-tech-marquee-edge-left,
.pvs-tech-marquee-edge-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 140px;
    z-index: 5;
    pointer-events: none;
}

.pvs-tech-marquee-edge-left {
    left: 0;
    background: linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.pvs-tech-marquee-edge-right {
    right: 0;
    background: linear-gradient(to left, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

/* Responsive adjustments for Section 4 Tech Marquee (< 1024px) */
@media (max-width: 1023px) {
    .pvs-tech-marquee-edge-left,
    .pvs-tech-marquee-edge-right {
        width: 40px !important;
    }
}
</style>

<div class="pvs-tech-marquee-container">
    <!-- Edge Fading Overlays -->
    <div class="pvs-tech-marquee-edge-left"></div>
    <div class="pvs-tech-marquee-edge-right"></div>

    <!-- SINGLE ROW MARQUEE: Running Left -->
    <div class="pvs-tech-marquee-row">
        <div class="pvs-tech-marquee-track">
            <!-- Loop Set 1 -->
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/node.png" alt="Node.js"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/ando.png" alt="Android"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/bean.png" alt="NetBeans"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/java.png" alt="Java"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/python.png" alt="Python"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/C.png" alt="C"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/php.png" alt="PHP"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/Go lang.png" alt="Go"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/javascript.png" alt="JavaScript"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/Linux Script.png" alt="Linux Script"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/sql.png" alt="SQL"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/HTML-CSS.png" alt="HTML-CSS"></div>

            <!-- Loop Set 2 (Duplicate for Seamless Endless Scroll) -->
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/node.png" alt="Node.js"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/ando.png" alt="Android"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/bean.png" alt="NetBeans"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/java.png" alt="Java"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/python.png" alt="Python"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/C.png" alt="C"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/php.png" alt="PHP"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/Go lang.png" alt="Go"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/javascript.png" alt="JavaScript"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/Linux Script.png" alt="Linux Script"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/sql.png" alt="SQL"></div>
            <div class="pvs-tech-icon-item"><img src="03_photo/icon/HTML-CSS.png" alt="HTML-CSS"></div>
        </div>
    </div>
</div>