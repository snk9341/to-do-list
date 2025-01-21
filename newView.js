let listCount = 0;
let divSelected;
let taskCount = 0;
let achievement = 0;

let lists = new Lists();

addEventListener('load', function() {
    start();
})

function start() {
    let divPresentation = document.createElement("div");
    divPresentation.setAttribute("class", "presentation");
    divPresentation.setAttribute("id", "presentation");
    basis.appendChild(divPresentation);

    let presentation = document.createTextNode(
        "Retrouvez vos différentes notes ici !"
    );
    divPresentation.appendChild(presentation);


    let pres = document.getElementById('presentation');
    pres.addEventListener('click', function() {
        if (lists.list.length > 0) {
            lists.dom();
        }
    })
    showLists();
}

function showLists() {
    if (lists.list.length != 0) {
        lists.dom();
    } else if (lists.list.length == 0) {
        let firstList = new List('Titre', listCount);
        lists.addList(firstList);
        firstList.dom();
        listCount ++;
        divSelected = firstList.id;
    }
}

function showList(id) {
    lists.list[id].dom()
}