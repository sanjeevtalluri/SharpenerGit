const todoRemainingTableBody = document.getElementById('todo-remaining-table-body');
const todoDoneTableBody = document.getElementById('todo-done-table-body');
const addButton = document.getElementById('add-button');
const actionButtons = document.querySelector('.action-buttons');
const todoName = document.getElementById('name');
const todoDescription = document.getElementById('description');
const baseUrl = "https://retoolapi.dev/012y10/todos";

addButton.addEventListener('click', addTodoEventHandler);

todoRemainingTableBody.addEventListener('click', onAction);

window.addEventListener("DOMContentLoaded", () => {
    getFromCrud();
})

function addTodoEventHandler() {
    addToCrud(todoName.value, todoDescription.value);
    todoName.value = '';
    todoDescription.value = '';
}

function addToCrud(name, description) {
    axios.post(baseUrl, {
        name: name,
        description: description,
        isDone: false
    }).then(res => {
        createItemAndAppendToTable(res.data.id, name, description, todoRemainingTableBody);
    }).catch(err => {
        console.log(err);
    })
}

function getFromCrud() {
    axios.get(baseUrl).then(res => {
        let todos = res.data;
        todos.forEach((todo) => {
            if (!todo.isDone) {
                createItemAndAppendToTable(todo.id, todo.name, todo.description, todoRemainingTableBody)
            }
            else {
                createItemAndAppendToTable(todo.id, todo.name, todo.description, todoDoneTableBody)
            }
        })
    }).catch(err => {
        console.log(err);
    })
}

function removeFromCrud(trElement){
    const id = trElement.getAttribute('apiId');
    axios.delete(`${baseUrl}/${id}`).then(res => {
        remove(trElement);
    }).catch(err => {
        console.log(err);
    })
}
function updateInCurd(trElement){
    const id = trElement.getAttribute('apiId');
    axios.patch(`${baseUrl}/${id}`,{
        isDone: true
    }).then(res => {
        remove(trElement);
        createItemAndAppendToTable(id,res.data.name,res.data.description,todoDoneTableBody);
    }).catch(err => {
        console.log(err);
    })
}


function createItemAndAppendToTable(id,name, description, tableBody) {
    const trElement = document.createElement('tr');
    trElement.appendChild(createCell('td', name));
    trElement.appendChild(createCell('td', description));
    if (tableBody === todoRemainingTableBody) {
        const duplicateActionButtons = actionButtons.cloneNode(true);
        trElement.appendChild(duplicateActionButtons);
    }
    trElement.setAttribute('apiId',id);
    tableBody.appendChild(trElement);
}

function createCell(element, value) {
    const newElement = document.createElement(element);
    newElement.innerText = value;
    return newElement;
}

function onAction(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('delete-button')) {
        let isConfirmedToDelete = confirm('Do you want to delete the item');
        if (isConfirmedToDelete) {
            let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
            removeFromCrud(trElement);
        }
    }
    else if (e.target.classList.contains('edit-button')) {
        let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
        updateInCurd(trElement);
    }

}

function remove(trElement) {
    todoRemainingTableBody.removeChild(trElement);
}