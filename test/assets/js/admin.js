function login(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === '1234') {
        window.location.href = 'dashboard.html';
    } else {
        alert('بيانات الدخول غير صحيحة');
    }
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function saveLogo() {
    const text = document.getElementById('logoText').value;
    localStorage.setItem('site-logo', text);
    alert('تم حفظ اللوغو');
}

function saveBanner() {
    const title = document.getElementById('bannerTitle').value;
    const desc = document.getElementById('bannerText').value;
    localStorage.setItem('banner-title', title);
    localStorage.setItem('banner-text', desc);
    alert('تم حفظ البانر');
}

function saveFooter() {
    const text = document.getElementById('footerText').value;
    localStorage.setItem('footer-text', text);
    alert('تم حفظ الفوتر');
}