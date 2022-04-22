//init variables
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const place = document.getElementById('place');
const date = document.getElementById('date');
const expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!date.value || !description.value || !place.value || !amount.value) {
    alert('Please fill out all input fields before submitting. ');
    return;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  const newExpense = {
    id: Date.now(),
    item: description.value,
    time: date.value,
    location: place.value,
    total: formatter.format(amount.value)
  };

  createTableRow(newExpense);
  expenseList.push(newExpense);
  console.log('expenseList: ', expenseList);
  pushToLocalStorage(expenseList);

  document.getElementById('form').reset();
});

function pushToLocalStorage(array) {
  localStorage.setItem('expenseList', JSON.stringify(array));
}

function createTableRow(expense) {
  const newTableRow = document.createElement('tr');
  document.getElementById('table').appendChild(newTableRow);

  const dateCell = createCell(expense.time);
  newTableRow.appendChild(dateCell);

  const itemCell = createCell(expense.item);
  newTableRow.appendChild(itemCell);

  const amountCell = createCell(expense.total);
  newTableRow.appendChild(amountCell);

  const locationCell = createCell(expense.location);
  newTableRow.appendChild(locationCell);

  const deleteCell = document.createElement('td');
  const deleteButton = createDeleteButton(expense);
  newTableRow.appendChild(deleteCell);
  deleteCell.appendChild(deleteButton);
}

function createCell(expense) {
  const dataCell = document.createElement('td');
  dataCell.textContent = expense;
  return dataCell;
}

//creqtes a td tag

//deletes an expense row item when it is double clicked
function deleteExpense(deleteButton, id) {
  const confirmAction = 'Are you sure you want to delete expense?';

  if (confirm(confirmAction)) {
    deleteButton.parentElement.parentElement.remove();
    for (let i = 0; i < expenseList.length; i++) {
      if (expenseList[i].id === id) {
        expenseList.splice(i, 1);
        pushToLocalStorage(expenseList);
      }
    }
  }
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => {
    deleteExpense(deleteButton, expense.id);
  });
  return deleteButton;
}

//validates that the dollar amount field only allows for numbers and 2 decimal points
function valueValidation(amount) {
  console.log(amount);
  return amount.match(/^\d+(\.\d{1,2})?$/) !== null;
}

window.addEventListener('load', (e) => {
  e.preventDefault();

  expenseList.forEach((savedExpense) => {
    createTableRow(savedExpense);
  });
});
