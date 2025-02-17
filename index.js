function noTask() {
    let li = document.createElement('h3');
    li.innerHTML = 'No tasks added yet';
    li.className = 'no';
    if (!document.querySelector('.no')) tasksLists.appendChild(li);
}

function displayTasks() {
    if (savedTasksList.length > 0) {
        savedTasksList.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = `${task} <span class="dle">Del</span>`;
            tasksLists.appendChild(li);
        });
    } else {
        noTask();
    }
}

function saveTasks() {
    let listTasksToSave = [];
    let LiTasks = document.querySelectorAll('#tasksList li');
    LiTasks.forEach(item => {
        listTasksToSave.push(item.textContent.replace('Del', '').trim());
    });
    window.localStorage.setItem('tasks', JSON.stringify(listTasksToSave));
}

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
        li.innerHTML = `${task} <span class="dle">Del</span>`;
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
};
