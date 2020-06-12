//username phải có định dạng local-part@domainname
function register() {
    let username = document.getElementById('userName').value;
    let password = document.getElementById('passWord').value;
    let confirmPassword = document.getElementById('conFirm').value;
    // let secret = document.getElementById('secret').value;
    let existedUser = JSON.parse(localStorage.getItem("userNameDb"));
    const regex = new RegExp(/^\S+@\S+$/);
    if (!(username && password)) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'error',
            title: 'Vui lòng điền đủ thông tin'
        })
        return;
    }
    
    else if (regex.test(userName)) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'error',
            title: 'Email không đúng định dạng'
        })
        return;
    }
    else if (password != confirmPassword) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'error',
            title: 'Xác nhận mật khẩu không đúng'
        })
        return;
    }
    else if (existedUser.some((user) => {
        return user.username == username;
    })) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'error',
            title: 'Tên người dùng đã tồn tại. Vui lòng chọn tên khác'
        })
        return;
    }
    alert("Đăng kí thành công");
    existedUser.push(
        {
            username: username
            , password: password
        }
    );
    console.log(existedUser);
    localStorage.setItem("userNameDb", JSON.stringify(existedUser));
    //chuyển về trang login
    window.location.href = "login.html";
}
function submit(e) {
    if (e.key == "Enter") {
        register();
    }
}