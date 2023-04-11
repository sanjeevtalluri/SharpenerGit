const candyTableBody = document.getElementById('candy-table-body');
const addButton = document.getElementById('add-button');
const actionButtons = document.querySelector('.action-buttons');
const candyName = document.getElementById('name');
const candyDescription = document.getElementById('description');
const candyPrice = document.getElementById('price');
const candyQuantity = document.getElementById('quantity');

addButton.addEventListener('click',addcandyEventHandler);
candyTableBody.addEventListener('click', onAction);


const baseUrl = "http://localhost:3000/admin";

init();

function init() {
    getCandiesFromCurd();
}


async function addCandyToCrud(name, description, price,quantity) {
    let res = null;
    try {
        res = await axios.post(baseUrl + "/addcandy", {
            name:name,
            description: description,
            price: price,
            quantity: quantity
        });
        createItemAndAppendToTable(name, description, price,quantity, res.data.id);
        resetFormValues();
    }
    catch (err) {
        console.log(err);
    }

}

async function getCandiesFromCurd() {
    let res = null;
    try {
        res = await axios.get(baseUrl + "/getcandies");
        res.data.forEach(item => {
            createItemAndAppendToTable(item.name, item.description, item.price,item.quantity, item.id);
        })
    }

    catch (err) {
        console.log(err);
    }
}

async function updateCandyFromCrud(id, name, description, price,quantity, trElement) {
    try {
        await axios.put(`${baseUrl}/updatecandy/${id}`, {
            name:name,
            description: description,
            price: price,
            quantity: quantity
        })
        remove(trElement);
        createItemAndAppendToTable(name, description, price,quantity, id);
        edit = false;
        editId = "";
        editTrElement = null;  
    }
    catch (err) {
        console.log(err);
    }


}
function resetFormValues(){
    candyName.value = '';
    candyDescription.value = '';
    candyPrice.value = '';
    candyQuantity.value='';
}



function addcandyEventHandler(){ 
    addCandyToCrud(candyName.value,candyDescription.value,candyPrice.value,candyQuantity.value); 
    resetFormValues();
}

function createCell(element,value){
    const newElement = document.createElement(element);
    newElement.innerText = value;
    return newElement;
}


function createItemAndAppendToTable(name, description, price,quantity, id){
    const trElement = document.createElement('tr');
    trElement.setAttribute('apiId',id);
    trElement.appendChild(createCell('td',name));
    trElement.appendChild(createCell('td',description));
    trElement.appendChild(createCell('td',price));
    trElement.appendChild(createCell('td',quantity));
    const duplicateActionButtons = actionButtons.cloneNode(true);
    trElement.appendChild(duplicateActionButtons);
    candyTableBody.appendChild(trElement);
}


function onAction(e) {
    e.preventDefault();
    
   if (e.target.classList.contains('edit-button1')) {
        let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
        let id = trElement.getAttribute('apiId');
        updateCandyFromCrud(id,trElement.childNodes[0].innerText,trElement.childNodes[1].innerText,
            trElement.childNodes[2].innerText,parseInt(trElement.childNodes[3].innerText)-1,trElement)
    }
    else if (e.target.classList.contains('edit-button2')) {
        let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
        let id = trElement.getAttribute('apiId');
        updateCandyFromCrud(id,trElement.childNodes[0].innerText,trElement.childNodes[1].innerText,
            trElement.childNodes[2].innerText,parseInt(trElement.childNodes[3].innerText)-2,trElement)
    }
    else if (e.target.classList.contains('edit-button3')) {
        let trElement = e.target.parentElement.parentElement.parentElement.parentElement;
        let id = trElement.getAttribute('apiId');
        updateCandyFromCrud(id,trElement.childNodes[0].innerText,trElement.childNodes[1].innerText,
            trElement.childNodes[2].innerText,parseInt(trElement.childNodes[3].innerText)-3,trElement)
    }

}
function remove(trElement) {
    candyTableBody.removeChild(trElement);
}
