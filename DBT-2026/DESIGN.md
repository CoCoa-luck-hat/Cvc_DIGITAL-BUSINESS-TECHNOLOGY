---
name: แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล CVC
description: แหล่งบ่มเพาะนักธุรกิจและนักเทคโนโลยีดิจิทัลรุ่นใหม่
colors:
  primary: "#5f2d8c"
  primary-dark: "#451a69"
  primary-light: "#7c3aed"
  neutral-dark: "#0f0a17"
  neutral-bg: "#f9f7fc"
  neutral-text: "#111827"
  white: "#ffffff"
typography:
  display:
    fontFamily: "'Prompt', sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "'Prompt', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "'Prompt', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "'Prompt', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Prompt', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  capsule: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: แผนกวิชาเทคโนโลยีสารสนเทศ CVC

## 1. Overview

**Creative North Star: "The Interactive Tech Studio"**

ระบบการออกแบบ "The Interactive Tech Studio" มุ่งเน้นภาพลักษณ์ที่ล้ำสมัย มีมิติสายตา และสะท้อนความเป็นนักพัฒนาเทคโนโลยีรุ่นใหม่ที่เต็มไปด้วยพลังสร้างสรรค์ โดยหลีกเลี่ยงรูปแบบดั้งเดิมที่ดูเป็นทางการจนเกินไป หรือ "ดีไซน์แบบเว็บราชการยุคเก่า" (เช่น เลย์เอาต์ตารางที่เบียดทึบ สีจืดชืด และการอัดตัวหนังสือเป็นพรืด)

เรานำเสนอข้อมูลผ่านโครงสร้างที่เป็นระเบียบ (Grid & Flexbox) ควบคู่ไปกับการใช้ลูกเล่นการเคลื่อนไหวที่น่าตื่นเต้นแต่เป็นธรรมชาติ (เช่น 3D Card Stacking, Timeline Control, Floating Capsule Navbar, และ Seamless Transitions) เพื่อเพิ่มความน่าสนใจให้กับหลักสูตรและผลงานของแผนก

**Key Characteristics:**
- **High-Tech Aesthetic**: สะอาด ทันสมัย และเป็นมืออาชีพด้วยคู่สี แดง-ขาว-เทาเข้ม-ดำนีออน
- **Prompt Typography**: อักษรไร้หัวสไตล์โมเดิร์น (**Prompt**) ที่อ่านง่าย สบายตา ทั้งภาษาไทยและอังกฤษในทุกการ์ดและปุ่มกด
- **Interactive Depth**: ความมีมิติขององค์ประกอบจากการใช้ช่องไฟ (Spacings), ปุ่ม Liquid Fill, เส้นใต้วาดตามเมาส์ และลูกเล่น Scrolling Effects

---

## 2. Colors

สีสันของระบบออกแบบนี้จะใช้สีแดง (Crimson Red) เป็นหลักเพื่อแสดงพลัง ความตื่นเต้น และความโดดเด่น ผสานกับสีขาว สีเทาอ่อน และสีดำเข้มเพื่อคุมโทนให้ดูเป็นมืออาชีพ

