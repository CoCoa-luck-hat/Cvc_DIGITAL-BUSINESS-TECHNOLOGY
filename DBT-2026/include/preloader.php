<?php
/**
 * Real Asset Preloader Component (0% - 100% Counter + Logo Big Scale Sequence)
 * แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล
 */
?>
<style>
#preloader-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
    user-select: none !important;
    background-color: transparent !important;
    pointer-events: auto !important;
}

#preloader-curtain-top {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 50.5vh !important;
    background-color: #08090d !important;
    z-index: 10 !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    will-change: transform !important;
    transform: translateZ(0) !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
}

#preloader-curtain-bottom {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 50.5vh !important;
    background-color: #08090d !important;
    z-index: 10 !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    will-change: transform !important;
    transform: translateZ(0) !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
}

#preloader-canvas {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 20 !important;
    pointer-events: none !important;
}

#preloader-content {
    position: relative !important;
    z-index: 30 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    height: 100% !important;
    padding: 2rem !important;
    text-align: center !important;
    will-change: transform, opacity !important;
}

/* 0% - 100% Real Asset Counter (Clean text without shadow, Absolute Dead Center) */
#preloader-counter {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    font-family: 'Prompt', sans-serif !important;
    font-size: 3.75rem !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    letter-spacing: -0.02em !important;
    text-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1 !important;
    white-space: nowrap !important;
    z-index: 35 !important;
    will-change: transform, opacity !important;
}

@media (max-width: 640px) {
    #preloader-counter {
        font-size: 2.85rem !important;
    }
}

.preloader-logo-wrapper {
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 1.25rem !important;
    will-change: transform, opacity !important;
}

.preloader-logo-img {
    height: 110px !important;
    width: auto !important;
    object-fit: contain !important;
    filter: drop-shadow(0 0 22px rgba(124, 58, 237, 0.85)) drop-shadow(0 0 45px rgba(95, 45, 140, 0.4)) !important;
    transition: transform 0.3s ease !important;
}

@media (max-width: 640px) {
    .preloader-logo-img {
        height: 85px !important;
    }
}

#preloader-title {
    font-family: 'Prompt', sans-serif !important;
    font-size: 1.35rem !important;
    font-weight: 500 !important;
    color: #f8f9fa !important;
    letter-spacing: 0.05em !important;
    margin: 0 !important;
    padding: 0 !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(95, 45, 140, 0.3) !important;
    white-space: nowrap !important;
    will-change: transform, opacity !important;
}

@media (max-width: 640px) {
    #preloader-title {
        font-size: 1.1rem !important;
    }
}
</style>

<!-- Preloader Overlay -->
<div id="preloader-overlay">
    <!-- Top Curtain Panel -->
    <div id="preloader-curtain-top"></div>
    
    <!-- Bottom Curtain Panel -->
    <div id="preloader-curtain-bottom"></div>

    <!-- Dynamic Tech Grid Canvas -->
    <canvas id="preloader-canvas"></canvas>

    <!-- Center Content Box -->
    <div id="preloader-content">
        <!-- 0% - 100% Real Asset Counter (Clean text without shadow) -->
        <div id="preloader-counter">0%</div>

        <!-- Logo Image (Initially hidden, scales up big then down to normal) -->
        <div class="preloader-logo-wrapper" style="opacity: 0; transform: scale(0.4);">
            <img src="02_design/DBTLOGO.png" alt="DBT Logo" class="preloader-logo-img">
        </div>

        <!-- Clean Department Title Text -->
        <h2 id="preloader-title" style="opacity: 0; transform: translateY(15px); display: none;">แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล</h2>
    </div>
</div>

<script>
(function() {
    var overlay = document.getElementById('preloader-overlay');
    if (!overlay) return;

    // 1. Instant Session Bypass if already viewed in this browser tab
    try {
        if (sessionStorage.getItem('cvc_it_preloader_shown') === 'true') {
            overlay.style.display = 'none';
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.body.style.overflow = '';
            return;
        }
    } catch(e) {}

    // 2. HARD GUARANTEE TIMEOUT FOR SLOW CONNECTIONS
    // If user is on 2G/Slow connection or Data Saver, dismiss in 300ms. Normal max 1.1s.
    var forceDismiss = function() {
        var el = document.getElementById('preloader-overlay');
        if (!el || el.dataset.dismissed) return;
        el.dataset.dismissed = 'true';
        try { sessionStorage.setItem('cvc_it_preloader_shown', 'true'); } catch(e) {}
        el.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        el.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(function() {
            if (el && el.parentNode) el.parentNode.removeChild(el);
        }, 320);
    };

    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var isSlow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
    var maxWait = isSlow ? 300 : 1100;
    window.__cvcPreloadFallbackTimer = setTimeout(forceDismiss, maxWait);
})();
</script>
