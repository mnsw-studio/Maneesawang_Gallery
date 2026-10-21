// 1. คลังฐานข้อมูลรายการผลงาน (ตรวจสอบว่าโครงสร้างมี id และ subTitle ครบถ้วนแล้ว)
const galleryData = [
    { id: '84th-ku', subTitle: 'Kasetsart University', image: 'image/84th KU English Primary.png', title: '84th Kasetsart University', year: '2026' },
    { id: 'a', subTitle: 'MNSW Studio', image: 'image/A.webp', title: 'A', year: '2025' },
    { id: 'av', subTitle: 'MNSW Studio', image: 'image/A&V logo.png', title: 'A&V', year: '2026' },
    { id: 'arthur', subTitle: 'MNSW Studio', image: 'image/Arthur.png', title: 'Arthur', year: '2024' },
    { id: 'bangpost', subTitle: 'MNSW Studio', image: 'image/Bangpost.png', title: 'Bangpost', year: '2026' },
    { id: 'bdt', subTitle: 'MNSW Studio', image: 'image/BDT.png', title: 'BDT', year: '2026' },
    { id: 'crown-street', subTitle: 'MNSW Studio', image: 'image/Crown-streetLogo.png', title: 'Crown Street', year: '2025' },
    { id: 'd-digital', subTitle: 'MNSW Studio', image: 'image/D Digital.png', title: 'D Digital', year: '2026' },
    { id: 'fc', subTitle: 'Maneesawang Penname', image: 'image/FC.png', title: 'FC', year: '2026' },
    { id: 'flame', subTitle: 'MNSW Studio', image: 'image/flame.png', title: 'Flame', year: '2026' },
    { id: 'kia', subTitle: 'MNSW Studio', image: 'image/KIALogo-2.png', title: 'KIA', year: '2026' },
    { id: 'maneesawang', subTitle: 'Maneesawang Studio', image: 'image/Maneesawang.webp', title: 'Maneesawang Studio', year: '2024' },
    { id: 'mass-com', subTitle: 'MNSW Studio', image: 'image/Mass Com.png', title: 'Mass Com', year: '2026' },
    { id: 's', subTitle: 'MNSW Studio', image: 'image/S.webp', title: 'S', year: '2025' },
    { id: 'sra', subTitle: 'MNSW Studio', image: 'image/Sentinel Risk Assurance.png', title: 'SRA', year: '2026' },
    { id: 'sf', subTitle: 'MNSW Studio', image: 'image/SF.webp', title: 'SF', year: '2026' },
    { id: 'wingtach', subTitle: 'MNSW Studio', image: 'image/Wingtach.png', title: 'Wingtach', year: '2026' }
];

// 2. ฟังก์ชันแสดงผลหน้า Gallery รวม
function renderGallery() {
    const gridContainer = document.getElementById('galleryGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    galleryData.forEach(item => {
        const itemHTML = `
            <a href="ProjectDetail/?id=${item.id}" class="gallery-item">
                <div class="image-box">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="item-info">
                    <span class="item-title">${item.title}</span>
                    <span class="item-year">${item.year}</span>
                </div>
            </a>
        `;
        gridContainer.innerHTML += itemHTML;
    });
}

// 3. ฟังก์ชันดึงค่าไปแสดงผลบนหน้าแสดงรายละเอียดผลงาน (Project Detail)
function renderProjectDetail() {
    const imgDisplay = document.getElementById('projImage');
    if (!imgDisplay) return; // ถ้าไม่ใช่หน้าดีเทลให้ข้ามไป

    // ดึงค่า ?id= จาก URL ของเบราว์เซอร์
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id');

    // ถ้าไม่มี id แนบมา ให้เปิดโปรเจกต์แรกสุดขึ้นมาแสดงเป็นค่าเริ่มต้น
    if (!projectId && galleryData.length > 0) {
        projectId = galleryData[0].id;
    }

    // ค้นหาชิ้นงานในคลังข้อมูล
    const currentIndex = galleryData.findIndex(p => p.id === projectId);
    
    // ถ้าไม่พบข้อมูลชิ้นงานนี้ ให้เด้งกลับไปหน้าแกลเลอรีหลัก
    if (currentIndex === -1) {
        window.location.href = '../Gallery/';
        return;
    }

    const currentProject = galleryData[currentIndex];
    document.title = `${currentProject.title} | MNSW Studio`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${currentProject.title} — a design project by MNSW Studio.`;
    }

    // จับคู่ข้อมูลไปพ่นแสดงแทนที่เครื่องหมายขีดสั้นบน HTML
    const txtSubTitle = document.getElementById('projSubTitle');
    const txtTitle = document.getElementById('projTitle');
    const txtYear = document.getElementById('projYear');

    if (txtSubTitle) txtSubTitle.textContent = currentProject.subTitle;
    if (txtTitle) txtTitle.textContent = currentProject.title;
    if (txtYear) txtYear.textContent = currentProject.year;
    
    // พ่นลิงก์รูปภาพเข้าแท็ก <img>
    imgDisplay.src = currentProject.image;
    imgDisplay.alt = currentProject.title;

    // ตั้งค่าลิงก์ให้ปุ่ม Next > สำหรับคลิกดูผลงานถัดไปแบบวนลูป
    const btnNext = document.getElementById('btnNextProject');
    if (btnNext) {
        const nextIndex = (currentIndex + 1) % galleryData.length;
        btnNext.href = `ProjectDetail/?id=${galleryData[nextIndex].id}`;
    }
}

// 4. สั่งให้ฟังก์ชันทำงานเมื่อหน้าเว็บพร้อมรัน
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderProjectDetail();
});
