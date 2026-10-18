<?php
// Active page check helper
$current_page  = basename($_SERVER['PHP_SELF']);
$current_route = trim($_GET['route'] ?? $_GET['click'] ?? $_GET['page'] ?? '', '/');
$is_home_active = (empty($current_route) || $current_route == 'home');
?>
<style>
    #main-navbar-wrapper {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }
    @media (min-width: 1024px) {
        #mobileMenuToggle {
            display: none !important;
        }
        #navbarCollapse {
            display: flex !important;
        }
        /* Smooth Dropdown Enter/Exit Animation */
        .nav-dropdown-menu {
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px) scale(0.98);
            transform-origin: top left;
            transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                        visibility 0.25s;
            pointer-events: none;
            border-radius: 16px !important;
        }
        .group:hover .nav-dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }
    }
    @media (max-width: 1023px) {
        #mobileMenuToggle {
            display: flex !important;
        }
        #navbarCollapse {
            display: none !important;
        }
        .nav-dropdown-menu {
            overflow: hidden !important;
            border-radius: 16px !important;
        }
    }

    /* Chevron Rotation on Hover */
    .fa-chevron-down {
        transition: transform 0.25s ease, color 0.25s ease;
    }
    .group:hover .fa-chevron-down {
        transform: rotate(180deg);
        color: #5f2d8c !important;
    }

    /* Sub-menu Item Hover Effect */
    .nav-dropdown-item {
        display: block;
        padding: 10px 18px;
        font-size: 14px;
        color: #374151;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav-dropdown-item:hover {
        background-color: #f5f3ff !important;
        color: #5f2d8c !important;
        padding-left: 22px !important;
    }

    /* Fullscreen Glassmorphic Mobile Nav Overlay */
    #mobileNavOverlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(15, 10, 23, 0.96);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px 20px 32px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-20px);
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    visibility 0.35s;
        overflow-y: auto;
    }
    #mobileNavOverlay.mobile-menu-active {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
    }
    .mobile-nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 16px 0;
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        text-decoration: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        transition: color 0.2s ease, padding-left 0.2s ease;
        background: transparent;
        border-top: none;
        border-left: none;
        border-right: none;
        cursor: pointer;
        text-align: left;
    }
    .mobile-nav-link:hover, .mobile-nav-link:focus {
        color: #a855f7;
        padding-left: 8px;
    }
    .mobile-sub-accordion {
        display: none;
        flex-direction: column;
        padding: 10px 0 16px 14px;
        gap: 6px;
        border-left: 2px solid rgba(124, 58, 237, 0.5);
        margin-left: 8px;
        margin-top: 4px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .mobile-sub-accordion.active {
        display: flex;
    }
    .mobile-sub-category-header {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 700;
        color: #c084fc;
        letter-spacing: 0.3px;
        margin-top: 8px;
        margin-bottom: 4px;
    }
    .mobile-sub-category-badge {
        background: rgba(124, 58, 237, 0.25);
        color: #e9d5ff;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 11.5px;
        font-weight: 800;
        border: 1px solid rgba(124, 58, 237, 0.4);
    }
    .mobile-sub-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        font-weight: 500;
        color: #cbd5e1;
        text-decoration: none;
        transition: all 0.2s ease;
        padding: 8px 12px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
    }
    .mobile-sub-link:hover, .mobile-sub-link:active {
        color: #ffffff;
        background: rgba(95, 45, 140, 0.3);
        transform: translateX(4px);
    }
    .mobile-sub-link-left {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .mobile-sub-bullet-pill {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #8b5cf6;
        flex-shrink: 0;
    }
    .mobile-sub-link-icon {
        font-size: 11px;
        color: #94a3b8;
        transition: transform 0.2s ease, color 0.2s ease;
    }
    .mobile-sub-link:hover .mobile-sub-link-icon, .mobile-sub-link:active .mobile-sub-link-icon {
        color: #ffffff;
        transform: translateX(2px);
    }
</style>

<!-- Navbar Start -->
<div id="main-navbar-wrapper" style="position: fixed; top: 12px; left: 0; right: 0; z-index: 50; width: 100%; padding: 0 16px; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); background: transparent !important; pointer-events: none;">
    <div style="max-width: 1240px; margin: 0 auto; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 9999px; border: 1px solid rgba(229, 231, 235, 0.9); box-shadow: 0 12px 35px -10px rgba(95, 45, 140, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04); padding: 8px 24px; position: relative; pointer-events: auto;">
        <nav style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 48px;">
            
            <!-- Brand Logo -->
            <a href="index.php" style="display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0;" data-magnetic>
                <img id="navBrandLogo" src="02_design/DBTLOGO.png" alt="DBT Logo" style="width: 44px; height: 44px; min-width: 44px; min-height: 44px; max-width: 44px; max-height: 44px; object-fit: contain; flex-shrink: 0; display: block;">
                <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.2;">
                    <span style="font-size: 15px; font-weight: 700; color: #111827; white-space: nowrap;">แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล</span>
                    <span style="font-size: 11px; color: #7c3aed; font-weight: 600; letter-spacing: 0.05em; white-space: nowrap;">Digital Business Technology</span>
                </div>
            </a>

            <!-- Mobile Toggle Button -->
            <button id="mobileMenuToggle" style="width: 40px; height: 40px; border-radius: 9999px; background: #f9fafb; border: 1px solid #e5e7eb; align-items: center; justify-content: center; color: #374151; cursor: pointer;" aria-label="Toggle Navigation">
                <i class="fa fa-bars" style="font-size: 18px;"></i>
            </button>

            <!-- Desktop Nav Links Container -->
            <div id="navbarCollapse" style="align-items: center; gap: 4px;">
                
                <!-- หน้าแรก -->
                <a href="index.php" style="white-space: nowrap; padding: 5px 16px; font-size: 15px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; <?= $is_home_active ? 'color: #5f2d8c;' : 'color: #374151;' ?> border-radius: 9999px;" data-magnetic>
                    <span class="link-draw-underline">หน้าแรก</span>
                </a>

                <!-- หลักสูตรที่เปิดสอน (Dropdown) -->
                <div class="relative group" style="position: relative;">
                    <button style="white-space: nowrap; padding: 6px 14px; font-size: 15px; font-weight: 500; color: #374151; background: transparent; border: none; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" data-magnetic>
                        <span class="link-draw-underline">หลักสูตรที่เปิดสอน</span>
                        <i class="fa fa-chevron-down" style="font-size: 11px; color: #9ca3af;"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div class="nav-dropdown-menu lg:absolute left-0 top-full mt-2 z-50" style="min-width: 250px; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 8px 0; overflow: hidden;">
                        <a href="index.php?click=dbt_voc" class="nav-dropdown-item">
                            <div style="font-weight: 600;">ระดับ ปวช.</div>
                            <div style="font-size: 12px; color: #6b7280;">สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล (3 ปี)</div>
                        </a>
                        <div style="height: 1px; background: #f3f4f6; margin: 4px 16px;"></div>
                        <a href="index.php?click=dbt_dip" class="nav-dropdown-item">
                            <div style="font-weight: 600;">ระดับ ปวส.</div>
                            <div style="font-size: 12px; color: #6b7280;">สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล (2 ปี)</div>
                        </a>
                    </div>
                </div>

                <!-- แนะนำแผนกฯ (Dropdown) -->
                <div class="relative group" style="position: relative;">
                    <button style="white-space: nowrap; padding: 6px 14px; font-size: 15px; font-weight: 500; color: #374151; background: transparent; border: none; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" data-magnetic>
                        <span class="link-draw-underline">แนะนำแผนกฯ</span>
                        <i class="fa fa-chevron-down" style="font-size: 11px; color: #9ca3af;"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div class="nav-dropdown-menu lg:absolute left-0 top-full mt-2 z-50" style="min-width: 220px; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 6px 0; overflow: hidden;">
                        <a href="index.php?click=0_techer" class="nav-dropdown-item">คณะครูและบุคลากร</a>
                        <a href="index.php?click=c_all" class="nav-dropdown-item">อาคารเรียน/ห้องปฏิบัติการ</a>
                    </div>
                </div>

                <!-- ผลงานและรางวัล -->
                <a href="index.php?click=graduate" style="white-space: nowrap; padding: 6px 14px; font-size: 15px; font-weight: 500; color: #374151; text-decoration: none; border-radius: 9999px; transition: all 0.2s;" data-magnetic>
                    <span class="link-draw-underline">ผลงานและรางวัล</span>
                </a>

                <!-- สมัครเรียน (Dropdown) -->
                <div class="relative group" style="position: relative;">
                    <button style="white-space: nowrap; padding: 6px 14px; font-size: 15px; font-weight: 500; color: #374151; background: transparent; border: none; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" data-magnetic>
                        <span class="link-draw-underline">สมัครเรียน</span>
                        <i class="fa fa-chevron-down" style="font-size: 11px; color: #9ca3af;"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div class="nav-dropdown-menu lg:absolute left-0 top-full mt-2 z-50" style="min-width: 220px; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 6px 0; overflow: hidden;">
                        <a href="01_document/ระบบรับสมัครนักศึกษา_คู่มือการใช้งานสำหรับผู้สมัครเรียน.pdf" target="_blank" rel="noopener noreferrer" class="nav-dropdown-item">คู่มือสมัครเรียนออนไลน์</a>
                        <a href="https://admission.vec.go.th/" target="_blank" rel="noopener noreferrer" class="nav-dropdown-item">สมัครเรียนออนไลน์ (VEC)</a>
                    </div>
                </div>

            </div>

            <!-- Contact Info Widget -->
            <div class="hidden xl:flex" style="align-items: center; gap: 12px; padding-left: 16px; border-left: 1px solid rgba(229, 231, 235, 0.8); flex-shrink: 0;">
                <a href="tel:053713036" style="width: 42px; height: 42px; min-width: 42px; min-height: 42px; max-width: 42px; max-height: 42px; border-radius: 9999px; background: #fdf4ff; border: 1px solid #f0abfc; display: flex; align-items: center; justify-content: center; color: #5f2d8c; text-decoration: none; position: relative; flex-shrink: 0;" data-magnetic aria-label="Contact Phone">
                    <i class="fa fa-phone-alt" style="font-size: 16px;"></i>
                    <span style="position: absolute; top: -2px; right: -2px; width: 15px; height: 15px; background: #5f2d8c; border: 2px solid #ffffff; border-radius: 9999px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa fa-comment-dots" style="font-size: 7px; color: #ffffff;"></i>
                    </span>
                </a>
                <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.25;">
                    <span style="font-size: 12px; color: #9ca3af; white-space: nowrap;">ติดต่อสอบถามข้อมูล</span>
                    <a href="tel:053713036" style="font-size: 15px; font-weight: 700; color: #111827; text-decoration: none; white-space: nowrap;">053 713 036 ต่อ 109</a>
                </div>
            </div>

        </nav>
    </div>
</div>
<!-- Navbar End -->

<!-- Fullscreen Glassmorphic Mobile Menu Overlay -->
<div id="mobileNavOverlay" aria-label="Mobile Navigation Overlay">
    <div>
        <!-- Overlay Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.12);">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="02_design/DBTLOGO.png" alt="DBT Logo" style="width: 40px; height: 40px; object-fit: contain;">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 15px; font-weight: 700; color: #ffffff;">แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล</span>
                    <span style="font-size: 11px; color: #c084fc; font-weight: 600; letter-spacing: 0.05em;">CVC DBT DEPARTMENT</span>
                </div>
            </div>
            <button id="mobileMenuClose" style="width: 42px; height: 42px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" aria-label="Close Mobile Navigation">
                <i class="fa fa-times" style="font-size: 18px;"></i>
            </button>
        </div>

        <!-- Overlay Navigation Links -->
        <div style="display: flex; flex-direction: column; margin-top: 16px;">
            <!-- หน้าแรก -->
            <a href="index.php" class="mobile-nav-link">
                <span>หน้าแรก</span>
                <i class="fa fa-arrow-right" style="font-size: 14px; opacity: 0.5;"></i>
            </a>

            <!-- หลักสูตรที่เปิดสอน (Accordion) -->
            <button type="button" class="mobile-nav-link" onclick="toggleMobileAccordion('acc-majors', this)">
                <span>หลักสูตรที่เปิดสอน</span>
                <i class="fa fa-chevron-down acc-icon" style="font-size: 14px; opacity: 0.5; transition: transform 0.25s ease;"></i>
            </button>
            <div id="acc-majors" class="mobile-sub-accordion">
                <div class="mobile-sub-category-header">
                    <span class="mobile-sub-category-badge">ระดับ ปวช.</span>
                    <span>หลักสูตรวิชาชีพ (3 ปี)</span>
                </div>
                <a href="index.php?click=dbt_voc" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล</span>
                    </div>
                    <i class="fa fa-chevron-right mobile-sub-link-icon"></i>
                </a>

                <div class="mobile-sub-category-header" style="margin-top: 12px;">
                    <span class="mobile-sub-category-badge">ระดับ ปวส.</span>
                    <span>หลักสูตรวิชาชีพชั้นสูง (2 ปี)</span>
                </div>
                <a href="index.php?click=dbt_dip" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล</span>
                    </div>
                    <i class="fa fa-chevron-right mobile-sub-link-icon"></i>
                </a>
            </div>

            <!-- แนะนำแผนกฯ (Accordion) -->
            <button type="button" class="mobile-nav-link" onclick="toggleMobileAccordion('acc-about', this)">
                <span>แนะนำแผนกฯ</span>
                <i class="fa fa-chevron-down acc-icon" style="font-size: 14px; opacity: 0.5; transition: transform 0.25s ease;"></i>
            </button>
            <div id="acc-about" class="mobile-sub-accordion">
                <a href="index.php?click=0_techer" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>คณะครูและบุคลากร</span>
                    </div>
                    <i class="fa fa-chevron-right mobile-sub-link-icon"></i>
                </a>
                <a href="index.php?click=c_all" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>อาคารเรียน / ห้องปฏิบัติการ</span>
                    </div>
                    <i class="fa fa-chevron-right mobile-sub-link-icon"></i>
                </a>
            </div>

            <!-- ผลงานและรางวัล -->
            <a href="index.php?click=graduate" class="mobile-nav-link">
                <span>ผลงานและรางวัล</span>
                <i class="fa fa-arrow-right" style="font-size: 14px; opacity: 0.5;"></i>
            </a>

            <!-- สมัครเรียน (Accordion) -->
            <button type="button" class="mobile-nav-link" onclick="toggleMobileAccordion('acc-apply', this)">
                <span>สมัครเรียน</span>
                <i class="fa fa-chevron-down acc-icon" style="font-size: 14px; opacity: 0.5; transition: transform 0.25s ease;"></i>
            </button>
            <div id="acc-apply" class="mobile-sub-accordion">
                <a href="01_document/ระบบรับสมัครนักศึกษา_คู่มือการใช้งานสำหรับผู้สมัครเรียน.pdf" target="_blank" rel="noopener noreferrer" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>คู่มือสมัครเรียนออนไลน์</span>
                    </div>
                    <i class="fa fa-file-pdf mobile-sub-link-icon" style="font-size: 12px;"></i>
                </a>
                <a href="https://admission.vec.go.th/" target="_blank" rel="noopener noreferrer" class="mobile-sub-link">
                    <div class="mobile-sub-link-left">
                        <span class="mobile-sub-bullet-pill"></span>
                        <span>ระบบสมัครเรียนออนไลน์ VEC</span>
                    </div>
                    <i class="fa fa-external-link-alt mobile-sub-link-icon" style="font-size: 10px;"></i>
                </a>
            </div>
        </div>
    </div>

    <!-- Overlay Footer Contact Card -->
    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 16px; margin-top: 24px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; color: #9ca3af;">สอบถามข้อมูลสมัครเรียน</span>
            <a href="tel:053713036" style="font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none;">053 713 036 ต่อ 109</a>
        </div>
        <a href="tel:053713036" style="padding: 10px 18px; background: #5f2d8c; color: #ffffff; border-radius: 9999px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa fa-phone-alt" style="font-size: 12px;"></i>
            <span>โทรออก</span>
        </a>
    </div>
</div>

<script>
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');

    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('mobile-menu-active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('mobile-menu-active');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Auto-close mobile navigation on any link click
    if (mobileNavOverlay) {
        mobileNavOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function toggleMobileAccordion(accId, btnEl) {
        const accordion = document.getElementById(accId);
        const icon = btnEl ? btnEl.querySelector('.acc-icon') : null;
        if (accordion) {
            const isExpanded = accordion.classList.contains('active');
            // Close all accordions first
            document.querySelectorAll('.mobile-sub-accordion').forEach(acc => acc.classList.remove('active'));
            document.querySelectorAll('.acc-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');
            
            if (!isExpanded) {
                accordion.classList.add('active');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        }
    }
</script>