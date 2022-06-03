
var task = [
    {
        taskname: "Do coding Challenges",
        isCheck: false
    },
    {
        taskname: "Do Homework",
        isCheck: false
    },
    {
        taskname: "Do fitness",
        isCheck: false
    },
    {
        taskname: "task completed 1",
        isCheck: true
    },
    {
        taskname: "task completed 2",
        isCheck: true
    }
]


// Local storage 

//localStorage.setItem("taskArray", JSON.stringify(task));
sessionStorage.setItem("taskArray", JSON.stringify(task));

// const array = localStorage.getItem("taskArrays");
// console.log(JSON.parse(array));

function updateLocalStorageItem(array) {
    sessionStorage.setItem("taskArray", JSON.stringify(array));
    return true;
}

function getLocalStorageItem() {
    const strArray = sessionStorage.getItem("taskArray");
    const objArray = JSON.parse(strArray);
    return objArray;

}




const selectID = "select";

const toggles = document.querySelectorAll('.toggle');

const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const formContainer = document.querySelector(".add-form-container");

// access to child .check-container of the section all , active & completed

const containerTaskAll = all.querySelector(".check-container");
const containerTaskActive = active.querySelector(".check-container");
const containerTaskCompleted = completed.querySelector(".check-container");



function loadAllTask() {

    containerTaskAll.innerHTML = "";
    const arrayTaskObj = getLocalStorageItem();
    console.log(arrayTaskObj);

    for (i = 0; i < arrayTaskObj.length; i++) {

        if (arrayTaskObj[i].isCheck) {

            containerTaskAll.innerHTML += '<label class="container-label"><input type="checkbox" checked onclick="addToCompletedTask(this)"><span class="text">' + arrayTaskObj[i].taskname + '</span></label>';

        }
        else {
            containerTaskAll.innerHTML += '<label class="container-label"><input type="checkbox" onclick="addToCompletedTask(this)"><span class="text">' + arrayTaskObj[i].taskname + '</span></label>';
        }

    }

}





function loadActiveTask() {
    containerTaskActive.innerHTML = "";
    var arrayTaskObj = getLocalStorageItem();

    for (i = 0; i < arrayTaskObj.length; i++) {

        if (arrayTaskObj[i].isCheck) {

        }
        else {
            containerTaskActive.innerHTML += '<label class="container-label"><input type="checkbox" onclick="addToCompletedTask(this)"><span class="text">' + arrayTaskObj[i].taskname + '</span></label>';
        }
    }
}




function loadCompletedTask() {
    containerTaskCompleted.innerHTML = "";
    var arrayTaskObj = getLocalStorageItem();
    for (i = 0; i < arrayTaskObj.length; i++) {

        if (arrayTaskObj[i].isCheck) {

            containerTaskCompleted.innerHTML += '<div class="task-done"><label class="container-label"><input type="checkbox" checked onclick="addToCompletedTask(this)"><span class="text line-through">' + arrayTaskObj[i].taskname + '</span></label><span class="material-symbols-outlined delete-icon" onclick="deleteTask(this)">delete</span></div>';
        }
    }
}

//loadCompletedTask();


function menuTabs(index) {

    toggles.forEach((node, i) => {
        if (index == i) {
            node.setAttribute("id", selectID);
            toggles.forEach((toggle, count) => {
                if (count != index) {
                    toggle.removeAttribute("id");
                }
            })
        }
    })

    if (index == 0) { // all tab
        loadAllTask();
        all.style.display = "block";
        active.style.display = "none";
        completed.style.display = "none";
        formContainer.style.display = "block";
    }
    else if (index == 1) { //active tab
        loadActiveTask();
        all.style.display = "none";
        active.style.display = "block";
        completed.style.display = "none";
        formContainer.style.display = "block";
    }
    else if (index == 2) { // completed tab
        loadCompletedTask();
        all.style.display = "none";
        active.style.display = "none";
        completed.style.display = "block";
        formContainer.style.display = "none";
    };

}

menuTabs(0);

// add new task

function addTask() {

    const arrayTaskObj = getLocalStorageItem();
    const input = document.querySelector("#input");

    var section = document.querySelector(".check-container");

    if (input.value == "") {
        // console.log("esta vacio maquinola");
        alert("before add a task you need to write it");
    }
    else {
        arrayTaskObj.unshift({ taskname: input.value, isCheck: false });
        updateLocalStorageItem(arrayTaskObj);
        section.innerHTML += '<label class="container-label"><input type="checkbox" onclick="addToCompletedTask(this)"><span class="text">' + input.value + '</span></label>';
        input.value = "";
        loadAllTask();
    }
}


// when input is checked add to completed task tab

function addToCompletedTask(element) {

    const arrayTaskObj = getLocalStorageItem();

    if (element.checked == true) {

        parent = element.parentNode;
        taskElement = parent.querySelector(".text");
        const taskName = taskElement.innerHTML;

        let found = false;
        let i = 0;

        while (!found && i < arrayTaskObj.length) {
            if (arrayTaskObj[i].taskname == taskName) {
                arrayTaskObj[i].isCheck = true;
                updateLocalStorageItem(arrayTaskObj);
                found = true;
            }
            else {
                i++;
            }
        }

    }
    else {
        parent = element.parentNode;
        taskElement = parent.querySelector(".text");
        const taskName = taskElement.innerHTML;

        let found = false;
        let i = 0;

        while (!found && i < arrayTaskObj.length) {
            if (arrayTaskObj[i].taskname == taskName) {
                arrayTaskObj[i].isCheck = false;
                updateLocalStorageItem(arrayTaskObj);
                found = true;
            }
            else {
                i++;
            }
        }
    }

}

// Delet completed task

function deleteTask(element) {

    const parentNode = element.parentNode;
    const taskText = parentNode.querySelector(".text");
    const textValue = taskText.innerHTML;

    const arrayTaskObj = getLocalStorageItem();

    let found = false;
    let i = 0;
    while (!found && i < arrayTaskObj.length) {
        const index = arrayTaskObj[i].taskname;

        if (textValue == index) {
            console.log("found it");
            found = true;
        }
        else {
            i++;
        }
    }
    arrayTaskObj.splice(i, 1);
    updateLocalStorageItem(arrayTaskObj);

    loadCompletedTask();


}

// Delete All completed task     


function deleteAllTask() {

    const arrayTaskObj = getLocalStorageItem();

    for (var i = arrayTaskObj.length - 1; i >= 0; i--) {
        // console.log(arrayTaskObj[i]);
        let isChecked = arrayTaskObj[i].isCheck;
        console.log(isChecked);
        if (isChecked) {
            arrayTaskObj.splice(i, 1);
            // console.log(arrayTaskObj);
            // console.log(arrayTaskObj.length);
        }

    }
    updateLocalStorageItem(arrayTaskObj);

    loadCompletedTask();

}


