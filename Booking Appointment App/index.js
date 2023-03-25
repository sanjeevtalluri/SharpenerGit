// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const baseUrl = "https://crudcrud.com/api/9656bec683a843bfa1f3c9a7d855a09a/appointments";


window.addEventListener("DOMContentLoaded",()=>{
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
        addUserToCrud(nameInput.value,emailInput.value,phoneInput.value);
       
        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

function addUserToCrud(name,email,phone) {
    axios.post(baseUrl, {
        name: name,
        email: email,
        phone: phone
    })
    .then((res) => {
        createItemAndAppendToList(name, email, phone,res.data._id);
    })
    .catch(err=>{
        console.log(err);
    })
}

function getUsersFromCurd(){
    axios.get(baseUrl).then((res) => {
        res.data.forEach(item=>{
            createItemAndAppendToList(item.name, item.email, item.phone,item._id);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}


function deleteUserFromCrud(liElement){
    const id = liElement.getAttribute('apiId');
    axios.delete(`${baseUrl}/${id}`).then((res) => {
        remove(liElement);
    })
    .catch(err=>{
        console.log(err);
    })
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
        remove(liElement);
        populateValuesInForm(liElement.children[0].children[0].textContent, liElement.children[0].children[1].textContent,
            liElement.children[0].children[2].textContent);
    }

}

function remove(liElement) {
    userList.removeChild(liElement);
}

function populateValuesInForm(name, email, phone) {
    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
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
    li.setAttribute('apiId',id);
    // Append to ul
    userList.appendChild(li);

}


function createNewDomElementWithValue(element, value) {
    var domElement = document.createElement(element);
    domElement.textContent = value;
    return domElement;
}