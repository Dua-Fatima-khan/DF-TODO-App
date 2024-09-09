let inputBox = document.getElementById("input-box");
let listBox = document.getElementById("list-box");
let addBtn = document.getElementById("add");

// Add task when clicking the button or pressing Enter
addBtn.addEventListener("click", addTask);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    // Trim any extra spaces from the input value
    let taskValue = inputBox.value.trim();

    if (taskValue === "") {
        alert("You must add a Task!");
        return;
    }

    // Create new list item
    let li = document.createElement("li");
    li.innerHTML = `${taskValue} <span><i class="fa-solid fa-trash"></i></span>`;
    listBox.appendChild(li);

    // Clear the input box
    inputBox.value = "";

    // Save the data to local storage
    saveData();
}

// Function to save list data to local storage
function saveData() {
    // Get inner HTML and clean up any unwanted empty elements
    let listHTML = listBox.innerHTML.replace(/<li>\s*<\/li>/g, ''); // Remove empty <li> elements
    localStorage.setItem("data", listHTML);
}

// Function to load data from local storage
function loadData() {
    // Get the saved data
    let savedData = localStorage.getItem("data");
    listBox.innerHTML = savedData;
}

// Handle click events for list items and remove buttons
listBox.addEventListener("click", (e) => {
    if (e.target.tagName.toUpperCase() === "I" && e.target.classList.contains("fa-trash")) {
        e.target.parentElement.parentElement.remove();
        saveData();
    } else if (e.target.tagName.toUpperCase() === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
});

// Load data when the page is loaded
window.onload = loadData;
