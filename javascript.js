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

    function addTask(taskText, category, priority) {
        const newTaskItem = createTaskItem(taskText, category, priority, 'Pending');
        taskList.appendChild(newTaskItem);
    }


});
