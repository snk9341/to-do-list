listCount = 0;
let taskCount = 0;
let achievement = 0;

let lists = new Lists();

window.onload = start();
function start() {
    let divPresentation = document.createElement("div");
    divPresentation.setAttribute("class", "presentation");
    divPresentation.setAttribute("id", "presentation");
    basis.appendChild(divPresentation);

    let presentation = document.createTextNode(
        "Retrouvez vos différentes notes ici !"
    );
    divPresentation.appendChild(presentation);

    showList();
}

function showList() {
    let divList = document.createElement("div");
    divList.setAttribute("class", "divList");
    divList.setAttribute("id", "divList");
    basis.appendChild(divList);

    if (lists.list.length == 0) {
        let noList = document.createTextNode(
            "Créez une nouvelle liste pour commencer !"
        );
        divList.appendChild(noList);
    } else if (lists.list.length != 0) {
        let divGrid = document.createElement("div");
        divGrid.setAttribute("class", "divGrid");
        divGrid.setAttribute("id", "divGrid");
        divList.appendChild(divGrid);

        for (let i = 0; i < lists.list.length; i++) {
            let ID = "divListing";
            let divID = ID.concat(lists.list[i].id);
            let ID1 = "divListNaming";
            let divID1 = ID1.concat(lists.list[i].id);

            let divListing = document.createElement("div");
            divListing.setAttribute("class", "divListing");
            divListing.setAttribute("id", divID);

            let divListNaming = document.createElement("div");
            divListNaming.setAttribute("class", "divListNaming");
            divListNaming.setAttribute("id", divID1);

            let listNaming = lists.list[i].name;
            let naming = document.createTextNode(listNaming);
            divListNaming.appendChild(naming);
            divListing.appendChild(divListNaming);

            let getID = divID.split("")[10];
            divListing.addEventListener("click", function edit() {
                createList(lists.list[getID - 1].name, lists.list[getID - 1]);
            });

            divGrid.appendChild(divListing);
            let ul = document.createElement("ul");
            ul.setAttribute("class", "ulstyle");

            for (let j = 0; j < lists.list[i].tasks.length && j < 3; j++) {
                let ID2 = "divListTask";
                let divID2 = ID2.concat(lists.list[i].tasks[j].id);

                let divTaskList = document.createElement("div");
                divTaskList.setAttribute("class", "divTaskList");
                divTaskList.setAttribute("id", divID2);

                let li = document.createElement("li");
                ul.appendChild(li);
                let TaskNaming = document.createTextNode(lists.list[i].tasks[j].name);
                li.appendChild(TaskNaming);
                divTaskList.appendChild(ul);
                divListing.appendChild(divTaskList);
            }
        }
    }

    let testlist = document.getElementById("presentation");

    testlist.addEventListener("click", function restart() {
        let supp = document.getElementById("start");
        for (let i = 0; (i = supp.children.length); i++) {
            supp.removeChild(supp.firstChild);
        }
        start();
    });

    newList();
}

function newList() {
    let divNewList = document.createElement("div");
    divNewList.setAttribute("class", "divNewList");
    divNewList.setAttribute("id", "divNewList");
    basis.appendChild(divNewList);

    let listName = document.createElement("input");
    listName.setAttribute("type", "text");
    listName.setAttribute("id", "nameList");
    listName.setAttribute("placeholder", "nommez votre nouvelle liste !");
    listName.setAttribute("style", "color: rgb(249, 215, 46);");
    divNewList.appendChild(listName);

    let buttonNewList = document.createElement("button");
    buttonNewList.setAttribute(
        "onclick",
        "createList(document.getElementById('nameList').value)"
    );
    buttonNewList.setAttribute("id", "buttonNewList");

    divNewList.appendChild(buttonNewList);

    let fontawe = document.createElement("i");
    fontawe.setAttribute("class", "fa-solid fa-plus");
    buttonNewList.appendChild(fontawe);
}

