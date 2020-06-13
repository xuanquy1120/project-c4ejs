let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
console.log(currentUser)
function addGroup() {
    let group = document.getElementById('group').value;
    let existedGroup = JSON.parse(localStorage.getItem("groupDb"));

    if (!group ) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
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
            title: 'Vui lòng điền thông tin'
        })
        return;
    }
    else if (existedGroup.some((user) => {
        currentUser==user.username&&
        user.name == group;
    })) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
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
            title: 'Group đã tồn tại'
        })
        return;
    }
    alert("Đăng kí thành công");
    existedGroup.push(
        {
            username:currentUser,
            name: group,
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
let existedGroup = JSON.parse(localStorage.getItem("groupDb"));
let grouplist = document.getElementById('content-list')

    for (let i = 1; i < existedGroup.length; i++) {
        const element = existedGroup[i];
        if(currentUser===element.username){
        let html =`<p>${element.name}</p>`
        grouplist.innerHTML +=html;
        }
}