<!-- SECTION 5: EXACT 1:1 MADEWITHGSAP REPLICA FOR PVS IT -->
<style>
/* Responsive layout rules for Section 5 CTA & Sticky Note Badge */
.s-pricing .inner-card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 900px;
    margin: 0 auto;
}

.s-pricing .card-main-box {
    background: #ffffff !important;
    color: #000000 !important;
    border-radius: 28px;
    padding: 48px 40px 40px 40px;
    max-width: 520px;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 30px 60px rgba(0,0,0,0.35);
    position: relative;
    border: 1px solid rgba(95, 45, 140, 0.15);
    box-sizing: border-box;
}

.s-pricing .whatsin-badge {
    position: absolute;
    top: 30px;
    right: -150px;
    width: 250px;
    background: #f5f3ff !important;
    color: #5f2d8c !important;
    border-radius: 24px;
    padding: 26px 20px;
    transform: rotate(5deg);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 5;
    border: 1px solid rgba(95, 45, 140, 0.25);
    box-sizing: border-box;
}

.pricing-svg-wrapper {
    position: absolute;
    bottom: -2px;
    left: -20%;
    width: 140%;
    height: 240px;
    overflow: hidden;
    line-height: 0;
    z-index: 5;
    pointer-events: none;
}

@media (max-width: 1023px) {
    .h-latest .pin-height {
        height: 150vh !important;
    }
    .h-top-pricing {
        padding: 40px 16px 170px 16px !important;
        margin-top: 0 !important;
    }
    .pricing-svg-wrapper {
        left: -30% !important;
        width: 160% !important;
        height: 180px !important;
        bottom: -2px !important;
    }
    .pricing-svg-wrapper svg {
        height: 180px !important;
    }
    .s-pricing {
        padding: 0 16px 70px 16px !important;
        margin-top: -2px !important;
    }
    .s-pricing .inner-card-wrapper {
        flex-direction: column !important;
        gap: 16px !important;
        padding: 0 !important;
        margin-top: -45px !important;
    }
    .s-pricing .card-main-box {
        max-width: 100% !important;
        margin: 0 auto !important;
        padding: 30px 20px 24px 20px !important;
        border-radius: 22px !important;
    }
    .s-pricing .whatsin-badge {
        position: relative !important;
        top: auto !important;
        right: auto !important;
        width: 100% !important;
        transform: none !important;
        margin-top: 14px !important;
        border-radius: 20px !important;
        padding: 20px 16px !important;
    }
}
</style>