function createList(nameOfTheList, id) {
    achievement = 0;
    let divList = document.getElementById("divList");

    if (nameOfTheList.length != 0) {
        if (!id) {
            listCount++;
        }

        if (divList) {
            divList.remove();
        }

        let divLists = document.createElement("div");
        divLists.setAttribute("class", "divLists");
        divLists.setAttribute("id", "divLists");
        basis.insertBefore(divLists, document.getElementById("divNewList"));

        let divListTasks = document.createElement("div");
        divListTasks.setAttribute("class", "divListTask");
        divListTasks.setAttribute("id", "divListTask");
        divLists.appendChild(divListTasks);

        let divBefore = document.createElement("div");
        divBefore.setAttribute("class", "divBefore");
        divBefore.setAttribute("id", "divBefore");
        divLists.insertBefore(divBefore, divListTasks);

        let divNext = document.createElement("div");
        divNext.setAttribute("class", "divNext");
        divNext.setAttribute("id", "divNext");
        divLists.appendChild(divNext);

        let before = document.createElement("button");
        before.setAttribute("id", "before");
        divBefore.appendChild(before);

        let o = document.createElement("i");
        o.setAttribute("class", "fa-solid fa-chevron-left");
        before.appendChild(o);

        let next = document.createElement("button");
        next.setAttribute("id", "next");
        divNext.appendChild(next);

        let z = document.createElement("i");
        z.setAttribute("class", "fa-solid fa-chevron-right");
        next.appendChild(z);

        let divTasks = document.createElement("div");
        divTasks.setAttribute("class", "divTasks");
        divTasks.setAttribute("id", "divTasks");
        divListTasks.appendChild(divTasks);

        let divNewTasks = document.createElement("div");
        divNewTasks.setAttribute("class", "divNewTasks");
        divNewTasks.setAttribute("id", "divNewTasks");
        divListTasks.appendChild(divNewTasks);

        let divButtonTask = document.createElement("div");
        divButtonTask.setAttribute("class", "divButtonTask");
        divButtonTask.setAttribute("id", "divButtonTask");
        divNewTasks.appendChild(divButtonTask);

        let taskName = document.createElement("input");
        taskName.setAttribute("type", "text");
        taskName.setAttribute("id", "taskName");
        taskName.setAttribute("placeholder", "Définissez une nouvelle tache !");
        divButtonTask.appendChild(taskName);

        let list = new List(nameOfTheList, listCount);
        list.dom();

        let buttonNewTask = document.createElement("button");
        buttonNewTask.setAttribute("id", "buttonNewTask");
        divButtonTask.appendChild(buttonNewTask);

        let fontawe = document.createElement("i");
        fontawe.setAttribute("class", "fa-solid fa-plus");
        buttonNewTask.appendChild(fontawe);

        let progression = document.createElement("progress");
        progression.setAttribute("id", "progress");
        progression.setAttribute("max", "100");
        progression.setAttribute("value", achievement);
        divListTasks.insertBefore(progression, divTasks);

        let nextList = document.getElementById('next');
        nextList.addEventListener('click', function () {
            if (lists.list.length >= 2 && lists.list[id.id -1].id <= lists.list.length) {
                console.log('possible');
            }
        })

        if (!id) {
            lists.addList(list);
        }

        let taskNameValue = document.getElementById("taskName");
        let buttonTest = document.getElementById("buttonNewTask");
        buttonTest.addEventListener("click", function createTask() {
            taskCount++;
            let task = new Task(taskNameValue.value, listCount, taskCount);
            task.dom();
            list.addTask(task);
            isChecked(list.id);
        });
    }

    if (id) {
        listCount = id.id;
        if (lists.list[id.id - 1].tasks.length != 0) {
            console.log(id);
            for (let i = 0; i <= lists.list[id.id - 1].tasks.length - 1; i++) {
                lists.list[id.id - 1].tasks[i].dom();
            }
        }        
        
        let taskNameValue = document.getElementById("taskName");
        let buttonTest = document.getElementById("buttonNewTask");
        buttonTest.addEventListener("click", function createTask() {
            let task = new Task(taskNameValue.value, listCount, taskCount);
            lists.list[id.id -1].addTask(task);
            isChecked(lists.list[id.id - 1].id, task.idTask);
        });
    }
}

function isChecked(IdList) {
    lists.list[IdList - 1].progress();

    let progression = document.getElementById("progress");
    progression.setAttribute("value", achievement);
}

