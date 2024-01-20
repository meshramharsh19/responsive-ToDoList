


document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    applyDarkMode();
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    updateThemeLabel();
}

function applyDarkMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    const body = document.body;

    if (isDarkMode) {
        body.classList.add('dark-mode');
    }

    updateThemeLabel();
}

function updateThemeLabel() {
    const themeLabel = document.querySelector('.theme-toggle label');
    const body = document.body;

    if (body.classList.contains('dark-mode')) {
        themeLabel.textContent = 'Light Mode';
    } else {
        themeLabel.textContent = 'Dark Mode';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { text: taskText, completed: false, dueDate: null };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const tasksContainer = document.getElementById('tasks-container');
        const taskElement = createTaskElement(newTask);
        tasksContainer.appendChild(taskElement);

        taskInput.value = '';
    }
}

function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task, taskElement));

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const dueDate = document.createElement('span');
    dueDate.className = 'due-date';
    dueDate.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'task-actions';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task, taskElement));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task, taskElement));

    actionsContainer.appendChild(editButton);
    actionsContainer.appendChild(deleteButton);

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(dueDate);
    taskElement.appendChild(actionsContainer);

    return taskElement;
}

function toggleTaskCompletion(task, taskElement) {
    task.completed = !task.completed;
    taskElement.classList.toggle('completed');
    updateLocalStorage();
}

function deleteTask(task, taskElement) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(t => t.text === task.text);

    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskElement.remove();
    }
}

function editTask(task, taskElement) {
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText !== null) {
        task.text = newTaskText.trim();
        taskElement.querySelector('span').textContent = task.text;
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task')).map(taskElement => {
        return {
            text: taskElement.querySelector('span').textContent,
            completed: taskElement.classList.contains('completed'),
            dueDate: taskElement.querySelector('.due-date').textContent.replace('Due: ', '')
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
