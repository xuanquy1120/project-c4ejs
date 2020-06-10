let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
(showExistedTodos = () => {
  let todoDB = JSON.parse(localStorage.getItem("todoDB"));
  console.log(currentUser);
  document.getElementById("todoList").innerHTML="";
  todoDB.forEach((task) => {
    if (task.username == currentUser) {
      // addTodos(task.name, task.content, task.startTime, task.endTime);
      document.getElementById("todoList").innerHTML+=`
      <table class="table">
<tbody id="t-${task.name}">
  <tr>
    <td id="0-${task.name}" class="col-9 col-md-2">${task.name} Nội dung: ${task.content} From: ${task.startTime} - To: ${task.endTime}</td>
    <td class="col-3 col-md-2">
    <button id="1-${task.name}" onclick=done(event) type="button" class="btn btn-success">Done</button>
     <button id="2-${task.name}" onclick=edit(event) type="button" class="btn btn-warning">Edit</button>
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
  var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
  document.getElementById("date").innerHTML = date;
  
  var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

function search(e) {
  if (e.key == "Enter") {
    console.log("0");
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let searchTodo = document.getElementById("search").value;
    let todoDB = JSON.parse(localStorage.getItem("todoDB"));
    todoDB.forEach((task) => {
      if (
        task.username == currentUser &&
        (task.name.toLowerCase() == searchTodo.toLowerCase() ||
          task.name.toLowerCase().includes(searchTodo.toLowerCase()) == true)
      ) {
        console.log("match");
      }
    });
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
  alert("Vui lòng nhập đủ thông tin");
  return;
} else if (timeStart > timeEnd) {
  alert("Invalid time");
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
  alert("Todo đã tồn tại. Vui lòng nhập todo khác");
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
  <table class="table">
<tbody id="t-${nameWork}">
  <tr>
    <td id="0-${nameWork}" class="col-9 col-md-2">${nameWork} Nội dung: ${contentWork} From: ${timeStart} - To: ${timeEnd}</td>
    <td class="col-3 col-md-2">
    <button id="1-${nameWork}" onclick=done(event) type="button" class="btn btn-success">Done</button>
     <button id="2-${nameWork}" onclick=edit(event) type="button" class="btn btn-warning">Edit</button>
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
    groupID: undefined,
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
      let html =`<option>${element.name}</option>`
      grouplist.innerHTML +=html;
      List.innerHTML +=html
      }
  }
