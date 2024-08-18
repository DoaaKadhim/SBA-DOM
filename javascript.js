// track the elements using getElementById.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    const themeToggle = document.getElementById('themeToggle');

   // function to create a new task.
    function createTaskItem(taskText, category, priority, status) {
        // create new list element.
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.priority = priority;
        if (status === 'Completed') {
            taskItem.classList.add('completed');
        }
        // set the innerHtml.
        taskItem.innerHTML = `
            <span>${taskText} [${category} - ${priority}]</span>
            <div>
                <button class="btn-complete">${status === 'Completed' ? 'Done' : 'Complete'}</button>
                <button class="btn-remove">Remove</button>
            </div>
        `;
        return taskItem;
    }


    //create function to add new task to the to-do-list
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
            //creates a shrinking animation.
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

    //toggle button event listener to switch between dark and light mode.
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

});
