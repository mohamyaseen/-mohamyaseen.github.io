/**
 * admin.js - لوحة التحكم
 * 
 * هذا الملف يحتوي على جميع الوظائف الخاصة بلوحة التحكم
 * وواجهة تسجيل الدخول
 */

// تهيئة لوحة التحكم عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل لوحة التحكم بنجاح');
    
    // التحقق من تسجيل الدخول
    checkLoginStatus();
    
    // تفعيل وظائف لوحة التحكم
    setupAdminFunctions();
    
    // تفعيل وظائف تسجيل الدخول
    setupLoginFunctions();
});

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const isDashboard = document.querySelector('.admin-dashboard');
    
    if (isDashboard) {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// تهيئة وظائف لوحة التحكم
function setupAdminFunctions() {
    // تفعيل القائمة الجانبية
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // تفعيل القائمة المنسدلة للملف الشخصي
    const adminProfile = document.querySelector('.admin-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (adminProfile && profileDropdown) {
        adminProfile.addEventListener('click', function() {
            profileDropdown.classList.toggle('show');
        });
    }
    
    // تفعيل زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // تفعيل اختيار الألوان
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // تفعيل رفع الصور
    const uploadButtons = document.querySelectorAll('.btn-upload');
    
    if (uploadButtons.length > 0) {
        uploadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const preview = button.closest('.image-upload').querySelector('.image-preview');
                            preview.innerHTML = `<img src="${event.target.result}" alt="الصورة المرفوعة">`;
                        };
                        reader.readAsDataURL(file);
                    }
                };
                
                input.click();
            });
        });
    }
    
    // تفعيل أزرار الحفظ
    const saveButtons = document.querySelectorAll('.btn-save');
    
    if (saveButtons.length > 0) {
        saveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const section = this.closest('.section');
                const sectionTitle = section.querySelector('.section-header h2').textContent;
                
                // في الواقع، هنا سيتم إرسال البيانات إلى الخادم
                // لكن في هذا المثال سنكتفي بعرض إشعار
                showNotification(`تم حفظ تغييرات قسم "${sectionTitle}" بنجاح!`);
            });
        });
    }
}

// تهيئة وظائف تسجيل الدخول
function setupLoginFunctions() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // في الواقع، هنا سيتم التحقق من بيانات الدخول مع الخادم
            // لكن في هذا المثال سنستخدم بيانات افتراضية
            const validUsername = "admin";
            const validPassword = "admin123";
            
            if (username === validUsername && password === validPassword) {
                // تخزين حالة تسجيل الدخول
                localStorage.setItem('adminLoggedIn', 'true');
                
                // توجيه المستخدم إلى لوحة التحكم
                window.location.href = 'dashboard.html';
            } else {
                showNotification('اسم المستخدم أو كلمة المرور غير صحيحة!', 'error');
            }
        });
    }
}

// وظيفة لعرض الإشعارات
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

// وظيفة لحماية المسارات
function protectAdminRoutes() {
    const adminPages = ['dashboard.html', 'login.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (adminPages.includes(currentPage)) {
        // التحقق من حالة تسجيل الدخول
        const isLoginPage = currentPage === 'login.html';
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLoginPage && isLoggedIn) {
            window.location.href = 'dashboard.html';
        } else if (!isLoginPage && !isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// استدعاء وظيفة حماية المسارات عند تحميل الصفحة
protectAdminRoutes();