window.onload = function() {
    // الشعار
    let logoText = localStorage.getItem('logoText');
    let logoIcon = localStorage.getItem('logoIcon');
    if (logoText) document.querySelector('.logo span').innerText = logoText;
    if (logoIcon) {
        let logoI = document.querySelector('.logo i');
        logoI.className = "fas " + logoIcon;
    }
    // البانر
    let bannerTitle = localStorage.getItem('bannerTitle');
    let bannerDesc = localStorage.getItem('bannerDesc');
    let bannerBtn = localStorage.getItem('bannerBtn');
    if (bannerTitle) document.querySelector('.hero h1').innerText = bannerTitle;
    if (bannerDesc) document.querySelector('.hero p').innerText = bannerDesc;
    if (bannerBtn) document.querySelector('.hero .btn').innerHTML = bannerBtn + ' <i class="fas fa-arrow-left"></i>';
    // النص الترحيبي
    let heroTitle = localStorage.getItem('heroTitle');
    let heroText = localStorage.getItem('heroText');
    if (heroTitle) document.querySelector('.section-title').innerText = heroTitle;
    if (heroText) document.querySelector('.features').previousElementSibling.querySelector('p')?.remove();
    // الخدمات
    let services = JSON.parse(localStorage.getItem('services') || "null");
    if (services) {
        let features = document.querySelector('.features');
        features.innerHTML = '';
        services.forEach(s => {
            let card = document.createElement('div');
            card.className = 'feature-card';
            card.innerHTML = `
                <div class="feature-img" style="background-color:${s.bg || '#4361ee'};">
                    <i class="fas ${s.icon || 'fa-cog'}"></i>
                </div>
                <div class="feature-content">
                    <h3>${s.title || ''}</h3>
                    <p>${s.desc || ''}</p>
                    <a href="#" class="btn">${s.btn || 'المزيد'}</a>
                </div>
            `;
            features.appendChild(card);
        });
    }
    // الفوتر
    let footerText = localStorage.getItem('footerText');
    if (footerText) document.querySelector('.copyright p').innerText = footerText;
};