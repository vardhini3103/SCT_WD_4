const inputBox = document.getElementById("input-box");
const datetimeBox = document.getElementById("datetime-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="edit">&#9998;</span>
        <span class="delete">&#10060;</span>
        <span class="datetime">${datetimeBox.value ? new Date(datetimeBox.value).toLocaleString() : ''}</span>
        <span class="task-text">${inputBox.value}</span>
        <div class="edit-container" style="display: none;">
            <input type="text" class="edit-input" value="${inputBox.value}">
            <button class="save-edit">Save</button>
        </div>
    `;
    listContainer.appendChild(li);

    inputBox.value = "";
    datetimeBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        let li = e.target.parentElement;
        let editContainer = li.querySelector(".edit-container");
        editContainer.style.display = "block";
    } else if (e.target.classList.contains("save-edit")) {
        let li = e.target.parentElement.parentElement;
        let newText = li.querySelector(".edit-input").value;
        li.querySelector(".task-text").textContent = newText;
        li.querySelector(".edit-container").style.display = "none";
        saveData();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
