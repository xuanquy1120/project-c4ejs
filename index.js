function sumit(){
    const nameWork =document.getElementById("nameWork").value
    const contentWork =document.getElementById("contentWork").value
    const timeStart =document.getElementById("timeStart").value
    const timeEnd =document.getElementById("timeEnd").value
    
    let showToDo = document.getElementById('content-todo')
    showToDo.innerHTML = `Name:${nameWork} Nôi dụng:${contentWork} Time Start${timeStart}-Time End${timeEnd}`
    
    
};