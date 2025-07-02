// حماية صفحة الأدمن - إذا لم يتم تسجيل الدخول يتم التحويل للدخول
if (!localStorage.getItem('isAdmin')) window.location = "admin-login.html";

// تفعيل التبويبات
let tabs = document.querySelectorAll('.admin-tabs button');
let contents = document.querySelectorAll('.admin-tab-content');
tabs.forEach(btn => {
    btn.onclick = function() {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    }
});
if (tabs.length) tabs[0].click();

function saveLogo() {
    localStorage.setItem('logoText', document.getElementById('logoText').value);
    localStorage.setItem('logoIcon', document.getElementById('logoIcon').value);
    alert('تم الحفظ!'); 
}
function saveBanner() {
    localStorage.setItem('bannerTitle', document.getElementById('bannerTitle').value);
    localStorage.setItem('bannerDesc', document.getElementById('bannerDesc').value);
    localStorage.setItem('bannerBtn', document.getElementById('bannerBtn').value);
    alert('تم الحفظ!');
}
function saveHero() {
    localStorage.setItem('heroTitle', document.getElementById('heroTitle').value);
    localStorage.setItem('heroText', document.getElementById('heroText').value);
    alert('تم الحفظ!');
}
function saveFooter() {
    localStorage.setItem('footerText', document.getElementById('footerText').value);
    alert('تم الحفظ!');
}
// إدارة الخدمات (إضافة، تعديل، حذف)
function renderServices() {
    let services = JSON.parse(localStorage.getItem('services') || "[]");
    let editor = document.getElementById('servicesEditor');
    editor.innerHTML = '';
    services.forEach((s, idx) => {
        let div = document.createElement('div');
        div.style = "border:1px solid #eee;padding:10px;margin-bottom:10px;border-radius:8px;background:#fafafa";
        div.innerHTML = `
            <input type="text" placeholder="أيقونة FontAwesome (fa-laptop-code)" value="${s.icon||''}" onchange="updateService(${idx}, 'icon', this.value)">
            <input type="text" placeholder="لون خلفية الدائرة (#4361ee أو #f72585...)" value="${s.bg||''}" onchange="updateService(${idx}, 'bg', this.value)">
            <input type="text" placeholder="عنوان الخدمة" value="${s.title||''}" onchange="updateService(${idx}, 'title', this.value)">
            <input type="text" placeholder="وصف الخدمة" value="${s.desc||''}" onchange="updateService(${idx}, 'desc', this.value)">
            <input type="text" placeholder="نص الزر" value="${s.btn||''}" onchange="updateService(${idx}, 'btn', this.value)">
            <button onclick="deleteService(${idx})" style="background:#b5179e;">حذف</button>
        `;
        editor.appendChild(div);
    });
}
function updateService(idx, key, value) {
    let services = JSON.parse(localStorage.getItem('services') || "[]");
    services[idx][key] = value;
    localStorage.setItem('services', JSON.stringify(services));
}
function deleteService(idx) {
    let services = JSON.parse(localStorage.getItem('services') || "[]");
    services.splice(idx, 1);
    localStorage.setItem('services', JSON.stringify(services));
    renderServices();
}
function addService() {
    let services = JSON.parse(localStorage.getItem('services') || "[]");
    services.push({icon:'fa-cog', bg:'#4361ee', title:'', desc:'', btn:'المزيد'});
    localStorage.setItem('services', JSON.stringify(services));
    renderServices();
}
// تحميل البيانات القديمة في حقول الأدمن
window.onload = function() {
    document.getElementById('logoText').value = localStorage.getItem('logoText')||'شركتي المتميزة';
    document.getElementById('logoIcon').value = localStorage.getItem('logoIcon')||'fa-rocket';
    document.getElementById('bannerTitle').value = localStorage.getItem('bannerTitle')||'مرحباً بكم في موقعنا الإلكتروني';
    document.getElementById('bannerDesc').value = localStorage.getItem('bannerDesc')||'نقدم لكم أفضل الحلول التقنية والخدمات المتميزة التي تلبي احتياجات عملك وتطوره';
    document.getElementById('bannerBtn').value = localStorage.getItem('bannerBtn')||'اكتشف خدماتنا';
    document.getElementById('heroTitle').value = localStorage.getItem('heroTitle')||'خدماتنا المتميزة';
    document.getElementById('heroText').value = localStorage.getItem('heroText')||'';
    document.getElementById('footerText').value = localStorage.getItem('footerText')||'جميع الحقوق محفوظة &copy; 2023 شركتي المتميزة';
    renderServices();
}
function logoutAdmin() {
    localStorage.removeItem('isAdmin');
    location.href = "admin-login.html";
}