### Primary
- **Tech Crimson Red** (#dc2626 / #b71616): สีหลักประจำแผนกวิชา ใช้สำหรับองค์ประกอบสำคัญ เช่น หัวข้อหลัก, ไอคอนเด่น, หรือปุ่ม Action หลัก
- **Bright Active Red** (#ef4444 / #e10000): สีแดงสว่าง ใช้เมื่อเกิดการโต้ตอบ (Hover States), แสงเรืองวงแหวน (Rotating Aura), และปุ่มย้อนกลับสู่ด้านบน (Back-to-top)
- **Dark Charcoal Red** (#0a0c10 / #111827): สีเข้มสไตล์ Dark Mode สำหรับส่วนท้ายของเว็บ (Footer) และพื้นหลังปุ่มกดเมื่อเกิดเอฟเฟกต์ Liquid Fill

### Neutral
- **Charcoal Text** (#111827 / #374151): สีเทาเข้ม/ดำ ใช้สำหรับตัวอักษรเนื้อหาหลัก (Body Copy)
- **Light Slate Gray** (#f8f9fa): สีเทาอ่อน ใช้เป็นสีพื้นหลังหลัก (Background) ช่วยให้หน้าเว็บดูสะอาดโปร่งสบาย
- **Pure White** (#ffffff): สีขาว ใช้สำหรับพื้นหลังของกล่องเนื้อหา (Cards/Containers) และแคปซูลเมนูนำทาง

---

## 3. Typography

ระบบฟอนต์ทั้งหมดในเว็บไซต์กำชับใช้ฟอนต์ **"Prompt"** (`font-family: 'Prompt', sans-serif !important;`) สำหรับทุกองค์ประกอบ เพื่อรักษาเอกลักษณ์ความทันสมัยสม่ำเสมอทั้งเว็บ

**Display Font:** Prompt (sans-serif)
**Body Font:** Prompt (sans-serif)

### Hierarchy
- **Display** (Bold 700, clamp(2rem, 5vw, 3.5rem), line-height 1.2): หัวข้อหลักบนแบนเนอร์แรก (Hero Section)
- **Headline** (SemiBold 600 / ExtraBold 800, 1.75rem, line-height 1.3): หัวข้อหลักของแต่ละหมวดหมู่เนื้อหา (Sections) และ Ribbons
- **Title** (Bold 700 / Medium 500, 1.25rem, line-height 1.4): หัวข้อการ์ดหลักสูตรและขั้นตอน
- **Body** (Regular 400, 1rem, line-height 1.6): รายละเอียดเนื้อหาทั่วไป
- **Label** (Medium 500, 0.875rem, line-height 1.5): ป้ายกำกับและปุ่มกด

---

## 4. Components & Interactive Utilities

### Liquid Fill Buttons (`.btn-liquid`)
- **Visual Style:** ขอบมน (12px / 16px radius) พื้นหลังสีแดงหลักพร้อมเงายกลอย
- **Hover Physics:** สีพื้นหลังจะสไลด์เติมเต็มด้วยเอฟเฟกต์ Liquid Fill จากขวาไปซ้าย (ผ่าน `::before` pseudo-element)
- **Arrow Spring Bounce:** ไอคอนลูกศร (`.fa-arrow-right`) ขยับเด้งไปทางขวา `+6px` ด้วยจังหวะ Spring cubic-bezier

### Animated Text Underline Draw (`.link-draw-underline`)
- **Behavior:** ลิงก์ข้อความหรือเมนูนำทางจะวาดเส้นใต้สีแดง (`#dc2626`) ขยายจาก `scaleX(0)` ไปเป็น `scaleX(1)` เมื่อเมาส์ไปวาง

### Floating Capsule Navigation (`n_navbar.php`)
- **Capsule Frame:** แคปซูลขอบมนขวาน (9999px radius) พร้อมเอฟเฟกต์ Glassmorphic Blur (`backdrop-filter: blur(16px)`)
- **Dropdown Clipping:** กล่องเมนูดรอปดาวน์มุมมน (16px radius) Enforce `overflow: hidden !important;` ป้องกันสี Hover บล็อกย่อย (`#fef2f2`) ล้นขอบมน
- **Chevron Motion:** ไอคอนหมุน 180 องศาเมื่อเมาส์ไปชี้เมนู

### 3D Card Deck Stacking (`#majorsSection`)
- **Pin Phase Hold:** การ์ดแต่ละใบปักหมุดค้างตำแหน่งบนสุดของจอด้วยระยะเว้น (`mb-[160vh] md:mb-[200vh]`)
- **Offscreen Entrance:** การ์ดถัดไปซ่อนอยู่นอกขอบล่างจอ 100% (`opacity: 0 -> 1` และ `y: 60 -> 0`) ค่อยๆ ลอยขึ้นมาเมื่อผู้ใช้เลื่อนอ่านการ์ดปัจจุบันเสร็จเรียบร้อย

### Footer Rotating Red Aura Logo (`.footer-rotating-aura`)
- **Aura Ring:** วงแหวน Conic Gradient สีแดงหมุนวนรอบโลโก้แบรนด์ท้ายเว็บความเร็ว 4 วินาที (`rotateFooterAura 4s linear infinite`)
- **Hover Pulse:** ขยายตัว (`scale(1.15)`) และเรืองแสงเรืองรองสว่างขึ้น (`blur(14px)`, `opacity: 0.85`) เมื่อเอาเมาส์ชี้โลโก้

---

## 5. Do's and Don'ts

### Do:
- **Do** ใช้ฟอนต์ **Prompt** เสมอในทุกหัวข้อและการ์ดเนื้อหา
- **Do** ใส่ `overflow: hidden !important;` บนกล่องดรอปดาวน์ที่มีขอบมน
- **Do** ใช้เอฟเฟกต์ `.btn-liquid` และ `.link-draw-underline` เพิ่มความมีชีวิตชีวาบนจุดปุ่มกดสำคัญ

### Don't:
- **Don't** ใช้ฟอนต์เขียนมือหรือฟอนต์โมโนสเปซหลุดธีมปะปนบนการ์ดข้อมูล
- **Don't** ปล่อยให้การ์ดใบถัดไปโผล่เหลื่อมขึ้นมารบกวนขณะผู้ใช้กำลังอ่านการ์ดปัจจุบัน
- **Don't** ใช้สีแดงเกิน 15% ของพื้นที่หน้าจอทั้งหมด เพื่อรักษาจุดโฟกัสสายตา
