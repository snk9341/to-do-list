let basis = document.getElementById('start');

function List(name, id) {
    this.name = name;
    this.tasks = [];
    this.id = id;

    this.addTask = function (t) {
        this.tasks.push(t);
    }

    this.dom = function () {
        if (basis.children.length > 1) {
            for (let i = 0; i <= basis.children.length - 1; i++) {
                basis.removeChild(basis.children[1])
            }
        }

        let listDivParent = document.createElement('div');
        listDivParent.setAttribute('id', 'divParent'.concat(id));

        let divName = document.createElement('div');
        divName.setAttribute('id', 'divName'.concat(id));
        divName.setAttribute('class', 'divName');
        divName.setAttribute('contenteditable', 'true');

        let naming = document.createTextNode(this.name);
        divName.appendChild(naming);

        let l = document.createElement('ul');
        l.setAttribute('id', 'listDiv');

        let newTasksDiv = document.createElement('div');
        newTasksDiv.setAttribute('id', 'newTaskDiv'.concat(id));
        newTasksDiv.setAttribute('class', 'newTaskDiv');

        let tasksName = document.createElement('input');
        tasksName.setAttribute('type', 'text');
        tasksName.setAttribute('value', 'nouvelle tache');
        tasksName.setAttribute('class', 'inputNewTask');
        tasksName.setAttribute('onfocus', 'this.value=""');

        let taskConfirm = document.createElement('button');
        taskConfirm.setAttribute('id', 'taskConfirm'.concat(id));
        taskConfirm.setAttribute('class', 'taskConfirm');
        taskConfirm.appendChild(document.createTextNode('+'));

        taskConfirm.addEventListener('click', function () {
            let task = new Task(tasksName.value, id, taskCount);
            task.addTask();
            task.dom();
            taskCount++;
        })

        let progression = document.createElement("progress");
        progression.setAttribute("id", "progress");
        progression.setAttribute("max", "100");
        progression.setAttribute("value", achievement);

        newTasksDiv.appendChild(tasksName);
        newTasksDiv.appendChild(taskConfirm);
        listDivParent.appendChild(divName);
        listDivParent.appendChild(l);
        listDivParent.appendChild(newTasksDiv);
        listDivParent.insertBefore(progression, l);
        basis.appendChild(listDivParent);

        for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].dom();
        }
    }

    this.progress = function () {
        let done = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].cycle == 'done') {
                done++;
            }
        }
        let pro = document.getElementById('progress');
        achievement = Math.floor((done / this.tasks.length) * 100);
        pro.setAttribute("value", achievement);

    }
}

function Task(nameTask, idList, idTask) {
    this.name = nameTask;
    this.cycle = 'to do';
    this.idList = idList;
    this.idTask = idTask;

    this.addTask = function () {
        lists.list[this.idList].addTask(this);
        lists.list[this.idList].progress()
    }

    this.dom = function () {
        let e = document.createElement('li');
        let o = 'li'
        let concat = o.concat(this.idList);
        e.setAttribute('id', concat);
        e.setAttribute('class', 'liTaskDom');
        let list = document.getElementById('listDiv');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', this.idTask);

        let divCheckbox = document.createElement('div');
        divCheckbox.setAttribute('class', 'divCheckbox');
        divCheckbox.setAttribute('id', 'divCheckbox'.concat(this.idTask));

        let span = document.createElement('span');
        span.setAttribute('contenteditable', 'true');
        span.setAttribute('id', 'span'.concat(this.idTask));
        span.appendChild(document.createTextNode(this.name));

        divCheckbox.appendChild(checkbox);
        divCheckbox.appendChild(span);
        e.appendChild(divCheckbox);
        list.appendChild(e);

        let check = document.getElementById("divCheckbox".concat(this.idTask));
        let divChecked = document.getElementById(this.idTask);
        console.log(this.idTask)

        if (this.cycle == 'done') {
            divChecked.checked = true;
            check.style.opacity = "35%";
            check.style.transition = "1s";
        }

        let spanTask = document.getElementById('span'.concat(this.idTask));
        spanTask.addEventListener('change', (function() {
            console.log('ok')
        }).bind(this))

        divChecked.addEventListener('change', (function (e) {
            if (divChecked.checked) {
                check.style.opacity = "35%";
                check.style.transition = "1s";
                this.cycle = 'done';
                lists.list[idList].progress();
            } else {
                check.style.opacity = "100%";
                check.style.transition = "1s";
                this.cycle = 'to do';
                lists.list[idList].progress();
            }
        }).bind(this))
    }
}

function Lists() {
    this.list = [];

    this.addList = function (l) {
        this.list.push(l);
    }

    this.dom = function () {
        for (let i = 0; i <= basis.children.length - 1; i++) {
            basis.removeChild(basis.children[1])
        }

        let lists = document.createElement('div');
        lists.setAttribute('class', 'lists');
        lists.setAttribute('id', 'lists');

        for (let i = 0; i < this.list.length; i++) {
            let col4 = document.createElement('div');
            col4.setAttribute('class', 'col4');
            col4.setAttribute('id', 'col4'.concat(i));
            lists.appendChild(col4);

            let listName = document.createElement('div');
            listName.setAttribute('class', 'nameDiv');
            listName.setAttribute('id', 'divName'.concat(i));

            let listNaming = document.createTextNode(this.list[i].name);
            listName.appendChild(listNaming)

            col4.appendChild(listName);

            let ul = document.createElement('ul');

            if (i == this.list.length - 1) {
                let plus = document.createElement('button');
                plus.setAttribute('id', 'NewDiv');
                plus.setAttribute('onclick', 'newList()')
                let divPlus = document.createElement('div');
                divPlus.setAttribute('id', 'divPlus');
                divPlus.appendChild(plus);
                lists.appendChild(divPlus);
                plus.appendChild(document.createTextNode('+'));
            }

            for (let j = 0; j < this.list[i].tasks.length && j < 3; j++) {
                let listTask = document.createElement('li');
                listTask.setAttribute('class', 'listTask');
                listTask.setAttribute('id', 'listTask'.concat(j));

                let namingTask = document.createTextNode(this.list[i].tasks[j].name);
                listTask.appendChild(namingTask);
                ul.appendChild(listTask);
                col4.appendChild(ul);
            }

            col4.addEventListener('click', function () {
                console.log('oui', i);
                showList(i);
            });
        }
        basis.appendChild(lists)
    }
}