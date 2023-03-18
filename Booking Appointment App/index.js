// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
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
            createItemAndAppendToList(item.name, item.email);
        });
    }
}


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        createItemAndAppendToList(nameInput.value, emailInput.value);
        addToLocalStorage(nameInput.value, emailInput.value);
        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}

function createItemAndAppendToList(name, email) {
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${name}: ${email}`));


    // Append to ul
    userList.appendChild(li);

}

function addToLocalStorage(name,email) {
    let localStorageItems = localStorage.getItem('items');
    if(localStorageItems)
    localStorageItems = JSON.parse(localStorageItems);
    else
    localStorageItems = [];
    localStorageItems.push({
        name: name,
        email: email
    })
    localStorageItems = JSON.stringify(localStorageItems);
    localStorage.setItem('items',localStorageItems);
}