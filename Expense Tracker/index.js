const expenseTableBody = document.getElementById('expense-table-body');
const addButton = document.getElementById('add-button');
const actionButtons = document.querySelector('.action-buttons');
const expenseAmount = document.getElementById('amount');
const expenseDescription = document.getElementById('description');
const expenseCategory = document.getElementById('category');

addButton.addEventListener('click',addExpenseEventHandler);
expenseTableBody.addEventListener('click', onAction);

if (!localStorage.hasOwnProperty('expenses')) {
    localStorage.setItem('expenses', "");
}
const expenses = localStorage.getItem('expenses');

init();

function init() {
    if (expenses.length) {
        let itemsArray = JSON.parse(expenses);
        itemsArray.forEach(item => {
            createItemAndAppendToTable(item.amount, item.description, item.category);
        });
    }
}


function addExpenseEventHandler(){
    createItemAndAppendToTable(expenseAmount.value, expenseDescription.value, expenseCategory.value);
    addToLocalStorage(expenseAmount.value, expenseDescription.value, expenseCategory.value);
    expenseAmount.value = '';
    expenseDescription.value = '';
    expenseCategory.value = 'Movie'; 
}

function createCell(element,value){
    const newElement = document.createElement(element);
    newElement.innerText = value;
    return newElement;
}


function createItemAndAppendToTable(amount, description, category){
    const trElement = document.createElement('tr');
    trElement.appendChild(createCell('td',amount));
    trElement.appendChild(createCell('td',description));
    trElement.appendChild(createCell('td',category));
    const duplicateActionButtons = actionButtons.cloneNode(true);
    trElement.appendChild(duplicateActionButtons);
    expenseTableBody.appendChild(trElement);
}

function addToLocalStorage(amount, description, category) {
    let localStorageItems = localStorage.getItem('expenses');
    if (localStorageItems)
        localStorageItems = JSON.parse(localStorageItems);
    else
        localStorageItems = [];
    localStorageItems.push({
        amount: amount,
        description: description,
        category: category
    })
    localStorageItems = JSON.stringify(localStorageItems);
    localStorage.setItem('expenses', localStorageItems);
}


function onAction(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('delete-button')) {
        let isConfirmedToDelete = confirm('Do you want to delete the item');
        if (isConfirmedToDelete) {
            let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
            remove(trElement);
        }
    }
    else if (e.target.classList.contains('edit-button')) {
        let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
        remove(trElement);
        populateValuesInForm(trElement.childNodes[0].innerText,trElement.childNodes[1].innerText,
            trElement.childNodes[2].innerText);
    }

}
function remove(trElement) {
    const expenseDescription = trElement.childNodes[1].innerText;
    expenseTableBody.removeChild(trElement);
    // O(n) not recommended
    removeItemFromLocalStorage(expenseDescription);
}

function removeItemFromLocalStorage(description) {
    let localStorageItems = localStorage.getItem('expenses');
    if (localStorageItems)
        localStorageItems = JSON.parse(localStorageItems);
    else
        localStorageItems = [];
    localStorageItems = localStorageItems.filter((item) => {
        return item.description != description;
    })
    localStorageItems = JSON.stringify(localStorageItems);
    localStorage.setItem('expenses', localStorageItems);
}

function populateValuesInForm(amount, description, category){
    expenseAmount.value = amount;
    expenseDescription.value = description;
    expenseCategory.value = category;
}