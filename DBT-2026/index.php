<?php
define('INDEX_LOADED', true);
error_reporting(0);

// Unified Master Router
$route = trim($_GET['route'] ?? $_GET['click'] ?? $_GET['page'] ?? '', '/');

// Dynamic Base URL Engine (Supports Cloudflare & Reverse Proxies)
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    || (($_SERVER['SERVER_PORT'] ?? 80) == 443);
$protocol = $isHttps ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/\\');
$baseUrl = $protocol . $host . ($scriptDir ? $scriptDir : '');
$currentUrl = $baseUrl . '/' . ($route ? '?route=' . urlencode($route) : '');
$ogImageUrl = $baseUrl . '/02_design/DBTLOGO.png';

// Asset versioning helper using filemtime for optimized browser caching
function asset_v($relativePath) {
    $fullPath = __DIR__ . '/' . ltrim($relativePath, '/');
    return file_exists($fullPath) ? filemtime($fullPath) : '2.0.0';
}

// Dynamic SEO & Metadata Engine
$metaTitles = [
    '' => 'แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล | วิทยาลัยอาชีวศึกษาเชียงราย (CVC)',
    'home' => 'แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล | วิทยาลัยอาชีวศึกษาเชียงราย (CVC)',
    '0_techer' => 'คณะครูและบุคลากร | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'teachers' => 'คณะครูและบุคลากร | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'c_all' => 'อาคารเรียนและห้องปฏิบัติการ | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'classroom' => 'อาคารเรียนและห้องปฏิบัติการ | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'graduate' => 'ผลงานและรางวัลเชิดชูเกียรติ | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards' => 'ผลงานและรางวัลเชิดชูเกียรติ | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards_dbt' => 'ผลงานแผนกวิชา | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards_dept' => 'ผลงานแผนกวิชา | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards_it' => 'ผลงานแผนกวิชา | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards_student' => 'ผลงานนักเรียน-นักศึกษา | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'awards_sd' => 'ผลงานนักเรียน-นักศึกษา | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'dbt_voc' => 'หลักสูตร ปวช. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'dbt_pvc' => 'หลักสูตร ปวช. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'it_coo1' => 'หลักสูตร ปวช. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'pvc' => 'หลักสูตร ปวช. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'dbt_dip' => 'หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'dbt_pvs' => 'หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'it_s1' => 'หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'pvs' => 'หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
    'pvs_it' => 'หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล | แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC',
];

$pageTitle = $metaTitles[$route] ?? 'แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล | วิทยาลัยอาชีวศึกษาเชียงราย';
$pageDescription = 'หลักสูตรวิชาชีพด้านเทคโนโลยีธุรกิจดิจิทัล นวัตกรรมธุรกิจ ข้อมูลและอีคอมเมิร์ซ วิทยาลัยอาชีวศึกษาเชียงราย มุ่งสู่อนาคตดิจิทัลระดับมืออาชีพ';

// Route Classification for High-Performance Conditional Asset Delivery
$facultyRoutes = ['0_techer', 'teachers', 'teacher', '1_suriya', '2_Anekwong', '3_phithul', '4_jinda', '5_anuphl', '6_songkarn', '7_sumaet', '8_Kritsanawich', '1_thawatchai', '2_piyamat', '3_plaopilart', '4_rodsathon', '5_teerapat'];
$classroomRoutes = ['c_all', 'c_521', 'c_651', 'c_655', 'c_661', 'c_662', 'c_663', 'c_941', 'c_241', 'c_242', 'c_653', 'c_654', 'classroom', 'classrooms'];
$graduateRoutes = ['graduate', 'graduates', 'awards', 'awards_dbt', 'awards_dept', 'awards_student', 'awards_stu', 'awards_it', 'awards_sd'];

$isFaculty = in_array($route, $facultyRoutes);
$isClassroom = in_array($route, $classroomRoutes);
$isGraduate = in_array($route, $graduateRoutes);
$isHome = ($route === '' || $route === 'home');
?>

