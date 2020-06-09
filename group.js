function addGroup() {
    let group = document.getElementById('group').value;
    let existedGroup = JSON.parse(localStorage.getItem("groupDb"));

    if (!group ) {
        alert("Vui lòng điền đủ thông tin");
        return;
    }
    else if (existedGroup.some((user) => {
        return user.groupID === group;
    })) {
        alert("Tên đã tồn tại");
        return;
    }
    alert("Đăng kí thành công");
    existedGroup.push(
        {
            groupID: group
        }
    );
    console.log(existedGroup);
    localStorage.setItem("groupDb", JSON.stringify(existedGroup));
    window.location.href = "index.html";
}
function submit(e) {
    if (e.key == "Enter") {
        addGroup();
    }
}
