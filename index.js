let todoContainer = document.getElementById('todoContainer');
let button = document.getElementById('button')
let inputEle = document.getElementById('inputEle')
inputEle.addEventListener('change', function(event){
    inputEle.value = event.target.value
})
function getTodoList(){
    let localStorageItems = localStorage.getItem('todoList');
    let parsedLocalStorageItems = JSON.parse(localStorageItems);
    if (parsedLocalStorageItems === null){
        return []
    }
    else {
        return parsedLocalStorageItems
    }
}

let todoList = getTodoList();
console.log(todoList)

function deleteTodo(id){
    let itemId = `item${id}`;
    let deleteEle = document.getElementById(itemId);
    todoContainer.removeChild(deleteEle);
    let index = todoList.findIndex(function(item){
        if (item.id === id){
            return true
        }
        else{
            return false
        }
    });
    todoList.splice(index, 1)
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function editTodo(id){
    let itemId = `item${id}`;
    let index = todoList.findIndex(function(item){
        if (item.id === id){
            return true
        }
        else{
            return false
        }
    });
    
}

function createAndAppendTodo(item){
    let listItem = document.createElement('li');
    listItem.id = `item${item.id}`;
    listItem.classList.add('list-item');
    let paraEle = document.createElement('p');
    paraEle.textContent = `${item.value} (Changed ${item.count} times)`;
    paraEle.classList.add('paraEle');
    listItem.appendChild(paraEle);
    let divContainer = document.createElement('div');
    divContainer.classList.add('divContainer');
    listItem.appendChild(divContainer);
    let iEle = document.createElement('i');
    iEle.classList.add('fa-solid' ,'fa-pen', 'edit');
    iEle.onclick = function(){
        editTodo(item.id);
    }
    divContainer.appendChild(iEle);
    let deleteIcon = document.createElement('li');
    deleteIcon.classList.add("fa-solid" ,"fa-xmark", 'cross');
    deleteIcon.onclick = function(){
        deleteTodo(item.id);
    }
    divContainer.appendChild(deleteIcon);
    todoContainer.appendChild(listItem);
}

button.onclick = function(){
    let itemValue = todoList.length + 1;
    let id = 'todo'+itemValue;
    let list = inputEle.value.split(" ")
    let number = (list[list.length-1]);
    list.pop()
    let newValue = list.join(" ")
    console.log(newValue)
    let number1 = parseInt(number)
    let listNumbers = Array.from({length: number1}, (_, i) => i + 1)
    console.log(listNumbers)
    if (newValue != ''){
        for (let item of listNumbers){
            let itemValue = todoList.length + 1;
            let id = 'todo'+itemValue;
            let singleObject = {
                id: id,
                value: newValue,
                count: 0,
            }
        
            todoList.push(singleObject);
            createAndAppendTodo(singleObject);
        }
        
    }
    else{
        let singleObject = {
            id: id,
            value: inputEle.value,
            count: 0,
        }
    
        todoList.push(singleObject);
        createAndAppendTodo(singleObject);
    }
    
    localStorage.setItem('todoList', JSON.stringify(todoList));
    inputEle.value="";

}

for (let item of todoList){
    createAndAppendTodo(item);
}

