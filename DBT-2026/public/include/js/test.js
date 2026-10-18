// เลือกทุกองค์ประกอบที่มี class "tilt" (เฉพาะอุปกรณ์ที่มีเมาส์ เพื่อประหยัดพลังงานบนมือถือ)
function initTiltEffect() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let elements = document.querySelectorAll('.tilt');

  // ใช้ forEach เพื่อวนลูปทุกองค์ประกอบ
  elements.forEach((el) => {
    if (el.dataset.tiltInitialized) return;
    el.dataset.tiltInitialized = "true";

    const height = el.clientHeight;
    const width = el.clientWidth;

    // เพิ่ม transition ให้สมูด
    el.style.transition = 'transform 0.2s ease-out';

    el.addEventListener('mousemove', (e) => {
      const xVal = e.layerX; // ตำแหน่ง x
      const yVal = e.layerY; // ตำแหน่ง y

      const yRotation = -5 * ((xVal - width / 2) / width);
      const xRotation = 5 * ((yVal - height / 2) / height);

      const transformString = `perspective(500px) rotateX(${xRotation}deg) rotateY(${-yRotation}deg)`;
      el.style.transform = transformString;
    });

    el.addEventListener('mouseout', () => {
      el.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
    });

    el.addEventListener('mousedown', () => {
      el.style.transform = 'perspective(500px) scale(0.95)';
    });

    el.addEventListener('mouseup', () => {
      el.style.transform = 'perspective(500px) scale(1)';
    });
  });
}

// Run on initial load
document.addEventListener("DOMContentLoaded", () => {
  initTiltEffect();
});


// Initialize Lenis Smooth Scroll with GSAP Ticker synchronization
const lenis = new Lenis({
  autoRaf: false,
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 1,
  syncTouch: true,
  syncTouchLerp: 0.1,
  touchMultiplier: 1,
  touchInertiaExponent: 1.8,
  gestureOrientation: 'vertical',
});
window.lenis = lenis;

lenis.on('scroll', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.update();
  }
});

// Bind Lenis animation frame directly to GSAP Ticker & disable lag smoothing to prevent skipped frames during fast scrolls
if (typeof gsap !== 'undefined') {
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
