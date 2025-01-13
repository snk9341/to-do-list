let basis = document.getElementById('start');

function List(name, id) {
    this.name = name;
    this.tasks = [];
    this.id = id;

    this.addTask = function (t) {
        this.tasks.push(t);
    }

    this.dom = function () {
        let divListTask = document.getElementById('divListTask');
        let listDiv = document.getElementById('divTasks');

        let divName = document.createElement('div');
        divName.setAttribute('class', 'divName');
        divName.setAttribute('id', 'divName');
        divName.setAttribute('contenteditable', 'true');
        divListTask.insertBefore(divName, listDiv);

        divListTask.insertBefore(document.createElement('hr'), listDiv);

        let l = document.createElement('ul');
        l.setAttribute('id', 'listDiv');
        listDiv.appendChild(l);

        let naming = document.createTextNode(this.name);
        divName.appendChild(naming);

        this.tasks.forEach((t) => function () {
            let d = t.dom();
            l.appendChild(d);
        })

        return l
    }

    this.progress = function () {
        let done = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].cycle == 'done') {
                //console.log(this);
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
            console.log(this);
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
        let lists = document.createElement('div');
        lists.setAttribute('class', 'lists');
        lists.setAttribute('id', 'lists');

        basis.appendChild(lists)
    }
}