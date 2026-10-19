/**
 * Faculty & Instructors Stage & Editorial Bio Morph Engine
 * Module: include/js/modules/faculty.js
 */
(function () {
    window.initFacultyPortfolioStage = function (forceReinit = false) {
        // 100% Accurate Faculty Database Synchronized with Individual Files
        const facultyDb = window.__FACULTY_DB__ || [
            {
                idx: 1,
                backdrop: "SURIYA",
                nick: "ครูอ๊อด",
                name: "นายสุริยา ต๊ะศรีเรือน",
                role: "หัวหน้าแผนกวิชาฯ • ครูชำนาญการพิเศษ (คศ.3)",
                img: "/03_photo/3.3_teacher/teacher_suriya.webp",
                link: "index.php?click=1_suriya",
                yt: null,
                skills: ["Programming", "Database", "Data Analysis", "Office 365", "SQL"],
                education: [
                    { degree: "ปริญญาโท: วิทยาศาสตรมหาบัณฑิต (วท.ม.)", major: "สาขาวิชา: เทคโนโลยีสารสนเทศ", inst: "มหาวิทยาลัยราชภัฏเชียงราย", logo: "/03_photo/icon/inst_crru.webp" },
                    { degree: "ปริญญาตรี: บริหารธุรกิจบัณฑิต (บธ.บ.)", major: "สาขาวิชา: ระบบสารสนเทศทางคอมพิวเตอร์", inst: "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงราย", logo: "/03_photo/icon/inst_rmutl.webp" },
                    { degree: "ป.วิชาชีพครู: ป. บัณฑิตวิชาชีพครู", major: "สาขาวิชา: วิชาชีพครู", inst: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", logo: "/03_photo/icon/inst_mcu.webp" }
                ],
                email: "Suruya.t@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            },
            {
                idx: 2,
                backdrop: "ANEKWONG",
                nick: "ครูน้อย",
                name: "ดร. อเนกวงศ์ ยอดดำเนิน",
                role: "ครูชำนาญการพิเศษ (คศ.3)",
                img: "/03_photo/3.3_teacher/teacher_anekwong.webp",
                link: "index.php?click=2_Anekwong",
                yt: null,
                skills: ["Computer Programming", "Wifi-multi sensor Network", "IoT Technology", "Me U & Smart Device", "Cyber Network"],
                education: [
                    { degree: "ปริญญาเอก: ปริญญาดุษฎีบัณฑิต", major: "สาขาวิชา: วิศวกรรมคอมพิวเตอร์", inst: "มหาวิทยาลัยแม่ฟ้าหลวง", logo: "/03_photo/icon/inst_mfu.webp" },
                    { degree: "ปริญญาโท: วิทยาศาสตรมหาบัณฑิต", major: "สาขาวิชา: วิทยาการคอมพิวเตอร์", inst: "มหาวิทยาลัยเชียงใหม่", logo: "/03_photo/icon/inst_cmu.webp" }
                ],
                email: "mycoreidea@gmail.com",
                tel: "053-713036 ต่อ 114"
            },
            {
                idx: 3,
                backdrop: "JINDA",
                nick: "ครูเจี๊ยบ",
                name: "นางสาวจินดา ใจเจ็น",
                role: "ครูพิเศษสอน (คศ.2)",
                img: "/03_photo/3.3_teacher/teacher_jinda.webp",
                link: "index.php?click=4_jinda",
                yt: null,
                skills: ["Microsoft Office", "Database", "Data Analytics", "Computer Network", "Google Applications"],
                education: [
                    { degree: "ปริญญาโท: การศึกษามหาบัณฑิต (กศ.ม.)", major: "สาขาวิชา: การบริหารการศึกษา", inst: "วิทยาลัยเชียงราย", logo: "/03_photo/icon/inst_cr_col.webp" },
                    { degree: "ปริญญาตรี: บริหารธุรกิจบัณฑิต (บธ.บ.)", major: "สาขาวิชา: คอมพิวเตอร์ธุรกิจ", inst: "มหาวิทยาลัยราชภัฏเชียงราย", logo: "/03_photo/icon/inst_crru.webp" }
                ],
                email: "jinda.j@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            },

            {
                idx: 4,
                backdrop: "ANUPHOL",
                nick: "ครูอนุพล",
                name: "นายอนุพล จูมพลาศรี",
                role: "ครูพิเศษสอน",
                img: "/03_photo/3.3_teacher/teacher_anupol.webp",
                link: "index.php?click=5_anuphl",
                yt: null,
                skills: ["Motion Graphics", "Software Development", "Graphic Design & Multimedia", "Web Design and Development", "Educational Technology Integration", "Project and Team Management"],
                education: [
                    { degree: "ปริญญาตรี: บริหารธุรกิจบัณฑิต (บธ.บ.)", major: "สาขาวิชา: ระบบสารสนเทศทางคอมพิวเตอร์", inst: "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา", logo: "/03_photo/icon/inst_rmutl.webp" }
                ],
                email: "anupol.j@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            },
            {
                idx: 5,
                backdrop: "RODSATHON",
                nick: "ครูหลิน",
                name: "นางสาวรสธร หลวงตา",
                role: "ครูพิเศษสอน",
                img: "/03_photo/3.3_teacher/teacher_rodsathon.webp",
                link: "index.php?click=4_rodsathon",
                yt: "https://www.youtube.com/@t-rodsathon/videos",
                skills: [
                    "การเขียนโปรแกรมและประยุกต์ใช้ AI",
                    "การออกแบบและพัฒนาเว็บแอปพลิเคชัน พร้อม UX/UI",
                    "การวิเคราะห์และการออกแบบฐานข้อมูล",
                    "การออกแบบกราฟิกและการผลิตสื่อดิจิทัล",
                    "การเขียนโปรแกรมด้วยภาษา C# เบื้องต้น",
                    "การวิเคราะห์และทำ Visualization เบื้องต้น",
                    "อินเทอร์เน็ตของสรรพสิ่ง (IoT) เบื้องต้น"
                ],
                education: [
                    { degree: "ปริญญาตรี: วิทยาศาสตรบัณฑิต (วท.บ.)", major: "สาขาวิชา: เทคโนโลยีสารสนเทศ", inst: "มหาวิทยาลัยราชมงคลล้านนาเชียงราย", logo: "/03_photo/icon/inst_rmutl.webp" }
                ],
                email: "rodsathon_rt@cvc.ac.th",
                tel: "082-091-5771"
            },
            {
                idx: 6,
                backdrop: "SONGKRAN",
                nick: "ครูชาย",
                name: "นายสงกรานต์ สุนทรปฏิคม",
                role: "ครูพิเศษสอน",
                img: "/03_photo/3.3_teacher/teacher_songkran.webp",
                link: "index.php?click=6_songkarn",
                yt: null,
                skills: ["Motion Graphics", "UX / UI Design", "Branding", "Arduino", "Python Programming"],
                education: [
                    { degree: "ปริญญาตรี: นิเทศศาสตรบัณฑิต (นศ.บ.)", major: "สาขาวิชา: การจัดการโฆษณา", inst: "มหาวิทยาลัยกรุงเทพ", logo: "/03_photo/icon/inst_bu.webp" },
                    { degree: "ปริญญาตรี: บริหารธุรกิจบัณฑิต (บธ.บ.)", major: "สาขาวิชา: คอมพิวเตอร์ธุรกิจ", inst: "สถาบันวิทยาการจัดการแห่งแปซิฟิค", logo: "/03_photo/icon/inst_pacific.webp" }
                ],
                email: "songkran@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            },
            {
                idx: 7,
                backdrop: "SUMAET",
                nick: "ครูรุจ",
                name: "นายสุเมธ สู้ศึก",
                role: "ครูผู้ช่วย",
                img: "/03_photo/3.3_teacher/teacher_sumaet.webp",
                link: "index.php?click=7_sumaet",
                yt: null,
                skills: ["Microsoft Office", "Network System", "Data Analytics", "Object-Oriented Programming", "Google Applications"],
                education: [
                    { degree: "ปริญญาตรี: เทคโนโลยีบัณฑิต (ทล.บ.)", major: "สาขาวิชา: คอมพิวเตอร์ธุรกิจ", inst: "วิทยาลัยอาชีวศึกษาขอนแก่น", logo: "/03_photo/icon/inst_kkvc.webp" }
                ],
                email: "sumet.s@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            },
            {
                idx: 8,
                backdrop: "KRISSANAWICH",
                nick: "ครูเอก",
                name: "นายกฤษณวิชญ์ เยาว์ธานี",
                role: "ครูพิเศษสอน",
                img: "/03_photo/3.3_teacher/teacher_kritsanawich.webp",
                link: "index.php?click=8_Kritsanawich",
                yt: null,
                skills: ["Digital Literacy", "Digital Information Retrieval", "Computer S/W H/W & Maintenance"],
                education: [
                    { degree: "ปริญญาโท: การศึกษามหาบัณฑิต (กศ.ม.)", major: "สาขาวิชา: การบริหารการศึกษา", inst: "มหาวิทยาลัยพะเยา", logo: "/03_photo/icon/inst_up.webp" },
                    { degree: "ปริญญาตรี: ศิลปศาสตรบัณฑิต (ศศ.บ.)", major: "สาขาวิชา: สารสนเทศศาสตร์", inst: "มหาวิทยาลัยสุโขทัยธรรมาธิราช", logo: "/03_photo/icon/inst_stou.webp" }
                ],
                email: "Krissanawit@cvc.ac.th",
                tel: "053-713036 ต่อ 114"
            }
        ];

        let activeIdx = 0;
        let isTransitioning = false;
        let isBioMode = false;

        // Clear previous timer
        if (window.__fpAutoTimer) {
            clearInterval(window.__fpAutoTimer);
            window.__fpAutoTimer = null;
        }

        // DOM Elements
        const backdropName = document.getElementById("fp-backdrop-name");
        const nicknameText = document.getElementById("fp-nickname-text");
        const fullnameText = document.getElementById("fp-fullname-text");
        const roleText = document.getElementById("fp-role-text");
        const mainPortrait = document.getElementById("fp-main-portrait");
        const portraitBox = document.getElementById("fp-portrait-box");
        const skillsBox = document.getElementById("fp-skills-box");
        const btnYt = document.getElementById("fp-btn-yt");
        const thumbButtons = document.querySelectorAll(".fp-thumb-item-btn");
        const stageContainer = document.getElementById("faculty-fullscreen-stage");
        const leftFlank = document.getElementById("fp-left-flank");
        const rightFlank = document.getElementById("fp-right-flank");
        const bottomRail = document.getElementById("fp-bottom-rail");

        // Editorial Bio Elements
        const bioPanel = document.getElementById("fp-bio-detail-panel");
        const btnMorphOpen = document.getElementById("fp-btn-morph-open");
        const btnBackShowcase = document.getElementById("fp-btn-back-showcase");
        const bioNickText = document.getElementById("fp-bio-nick-text");
        const bioFullname = document.getElementById("fp-bio-fullname");
        const bioRole = document.getElementById("fp-bio-role");
        const bioEduBox = document.getElementById("fp-bio-edu-box");
        const bioSkillsBox = document.getElementById("fp-bio-skills-box");
        const bioContactBox = document.getElementById("fp-bio-contact-box");
        const bioYtBtn = document.getElementById("fp-bio-yt-btn");

        if (!stageContainer || !mainPortrait) return;

        // Reset to clean initial state (Teacher 0 - ครูเหน่ง)
        isBioMode = false;
        activeIdx = 0;
        isTransitioning = false;

        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf([leftFlank, rightFlank, bottomRail, portraitBox, backdropName, mainPortrait]);
        }

        if (bioPanel) bioPanel.style.display = "none";
        if (btnBackShowcase) btnBackShowcase.style.display = "none";
        if (leftFlank) {
            leftFlank.style.visibility = "visible";
            leftFlank.style.pointerEvents = "auto";
            if (typeof gsap !== 'undefined') gsap.set(leftFlank, { opacity: 1, y: 0 });
        }
        if (rightFlank) {
            rightFlank.style.visibility = "visible";
            rightFlank.style.pointerEvents = "auto";
            if (typeof gsap !== 'undefined') gsap.set(rightFlank, { opacity: 1, y: 0 });
        }
        if (bottomRail) {
            bottomRail.style.visibility = "visible";
            bottomRail.style.pointerEvents = "auto";
            if (typeof gsap !== 'undefined') gsap.set(bottomRail, { opacity: 1, y: 0 });
        }
        if (stageContainer) stageContainer.classList.remove("bio-mode-mobile");
        if (mainPortrait && typeof gsap !== 'undefined') gsap.set(mainPortrait, { opacity: 1, scale: 1, x: 0, y: 0 });
        if (backdropName && typeof gsap !== 'undefined') gsap.set(backdropName, { opacity: 1, x: 0, y: 0 });

        thumbButtons.forEach((btn, i) => {
            btn.classList.toggle("active", i === 0);
        });

        // Switch Teacher Slide Function
        function goToSlide(targetIdx, direction = 1, isAuto = false) {
            if (isBioMode) return;
            if (!facultyDb || !facultyDb.length) return;
            const nextIdx = ((targetIdx % facultyDb.length) + facultyDb.length) % facultyDb.length;
            if (nextIdx === activeIdx && !forceReinit) return;
            if (isTransitioning) return;
            isTransitioning = true;

            activeIdx = nextIdx;
            const currentData = facultyDb[activeIdx];

            // If manually switched by user, restart auto-timer to give full 6 seconds
            if (!isAuto) {
                startAutoCycle();
            }

            // Update Thumbnails Active State & Auto-Center only within thumbDeck (prevents viewport horizontal leakage)
            thumbButtons.forEach((btn, i) => {
                const isActive = i === activeIdx;
                btn.classList.toggle("active", isActive);
                if (isActive && window.innerWidth < 1024) {
                    const thumbDeckEl = document.getElementById("fp-thumb-deck");
                    if (thumbDeckEl) {
                        const deckRect = thumbDeckEl.getBoundingClientRect();
                        const btnRect = btn.getBoundingClientRect();
                        const scrollLeftTarget = thumbDeckEl.scrollLeft + (btnRect.left - deckRect.left) - (deckRect.width / 2) + (btnRect.width / 2);
                        thumbDeckEl.scrollTo({
                            left: Math.max(0, scrollLeftTarget),
                            behavior: 'smooth'
                        });
                    }
                }
            });

            if (typeof gsap !== 'undefined') {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    onComplete: () => {
                        isTransitioning = false;
                    }
                });

                // Slide Out Phase (Current elements)
                tl.to(mainPortrait, {
                    x: -60 * direction,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.22
                }, 0);

                tl.to([backdropName, leftFlank, rightFlank], {
                    y: -15 * direction,
                    opacity: 0,
                    duration: 0.18
                }, 0);

                // Update DOM Content at midpoint
                tl.call(() => {
                    backdropName.textContent = currentData.backdrop;
                    nicknameText.textContent = currentData.nick;
                    fullnameText.textContent = currentData.name;
                    roleText.textContent = currentData.role;
                    mainPortrait.src = currentData.img;

                    // Skills
                    skillsBox.innerHTML = currentData.skills.slice(0, 4).map(s => `<span class="fp-skill-chip">${s}</span>`).join('');

                    // YouTube Link
                    if (currentData.yt) {
                        btnYt.style.display = "inline-flex";
                        btnYt.href = currentData.yt;
                    } else {
                        btnYt.style.display = "none";
                    }

                    // Set enter start coordinates
                    gsap.set(mainPortrait, { x: 70 * direction, opacity: 0, scale: 0.95 });
                    gsap.set(backdropName, { x: 100 * direction, opacity: 0 });
                    gsap.set([leftFlank, rightFlank], { y: 20 * direction, opacity: 0 });
                });

                // Slide In Phase (New elements with parallax depth)
                tl.to(backdropName, {
                    x: 0,
                    opacity: 1,
                    duration: 0.55,
                    ease: "power2.out"
                }, 0.25);

                tl.to(mainPortrait, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out"
                }, 0.28);

                tl.to([leftFlank, rightFlank], {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power2.out"
                }, 0.32);

            } else {
                // Fallback for non-GSAP
                mainPortrait.src = currentData.img;
                backdropName.textContent = currentData.backdrop;
                nicknameText.textContent = currentData.nick;
                fullnameText.textContent = currentData.name;
                roleText.textContent = currentData.role;
                isTransitioning = false;
            }
        }

        // Attach Click Events to Thumbnails
        thumbButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (isBioMode) return;
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                const dir = idx > activeIdx ? 1 : -1;
                goToSlide(idx, dir);
            });
        });

        // Handle Mobile Thumbnail Deck Edge Gradient Fades
        const thumbDeck = document.getElementById("fp-thumb-deck");
        const fadeLeft = document.getElementById("fp-rail-fade-left");
        const fadeRight = document.getElementById("fp-rail-fade-right");

        function updateRailFades() {
            if (!thumbDeck || !fadeLeft || !fadeRight || window.innerWidth >= 1024) return;
            const maxScroll = thumbDeck.scrollWidth - thumbDeck.clientWidth;
            if (maxScroll <= 6) {
                fadeLeft.style.opacity = "0";
                fadeRight.style.opacity = "0";
                return;
            }
            const currentScroll = thumbDeck.scrollLeft;
            fadeLeft.style.opacity = currentScroll > 12 ? "1" : "0";
            fadeRight.style.opacity = currentScroll < (maxScroll - 12) ? "1" : "0";
        }

        if (thumbDeck) {
            thumbDeck.addEventListener("scroll", updateRailFades, { passive: true });
            window.addEventListener("resize", updateRailFades, { passive: true });
            setTimeout(updateRailFades, 350);
        }

        // 1. Mouse Drag & Mobile Touch-Swipe Control
        let isTouchDown = false;
        let startTouchX = 0;
        let startTouchY = 0;

        const handlePointerStart = (clientX, clientY) => {
            if (isBioMode) return;
            isTouchDown = true;
            startTouchX = clientX;
            startTouchY = clientY;
        };

        const handlePointerEnd = (clientX, clientY) => {
            if (!isTouchDown || isBioMode) return;
            isTouchDown = false;
            const diffX = clientX - startTouchX;
            const diffY = clientY - startTouchY;

            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                const dir = diffX < 0 ? 1 : -1;
                goToSlide(activeIdx + dir, dir);
            }
        };

        stageContainer.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        stageContainer.addEventListener("touchend", (e) => {
            if (e.changedTouches.length === 1) handlePointerEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }, { passive: true });

        stageContainer.addEventListener("mousedown", (e) => {
            handlePointerStart(e.clientX, e.clientY);
        });

        stageContainer.addEventListener("mouseup", (e) => {
            handlePointerEnd(e.clientX, e.clientY);
        });

        // 2. Keyboard Left / Right Navigation
        window.addEventListener("keydown", (e) => {
            if (isBioMode) return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                goToSlide(activeIdx + 1, 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                goToSlide(activeIdx - 1, -1);
            }
        });

        // 3. Parallax Motion on Giant Backdrop Text (Teacher portrait stays still & stable)
        window.addEventListener("mousemove", (e) => {
            if (window.innerWidth < 1024 || isBioMode) return;
            const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            if (typeof gsap !== 'undefined' && backdropName) {
                gsap.to(backdropName, {
                    x: -x * 35,
                    duration: 0.45,
                    ease: "power1.out"
                });
            }
        });

        // 4. IN-PLACE SECTION MORPHING (OPEN PURE EDITORIAL BIO MODE)
        function openBioMode() {
            if (isBioMode) return;
            isBioMode = true;
            stopAutoCycle();

            // Kill any in-flight transitions on showcase elements
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf([leftFlank, rightFlank, bottomRail, portraitBox, backdropName]);
            }

            const data = facultyDb[activeIdx];

            // Populate Bio Content
            bioNickText.textContent = data.nick;
            bioFullname.textContent = data.name;
            bioRole.textContent = data.role;

            // 01. Education (Pure Editorial List with Real University Logos)
            bioEduBox.innerHTML = data.education.map(edu => `
                <div class="fp-editorial-edu-item">
                    <div class="fp-edu-logo-box">
                        <img src="${edu.logo}" alt="${edu.inst}" class="fp-edu-logo-img">
                    </div>
                    <div class="fp-edu-info-box">
                        <div class="fp-editorial-edu-degree">${edu.degree}</div>
                        <div class="fp-editorial-edu-meta">${edu.major} • <strong>${edu.inst}</strong></div>
                    </div>
                </div>
            `).join('');

            // 02. Skills (Pure Minimalist Pills)
            bioSkillsBox.innerHTML = data.skills.map(s => `
                <span class="fp-editorial-skill-pill">${s}</span>
            `).join('');

            // 03. Contact Info (Email & Phone from individual PHP files)
            let contactHtml = `
                <div class="fp-editorial-contact-item">
                    <div class="fp-editorial-contact-icon"><i class="fas fa-envelope"></i></div>
                    <span><strong>Email:</strong> ${data.email}</span>
                </div>
                <div class="fp-editorial-contact-item">
                    <div class="fp-editorial-contact-icon"><i class="fas fa-phone-alt"></i></div>
                    <span><strong>โทรศัพท์:</strong> ${data.tel}</span>
                </div>
            `;
            bioContactBox.innerHTML = contactHtml;

            // 04. YouTube Channel Link (For Kru Lin)
            if (data.yt) {
                bioYtBtn.style.display = "inline-flex";
                bioYtBtn.href = data.yt;
            } else {
                bioYtBtn.style.display = "none";
            }

            // GSAP Morph Animation
            if (typeof gsap !== 'undefined') {
                const morphTl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
                const topTitleWrap = document.querySelector(".fp-top-title-wrap");
                const isMobile = window.innerWidth < 1024;

                if (isMobile) {
                    stageContainer.classList.add("bio-mode-mobile");
                }

                // Fade out showcase flanks and bottom rail (and top title on desktop only)
                const fadeOutTargets = [leftFlank, rightFlank, bottomRail];
                if (!isMobile && topTitleWrap) fadeOutTargets.push(topTitleWrap);

                morphTl.to(fadeOutTargets, {
                    opacity: 0,
                    y: 15,
                    duration: 0.25,
                    onComplete: () => {
                        leftFlank.style.visibility = "hidden";
                        leftFlank.style.pointerEvents = "none";
                        rightFlank.style.visibility = "hidden";
                        rightFlank.style.pointerEvents = "none";
                        bottomRail.style.visibility = "hidden";
                        bottomRail.style.pointerEvents = "none";
                        if (!isMobile && topTitleWrap) {
                            topTitleWrap.style.visibility = "hidden";
                            topTitleWrap.style.pointerEvents = "none";
                        }
                    }
                }, 0);

                // Morph teacher portrait smoothly on desktop (shift to left)
                if (!isMobile) {
                    const shiftAmount = -Math.min(window.innerWidth * 0.22, 330);
                    morphTl.to(portraitBox, {
                        x: shiftAmount,
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power3.out"
                    }, 0.05);
                }

                // Show floating back button with ultra high z-index
                btnBackShowcase.style.display = "inline-flex";
                morphTl.fromTo(btnBackShowcase, {
                    opacity: 0,
                    scale: 0.9
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.4)"
                }, 0.15);

                // Animate In Right Editorial Bio Panel directly on canvas
                bioPanel.style.display = "flex";
                morphTl.fromTo(bioPanel, {
                    opacity: 0,
                    x: isMobile ? 0 : 50,
                    y: isMobile ? 15 : 0
                }, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.45,
                    ease: "power3.out"
                }, 0.18);

                // Stagger internal editorial sections
                morphTl.fromTo("#fp-bio-detail-panel > *", {
                    opacity: 0,
                    y: 16
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: "power2.out"
                }, 0.25);

            } else {
                // Fallback
                leftFlank.style.visibility = "hidden";
                rightFlank.style.visibility = "hidden";
                bottomRail.style.visibility = "hidden";
                if (window.innerWidth >= 1024) {
                    const topTitleWrap = document.querySelector(".fp-top-title-wrap");
                    if (topTitleWrap) topTitleWrap.style.visibility = "hidden";
                }
                if (window.innerWidth < 1024) stageContainer.classList.add("bio-mode-mobile");
                btnBackShowcase.style.display = "inline-flex";
                bioPanel.style.display = "flex";
            }
        }

        // 5. REVERSE SECTION MORPHING (BACK TO SHOWCASE MODE)
        function closeBioMode() {
            if (!isBioMode) return;

            if (typeof gsap !== 'undefined') {
                const isMobile = window.innerWidth < 1024;
                gsap.killTweensOf([bioPanel, btnBackShowcase, portraitBox, leftFlank, rightFlank, bottomRail]);

                // If on mobile, smoothly scroll back to top of teacher showcase if scrolled
                if (isMobile) {
                    if (typeof window.lenis?.scrollTo === 'function') {
                        window.lenis.scrollTo(stageContainer, { offset: 0, duration: 0.35, immediate: false });
                    } else {
                        window.scrollTo({ top: stageContainer.offsetTop, behavior: 'smooth' });
                    }
                }

                const topTitleWrap = document.querySelector(".fp-top-title-wrap");

                const revTl = gsap.timeline({
                    defaults: { ease: "power3.inOut" },
                    onComplete: () => {
                        bioPanel.style.display = "none";
                        btnBackShowcase.style.display = "none";
                        isBioMode = false;
                        startAutoCycle();
                    }
                });

                // 1. Fade Out Bio Panel & Back Button
                revTl.to([bioPanel, btnBackShowcase], {
                    opacity: 0,
                    x: isMobile ? 0 : 30,
                    y: isMobile ? 18 : 0,
                    duration: 0.22,
                    ease: "power2.in"
                }, 0);

                // 2. Desktop: Return teacher portrait smoothly to center
                if (!isMobile) {
                    leftFlank.style.visibility = "visible";
                    leftFlank.style.pointerEvents = "auto";
                    rightFlank.style.visibility = "visible";
                    rightFlank.style.pointerEvents = "auto";
                    bottomRail.style.visibility = "visible";
                    bottomRail.style.pointerEvents = "auto";
                    if (topTitleWrap) {
                        topTitleWrap.style.visibility = "visible";
                        topTitleWrap.style.pointerEvents = "auto";
                    }

                    revTl.to(portraitBox, {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out"
                    }, 0.08);

                    const fadeInTargets = [leftFlank, rightFlank, bottomRail];
                    if (topTitleWrap) fadeInTargets.push(topTitleWrap);

                    revTl.to(fadeInTargets, {
                        opacity: 1,
                        y: 0,
                        duration: 0.38,
                        ease: "power2.out"
                    }, 0.18);
                } else {
                    // 3. Mobile: Midpoint transition (remove bio-mode-mobile, prepare showcase elements)
                    revTl.call(() => {
                        bioPanel.style.display = "none";
                        stageContainer.classList.remove("bio-mode-mobile");
                        leftFlank.style.visibility = "visible";
                        leftFlank.style.pointerEvents = "auto";
                        rightFlank.style.visibility = "visible";
                        rightFlank.style.pointerEvents = "auto";
                        bottomRail.style.visibility = "visible";
                        bottomRail.style.pointerEvents = "auto";
                        gsap.set([leftFlank, rightFlank, bottomRail], { opacity: 0, y: 18 });
                    }, null, 0.2);

                    // 4. Mobile: Smooth Fade-In of Showcase elements
                    revTl.to([leftFlank, rightFlank, bottomRail], {
                        opacity: 1,
                        y: 0,
                        duration: 0.38,
                        ease: "power2.out"
                    }, 0.22);
                }

            } else {
                // Fallback
                const topTitleWrap = document.querySelector(".fp-top-title-wrap");
                if (topTitleWrap) topTitleWrap.style.visibility = "visible";
                bioPanel.style.display = "none";
                btnBackShowcase.style.display = "none";
                leftFlank.style.visibility = "visible";
                rightFlank.style.visibility = "visible";
                bottomRail.style.visibility = "visible";
                stageContainer.classList.remove("bio-mode-mobile");
                isBioMode = false;
                startAutoCycle();
            }
        }

        if (btnMorphOpen) btnMorphOpen.addEventListener("click", openBioMode);
        if (btnBackShowcase) btnBackShowcase.addEventListener("click", closeBioMode);

        // 6. Continuous Auto-Advance Timer (every 6 seconds)
        const startAutoCycle = () => {
            stopAutoCycle();
            window.__fpAutoTimer = setInterval(() => {
                if (!isBioMode) {
                    goToSlide(activeIdx + 1, 1, true);
                }
            }, 6000);
        };

        const stopAutoCycle = () => {
            if (window.__fpAutoTimer) {
                clearInterval(window.__fpAutoTimer);
                window.__fpAutoTimer = null;
            }
        };

        startAutoCycle();

        // 7. Cinematic Staggered Fade-in Entrance Choreography
        function playFacultyEntranceAnimation() {
            if (typeof gsap === 'undefined') return;

            const topBar = document.getElementById("fp-top-bar");
            const backdrop = document.getElementById("fp-backdrop-name");
            const portrait = document.getElementById("fp-portrait-box");
            const leftFlank = document.getElementById("fp-left-flank");
            const rightFlank = document.getElementById("fp-right-flank");
            const bottomRail = document.getElementById("fp-bottom-rail");
            const ambientGlow = document.getElementById("fp-ambient-glow");

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // Set initial hidden state with subtle depth coordinates
            gsap.set(topBar, { opacity: 0, y: -20 });
            gsap.set(backdrop, { opacity: 0, scale: 0.88, y: 35 });
            gsap.set(portrait, { opacity: 0, scale: 0.92, y: 45 });
            gsap.set([leftFlank, rightFlank], { opacity: 0, y: 30 });
            gsap.set(bottomRail, { opacity: 0, y: 25 });
            if (ambientGlow) gsap.set(ambientGlow, { opacity: 0, scale: 0.8 });

            tl.to(topBar, {
                opacity: 1,
                y: 0,
                duration: 0.75
            })
                .to(backdrop, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.85
                }, "-=0.55")
                .to(portrait, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8
                }, "-=0.65")
                .to([leftFlank, rightFlank], {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.12
                }, "-=0.6")
                .to(bottomRail, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, "-=0.5");

            if (ambientGlow) {
                tl.to(ambientGlow, { opacity: 1, scale: 1, duration: 1.2 }, 0);
            }
        }

        playFacultyEntranceAnimation();

        // BFCache (Back/Forward Navigation) Instant Safety Recovery
        window.addEventListener("pageshow", (e) => {
            if (e.persisted) {
                const elements = ["#fp-top-bar", "#fp-backdrop-name", "#fp-portrait-box", "#fp-left-flank", "#fp-right-flank", "#fp-bottom-rail", "#fp-ambient-glow"];
                if (typeof gsap !== 'undefined') {
                    gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 });
                }
            }
        });
    };

    // Immediate bottom auto-initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.initFacultyPortfolioStage(true));
    } else {
        window.initFacultyPortfolioStage(true);
    }
})();
