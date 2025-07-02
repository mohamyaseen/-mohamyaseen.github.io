/**
 * main.js - الموقع الرئيسي
 * 
 * هذا الملف يحتوي على جميع الوظائف الأساسية للموقع الرئيسي
 * ولا يحتوي على أي وظائف خاصة بلوحة التحكم
 */

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع الرئيسي بنجاح');
    
    // تطبيق التخصيصات من ملف JSON
    applySiteSettings();
    
    // تفعيل القائمة المنسدلة للهاتف المحمول
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
    
    // تفعيل شرائح الخدمات
    const serviceCards = document.querySelectorAll('.feature-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// وظيفة لتطبيق التخصيصات على الموقع
function applySiteSettings() {
    fetch('admin/admin_data.json')
        .then(response => response.json())
        .then(data => {
            // تطبيق الألوان
            if (data.design) {
                document.documentElement.style.setProperty('--primary', data.design.primaryColor);
            }
            
            // تطبيق الهيدر
            if (data.header) {
                const nav = document.querySelector('nav ul');
                nav.innerHTML = '';
                
                data.header.buttons.forEach(button => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${button.url}">${button.text}</a>`;
                    nav.appendChild(li);
                });
            }
            
            // تطبيق البانر
            if (data.banner) {
                const hero = document.querySelector('.hero');
                if (data.banner.backgroundImage) {
                    hero.style.backgroundImage = `url('${data.banner.backgroundImage}')`;
                }
                document.querySelector('.hero-content h1').textContent = data.banner.title;
                document.querySelector('.hero-content p').textContent = data.banner.description;
                document.querySelector('.hero-content .btn').textContent = data.banner.buttonText;
            }
            
            // تطبيق الفوتر
            if (data.footer) {
                document.querySelector('.copyright p').textContent = data.footer.copyright;
                document.querySelector('.footer-section p').textContent = data.footer.description;
            }
        })
        .catch(error => {
            console.error('حدث خطأ أثناء تحميل التخصيصات:', error);
        });
}

// وظائف عامة للموقع
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// وظيفة لتعديل اللون
function adjustColor(color, amount) {
    let usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    
    let b = ((num >> 8) & 0x00FF) + amount;
    
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    
    let g = (num & 0x0000FF) + amount;
    
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}