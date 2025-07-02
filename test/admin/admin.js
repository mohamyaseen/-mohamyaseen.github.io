document.addEventListener('DOMContentLoaded', function() {
    // حماية الأدمن
    if(!localStorage.getItem('adminLoggedIn')) location.href="login.html";
    // التنقل بين الأقسام
    const mainContent = document.getElementById('mainContent');
    const settingsSection = document.getElementById('settingsSection');
    const usersSection = document.getElementById('usersSection');
    document.getElementById('dashboardLink').onclick = ()=>{showSection(mainContent)};
    document.getElementById('settingsLink').onclick = ()=>{showSection(settingsSection);loadSettings();};
    document.getElementById('usersLink').onclick = ()=>{showSection(usersSection);loadUsers();};
    document.getElementById('logoutBtn').onclick = ()=>{localStorage.removeItem('adminLoggedIn');location.href="login.html";};
    // إعدادات الموقع
    document.getElementById('addHeaderBtn').onclick = addHeaderBtn;
    document.getElementById('addServiceBtn').onclick = addServiceBtn;
    document.getElementById('saveSettings').onclick = saveSettings;
    // مستخدمون
    document.querySelector('.btn-add-user').onclick = addUser;
    // افتراضي: عرض الصفحة الرئيسية
    showSection(mainContent);
});

function showSection(sec){
    document.querySelectorAll('.admin-main').forEach(s=>s.style.display="none");
    sec.style.display="block";
}

let settingsCache = null;

function loadSettings(){
    fetch('../data/settings.json').then(res=>res.json()).then(settings=>{
        settingsCache = settings;
        document.getElementById('logoText').value = settings.logoText || '';
        document.getElementById('logoIcon').value = settings.logoIcon || '';
        renderHeaderButtons(settings.headerButtons||[]);
        document.getElementById('bannerTitle').value = settings.bannerTitle || '';
        document.getElementById('bannerDesc').value = settings.bannerDesc || '';
        document.getElementById('bannerBtn').value = settings.bannerBtn || '';
        renderServices(settings.services||[]);
        document.getElementById('footerText').value = settings.footerText || '';
    });
}

function renderHeaderButtons(btns){
    const c = document.getElementById('headerButtons');
    c.innerHTML = '';
    btns.forEach((btn,i)=>{
        c.innerHTML += `
        <div class="button-manager">
        <input type="text" class="form-control" value="${btn.text||''}" placeholder="النص">
        <input type="text" class="form-control" value="${btn.url||'#'}" placeholder="الرابط">
        <input type="text" class="form-control" value="${btn.icon||''}" placeholder="أيقونة">
        <button class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        </div>`;
    });
}
function addHeaderBtn(){
    document.getElementById('headerButtons').innerHTML += `
    <div class="button-manager">
    <input type="text" class="form-control" placeholder="النص">
    <input type="text" class="form-control" placeholder="الرابط">
    <input type="text" class="form-control" placeholder="أيقونة">
    <button class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    </div>`;
}
function renderServices(services){
    const c = document.getElementById('servicesEditor');
    c.innerHTML = '';
    services.forEach((s,i)=>{
        c.innerHTML += `
        <div class="button-manager">
            <input type="text" class="form-control" value="${s.title||''}" placeholder="العنوان">
            <input type="text" class="form-control" value="${s.desc||''}" placeholder="الوصف">
            <input type="text" class="form-control" value="${s.icon||''}" placeholder="أيقونة">
            <input type="text" class="form-control" value="${s.bg||''}" placeholder="لون الخلفية">
            <input type="text" class="form-control" value="${s.btn||''}" placeholder="نص الزر">
            <button class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        </div>`;
    });
}
function addServiceBtn(){
    document.getElementById('servicesEditor').innerHTML += `
    <div class="button-manager">
        <input type="text" class="form-control" placeholder="العنوان">
        <input type="text" class="form-control" placeholder="الوصف">
        <input type="text" class="form-control" placeholder="أيقونة">
        <input type="text" class="form-control" placeholder="لون الخلفية">
        <input type="text" class="form-control" placeholder="نص الزر">
        <button class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    </div>`;
}
function saveSettings(){
    const settings = settingsCache || {};
    settings.logoText = document.getElementById('logoText').value;
    settings.logoIcon = document.getElementById('logoIcon').value;
    settings.headerButtons = Array.from(document.querySelectorAll('#headerButtons .button-manager')).map(bm=> ({
        text: bm.children[0].value, url: bm.children[1].value, icon: bm.children[2].value
    }));
    settings.bannerTitle = document.getElementById('bannerTitle').value;
    settings.bannerDesc = document.getElementById('bannerDesc').value;
    settings.bannerBtn = document.getElementById('bannerBtn').value;
    settings.services = Array.from(document.querySelectorAll('#servicesEditor .button-manager')).map(bm=> ({
        title: bm.children[0].value, desc: bm.children[1].value,
        icon: bm.children[2].value, bg: bm.children[3].value, btn: bm.children[4].value
    }));
    settings.footerText = document.getElementById('footerText').value;
    fetch('../save.php', {
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'saveSettings',settings})
    }).then(r=>r.json()).then(resp=>{
        showNotification(resp.message || 'تم حفظ الإعدادات');
    });
}

function showNotification(msg,type='success'){
    const n = document.createElement('div');
    n.className = 'notification ' + type;
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(()=>{n.style.opacity='0';setTimeout(()=>n.remove(),300)},2000);
}

// إدارة المستخدمين
function loadUsers(){
    fetch('../save.php', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'load'})})
    .then(res=>res.json())
    .then(users=>{
        const tb = document.querySelector('.users-table tbody');
        tb.innerHTML = '';
        users.forEach(u=>{
            tb.innerHTML += `<tr>
                <td>${u.username}</td>
                <td>${getRoleName(u.role)}</td>
                <td><span class="status ${u.status}">${u.status=="active"?"نشط":"غير نشط"}</span></td>
                <td>
                    <button class="btn-delete-user" onclick="deleteUser('${u.username}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        });
    });
}
function addUser(){
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newUserRole').value;
    if(!username||!password) return showNotification('يرجى كتابة اسم مستخدم وكلمة مرور','error');
    fetch('../save.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'load'})})
    .then(r=>r.json())
    .then(users=>{
        if(users.find(u=>u.username===username)) return showNotification('المستخدم موجود','error');
        users.push({username,password,role,status:'active'});
        fetch('../save.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'save',users})})
        .then(r=>r.json()).then(resp=>{
            showNotification(resp.message||'تم إضافة المستخدم');
            loadUsers();
            document.getElementById('newUsername').value='';
            document.getElementById('newPassword').value='';
        });
    });
}
function deleteUser(username){
    if(!confirm('هل تريد حذف المستخدم '+username+'؟')) return;
    fetch('../save.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'load'})})
    .then(r=>r.json())
    .then(users=>{
        users = users.filter(u=>u.username!==username);
        fetch('../save.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'save',users})})
        .then(r=>r.json()).then(resp=>{
            showNotification(resp.message||'تم حذف المستخدم');
            loadUsers();
        });
    });
}
function getRoleName(role){
    return {admin:'مدير',editor:'محرر',author:'ناشر'}[role]||role;
}