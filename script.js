const input = document.getElementById("input");
const tasklist = document.getElementById("tasklist");
const clearButton = document.getElementById("clear");

const filterButtons = document.querySelectorAll(".buttons button");

let tasks = [];


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



function displayTasks(filter = "All") {

   
    const oldTasks = document.querySelectorAll(".task-item");

    oldTasks.forEach(task => task.remove());


    tasks.forEach(task => {

        if (filter === "Pending" && task.completed) {
            return;
        }

        if (filter === "Completed" && !task.completed) {
            return;
        }


       
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


       
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.style.width = "20px";
        checkbox.style.height = "20px";


        
        const taskText = document.createElement("div");

        taskText.textContent = task.text;

        taskText.style.marginLeft = "15px";
        taskText.style.fontSize = "16px";


        
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }


       
        const status = document.createElement("p");

        status.textContent = task.completed
            ? "Completed"
            : "Pending";

        status.style.position = "absolute";
        status.style.left = "80%";

        status.style.color = task.completed
            ? "green"
            : "orange";


        
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑️";

        deleteButton.className = "status";

        deleteButton.style.position = "absolute";
        deleteButton.style.left = "90%";
        deleteButton.style.background = "transparent";
        deleteButton.style.border = "none";


        
        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            displayTasks(getCurrentFilter());

        });


        
        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(t => t.id !== task.id);

            displayTasks(getCurrentFilter());

        });


       
        taskFrame.appendChild(checkbox);
        taskFrame.appendChild(taskText);
        taskFrame.appendChild(status);
        taskFrame.appendChild(deleteButton);

        tasklist.appendChild(taskFrame);

    });


    updatePendingCount();
}



function getCurrentFilter() {

    const activeButton = document.querySelector(".buttons button.active");

    if (activeButton) {
        return activeButton.textContent;
    }

    return "All";
}




filterButtons.forEach(button => {

    
    if (button.id === "clear") {
        return;
    }

    button.addEventListener("click", function () {

        
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

       
        button.classList.add("active");

        
        displayTasks(button.textContent);
    });
});



clearButton.addEventListener("click", function () {

    tasks = tasks.filter(task => !task.completed);

    displayTasks("All");

});



function updatePendingCount() {

    const pendingCount = tasks.filter(
        task => !task.completed
    ).length;


    const footerText = document.querySelector(".footer p");

    footerText.innerHTML =
        `You have <strong>${pendingCount}</strong> tasks pending`;
}



input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        add(event);

    }

});



document.querySelector(".buttons button").classList.add("active");



displayTasks("All");