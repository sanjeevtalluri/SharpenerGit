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
//listItems[2].style.backgroundColor = 'green';

var listItemsByTagName = document.getElementsByTagName('li');
listItemsByTagName[4].classList.add('list-group-item');
listItemsByTagName[4].style.fontWeight = 'bold';

var secondListItem = document.querySelector('.list-group-item:nth-child(2)');
secondListItem.style.backgroundColor = 'green';

var thirdListItem = document.querySelector('.list-group-item:nth-child(3)');
thirdListItem.style.visibility = 'hidden';

var listItemsQuerySelector = document.querySelectorAll('.list-group-item');
listItemsQuerySelector[1].style.color = 'green';

var listItemsOddQuerySelector = document.querySelectorAll('.list-group-item:nth-child(odd)');
for(let i =0;i<listItemsOddQuerySelector.length;i++){
    listItemsOddQuerySelector[i].style.backgroundColor = 'green';
}


