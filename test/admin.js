// عند تحميل الصفحة، اجلب البيانات من LocalStorage إذا وجدت، وحدث أقسام الموقع
window.onload = function() {
    // الشعار
    const logo = localStorage.getItem('site-logo');
    if (logo) document.getElementById('site-logo').src = logo;

    // البانر
    const banner = localStorage.getItem('site-banner');
    if (banner) document.getElementById('banner-img').src = banner;

    // الهيدر
    const headerTitle = localStorage.getItem('site-header-title');
    if (headerTitle) document.getElementById('site-title').innerText = headerTitle;

    // القسم الرئيسي
    const mainTitle = localStorage.getItem('site-main-title');
    const mainText = localStorage.getItem('site-main-text');
    if (mainTitle) document.getElementById('main-title').innerText = mainTitle;
    if (mainText) document.getElementById('main-text').innerText = mainText;

    // الفوتر
    const footer = localStorage.getItem('site-footer-text');
    if (footer) document.getElementById('footer-text').innerText = footer;
};