<div id="mwg-exact-admission-wrapper" style="position: relative; z-index: 10; overflow: hidden; background-color: #f1f1f1;">

    <!-- SECTION H-LATEST -->
    <section class="h-latest sec-white sec-border pr" id="pvc-admission-latest" style="background-color: #f1f1f1 !important; color: #000000 !important; position: relative;">
        <div class="content pr">
            
            <!-- PINNED SLOW HORIZONTAL SCROLL TEXT (.l-sentence) -->
            <div class="l-sentence" style="position: relative;">
                <div class="mwg_landing4">
                    <div class="pin-height" style="height: 280vh; position: relative;">
                        <div class="container" style="height: 100vh; display: flex; align-items: center; overflow: hidden; width: 100vw !important; max-width: 100vw !important; margin: 0 !important; padding: 0 !important;">
                            <p class="text mwg-monster-text" style="font-family: 'Prompt', sans-serif !important; font-size: clamp(36px, 6vw, 84px); font-weight: 900; white-space: nowrap; color: #000000; margin: 0; line-height: 1; will-change: transform; opacity: 1; transform: translateX(100vw);">
                                พร้อมยกระดับสู่มือโปร? ปวส. DBT CVC
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Pricing Intro (Unlock the full / admission quota) -->
            <div class="h-top-pricing" style="text-align: center; padding: 60px 20px 280px 20px; margin-top: 20px; position: relative; z-index: 2;">
                <h3 class="title-l pr" style="font-family: 'Prompt', sans-serif !important; margin: 0; line-height: 1.2;">
                    <span style="font-size: clamp(26px, 5.5vw, 76px); font-weight: 900; color: #000000; display: block; letter-spacing: -0.5px;">ปลดล็อกโอกาสสู่เส้นทางมืออาชีพ</span>
                    <span class="text-g" style="font-size: clamp(24px, 5vw, 68px); font-weight: 800; color: #7c3aed; opacity: 0.95; display: block; margin-top: 6px; letter-spacing: -0.5px;">คว้าโควตาเข้าเรียน ปวส. DBT CVC</span>
                </h3>
            </div>

        </div>

        <!-- DYNAMIC ANIMATED BLACK SVG BEZIER CURVE (160% width full-bleed to eliminate straight seams) -->
        <div class="pricing-svg-wrapper">
            <svg viewBox="0 0 1640 280" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">
                <path id="pricing-curve-path" d="M0 280 C480 220, 1160 220, 1640 280 L1640 280 L0 280 Z" fill="#000000"/>
            </svg>
        </div>
    </section>

    <!-- SECTION S-PRICING (OVERLAPPING WHITE CARD + WHITE-VIOLET TILTED STICKY NOTE + BLACK BACKGROUND) -->
    <section class="s-pricing pr" id="pvc-admission-card" style="background-color: #000000 !important; color: #ffffff !important; padding: 0 20px 100px 20px; position: relative; z-index: 10;">
        
        <div class="sec-black pa" aria-hidden="true" style="position: absolute; inset: 0; background: #000000; pointer-events: none;"></div>
        
        <!-- Animated Overlapping Hero CTA Card Container -->
        <div class="inner-card inner-card-wrapper" id="pvc-pricing-inner-card" style="position: relative; z-index: 20; will-change: transform, opacity;">
            
            <div class="card pr card-main-box">
                
                <!-- Hero CTA Card Top Content -->
                <div class="card-top f f-center pr" style="text-align: center;">
                    <!-- Larger Circular Icon Badge -->
                    <div style="width: 68px; height: 68px; border-radius: 50%; background: rgba(95, 45, 140, 0.08); border: 1.5px solid rgba(95, 45, 140, 0.25); color: #5f2d8c; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 18px; box-shadow: 0 6px 18px rgba(95, 45, 140, 0.15);">
                        <i class="fa fa-graduation-cap"></i>
                    </div>

                    <!-- Main Hero Title & Description -->
                    <div class="pr milieu" style="text-align: center;">
                        <h2 style="font-size: 30px; font-weight: 900; color: #111827 !important; font-family: 'Prompt', sans-serif !important; margin: 0 0 10px 0; line-height: 1.2;">
                            ก้าวสู่ผู้เชี่ยวชาญธุรกิจดิจิทัล
                        </h2>
                        <p style="font-size: 14.5px; color: #4b5563 !important; font-family: 'Prompt', sans-serif !important; margin: 0 0 28px 0; line-height: 1.6;">
                            ยื่นสมัครเรียนวันนี้ เพื่อรับสิทธิ์โควตาระดับ ปวส. กองทุน กยศ. 100% และโครงการทวิภาคีมีรายได้ตลอด 2 ปี
                        </p>
                    </div>

                    <!-- High-Impact Digital Violet CTA Button "สนใจสมัครเรียน" -->
                    <div style="text-align: center; margin-top: 10px;">
                        <a href="https://admission.vec.go.th/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; background: linear-gradient(135deg, #7c3aed 0%, #5f2d8c 100%) !important; color: #ffffff !important; padding: 16px 26px; border-radius: 999px; font-size: 17px; font-weight: 900; font-family: 'Prompt', sans-serif !important; text-decoration: none !important; letter-spacing: 0.5px; box-shadow: 0 10px 30px rgba(95, 45, 140, 0.45); transition: transform 0.25s ease, box-shadow 0.25s ease;" onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 14px 35px rgba(95, 45, 140, 0.6)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 30px rgba(95, 45, 140, 0.45)';">
                            <span>สนใจสมัครเรียน</span>
                            <i class="fa fa-arrow-right" style="font-size: 16px;"></i>
                        </a>
                    </div>
                </div>

                <!-- WHITE-VIOLET TILTED STICKY NOTE CARD (.whatsin) -->
                <div class="whatsin pa label f f-center whatsin-badge">
                    <p style="font-family: 'Prompt', sans-serif !important; font-weight: 900; font-size: 15px; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px; color: #5f2d8c; text-align: center;">
                        <i class="fa fa-gift" style="margin-right: 6px;"></i>สิทธิ์ & สวัสดิการ ปวส.
                    </p>
                    <ul style="display: flex; flex-direction: column; gap: 10px; list-style: none; padding: 0; margin: 0; font-size: 13px; font-weight: 700; font-family: 'Prompt', sans-serif !important; color: #374151;">
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                            <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 13px; flex-shrink: 0;"></i>
                            <span>100% สิทธิ์กู้ยืม กยศ.</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                            <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 13px; flex-shrink: 0;"></i>
                            <span>ทวิภาคีมีรายได้จริง</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                            <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 13px; flex-shrink: 0;"></i>
                            <span>ประกันอุบัติเหตุฟรี</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;">
                            <i class="fa fa-check-circle" style="color: #7c3aed; margin-top: 3px; font-size: 13px; flex-shrink: 0;"></i>
                            <span>โควตาต่อ ป.ตรี ต่อเนื่อง 100%</span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>

        <!-- Career Pathways Grid (Below CTA Card) -->
        <div style="max-width: 1100px; margin: 70px auto 0; position: relative; z-index: 20; text-align: center;">
            <h3 style="font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 8px; font-family: 'Prompt', sans-serif !important;">
                เส้นทางอาชีพสำหรับผู้สำเร็จการศึกษา ปวส. เทคโนโลยีธุรกิจดิจิทัล
            </h3>
            <p style="font-size: 14px; color: #a78bfa; margin: 0 auto 24px; font-family: 'Prompt', sans-serif !important;">
                พร้อมต่อยอดสู่ระดับปริญญาตรี (ต่อเนื่อง 2 ปี) หรือเริ่มงานในตำแหน่งสายธุรกิจดิจิทัลระดับสูงได้ทันที
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 14px;">
                    <i class="fas fa-bullhorn text-violet-400 text-xl mb-2"></i>
                    <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; font-family: 'Prompt', sans-serif !important;">Digital Marketing Manager</h4>
                </div>
                <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 14px;">
                    <i class="fas fa-store text-violet-400 text-xl mb-2"></i>
                    <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; font-family: 'Prompt', sans-serif !important;">E-Commerce Specialist</h4>
                </div>
                <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 14px;">
                    <i class="fas fa-chart-pie text-violet-400 text-xl mb-2"></i>
                    <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; font-family: 'Prompt', sans-serif !important;">Business Data Analyst</h4>
                </div>
                <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 14px;">
                    <i class="fas fa-photo-video text-violet-400 text-xl mb-2"></i>
                    <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; font-family: 'Prompt', sans-serif !important;">Digital Content Producer</h4>
                </div>
                <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 14px;">
                    <i class="fas fa-briefcase text-violet-400 text-xl mb-2"></i>
                    <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0; font-family: 'Prompt', sans-serif !important;">Digital Entrepreneur</h4>
                </div>
            </div>
        </div>

    </section>

</div>
