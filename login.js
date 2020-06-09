let userNameDb = [
    {
        username: "admin@gmail.com"
        , password: "123456"
    }
];
let todoDB = [
    {
        username: "admin@gmail.com"
        , name: "Ăn"
        ,content:"abc"
        , groupID: ""
        , startTime: ""
        , endTime: ""
        ,status:0
        //0 là chưa hoàn thành 1 là done
    }
];
let groupDb = [
    {
        groupID: ""
        , name: ""
        , username: "admin@gmail.com"
    }
]
if (!JSON.parse(localStorage.getItem("userNameDb"))||JSON.parse(localStorage.getItem("userNameDb")).length<1) {
    localStorage.setItem("userNameDb", JSON.stringify(userNameDb));
}
if (!JSON.parse(localStorage.getItem("todoDB"))||JSON.parse(localStorage.getItem("userNameDb")).length<1) {
    localStorage.setItem("todoDB", JSON.stringify(todoDB));
}
if (!JSON.parse(localStorage.getItem("groupDb"))||JSON.parse(localStorage.getItem("userNameDb")).length<1) {
    localStorage.setItem("groupDb", JSON.stringify(groupDb));
}
function login() {
    let username = document.getElementById('userName').value;
    let password = document.getElementById('passWord').value;
    let existedUser = JSON.parse(localStorage.getItem("userNameDb"));
    if (!username || !password) {
        alert("Vui lòng điền đủ thông tin đăng nhập");
        return;
    }
    let isExisted = existedUser.some((user) => {
        return user.username == username && user.password == password;
    })
    if (!isExisted) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng")
    }
    else {
        alert(`Welcome back ${username}!`);
        sessionStorage.setItem("currentUser", JSON.stringify(username));
        window.location.href = "index.html";
    }
};

function submit(event) {
    if (event.key === "Enter") {
        login();
    }
}