const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const list = document.getElementById('todo-list');
const filter = document.getElementById('filter-todo');

document.addEventListener('DOMContentLoaded', loadTodos);
form.addEventListener('submit', addTodo);
filter.addEventListener('change', filterTodos);

function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(){
    getTodos().forEach(todo => createTodo(todo.text, todo.date, todo.completed));
}

function addTodo(e){
    e.preventDefault();
    if(!input.value || !dateInput.value){
        alert('Fill all fields');
        return;
    }

    const todos = getTodos();
    todos.push({text: input.value, date: dateInput.value, completed:false});
    saveTodos(todos);

    createTodo(input.value, dateInput.value, false);
    input.value='';
    dateInput.value='';
}

function createTodo(text, date, completed){
    const li = document.createElement('li');
    li.className = 'todo';
    if(completed) li.classList.add('completed');

    li.innerHTML = `
    <span>${text}<br><small>${date}</small></span>
    <div>
        <button class="complete">✓</button>
        <button class="delete">✕</button>
    </div>`;

    li.querySelector('.complete').onclick = () => toggleComplete(li, text);
    li.querySelector('.delete').onclick = () => deleteTodo(li, text);

    list.appendChild(li);
}

function toggleComplete(todoEl, text){
    todoEl.classList.toggle('completed');
    const todos = getTodos();
    todos.forEach(t => {
        if(t.text === text) t.completed = !t.completed;
    });
    saveTodos(todos);
}

function deleteTodo(todoEl, text){
    todoEl.remove();
    let todos = getTodos();
    todos = todos.filter(t => t.text !== text);
    saveTodos(todos);
}

function filterTodos(){
    [...list.children].forEach(todo=>{
        if(filter.value==='all') todo.style.display='flex';
        if(filter.value==='completed') todo.style.display=todo.classList.contains('completed')?'flex':'none';
        if(filter.value==='uncompleted') todo.style.display=!todo.classList.contains('completed')?'flex':'none';
    });
}
