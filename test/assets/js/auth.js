const ADMIN_PASSWORD = "mySecret123"; // عدل كلمة المرور هنا

if (window.location.pathname.endsWith("admin-login.html")) {
    document.getElementById('loginForm').onsubmit = function(e){
        e.preventDefault();
        let pass = document.getElementById('adminPass').value;
        if (pass === ADMIN_PASSWORD) {
            localStorage.setItem('isAdmin', '1');
            window.location = "admin.html";
        } else {
            document.getElementById('loginError').innerText = "كلمة المرور غير صحيحة!";
        }
    }
}