<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="utf-8">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
    <meta name="keywords" content="เทคโนโลยีธุรกิจดิจิทัล, DBT, อาชีวะเชียงราย, CVC, ปวช., ปวส., ธุรกิจดิจิทัล, เชียงราย">
    <meta name="author" content="แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาเชียงราย">
    <meta name="theme-color" content="#5f2d8c">

    <!-- Canonical URL -->
    <link rel="canonical" href="<?= htmlspecialchars($currentUrl) ?>">

    <!-- Open Graph / Social Media Preview -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= htmlspecialchars($currentUrl) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($ogImageUrl) ?>">
    <meta property="og:site_name" content="Digital Business Technology CVC">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($pageTitle) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($pageDescription) ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($ogImageUrl) ?>">

    <!-- Structured Data (JSON-LD) for Rich Snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาเชียงราย",
      "alternateName": "Digital Business Technology Department CVC",
      "url": "<?= htmlspecialchars($baseUrl) ?>",
      "logo": "<?= htmlspecialchars($ogImageUrl) ?>",
      "description": "<?= htmlspecialchars($pageDescription) ?>",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "เมืองเชียงราย",
        "addressRegion": "เชียงราย",
        "addressCountry": "TH"
      },
      "sameAs": [
        "https://cvc.ac.th",
        "https://admission.vec.go.th/"
      ]
    }
    </script>

    <!-- PWA & Web App Icons -->
    <link rel="manifest" href="./manifest.json">
    <link rel="icon" type="image/png" href="02_design/DBTLOGO.png">
    <link rel="apple-touch-icon" href="02_design/DBTLOGO.png">

    <!-- Preload Critical Assets (LCP Optimization) -->
    <?php if ($isHome): ?>
    <link rel="preload" as="image" href="02_design/hero-poster.webp" fetchpriority="high">
    <?php endif; ?>

    <!-- Google Web Fonts (Optimized essential weights for blazing-fast mobile rendering) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet (High-reliability CDN) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

    <!-- Tailwind CSS -->
    <link href="include/css/tailwind.css?v=<?= asset_v('include/css/tailwind.css') ?>" rel="stylesheet">

    <!-- Custom Stylesheet with Smart Caching -->
    <link rel="stylesheet" href="include/css/test.css?v=<?= asset_v('include/css/test.css') ?>">

    <!-- Subpage Module Stylesheets (Conditional Route Loading) -->
    <?php if ($isFaculty): ?>
    <link rel="stylesheet" href="include/css/modules/faculty.css?v=<?= asset_v('include/css/modules/faculty.css') ?>">
    <?php elseif ($isClassroom): ?>
    <link rel="stylesheet" href="include/css/modules/classroom.css?v=<?= asset_v('include/css/modules/classroom.css') ?>">
    <?php elseif ($isGraduate): ?>
    <link rel="stylesheet" href="include/css/modules/graduate.css?v=<?= asset_v('include/css/modules/graduate.css') ?>">
    <?php endif; ?>
</head>


