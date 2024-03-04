let number = [];
let name = [];
let currentSize = 0;

// Retrieve data from localStorage on page load
window.onload = function() {
  if(localStorage.getItem('phonebookData')) {
    const savedData = JSON.parse(localStorage.getItem('phonebookData'));
    number = savedData.number;
    name = savedData.name;
    currentSize = savedData.currentSize;
  }
}

function phonebookAdd() {
  if (currentSize >= 100) {
    document.getElementById("output").innerHTML = "Array is full";
    return;
  }
  let tempNumber = document.getElementById("phoneNumber").value;
  let tempName = document.getElementById("contactName").value;
  if (tempNumber.length !== 11 || isNaN(tempNumber)) {
    alert("Please enter a valid 11-digit number.");
    return;
  }
  if (tempName && tempNumber) {
    if (number.includes(tempNumber)) {
      alert("Number already exists!");
      return;
    }
    name.push(tempName);
    number.push(tempNumber);
    currentSize++;
    document.getElementById("phoneNumber").value = "";
    document.getElementById("contactName").value = "";
  } else {
    alert("Please enter both name and number");
  }
  saveDataToStorage();
}

function phonebookList() {
  if (currentSize === 0) {
    document.getElementById("output").innerHTML = "No numbers added yet.";
    return;
  }
  let output = "<h3>Phonebook Entries:</h3>";
  for (let i = 0; i < currentSize; i++) {
    output += "Index: " + i + " | Name: " + name[i] + " | Number: " + number[i] + "<br>";
  }
  document.getElementById("output").innerHTML = output;
  saveDataToStorage();
}

function phonebookSearch() {
  if (currentSize === 0) {
    document.getElementById("output").innerHTML = "No numbers added yet.";
    return;
  }
  let tempQueryName = prompt("Enter contact name to search:");
  let found = false;
  for (let i = 0; i < currentSize; i++) {
    if (tempQueryName === name[i]) {
      found = true;
      document.getElementById("output").innerHTML = "Match Found:<br>Index: " + i + " | Name: " + name[i] + " | Number: " + number[i];
      break;
    }
  }
  if (!found) {
    document.getElementById("output").innerHTML = "Not Found Any Number For Name: " + tempQueryName;
  }
  saveDataToStorage();
}

function phonebookDelete() {
  if (currentSize === 0) {
    document.getElementById("output").innerHTML = "No entries to delete.";
    return;
  }
  let tempDeleteIndex = prompt("Enter index number to delete:");
  if (tempDeleteIndex < 0 || tempDeleteIndex >= currentSize) {
    document.getElementById("output").innerHTML = "Index out of bounds";
    return;
  }
  let deletedName = name[tempDeleteIndex];
  let deletedNumber = number[tempDeleteIndex];
  name.splice(tempDeleteIndex, 1);
  number.splice(tempDeleteIndex, 1);
  currentSize--;
  document.getElementById("output").innerHTML = "Entry Deleted Successfully";
  saveDataToStorage();
}

function clearDisplay() {
  document.getElementById("output").innerHTML = "";
  saveDataToStorage();
}

function saveDataToStorage() {
  localStorage.setItem('phonebookData', JSON.stringify({ number, name, currentSize }));
}
