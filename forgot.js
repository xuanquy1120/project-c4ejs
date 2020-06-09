let passwordNode = document.createElement("div");
let passwordTextNode = document.createTextNode("Password không được bỏ trống.");
let emailNode = document.createElement("div");
let emailTextNode = document.createTextNode("Email không được bỏ trống.");
let confirmNode = document.createElement("div");
let conFirmTextNode = document.createTextNode(
  "Xác nhận mật khẩu không được bỏ trống."
);
passwordNode.appendChild(passwordTextNode);
confirmNode.appendChild(conFirmTextNode);
emailNode.appendChild(emailTextNode);
function changePassword() {
  let email = document.getElementById("email").value;
  let passWord = document.getElementById("passWord").value;
  let conFirm = document.getElementById("conFirm").value;
  if (!email) {
    document.getElementById("email-text").appendChild(emailNode);
  }
  if (!passWord) {
    document.getElementById("password-text").appendChild(passwordNode);
  }
  if (!conFirm) {
    document.getElementById("confirm-text").appendChild(confirmNode);
  }
  let existedUser = JSON.parse(localStorage.getItem("userNameDb"));
  
    existedUser.forEach(account => {
        if(account.username==email){
            account.password=passWord;
            localStorage.setItem("userNameDb", JSON.stringify(existedUser));
            alert(`Mật khẩu mới của ${email} là ${passWord}`);
            window.location.href = "login.html";
        }
    });
  
}
function submit(e) {
  if (e.key === "Enter") {
    console.log(e);
    changePassword();
  }
}