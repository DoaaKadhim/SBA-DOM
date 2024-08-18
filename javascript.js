// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    const themeToggle = document.getElementById('themeToggle');

    function createTaskItem(taskText, category, priority, status) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.priority = priority;
        if (status === 'Completed') {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <span>${taskText} [${category} - ${priority}]</span>
            <div>
                <button class="btn-complete">${status === 'Completed' ? 'Done' : 'Complete'}</button>
                <button class="btn-remove">Remove</button>
            </div>
        `;
        return taskItem;
    }

    function addTask(taskText, category, priority) {
        const newTaskItem = createTaskItem(taskText, category, priority, 'Pending');
        taskList.appendChild(newTaskItem);
    }

    function handleCompleteButtonClick(event) {
        if (event.target.classList.contains('btn-complete')) {
            const taskItem = event.target.closest('li');
            taskItem.classList.add('completed');
            taskItem.querySelector('.btn-complete').textContent = 'Done';
            completedList.appendChild(taskItem);
            taskItem.style.transform = 'scale(0.9)';
            setTimeout(() => taskItem.style.transform = 'scale(1)', 300);
        }
    }

    function handleRemoveButtonClick(event) {
        if (event.target.classList.contains('btn-remove')) {
            if (confirm('Are you sure you want to remove this task?')) {
                const taskItem = event.target.closest('li');
                taskItem.style.transform = 'scale(0.5)';
                setTimeout(() => taskItem.remove(), 300);
            }
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        const category = categorySelect.value;
        const priority = prioritySelect.value;

        if (taskText && category && priority) {
            addTask(taskText, category, priority);
            taskInput.value = '';
            categorySelect.value = '';
            prioritySelect.value = '';
        }
    });

    document.addEventListener('click', (event) => {
        handleCompleteButtonClick(event);
        handleRemoveButtonClick(event);
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    // BOM properties
    console.log(window.location.href); // Current URL
    console.log(navigator.userAgent); // User Agent

    // Example of using DocumentFragment
    function createTasksFragment(tasks) {
        const fragment = document.createDocumentFragment();
        tasks.forEach(({ taskText, category, priority, status }) => {
            fragment.appendChild(createTaskItem(taskText, category, priority, status));
        });
        return fragment;
    }

    // CSS class modification example
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.add('enhanced-task');
    });
});
