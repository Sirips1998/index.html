# Google Sheets API for Asahi Linktree

## ขั้นตอนติดตั้ง

1. เปิด Google Sheets ใหม่
2. ไปที่ `Extensions` → `Apps Script`
3. ลบโค้ดตัวอย่างออก แล้ววางโค้ดจาก `google-apps-script.gs`
4. บันทึกชื่อโปรเจกต์ เช่น `AsahiLinktreeTracker`
5. ไปที่ `Deploy` → `New deployment`
6. เลือก `Web app`
7. ตั้งค่า
   - `Description`: `Linktree Tracker API`
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
8. กด `Deploy`
9. คัดลอก URL ที่ได้ แล้วนำไปใส่ในตัวแปร `SHEET_API_URL` ใน `index.html`

## โครงสร้าง Google Sheet

ชื่อแผ่นงาน: `Stats`

คอลัมน์ที่ใช้:
- `totalClicks`
- `todayClicks`
- `visitorCount`
- `ig`
- `tt`
- `line`
- `todayDate`

## การใช้งาน

- เมื่อเปิดหน้าเว็บ จะยิง `visitor` ไปยัง Google Sheets
- เมื่อกดปุ่มลิงก์ จะยิง `click` พร้อม `platform`
- ข้อมูลจะถูกอัปเดตในชีตทันที

## ข้อควรระวัง

- ถ้ายังไม่ได้ใส่ URL ใน `SHEET_API_URL` ระบบจะยังใช้งานแบบ local fallback ได้
- ต้องตั้งค่าการเข้าถึง `Anyone` เพื่อให้เว็บเรียก API ได้จากเบราว์เซอร์
