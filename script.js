document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const voiceButton = document.getElementById('voiceButton');
    const todoList = document.getElementById('todoList');
    let todoCounter = 0;

    // Function to add a todo item
    function addTodoItem(text) {
        todoCounter++;
        const li = document.createElement('li');
        li.id = `todo-${todoCounter}`;
        
        const todoText = document.createElement('span');
        todoText.textContent = text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton';
        editButton.addEventListener('click', editHandler);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Mark as done';
        doneButton.className = 'doneButton';
        doneButton.addEventListener('click', () => {
            doneTodoItem(doneButton, editButton, todoText);
        });

        li.appendChild(todoText);
        li.appendChild(editButton);
        li.appendChild(doneButton);
        todoList.appendChild(li);
    }

    // Function to handle editing a todo item
    function editHandler(event) {
        const todoText = event.target.parentElement.firstChild;
        const currentText = todoText.textContent;
        const newText = prompt('Edit your todo', currentText);
        if (newText !== null && newText.trim() !== '') {
            todoText.textContent = newText.trim();
        }
    }

    // Function to mark a todo item as done
    function doneTodoItem(doneButton, editButton, todoText) {
        doneButton.textContent = 'Done';
        doneButton.disabled = true;

        editButton.textContent = 'Delete';
        editButton.className = 'deleteButton';
        editButton.removeEventListener('click', editHandler);
        editButton.addEventListener('click', () => {
            deleteTodoItem(editButton.parentElement);
        });
    }

    // Function to delete a todo item
    function deleteTodoItem(todoItem) {
        const confirmDelete = confirm('Are you sure you want to delete this todo?');
        if (confirmDelete) {
            todoList.removeChild(todoItem);
        }
    }

    // Event listener for the add button
    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
        }
    });

    // Voice recognition setup
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 0;

    // Event listener for the voice button
    voiceButton.addEventListener('click', () => {
        recognition.start();
    });

    // Event listener for speech recognition results
    recognition.addEventListener('result', (event) => {
        const speechResult = event.results[0][0].transcript.trim();
        addTodoItem(speechResult);
    });

    // Error handling for speech recognition
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
    });

    // Stop recognition when user stops speaking
    recognition.addEventListener('end', () => {
        recognition.stop();
    });
});
