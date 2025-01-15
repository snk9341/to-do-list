let basis = document.getElementById('start');

function List(name, id) {
    this.name = name;
    this.tasks = [];
    this.id = id;

    this.addTask = function (t) {
        this.tasks.push(t);
    }

    this.dom = function () {
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
        tasksName.setAttribute('onfocus', 'this.value=""');

        let taskConfirm = document.createElement('button');
        taskConfirm.setAttribute('id', 'taskConfirm'.concat(id));
        taskConfirm.setAttribute('class', 'taskConfirm');

        taskConfirm.addEventListener('click', function () {
            let task = new Task(tasksName.value, id, taskCount);
            task.dom();
            taskCount ++;
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
                done ++;
            }
        }
        achievement =  Math.floor((done / this.tasks.length)* 100);
    }
}

function Task(nameTask, idList, idTask) {
    this.name = nameTask;
    this.cycle = 'to do';
    this.idList = idList;
    this.idTask = idTask;

    this.dom = function () {
        lists.list[this.idList].addTask(this);

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
        span.appendChild(document.createTextNode(this.name));

        divCheckbox.appendChild(checkbox);
        divCheckbox.appendChild(span);
        e.appendChild(divCheckbox);
        list.appendChild(e);

        let check = document.getElementById("divCheckbox".concat(this.idTask));
        let divChecked = document.getElementById(this.idTask);

        if (this.cycle == 'done') {
            divChecked.checked = true;
            check.style.opacity = "35%";
            check.style.transition = "1s";
        }

        divChecked.addEventListener('change', (function(e) {
            if (divChecked.checked) {
                check.style.opacity = "35%";
                check.style.transition = "1s";
                this.cycle = 'done';
                isChecked(idList);
            } else {
                check.style.opacity = "100%";
                check.style.transition = "1s";
                this.cycle = 'to do';
                isChecked(idList);
            }
        }).bind(this))
    }
}

function Lists() {
    this.list = [];

    this.addList = function(l) {
        this.list.push(l);
    }

    this.dom = function() {
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

            for (let j = 0; j < this.list[i].tasks.length; j++) {
                let listTask = document.createElement('li');
                listTask.setAttribute('class', 'listTask');
                listTask.setAttribute('id', 'listTask'.concat(j));

                let namingTask = document.createTextNode(this.list[i].tasks[j].name);
                //let br = document.createElement('br');
                listTask.appendChild(namingTask);
                //listTask.appendChild(br);
                ul.appendChild(listTask);
                col4.appendChild(ul);
            }
        }

        basis.appendChild(lists)
    }
}