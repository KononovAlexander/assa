'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const itemRemove = document.querySelector('.todo-remove');

let todoData = [];

const toLocalStorage = function(){ 

    let toJson = JSON.stringify(todoData);
    localStorage.setItem('tasks', toJson);
    
    };

const outofLocalStorage = function(){
    if (localStorage.getItem('tasks') !== null) {
    let str = localStorage.getItem('tasks');
    todoData = JSON.parse(str);
    }
};

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
        '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' + 
        '<button class="todo-complete"></button>' + 
        '</div>';
        
        if(item.completed && item.value !== ''){
            todoCompleted.append(li);
        }else if(!item.completed && item.value !== ''){
            
            todoList.append(li);
        }else if(item.value === ''){
            return;
        }
        
        const itemRemove = li.querySelector('.todo-remove');

        itemRemove.addEventListener('click', function(){

            let num = todoData.indexOf(item);
            li.parentNode.removeChild(li);
            todoData.splice(num, 1);
            localStorage.removeItem('tasks');
            toLocalStorage();
            render();
        });
        
        
        
        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
                
            render();
        });

        btnTodoComplete.addEventListener('click', toLocalStorage());
        
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault(); 
    
    const newTodo = {
        value: headerInput.value,
        completed: false
        
    };
    if(headerInput.value !== ''){
        todoData.push(newTodo);
        headerInput.value = "";
    }

    render();
 
});

outofLocalStorage();
render();
