let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
console.log(currentUser)
let listImg  = [
  {
      img: "images/1-min.jpg"
      , ID: 1
  },
  {
      img: "images/anh-avatar-dep.jpg"
     , ID: 2
  },
  {
      img: "images/hinh-avatar-cho-nu-dep-1.jpg"
      , ID: 3
  },
  {
      img: "images/anh-avatar-dep-7_034121256.jpg"
      , ID: 4
  },
  {
      img: "images/hinh-avatar-de-thuong-61.jpg"
      , ID: 5
  }
]
function showListImg(list){
  let tbody = document.getElementById('list-img')
tbody.innerHTML = '';

for (let i = 0; i < list.length; i++) {
    const img = list[i];
    let html =`<tr>
    <td><center>${i + 1}</center></td>
    <td>
    <center><img src="${img.img}" id="${img.ID}" alt="" width="100" height="100"></center>
    </td>
    <td>
    <center><button class="btn btn-link" onclick="showImg(${img.ID})">choose avatar</button></center>
    </td>
          </tr>`;
      tbody.innerHTML +=html;
}
}
showListImg(listImg );
function showImg(ID){
  let existedAvatar = JSON.parse(localStorage.getItem("avatarDb"));
  for (let i = 0; i < listImg.length; i++) {
    const element = listImg[i];
    if(ID===element.ID){
      existedAvatar.push(
        {
            username:currentUser,
            img: element.img
        }
      );
    }
  }
  localStorage.setItem("avatarDb", JSON.stringify(existedAvatar));
  window.location.href = "index.html";
}



