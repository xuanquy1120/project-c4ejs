//username phải có định dạng local-part@domainname
function register() {
    let username = document.getElementById('userName').value;
    let password = document.getElementById('passWord').value;
    let confirmPassword = document.getElementById('conFirm').value;
    let secret = document.getElementById('secret').value;
    let existedUser = JSON.parse(localStorage.getItem("userNameDb"));
    const regex=new RegExp(/^\S+@\S+$/);
    if (!(username && password && secret)) {
        alert("Vui lòng điền đủ thông tin");
        return;
    }
    else if (regex.test(userName)) {
        alert("Email không đúng định dạng");
        return;
    }
    else if (password != confirmPassword) {
        alert("Xác nhận mật khẩu không đúng");
        return;
    }
    else if (existedUser.some((user)=>{
        return user.username==username;
    })){
        alert("Tên người dùng đã tồn tại. Vui lòng chọn tên khác");
        return;
    }
    alert("Đăng kí thành công");
    save(existedUser,username, password);
    //chuyển về trang login
    window.location.href = "login.html";
}
function save(existedUser,username, password) {
    existedUser.push(
        {
            username: username
            , password: password
        }
    );
    localStorage.setItem("existedUser",JSON.stringify(existedUser));
}
function submit(e){
    if(e.key=="Enter"){
    register();        
    }
}
