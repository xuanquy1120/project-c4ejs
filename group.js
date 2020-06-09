let groupDb = [
    {
         groupID: ""
        , name: ""
        , username: "admin@gmail.com"
    }
]



function groups() {
    let group = document.getElementById('new-group').value;
    
    let existedGroup = JSON.parse(localStorage.getItem("groupDb"));
    
    // if (existedGroup.some(group) === true) {
    //     alert("Tên nhóm đã tồn tại. Vui lòng chọn tên khác");
    //     return;
    // }   
    // existedGroup.push(
    //     {
    //         name: group,
    //         username: "admin@gmail.com"
    //     }
    // );
    // console.log(existedGroup); 
    // localStorage.setItem("existedGroup", JSON.stringify(existedGroup));
}
function save(existedGroup, group) {
    // existedGroup.push(
    //     {
    //         name : group
    //     }
    // );
    groupDb.push(group);
    localStorage.setItem ('groupDb', 'groups');
    console.log(existedGroup);
    localStorage.setItem("existedGroup", JSON.stringify(existedGroup));
}
function submit(e) {
    if (e.key == "Enter") {
        groups();
    }
}



