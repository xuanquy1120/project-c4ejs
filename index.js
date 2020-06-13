let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
(showExistedTodos = () => {
  let todoDB = JSON.parse(localStorage.getItem("todoDB"));
  console.log(currentUser);
  document.getElementById("todoList").innerHTML="";
  todoDB.forEach((task) => {
    if (task.username == currentUser) {
      // addTodos(task.name, task.content, task.startTime, task.endTime);
      document.getElementById("todoList").innerHTML+=`
      <table class="table table-striped">
<tbody id="t-${task.name}">
  <tr>
    <td id="0-${task.name}" class="list">Tên:${task.name} - Nội dung:${task.content} - From:${task.startTime} - To:${task.endTime}</td>
    <td class="col-3 col-md-2">
    <button id="1-${task.name}" onclick=done(event) type="button" class="btn btn-success">Done</button></td>
    <td class="col-3 col-md-2">
     <button id="3-${task.name}" onclick=hide(event) type="button" class="btn btn-danger">Delete</button></td>
  </tr>
</tbody>
</table>`
    }
  });
})();

function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay+", "+" "+curMonth+", "+curYear+".";
  document.getElementById("date").innerHTML = date;
  
  var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

function find() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let searchTodo = document.getElementById("search").value;
    let todoDB = JSON.parse(localStorage.getItem("todoDB"));  
    document.getElementById("todoList").innerHTML=`<center><td class="col-3 col-md-2">
    <a  href="index.html" type="button" style="color:white" class="comeBack">Come Back</a></td></center>`;
    todoDB.forEach((task) => {
      if (
        task.username == currentUser &&
        (task.name.toLowerCase() == searchTodo.toLowerCase() ||
          task.name.toLowerCase().includes(searchTodo.toLowerCase()) == true)&&task.name.toLowerCase().length==searchTodo.toLowerCase().length
      ) {
        document.getElementById("todoList").innerHTML+=`
        <table class="table">
  <tbody id="t-${task.name}">
    <tr>
      <td id="0-${task.name}" class="col-9 col-md-2">Tên:${task.name} - Nội dung:${task.content} - From:${task.startTime} - To:${task.endTime}</td>
      <td class="col-3 col-md-2">
      <button id="1-${task.name}" onclick=done(event) type="button" class="btn btn-success">Done</button></td>
      <td class="col-3 col-md-2">
      <button id="3-${task.name}" onclick=hide(event) type="button" class="btn btn-danger">Delete</button></td>
    </tr>
  </tbody>
  </table>`
      }
    });
}
function search(e) {
  if (e.key == "Enter") {
      find();
  }
}
function suBmit() {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let nameWork = document.getElementById("nameWork").value;
  let contentWork = document.getElementById("contentWork").value;
  let timeStart = document.getElementById("timeStart").value;
  let timeEnd = document.getElementById("timeEnd").value;
  
//validate input
console.log(timeStart.replace("T", " "));
console.log(timeEnd.replace("T", " "));
if (!nameWork || !contentWork || !timeStart || !timeEnd) {
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
    title: 'Vui lòng nhập đủ thông tin'
})
  return;
} else if (timeStart > timeEnd) {
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
    title: 'Invalid time'
})
  return;
}
timeStart = timeStart.replace("T", " ");
timeEnd = timeEnd.replace("T", " ");
//validated input
let todoDB = JSON.parse(localStorage.getItem("todoDB"));
if (
  todoDB.some((task) => {
    return task.name == nameWork && task.username == currentUser;
  })
) {
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
    title: 'Todo đã tồn tại. Vui lòng nhập todo khác'
})
  return;
}
addTodos(nameWork, contentWork, timeStart, timeEnd);
}
function enter(e) {
  if (e.key == "Enter") {
    suBmit();
  }
}
function done(e) {
  let todoDB = JSON.parse(localStorage.getItem("todoDB"));
  console.log("done");
  console.log(e.target.id.slice(2));
  todoDB.forEach((task) => {
    if (task.username == currentUser &&task.name==e.target.id.slice(2)) {
    console.log(document.getElementById(`0-${e.target.id.slice(2)}`));
    document.getElementById(`0-${e.target.id.slice(2)}`).style["text-decoration"]="line-through";
    document.getElementById(`0-${e.target.id.slice(2)}`).style["color"]="green";
    document.getElementById(`0-${e.target.id.slice(2)}`).style["filter"]="blur(0px)";
    return
    }
  });
}
function hide(e) {
  console.log("delete");
  console.log(e.target.id.slice(2));
  let todoDB = JSON.parse(localStorage.getItem("todoDB"));
  todoDB.forEach((task) => {
    if (task.username == currentUser &&task.name==e.target.id.slice(2)) {
      console.log(document.getElementById(`t-${e.target.id.slice(2)}`))
      console.log(todoDB.length);
    document.getElementById(`t-${e.target.id.slice(2)}`).innerHTML="";
    todoDB.splice(todoDB.indexOf(task),1);
    console.log(todoDB.length);
    localStorage.setItem("todoDB",JSON.stringify(todoDB));
    return
    }
  });
}
function edit(e) {
  console.log("edit");
  console.log(e.target.id.slice(2));
  console.log(document.getElementById(`t-${e.target.id.slice(2)}`).innerHTML)
 
}
function addTodos(nameWork, contentWork, timeStart, timeEnd) {
  let toDos = document.getElementById("todoList").innerHTML;
  let newTodo = `
  ${toDos}
  <table class="table table-striped">
<tbody id="t-${nameWork}">
  <tr>
    <td id="0-${nameWork}" class="col-9 col-md-2">Tên:${nameWork} - Nội dung:${contentWork} - From:${timeStart} - To:${timeEnd}</td>
    <td class="col-3 col-md-2">
    <button id="1-${nameWork}" onclick=done(event) type="button" class="btn btn-success">Done</button></td>
    <td class="col-3 col-md-2">
     <button id="3-${nameWork}" onclick=hide(event) type="button" class="btn btn-danger">Delete</button></td>
  </tr>
</tbody>
</table>`;
  document.getElementById("todoList").innerHTML = newTodo;
  let todoDB = JSON.parse(localStorage.getItem("todoDB"));
  todoDB.push({
    username: currentUser,
    name: nameWork,
    content: contentWork,
    startTime: timeStart,
    endTime: timeEnd,
    status: 0,
  });
  localStorage.setItem("todoDB", JSON.stringify(todoDB));
}
function logout(){
  window.location.href='login.html';
}
function openForm() {
  document.getElementById("myForm").style.display = "block"; 
}
function closeForm() {
document.getElementById("myForm").style.display = "none";
}
let existedGroup = JSON.parse(localStorage.getItem("groupDb"));
let grouplist = document.getElementById('group-list')
let List = document.getElementById('list')

  for (let i = 1; i < existedGroup.length; i++) {
      const element = existedGroup[i];
      if(currentUser===element.username){
      let html =`<a class="dropdown-item" style="color:dodgerblue" onclick="group(${element.groupID})">${element.name}</a>`
      grouplist.innerHTML +=html;
      List.innerHTML +=html
      }
  }

  async function playAudio(sound){
    await sound.play();
    let popup = confirm("It's time");
    if (popup == true) {
    sound.pause();
  }
  }
  function isTime() {
    let todoDB = JSON.parse(localStorage.getItem("todoDB"));
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const now = new Date();
    const audio = new Audio("sounds/alarm.mp3");
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDay() + 7;
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let timeString = `${checkTime(y)}-${checkTime(m)}-${checkTime(d)} ${checkTime(
      hr)}:${checkTime(min)}`;
    console.log(timeString);
    todoDB.forEach((task) => {
      if (task.username == currentUser&&task.startTime == timeString && checkTime(sec) == 0) {
        playAudio(audio);
        }
      }
    );
  }
  setInterval(isTime, 1000);

  let existedAvatar = JSON.parse(localStorage.getItem("avatarDb"));
  let avtar = document.getElementById('avtar-img')
    for (let i = 0; i < existedAvatar.length; i++) {
        const element = existedAvatar[i];
        if(currentUser===element.username){
          document.getElementById('avtar-img').src = element.img;
        }
    }
    document.getElementById('background-music').addEventListener('change', (e) => {
      backGroundMusic(e);
    })
    async function backGroundMusic(e){
      let sound=new Audio("sounds/171.mp3");
    console.log(`playing ${e.target.value}`)
    if (e.target.value=='rain'){
      await setInterval(function(){
        sound.play()
      },sound.duration);
    }
    }
