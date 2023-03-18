var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

// Add item
function addItem(e){
  e.preventDefault();

  // Get input value
  var newItemTitle = document.getElementById('itemTitle').value;
  var newItemDescription = document.getElementById('itemDescription').value;
  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add text node with input value
  if(newItemTitle)
  li.appendChild(document.createTextNode(newItemTitle));
  if(newItemTitle && newItemDescription)
  li.appendChild(document.createTextNode('\n'));
  if(newItemDescription)
  li.appendChild(document.createTextNode(newItemDescription));

  // Create del button element
  var deleteBtn = document.createElement('button');

  // Create edit button element
  var editBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-end delete';

  // Add classes to edit button
  editBtn.className = 'btn btn-warning btn-sm me-4 float-end edit';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Append text node to edit btn
  editBtn.appendChild(document.createTextNode('Edit'));


  // Append button to li
  li.appendChild(deleteBtn);

  // Append edit button to li
  li.appendChild(editBtn);

  // Append li to list
  itemList.appendChild(li);
}

// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Filter Items
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function(item){
        console.log(item);
      var itemName = item.firstChild.textContent;
      var itemDesc = item.childNodes[2].textContent;
      if(itemName.toLowerCase().indexOf(text) != -1 || itemDesc.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