<body class="bg-neutral-bg text-neutral-text relative font-sans overflow-x-hidden">
    <!-- Fast Network-Adaptive PJAX Top Loading Indicator -->
    <div id="page-progress-bar" style="position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: #5f2d8c; z-index: 9999999; transition: width 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.3s ease; pointer-events: none; opacity: 0; box-shadow: 0 0 10px #5f2d8c, 0 0 5px #8b5cf6;"></div>

    <!-- Cinematic Dark Tech Preloader -->
    <?php include('include/preloader.php'); ?>

    <!-- Background Grid Pattern -->
    <div class="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-80" id="globalGridBg"></div>

    <div class="relative z-10 w-full">
        <!-- ส่วน เมนู -->
        <?php include('components/n_navbar.php'); ?>

        <!-- Dynamic Main Content Section -->
        <main id="swup-container">
            <?php
            switch ($route) {
                // 1. หลักสูตร ปวช. เทคโนโลยีธุรกิจดิจิทัล
                case 'dbt_voc':
                case 'dbt_pvc':
                case 'it_coo1':
                case 'pvc':
                    include('04_dbt_voc/dbt_voc1.php');
                    include('04_dbt_voc/dbt_voc2.php');
                    include('04_dbt_voc/dbt_voc3.php');
                    include('04_dbt_voc/dbt_voc4.php');
                    include('04_dbt_voc/dbt_voc5.php');
                    break;

                // 2. หลักสูตร ปวส. เทคโนโลยีธุรกิจดิจิทัล
                case 'dbt_dip':
                case 'dbt_pvs':
                case 'it_s1':
                case 'pvs_it':
                case 'pvs':
                    include('05_dbt_dip/dbt_dip1.php');
                    include('05_dbt_dip/dbt_dip2.php');
                    include('05_dbt_dip/dbt_dip3.php');
                    include('05_dbt_dip/dbt_dip4.php');
                    include('05_dbt_dip/dbt_dip5.php');
                    break;

                // 3. คณะครูผู้สอน (Unified 100vh Faculty Interactive Stage)
                case '0_techer':
                case 'teachers':
                case 'teacher':
                case '1_suriya':
                case '2_Anekwong':
                case '3_phithul':
                case '4_jinda':
                case '5_anuphl':
                case '6_songkarn':
                case '7_sumaet':
                case '8_Kritsanawich':
                case '1_thawatchai':
                case '2_piyamat':
                case '3_plaopilart':
                case '4_rodsathon':
                case '5_teerapat':
                    include('06_techer/0_techer.php');
                    break;

                // 4. แนะนำอาคารเรียน & ห้องปฏิบัติการ
                case 'c_all':
                case 'c_521':
                case 'c_651':
                case 'c_655':
                case 'c_661':
                case 'c_662':
                case 'c_663':
                case 'c_941':
                case 'c_241':
                case 'c_242':
                case 'c_653':
                case 'c_654':
                case 'classroom':
                case 'classrooms':
                    include('07_classroom/c_all.php');
                    break;

                // 5. ทำเนียบบัณฑิต & ผลงานรางวัล
                case 'graduate':
                case 'graduates':
                case 'awards':
                case 'awards_dbt':
                case 'awards_dept':
                case 'awards_student':
                case 'awards_stu':
                case 'awards_it':
                case 'awards_sd':
                    include('08_awards/graduate.php');
                    break;

                // 0. Default Homepage
                case '':
                case 'home':
                default:
                    include('00_home/carousel.php');
                    echo '<div class="bg-neutral-bg w-full relative z-10">';
                    include('00_home/content_1.php');
                    include('00_home/content_2.php');
                    include('00_home/content_steps.php');
                    include('00_home/content_ribbons.php');
                    include('00_home/content_jop.php');
                    include('00_home/content_review.php');
                    echo '</div>';
                    break;
            }
            ?>
        </main>
        
        <!-- ส่วน footer -->
        <?php include('components/footer.php'); ?>
    </div>

    <!-- GSAP Core & High-Performance Plugins -->
    <script src="include/js/vendor/gsap.min.js?v=<?= asset_v('include/js/vendor/gsap.min.js') ?>"></script>
    <script src="include/js/vendor/ScrollTrigger.min.js?v=<?= asset_v('include/js/vendor/ScrollTrigger.min.js') ?>"></script>
    <script src="include/js/vendor/Observer.min.js?v=<?= asset_v('include/js/vendor/Observer.min.js') ?>"></script>
    <script>
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof Observer !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, Observer);
        }
    </script>

    <!-- Template Javascript -->
    <script src="include/js/lenis.min.js?v=<?= asset_v('include/js/lenis.min.js') ?>"></script>
    <script src="include/js/main.js?v=<?= asset_v('include/js/main.js') ?>"></script>
    <script src="include/js/test.js?v=<?= asset_v('include/js/test.js') ?>"></script>

    <!-- Subpage Interactive Modules (Conditional Route Loading) -->
    <?php if ($isFaculty): ?>
    <script src="include/js/modules/faculty.js?v=<?= asset_v('include/js/modules/faculty.js') ?>"></script>
    <?php elseif ($isClassroom): ?>
    <script src="include/js/modules/classroom.js?v=<?= asset_v('include/js/modules/classroom.js') ?>"></script>
    <?php elseif ($isGraduate): ?>
    <script src="include/js/modules/graduate.js?v=<?= asset_v('include/js/modules/graduate.js') ?>"></script>
    <?php endif; ?>

    <!-- GSAP & Awwwards Page Transitions and Interactions -->
    <script src="include/js/awwwards.js?v=<?= asset_v('include/js/awwwards.js') ?>"></script>

    <!-- Preloader Engine -->
    <script src="include/js/preloader.js?v=<?= asset_v('include/js/preloader.js') ?>"></script>

    <script>
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    if (typeof window.lenis?.scrollTo === 'function') {
                        window.lenis.scrollTo(targetElement, { offset: -50 });
                    } else {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }
            });
        });
    </script>
</body>

</html>