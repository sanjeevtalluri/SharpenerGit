
var listItems = document.querySelector('.list-group');
var parentOfListItems = listItems.parentElement;
console.log(parentOfListItems);

var lastElementChildOfCard = parentOfListItems.lastElementChild;
console.log(lastElementChildOfCard);

var lastChildOfCard = parentOfListItems.lastChild;
console.log(lastChildOfCard);

var firstElementChildOfCard = parentOfListItems.firstElementChild;
console.log(firstElementChildOfCard);

var firstChildOfCard = parentOfListItems.firstChild;
console.log(firstChildOfCard);

var nextSiblingOfListItems = listItems.nextSibling;
console.log(nextSiblingOfListItems);

var nextElementSiblingOfListItems = listItems.nextElementSibling;
console.log(nextElementSiblingOfListItems);

var previousSiblingOfListItems = listItems.previousSibling;
console.log(previousSiblingOfListItems);

var previousElementSiblingOfListItems = listItems.previousElementSibling;
console.log(previousElementSiblingOfListItems);

var createdDiv = document.createElement('div');
console.log(createdDiv);

var textNode = document.createTextNode('Hello world');
createdDiv.append(textNode);

previousElementSiblingOfListItems.setAttribute('id','title');
console.log(previousElementSiblingOfListItems);

var createdDiv2 = createdDiv.cloneNode(true);

var createdLi = document.createElement('li');
createdLi.className = 'list-group-item';
var textNode2 = document.createTextNode('Hello world');
createdLi.append(textNode2);

var itemsTitle = document.querySelectorAll('.title')[1];
parentOfListItems.insertBefore(createdDiv,itemsTitle);
parentOfListItems.insertBefore(createdDiv2,listItems);
listItems.insertBefore(createdLi,listItems.firstElementChild);




