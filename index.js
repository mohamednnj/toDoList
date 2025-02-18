function noTask() {
    let li = document.createElement('h3');
    li.innerHTML = 'No tasks added yet';
    li.className = 'no';
    if (!document.querySelector('.no')) tasksLists.appendChild(li);
}

function displayTasks() {
    if (savedTasksList.length > 0) {
        savedTasksList.forEach(task => {
            let obj = JSON.parse(task);
            let li = document.createElement('li');
            let ch = `<div><input class="ch" type="checkbox" ${obj.checked ? 'checked':''} ></div> `
            li.innerHTML = `${ch} ${obj.data} <span class="dle">Del</span>`;
            tasksLists.appendChild(li);
        });
    } else {
        noTask();
    }
}

function makeObj (LiTasks) {
    let listTasksToSave = []
    let boxes = document.querySelectorAll('#tasksList li .ch');
    for (let i = 0; i <LiTasks.length; i++) {
        let item = LiTasks[i];
        let boxStatus = boxes[i].checked
        item = item.textContent.replace('Del', '').trim()
        let obj = {
            data: item,
            checked: boxStatus
        }
        listTasksToSave.push(JSON.stringify(obj));
    }
    return listTasksToSave;
}
function saveTasks() {
    let LiTasks = document.querySelectorAll('#tasksList li');
    window.localStorage.setItem('tasks', JSON.stringify(makeObj (LiTasks)));
}
// let boxes = document.querySelectorAll('#tasksList li .ch');
// boxes.forEach((el)=>{
//     el.addEventListener('change',()=>{saveTasks()})
// })

let savedTasks = window.localStorage.getItem('tasks');
let taskIn = document.querySelector('#task');
let tasksLists = document.getElementById('tasksList');
let savedTasksList = savedTasks ? JSON.parse(savedTasks) : [];

function addEventDel() {
    let delTask = document.querySelectorAll('.dle');
    delTask.forEach(el => {
        el.addEventListener('click', e => {
            e.currentTarget.parentNode.remove();
            saveTasks();
            if (document.querySelectorAll('#tasksList li').length === 0) noTask();
        });
    });
}

let addTask = document.getElementById('addTask');
let addNewTask = () => {
    if (document.querySelector('.no')) document.querySelector('.no').remove();
    let task = taskIn.value.trim();
    if (task !== '') {
        let li = document.createElement('li');
        let ch = `<div><input class="ch" type="checkbox"></div> `
        li.innerHTML = `${ch} ${task} <span class="dle">Del</span>`;
        tasksLists.appendChild(li);
        addEventDel();
        saveTasks();
        taskIn.value = '';
    }
};

addTask.addEventListener('click', addNewTask);

window.onload = () => {
    displayTasks();
    addEventDel();
    let boxes = document.querySelectorAll('#tasksList li .ch');
    boxes.forEach((el) => {
        el.addEventListener('change', () => {
            saveTasks()
        })
    })

};
