var header = document.querySelector('#main-header');
header.style.borderBottom = 'solid 4px black';

var submitBtn = document.querySelector('input[type="submit"]');
submitBtn.style.fontWeight = 'bold';
submitBtn.style.color = 'green';
submitBtn.style.backgroundColor = 'white';
submitBtn.style.cursor ='pointer';
submitBtn.addEventListener('click', onSubmit);

var addItemText = document.querySelector('#add-item-text');

function onSubmit(e){
    e.preventDefault();
    var ulItems = document.querySelector('#items');
    var newLi = document.createElement('li');
    newLi.classList.add('list-group-item');
    newLi.innerText = addItemText.value;
    addItemText.value = '';
    ulItems.appendChild(newLi);
}

var titles = document.querySelectorAll('.title');
titles[0].style.fontWeight = 'bold';
titles[0].style.color = 'green';


var listItems = document.getElementsByClassName('list-group-item');

for(let i=0;i<listItems.length;i++){
    listItems[i].style.fontWeight = 'bold';
}
listItems[2].style.backgroundColor = 'green';

