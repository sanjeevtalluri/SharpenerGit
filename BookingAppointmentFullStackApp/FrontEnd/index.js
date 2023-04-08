// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const baseUrl = "http://localhost:3000/users";
let edit = false;
let editId = "";
let editLiElement = null;


window.addEventListener("DOMContentLoaded", () => {
    getUsersFromCurd();
})

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
        if (edit) {
            UpdateUserFromCrud(editId, nameInput.value, emailInput.value, phoneInput.value, editLiElement);
        }
        else {
            addUserToCrud(nameInput.value, emailInput.value, phoneInput.value);
        }

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

async function addUserToCrud(name, email, phone) {
    let res = null;
    try {
        res = await axios.post(baseUrl + "/addUser", {
            name: name,
            email: email,
            phone: phone
        });
        createItemAndAppendToList(name, email, phone, res.data.id);
    }
    catch (err) {
        console.log(err);
    }

}

async function getUsersFromCurd() {
    let res = null;
    try {
        res = await axios.get(baseUrl + "/getUsers");
        res.data.forEach(item => {
            createItemAndAppendToList(item.name, item.email, item.phone, item.id);
        })
    }

    catch (err) {
        console.log(err);
    }
}


async function deleteUserFromCrud(liElement) {
    const id = liElement.getAttribute('apiId');
    try {
        await axios.delete(`${baseUrl}/deleteUser/${id}`)
        remove(liElement);
    }
    catch (err) {
        console.log(err);
    }
}

async function UpdateUserFromCrud(id, name, email, phone, liElement) {
    try {
        console.log('in');
        await axios.put(`${baseUrl}/updateUser/${id}`, {
            name: name,
            email: email,
            phone: phone
        })
        remove(liElement);
        createItemAndAppendToList(name, email, phone, id);
        edit = false;
        editId = "";
        editLiElement = null;  
    }
    catch (err) {
        console.log(err);
    }


}


function onDelete(e) {
    e.preventDefault();

    if (e.target.classList.contains('deleteBtn')) {
        let isConfirmedToDelete = confirm('Do you want to delete the item');
        if (isConfirmedToDelete) {
            let liElement = e.target.parentElement;
            deleteUserFromCrud(liElement);
        }
    }
    else if (e.target.classList.contains('editBtn')) {
        let liElement = e.target.parentElement;
        let name = liElement.children[0].children[0].textContent;
        let email = liElement.children[0].children[1].textContent;
        let phone = liElement.children[0].children[2].textContent;
        let id = liElement.getAttribute('apiId');
        console.log(id);
        populateValuesInForm(id, name, email, phone, liElement);
    }

}

function remove(liElement) {
    userList.removeChild(liElement);
}

function populateValuesInForm(id, name, email, phone, liElement) {
    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
    editId = id;
    edit = true;
    editLiElement = liElement;
}


function createItemAndAppendToList(name, email, phone, id) {
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
    li.setAttribute('apiId', id);
    // Append to ul
    userList.appendChild(li);

}


function createNewDomElementWithValue(element, value) {
    var domElement = document.createElement(element);
    domElement.textContent = value;
    return domElement;
}