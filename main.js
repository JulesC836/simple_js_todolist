//Script js de ma todolist

let taskcount = 0;
//Indexation du DOM
const addBtn = document.getElementById("addBtn");
const filterBy = document.getElementById("filterBy");
const saveBtn = document.getElementById("saveBtn");
const updteBtn = document.getElementById("updteBtn");
let formView = document.getElementById("formView");
let titleField = document.getElementById("titleField");
let descriptionField = document.getElementById("descriptionField");
let listView = document.getElementById("listView");
let listBody = document.getElementById("listBody");

//Ajout des eventListners
addBtn.addEventListener('click', ()=>showForm(1));
updteBtn.addEventListener('click', ()=>showForm(2));
saveBtn.addEventListener('click', save);

//Initialisation de la mémoire de l'app
//Non utilisée pour la permière version de ce programme
let tasks = [{
    id: 0,
    title: 'Complete this todolist',
    description: 'Remember to drop unecessary test',
}];

//Initialisation d'une ligne de tableau tampon

function showForm(param) {
    if (param==0) {
        listView.style.display="";
        formView.style.display = "none";
        saveBtn.style.display = "none";
        updteBtn.style.display = "none";

    }else if (param==1) {
        listView.style.display="none";
        formView.style.display = "block";
        saveBtn.style.display = "block";
        updteBtn.style.display = "none";
    }else if(param==2){
        listView.style.display="none";
        formView.style.display = "block";
        saveBtn.style.display = "none";
        updteBtn.style.display = "block";
    }
    else{
        console.log("Option Inconnue");
    }
}

function save() {
    let taskId = taskcount;
    let taskTitle = titleField.value;
    let taskDesc = descriptionField.value;

    if (!taskTitle) {
        alert("Ajouter un titre");

    } else {
        tasks.push({
            id: taskId,
            title: taskTitle,
            description: taskDesc,
        })

        let newRow = document.createElement("tr");
        newRow.className="bg-gray-300/30";
        newRow.innerHTML = `
        <td class="p-4 w-1/12">${taskId}</td>
        <td class="p-4 w-2/6">${taskTitle}</td>
        <td class="p-4 w-2/6">${taskDesc}</td>
        <td class="w-1/12">
            <button></button>
            <button onclick="edit(this.closest('tr'))" class="editBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L14 3.586 16.414 6 16 6.414l-2.586-2.586-1.414 1.414L14 8l-1.414 1.414-1.414-1.414L8 10l-1.414 1.414 1.414 1.414L6 14l-1.414 1.414A2 2 0 004 16h12a2 2 0 001.414-.586l1.414-1.414a2 2 0 000-2.828l-2.586-2.586z" />
                </svg>
            </button>
            <button onclick="destroy(this.closest('tr'))" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H2a1 1 0 000 2h1v10a2 2 0 002 2h10a2 2 0 002-2V6h1a1 1 0 000-2h-3V3a1 1 0 00-1-1H6zm0 2h8v1H6V4zM4 8h12v10H4V8z" />
                </svg>
            </button>
        </td>

    `;

        listBody.appendChild(newRow);
        titleField.value = "";
        descriptionField.value = "";
        taskcount++;
        console.log(tasks);
    }

    showForm(0);
}


function edit(task) {
    showForm(2);

    if (task) {
        id = task.getElementsByTagName("td")[0];
        title = task.getElementsByTagName("td")[1];
        description = task.getElementsByTagName("td")[2];

        titleField.value = title.innerText;
        descriptionField.value = description.innerText;

        taskRefs = {
            'idRef': id,
            'titleRef': title,
            'descriptionRef': description
        };
        updteBtn.addEventListener('click', ()=>update(taskRefs));

    }
}

function update(task) {
    task['titleRef'].innerText = titleField.value;
    task['descriptionRef'].innerText = descriptionField.value;

    showForm(0);
}

function destroy(task) {
    if (confirm("Voulez vous vraiment supprimer cette tâche ??")) {
        task.remove();
    }
}