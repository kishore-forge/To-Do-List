const input = document.getElementById("input");
const tasklist = document.getElementById("tasklist");
const clearButton = document.getElementById("clear");

const filterButtons = document.querySelectorAll(".buttons button");

let tasks = [];

// Add Task
function add(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
}


// Display Tasks
function displayTasks(filter = "All") {

    // Remove old task frames
    const oldTasks = document.querySelectorAll(".task-item");

    oldTasks.forEach(task => task.remove());


    tasks.forEach(task => {

        if (filter === "Pending" && task.completed) {
            return;
        }

        if (filter === "Completed" && !task.completed) {
            return;
        }


        // Main task frame
        const taskFrame = document.createElement("div");

        taskFrame.className = "task-item";

        taskFrame.style.width = "90%";
        taskFrame.style.margin = "20px";
        taskFrame.style.borderRadius = "10px";
        taskFrame.style.minHeight = "50px";
        taskFrame.style.display = "flex";
        taskFrame.style.alignItems = "center";
        taskFrame.style.position = "relative";
        taskFrame.style.border = "1px solid lightgrey";
        taskFrame.style.padding = "10px";


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.style.width = "20px";
        checkbox.style.height = "20px";


        // Task text
        const taskText = document.createElement("div");

        taskText.textContent = task.text;

        taskText.style.marginLeft = "15px";
        taskText.style.fontSize = "16px";


        // Strike-through when completed
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }


        // Status
        const status = document.createElement("p");

        status.textContent = task.completed
            ? "Completed"
            : "Pending";

        status.style.position = "absolute";
        status.style.left = "80%";

        status.style.color = task.completed
            ? "green"
            : "orange";


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑️";

        deleteButton.className = "status";

        deleteButton.style.position = "absolute";
        deleteButton.style.left = "90%";
        deleteButton.style.background = "transparent";
        deleteButton.style.border = "none";


        // Checkbox click
        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            displayTasks(getCurrentFilter());

        });


        // Delete click
        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(t => t.id !== task.id);

            displayTasks(getCurrentFilter());

        });


        // Add everything to frame
        taskFrame.appendChild(checkbox);
        taskFrame.appendChild(taskText);
        taskFrame.appendChild(status);
        taskFrame.appendChild(deleteButton);

        tasklist.appendChild(taskFrame);

    });


    updatePendingCount();
}


// Get current filter
function getCurrentFilter() {

    const activeButton = document.querySelector(".buttons button.active");

    if (activeButton) {
        return activeButton.textContent;
    }

    return "All";
}


// Filter buttons

filterButtons.forEach(button => {

    // Clear Completed button-a filter-la include panna koodadhu
    if (button.id === "clear") {
        return;
    }

    button.addEventListener("click", function () {

        // Ella filter buttons-layum active remove pannum
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Click panna button-ku active add pannum
        button.classList.add("active");

        // Selected filter-ku tasks display pannum
        displayTasks(button.textContent);
    });
});


// Clear completed tasks
clearButton.addEventListener("click", function () {

    tasks = tasks.filter(task => !task.completed);

    displayTasks("All");

});


// Update footer pending count
function updatePendingCount() {

    const pendingCount = tasks.filter(
        task => !task.completed
    ).length;


    const footerText = document.querySelector(".footer p");

    footerText.innerHTML =
        `You have <strong>${pendingCount}</strong> tasks pending`;
}


// Press Enter to add task
input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        add(event);

    }

});


// Default filter
document.querySelector(".buttons button").classList.add("active");


// Initial display
displayTasks("All");