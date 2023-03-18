// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

if (!localStorage.hasOwnProperty('items')) {
    localStorage.setItem('items', "");
}
var items = localStorage.getItem('items');

init();

function init() {
    if (items.length) {
        let itemsArray = JSON.parse(items);
        itemsArray.forEach(item => {
            createItemAndAppendToList(item.name, item.email, item.phone);
        });
    }
}


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

userList.addEventListener('click', onDelete);

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        createItemAndAppendToList(nameInput.value, emailInput.value, phoneInput.value);
        addToLocalStorage(nameInput.value, emailInput.value, phoneInput.value);
        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

function onDelete(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('deleteBtn')) {
        let isConfirmedToDelete = confirm('Do you want to delete the item');
        if (isConfirmedToDelete) {
            let liElement = e.target.parentElement;
            remove(liElement);
        }
    }
    else if (e.target.classList.contains('editBtn')) {
        let liElement = e.target.parentElement;
        remove(liElement);
        populateValuesInForm(liElement.children[0].children[0].textContent,liElement.children[0].children[1].textContent,
            liElement.children[0].children[2].textContent);
    }

}

function remove(liElement) {
    userList.removeChild(liElement);
    let email = liElement.children[0].children[1].textContent;
    // O(n) not recommended
    removeItemFromLocalStorage(email);
}

function populateValuesInForm(name,email,phone){
    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
}


function createItemAndAppendToList(name, email, phone) {
    const li = document.createElement('li');

    const liDiv = document.createElement('div');
    const nameParaElement = createNewDomElementWithValue('p', name);
    const emailParaElement = createNewDomElementWithValue('p', email);
    const phoneParaElement = createNewDomElementWithValue('p', phone);
    liDiv.appendChild(nameParaElement);
    liDiv.appendChild(emailParaElement);
    liDiv.appendChild(phoneParaElement);
    li.appendChild(liDiv);
    const deleteBtn = document.createElement('input');
    deleteBtn.value = 'Delete';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.className = 'btn deleteBtn';
    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.setAttribute('type', 'button');
    editBtn.className = 'btn editBtn';  
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Append to ul
    userList.appendChild(li);

}

function addToLocalStorage(name, email, phone) {
    let localStorageItems = localStorage.getItem('items');
    if (localStorageItems)
        localStorageItems = JSON.parse(localStorageItems);
    else
        localStorageItems = [];
    localStorageItems.push({
        name: name,
        email: email,
        phone: phone
    })
    localStorageItems = JSON.stringify(localStorageItems);
    localStorage.setItem('items', localStorageItems);
}

function removeItemFromLocalStorage(email) {
    let localStorageItems = localStorage.getItem('items');
    if (localStorageItems)
        localStorageItems = JSON.parse(localStorageItems);
    else
        localStorageItems = [];
    localStorageItems = localStorageItems.filter((item) => {
        return item.email != email;
    })
    localStorageItems = JSON.stringify(localStorageItems);
    localStorage.setItem('items', localStorageItems);
}

function createNewDomElementWithValue(element, value) {
    var domElement = document.createElement(element);
    domElement.textContent = value;
    return domElement;
}