let userNameDb = [
    {
        username: "admin@gmail.com"
        , password: "123456"
    }
    ,
    {

    }
    ,
    {

    }
];
let todoDB = [
    {
        username: "admin@gmail.com"
        , name: "Ăn"
        , groupID: ""
        , startTime: ""
        , endTime: ""
    }
];

let groupDb = [
    {
        groupID: ""
        , name: ""
        , username: "admin@gmail.com"
    }
]
localStorage.setItem("userNameDb", JSON.stringify(userNameDb));
localStorage.setItem("todoDB", JSON.stringify(todoDB));
localStorage.setItem("groupDb", JSON.stringify(groupDb));


function login() {
    let username = document.getElementById('userName').value;
    let password = document.getElementById('passWord').value;
    let existedUser = JSON.parse(localStorage.getItem("userNameDb"));
    if (!username || !password) {
        alert("Vui lòng điền đủ thông tin đăng nhập");
        return;
    }
    let check = existedUser.some((user) => {
        return user.username == username && user.password == password;
    })
    if (!check) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng")
    }
    else {
        alert("Đăng nhập thành công");
        sessionStorage.setItem("currentUser", JSON.stringify(username));
        window.location.href="/home.html";
    }
};

function submit(event) {
    if (event.key === "Enter") {
        login();
    }
}
