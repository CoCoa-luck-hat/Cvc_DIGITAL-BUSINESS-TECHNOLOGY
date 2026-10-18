<?php
if (!defined('INDEX_LOADED')) {
    header("Location: ../index.php?click=c_all", true, 301);
    exit;
}
// Master Architecture Journal Gallery - Digital Business Technology Department (DBT CVC)
// Ultra-Premium Visual-First Dynamic Multi-Column Flex Masonry with Load More & Mobile Scroll Arrows
$targetRoom = isset($_GET['target']) ? trim($_GET['target']) : '';
if (empty($targetRoom) && isset($_GET['click'])) {
    $click = trim($_GET['click']);
    if (in_array($click, ['c_521', 'c_651', 'c_655', 'c_661', 'c_662', 'c_663', 'c_941'])) {
        $targetRoom = str_replace('c_', '', $click);
    }
}

// Curated Architecture Photo Database - DBT Department
$galleryItems = [
    // ROOM 651 (Building 6, Floor 5) - ห้องปฏิบัติการ E-Commerce & การตลาดดิจิทัล
    [ "src" => "03_photo/3.7_room/6_651_0.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "ภาพรวมห้องปฏิบัติการพาณิชย์อิเล็กทรอนิกส์และธุรกิจดิจิทัล 651" ],
    [ "src" => "03_photo/3.7_room/6_651_1.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "สถานีคอมพิวเตอร์สำหรับการจัดการร้านค้าออนไลน์และการตลาดดิจิทัล" ],
    [ "src" => "03_photo/3.7_room/6_651_2.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "สื่อการเรียนการสอนและโปรเจกต์ดิจิทัลคอมเมิร์ซ" ],
    [ "src" => "03_photo/3.7_room/6_651_3.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "บรรยากาศการจำลองแพลตฟอร์มธุรกิจออนไลน์" ],
    [ "src" => "03_photo/3.7_room/6_651_4.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "การฝึกปฏิบัติการวิเคราะห์ข้อมูลและกลยุทธ์การขาย" ],
    [ "src" => "03_photo/3.7_room/6_651_5.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "โต๊ะปฏิบัติการพร้อมจอแสดงผลมาตรฐาน" ],
    [ "src" => "03_photo/3.7_room/6_651_6.jpg", "room" => "651", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 651", "caption" => "มุมมองกว้างห้องปฏิบัติการ E-Commerce 651" ],

    // ROOM 655 (Building 6, Floor 5) - ห้องปฏิบัติการระบบเครือข่าย & ซอฟต์แวร์ประยุกต์ธุรกิจ
    [ "src" => "03_photo/3.7_room/6_655_0.jpg", "room" => "655", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 655", "caption" => "ภาพรวมห้องปฏิบัติการระบบสารสนเทศและการประยุกต์ซอฟต์แวร์ 655" ],
    [ "src" => "03_photo/3.7_room/6_655_1.jpg", "room" => "655", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 655", "caption" => "สถานีทดสอบและฝึกปฏิบัติการระบบธุรกิจดิจิทัล" ],
    [ "src" => "03_photo/3.7_room/6_655_2.jpg", "room" => "655", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 5)", "roomLabel" => "ห้อง 655", "caption" => "บรรยากาศการเรียนรู้และการจัดการข้อมูลธุรกิจ" ],

    // ROOM 661 (Building 6, Floor 6) - ห้องปฏิบัติการคอมพิวเตอร์ธุรกิจดิจิทัล
    [ "src" => "03_photo/3.7_room/6_661_0.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "ภาพรวมห้องปฏิบัติการคอมพิวเตอร์ธุรกิจดิจิทัล 661" ],
    [ "src" => "03_photo/3.7_room/6_661_1.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "สถานีคอมพิวเตอร์สมรรถนะสูงสำหรับการประมวลผลข้อมูล" ],
    [ "src" => "03_photo/3.7_room/6_661_2.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "สภาพแวดล้อมการเรียนรู้ด้านการจัดการธุรกิจดิจิทัล" ],
    [ "src" => "03_photo/3.7_room/6_661_3.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "มุมจอภาพสำหรับการฝึกปฏิบัติการบัญชีและระบบสารสนเทศ" ],
    [ "src" => "03_photo/3.7_room/6_661_4.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "โต๊ะปฏิบัติการและการจัดวางพื้นที่การสอนที่ทันสมัย" ],
    [ "src" => "03_photo/3.7_room/6_661_5.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "บรรยากาศการฝึกทักษะการนำเสนอและการวิเคราะห์ข้อมูล" ],
    [ "src" => "03_photo/3.7_room/6_661_6.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "การพัฒนางานโปรเจกต์ดิจิทัลของนักศึกษา" ],
    [ "src" => "03_photo/3.7_room/6_661_7.png", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "มุมมองกว้างห้องปฏิบัติการคอมพิวเตอร์ 661" ],
    [ "src" => "03_photo/3.7_room/6_661_8.jpg", "room" => "661", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 661", "caption" => "อุปกรณ์เชื่อมต่อและโครงสร้างพื้นฐานระบบดิจิทัล" ],

    // ROOM 662 (Building 6, Floor 6) - สตูดิโอดิจิทัลคอนเทนต์ & ถ่ายทอดสด Live Commerce
    [ "src" => "03_photo/3.7_room/6_662_0.jpg", "room" => "662", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 662", "caption" => "สตูดิโอถ่ายทอดสดและผลิตคอนเทนต์ดิจิทัล 662" ],
    [ "src" => "03_photo/3.7_room/6_662_1.png", "room" => "662", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 662", "caption" => "ชุดอุปกรณ์ไฟสตูดิโอ กล้อง และฉาก Green Screen สำหรับไลฟ์สด" ],
    [ "src" => "03_photo/3.7_room/6_662_2.png", "room" => "662", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 662", "caption" => "มุมสถานีควบคุมการสตรีมมิ่งและการตัดต่อวิดีโอเพื่อการค้า" ],

    // ROOM 663 (Building 6, Floor 6) - ห้องปฏิบัติการพัฒนาสื่อดิจิทัล & นวัตกรรมธุรกิจ
    [ "src" => "03_photo/3.7_room/6_663_0.jpg", "room" => "663", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 663", "caption" => "ภาพรวมห้องปฏิบัติการสื่อดิจิทัลและนวัตกรรม 663" ],
    [ "src" => "03_photo/3.7_room/6_663_1.jpg", "room" => "663", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 663", "caption" => "สถานีคอมพิวเตอร์สำหรับการออกแบบสื่อโฆษณาและการตลาด" ],
    [ "src" => "03_photo/3.7_room/6_663_2.jpg", "room" => "663", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 663", "caption" => "บรรยากาศการเรียนรู้เชิงปฏิบัติการออกแบบแบรนด์" ],
    [ "src" => "03_photo/3.7_room/6_663_3.jpg", "room" => "663", "building" => "b6", "buildingLabel" => "อาคาร 6 (ชั้น 6)", "roomLabel" => "ห้อง 663", "caption" => "มุมมองกว้างโต๊ะปฏิบัติการและสื่อการสอนห้อง 663" ],
    [ "src" => "03_photo/3.7_room/6.jpg", "room" => "b6", "building" => "b6", "buildingLabel" => "อาคาร 6", "roomLabel" => "อาคารปฏิบัติการ", "caption" => "ทัศนียภาพภายนอก อาคาร 6 (อาคารปฏิบัติการวิชาชีพ)" ],

    // ROOM 521 (Building 5, Floor 2) - ห้องปฏิบัติการคอมพิวเตอร์กราฟิก & เทคโนโลยีดิจิทัล
    [ "src" => "03_photo/3.7_room/5_521_0.jpg", "room" => "521", "building" => "b5", "buildingLabel" => "อาคาร 5 (ชั้น 2)", "roomLabel" => "ห้อง 521", "caption" => "ภาพรวมห้องปฏิบัติการคอมพิวเตอร์กราฟิกและสื่อดิจิทัล 521" ],
    [ "src" => "03_photo/3.7_room/5_521_1.jpg", "room" => "521", "building" => "b5", "buildingLabel" => "อาคาร 5 (ชั้น 2)", "roomLabel" => "ห้อง 521", "caption" => "สถานีคอมพิวเตอร์สำหรับการสร้างสรรค์สื่อดิจิทัล" ],
    [ "src" => "03_photo/3.7_room/5_521_2.jpg", "room" => "521", "building" => "b5", "buildingLabel" => "อาคาร 5 (ชั้น 2)", "roomLabel" => "ห้อง 521", "caption" => "บรรยากาศโต๊ะปฏิบัติการและระบบเครือข่ายห้อง 521" ],
    [ "src" => "03_photo/3.7_room/5_521_3.jpg", "room" => "521", "building" => "b5", "buildingLabel" => "อาคาร 5 (ชั้น 2)", "roomLabel" => "ห้อง 521", "caption" => "มุมจอภาพแสดงผลและสื่อการสอนดิจิทัล" ],
    [ "src" => "03_photo/3.7_room/5_521_4.jpg", "room" => "521", "building" => "b5", "buildingLabel" => "อาคาร 5 (ชั้น 2)", "roomLabel" => "ห้อง 521", "caption" => "สภาพแวดล้อมการเรียนรู้และการฝึกทักษะมัลติมีเดีย" ],
    [ "src" => "03_photo/3.7_room/5.jpg", "room" => "b5", "building" => "b5", "buildingLabel" => "อาคาร 5", "roomLabel" => "อาคาร 5", "caption" => "ทัศนียภาพภายนอก อาคาร 5" ],

    // ROOM 941 (Building 9, Floor 4) - ห้องปฏิบัติการสัมมนา & เวิร์กช็อปนวัตกรรมดิจิทัล
    [ "src" => "03_photo/3.7_room/9_941_0.png", "room" => "941", "building" => "b9", "buildingLabel" => "อาคาร 9 (ชั้น 4)", "roomLabel" => "ห้อง 941", "caption" => "ห้องปฏิบัติการสัมมนาและนำเสนองานนวัตกรรมธุรกิจดิจิทัล 941" ],
    [ "src" => "03_photo/3.7_room/9_941_1.png", "room" => "941", "building" => "b9", "buildingLabel" => "อาคาร 9 (ชั้น 4)", "roomLabel" => "ห้อง 941", "caption" => "พื้นที่จัดกิจกรรมเวิร์กช็อปและการระดมสมองแบบ Smart Workspace" ],
    [ "src" => "03_photo/3.7_room/9.jpg", "room" => "b9", "building" => "b9", "buildingLabel" => "อาคาร 9", "roomLabel" => "อาคาร 9", "caption" => "ทัศนียภาพภายนอก อาคาร 9 (อาคารเฉลิมพระเกียรติฯ)" ],
];

$totalCount = count($galleryItems);
$initialLimit = 12;
?>

<!-- Modular Stylesheet -->
<link rel="stylesheet" href="include/css/modules/classroom.css?v=<?= function_exists('asset_v') ? asset_v('include/css/modules/classroom.css') : '2.0.0' ?>">

<!-- MAIN ARCHITECTURAL JOURNAL STAGE -->
<section id="maj-architecture-journal">
    
    <!-- Atmospheric Blueprint Grid & Ambient Lights -->
    <div class="maj-blueprint-grid"></div>
    <div class="maj-ambient-glow"></div>

    <div class="maj-container">
        
        <!-- 1. MINIMAL ELEGANT HEADER -->
        <header class="maj-header-wrap">
            <h1 class="maj-main-title">
                อาคารเรียน &amp; <span class="maj-crimson-text">ห้องปฏิบัติการ</span>
            </h1>
            <p class="maj-sub-desc">
                ทัศนียภาพและบรรยากาศห้องปฏิบัติการเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาเชียงราย
            </p>
        </header>

        <!-- 2. SLEEK FLOATING FILTER CAPSULE BAR WITH ARROW BUTTONS -->
        <div class="maj-filter-bar-container">
            <div class="maj-filter-scroll-wrapper">
                <button class="maj-filter-arrow maj-filter-arrow-left" id="maj-filter-prev" type="button" aria-label="เลื่อนแถบซ้าย">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <nav class="maj-filter-bar" id="maj-filter-bar" aria-label="หมวดหมู่อาคารเรียน">
                    <button class="maj-filter-item-btn active" data-filter="all" type="button">
                        <span>ทั้งหมด</span>
                        <span class="maj-count-badge" id="maj-total-count"><?= $totalCount ?></span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="b6" type="button">
                        <span>อาคาร 6</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="b5" type="button">
                        <span>อาคาร 5</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="b9" type="button">
                        <span>อาคาร 9</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="651" type="button">
                        <span>ห้อง 651</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="655" type="button">
                        <span>ห้อง 655</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="661" type="button">
                        <span>ห้อง 661</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="662" type="button">
                        <span>ห้อง 662</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="663" type="button">
                        <span>ห้อง 663</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="521" type="button">
                        <span>ห้อง 521</span>
                    </button>
                    <button class="maj-filter-item-btn" data-filter="941" type="button">
                        <span>ห้อง 941</span>
                    </button>
                </nav>
                <button class="maj-filter-arrow maj-filter-arrow-right" id="maj-filter-next" type="button" aria-label="เลื่อนแถบขวา">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <!-- 3. VISUAL-FIRST MULTI-COLUMN FLEX MASONRY (Server-Side Rendered Initial 12 Items) -->
        <main class="maj-masonry-wrapper" id="maj-masonry-wrapper">
            <div class="maj-masonry-col" id="maj-col-0">
                <?php for ($idx = 0; $idx < min($initialLimit, $totalCount); $idx++): if ($idx % 3 === 0): $item = $galleryItems[$idx]; ?>
                    <figure class="maj-photo-tile" onclick="openCinematicLightbox(<?= $idx ?>)" data-idx="<?= $idx ?>" data-room="<?= htmlspecialchars($item['room']) ?>" data-building="<?= htmlspecialchars($item['building']) ?>">
                        <img src="<?= htmlspecialchars($item['src']) ?>" alt="<?= htmlspecialchars($item['caption']) ?>" class="maj-tile-img" loading="lazy" decoding="async">
                        <div class="maj-hover-scrim">
                            <div class="maj-hover-top-badges">
                                <span class="maj-badge-building-tag"><i class="fas fa-map-marker-alt"></i> <?= htmlspecialchars($item['buildingLabel']) ?></span>
                                <div class="maj-badge-zoom-icon"><i class="fas fa-search-plus"></i></div>
                            </div>
                            <div class="maj-hover-content">
                                <div class="maj-hover-room-code"><?= htmlspecialchars($item['roomLabel']) ?></div>
                            </div>
                        </div>
                    </figure>
                <?php endif; endfor; ?>
            </div>

            <div class="maj-masonry-col" id="maj-col-1">
                <?php for ($idx = 0; $idx < min($initialLimit, $totalCount); $idx++): if ($idx % 3 === 1): $item = $galleryItems[$idx]; ?>
                    <figure class="maj-photo-tile" onclick="openCinematicLightbox(<?= $idx ?>)" data-idx="<?= $idx ?>" data-room="<?= htmlspecialchars($item['room']) ?>" data-building="<?= htmlspecialchars($item['building']) ?>">
                        <img src="<?= htmlspecialchars($item['src']) ?>" alt="<?= htmlspecialchars($item['caption']) ?>" class="maj-tile-img" loading="lazy" decoding="async">
                        <div class="maj-hover-scrim">
                            <div class="maj-hover-top-badges">
                                <span class="maj-badge-building-tag"><i class="fas fa-map-marker-alt"></i> <?= htmlspecialchars($item['buildingLabel']) ?></span>
                                <div class="maj-badge-zoom-icon"><i class="fas fa-search-plus"></i></div>
                            </div>
                            <div class="maj-hover-content">
                                <div class="maj-hover-room-code"><?= htmlspecialchars($item['roomLabel']) ?></div>
                            </div>
                        </div>
                    </figure>
                <?php endif; endfor; ?>
            </div>

            <div class="maj-masonry-col" id="maj-col-2">
                <?php for ($idx = 0; $idx < min($initialLimit, $totalCount); $idx++): if ($idx % 3 === 2): $item = $galleryItems[$idx]; ?>
                    <figure class="maj-photo-tile" onclick="openCinematicLightbox(<?= $idx ?>)" data-idx="<?= $idx ?>" data-room="<?= htmlspecialchars($item['room']) ?>" data-building="<?= htmlspecialchars($item['building']) ?>">
                        <img src="<?= htmlspecialchars($item['src']) ?>" alt="<?= htmlspecialchars($item['caption']) ?>" class="maj-tile-img" loading="lazy" decoding="async">
                        <div class="maj-hover-scrim">
                            <div class="maj-hover-top-badges">
                                <span class="maj-badge-building-tag"><i class="fas fa-map-marker-alt"></i> <?= htmlspecialchars($item['buildingLabel']) ?></span>
                                <div class="maj-badge-zoom-icon"><i class="fas fa-search-plus"></i></div>
                            </div>
                            <div class="maj-hover-content">
                                <div class="maj-hover-room-code"><?= htmlspecialchars($item['roomLabel']) ?></div>
                            </div>
                        </div>
                    </figure>
                <?php endif; endfor; ?>
            </div>
        </main>

        <!-- 4. LOAD MORE BUTTON SECTION -->
        <div class="maj-load-more-wrap" id="maj-load-more-wrap">
            <button class="maj-btn-load-more" id="maj-btn-load-more" type="button">
                <span class="maj-btn-load-text">ดูภาพเพิ่มเติม</span>
                <span class="maj-btn-load-count" id="maj-load-count-badge">+6</span>
                <i class="fas fa-arrow-down maj-btn-load-icon"></i>
            </button>
        </div>

    </div>
</section>

<!-- 5. CINEMATIC ULTRA-MINIMAL FULLSCREEN LIGHTBOX -->
<div id="maj-cinematic-lightbox" role="dialog" aria-modal="true" aria-label="ภาพถ่ายห้องเรียน">
    
    <!-- Top Bar -->
    <div class="maj-lb-top-bar">
        <div class="maj-lb-room-title">
            <i class="fas fa-building" style="color: #8b5cf6;"></i>
            <span id="maj-lb-room-text">ห้อง 651 — อาคาร 6 ชั้น 5</span>
        </div>
        <button class="maj-lb-close-btn" id="maj-btn-close-lb" type="button" aria-label="ปิด">
            <i class="fas fa-times"></i>
        </button>
    </div>

    <!-- Main Visual Stage -->
    <div class="maj-lb-stage">
        <button class="maj-lb-arrow-btn maj-lb-prev" id="maj-lb-prev" type="button" aria-label="ภาพก่อนหน้า">
            <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="maj-lb-img-wrap">
            <img src="" alt="ภาพบรรยากาศห้องเรียน" class="maj-lb-main-img" id="maj-lb-img">
        </div>

        <button class="maj-lb-arrow-btn maj-lb-next" id="maj-lb-next" type="button" aria-label="ภาพถัดไป">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>

    <!-- Bottom Floating Counter Bar -->
    <div class="maj-lb-bottom-bar">
        <div class="maj-lb-counter-pill" id="maj-lb-counter">1 / <?= $totalCount ?></div>
    </div>
</div>

<!-- Pass PHP Classroom Data & Load Modular Engine -->
<script>
    window.__CLASSROOM_ITEMS__ = <?= json_encode($galleryItems, JSON_UNESCAPED_UNICODE) ?>;
    window.__CLASSROOM_TARGET_ROOM__ = "<?= htmlspecialchars($targetRoom, ENT_QUOTES, 'UTF-8') ?>";
</script>
<script src="include/js/modules/classroom.js?v=<?= function_exists('asset_v') ? asset_v('include/js/modules/classroom.js') : '2.0.0' ?>"></script>