document.addEventListener('DOMContentLoaded', function() {
    fetch('data/settings.json')
    .then(res => res.json())
    .then(settings => applySettings(settings));
});

function applySettings(settings) {
    // شعار الهيدر
    document.querySelector('.logo i').className = "fas " + (settings.logoIcon || 'fa-rocket');
    document.querySelector('.logo span').textContent = settings.logoText || 'شركتي المتميزة';
    // القوائم
    const nav = document.getElementById('main-nav');
    nav.innerHTML = '';
    (settings.headerButtons || []).forEach(btn => {
        nav.innerHTML += `<li><a href="${btn.url}">${btn.icon ? `<i class="fas ${btn.icon}"></i>` : ""} ${btn.text}</a></li>`;
    });
    // البانر
    document.querySelector('.hero').style.backgroundImage = settings.bannerBg ? `url(${settings.bannerBg})` : '';
    document.querySelector('.hero h1').textContent = settings.bannerTitle || '';
    document.querySelector('.hero p').textContent = settings.bannerDesc || '';
    document.querySelector('.hero .btn').innerHTML = (settings.bannerBtn || "اكتشف خدماتنا") + ' <i class="fas fa-arrow-left"></i>';
    // الخدمات
    const services = settings.services || [];
    const sc = document.getElementById('services-container');
    sc.innerHTML = '';
    services.forEach(s => {
        sc.innerHTML += `
        <div class="feature-card">
            <div class="feature-img" style="background:${s.bg || '#4361ee'};">
                <i class="fas ${s.icon || 'fa-cog'}"></i>
            </div>
            <div class="feature-content">
                <h3>${s.title || ''}</h3>
                <p>${s.desc || ''}</p>
                <a href="${s.link || '#'}" class="btn">${s.btn || 'المزيد'}</a>
            </div>
        </div>
        `;
    });
    // الفوتر
    const fc = document.getElementById('footer-sections');
    fc.innerHTML = '';
    (settings.footerSections || []).forEach(sec => {
        let links = '';
        if (Array.isArray(sec.links)) {
            links = '<ul class="footer-links">' +
                sec.links.map(l => `<li>${l.icon ? `<i class="fas ${l.icon}"></i>` : ''}${l.url ? `<a href="${l.url}">${l.text}</a>` : l.text}</li>`).join('') +
            '</ul>';
        }
        fc.innerHTML += `<div class="footer-section"><h3>${sec.title}</h3>${sec.desc ? `<p>${sec.desc}</p>` : ''}${links || ''}</div>`;
    });
    document.querySelector('.copyright p').innerHTML = settings.footerText || 'جميع الحقوق محفوظة &copy; 2025 شركتي المتميزة';
}