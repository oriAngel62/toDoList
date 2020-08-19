//add complete to task for saving the checked
var complete = false;

class Task {
    constructor(id, info) {
        this.id = id;
        this.info = info;
    }
}
var toDoArr = [];

function onComplete(e) {
    complete = !complete;
    complete ? (e.target.className = "checked") : (e.target.className = "");
}

findLocalStorage();
function findLocalStorage() {
    var arrLocalStorage = JSON.parse(localStorage.getItem("task"));
    //use local storage if he is not empty
    if (arrLocalStorage != null) {
        toDoArr = arrLocalStorage;
    } else {
        return;
    }
    showData();
}

function showData() {
    toDoArr.forEach((task, index) => {
        task.id = index;
        // console.log(task);
        createTodo(index, task.info);
    });
}

function createTodo(id, info) {
    var ul = document.getElementById("list");

    var div = document.createElement("div");
    var li = document.createElement("li");
    var span = document.createElement("span");

    var d = new Date();
    var date = document.createElement("span");
    date.className = "badge badge badge-pill";
    date.innerHTML = d.toDateString();

    span.className = "badge badge-danger badge-pill";
    span.innerHTML = "X";
    span.id = id;
    li.className =
        "list-group-item d-flex justify-content-between align-items-center";

    // span.addEventListener("click", onDeleteTask);
    div.addEventListener("click", onComplete);
    span.addEventListener("click", onDelete);

    div.innerHTML = info;
    li.appendChild(div);
    li.appendChild(date);
    li.appendChild(span);
    ul.appendChild(li);
}

function onDelete(e) {
    let idTodo = 0;
    idTodo = e.target.id;
    toDoArr = toDoArr.filter((todo) => todo.id != idTodo);
    e.target.parentElement.remove();
    updateToLocalStorage();
}

function addToLIst() {
    var task = document.getElementById("newTask").value;
    toDoArr.push(new Task(toDoArr.length, task));
    createTodo(toDoArr.length - 1, task);
    updateToLocalStorage();
}

function updateToLocalStorage() {
    localStorage.setItem("task", JSON.stringify(toDoArr));
}
