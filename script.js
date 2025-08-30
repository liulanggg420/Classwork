// Step 1: Setting Up - reference HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Step 2: Event handler for adding tasks
addTaskButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
  }
});

// Step 3: Function to add task
function addTask(text) {
  // Create task item (li)
  const li = document.createElement("li");

  // Task text span
  const span = document.createElement("span");
  span.textContent = text;

  // Buttons container
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  // Done button
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.classList.add("action", "done-btn");
  doneBtn.addEventListener("click", () => {
    span.classList.toggle("done");
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("action", "delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Append buttons to container
  buttonsDiv.appendChild(doneBtn);
  buttonsDiv.appendChild(deleteBtn);

  // Add text + buttons to li
  li.appendChild(span);
  li.appendChild(buttonsDiv);

  // Add li to task list
  taskList.appendChild(li);
}
