//Element Selection

const form = document.getElementById('todoForm');
const toDoInput = document.getElementById('toDoText');
const toDoListEl = document.getElementById('toDoList');

// Variables
let toDos = JSON.parse(localStorage.getItem('toDos') || [];
let editToDoId = -1;
localStorage.setItem('toDos', JSON.stringigy(toDos));

// Form Submission
form.addEventListener('submit', function (event) {
	event.preventDefault();

	saveToDo();
	renderToDos();
});

// Save TODO function
function saveToDo() {
	const toDoValue = toDoInput.value;

	//check if todo is empty
	const isEmpty = toDoValue === '';

	//check if todo is duplicate
	const isDuplicate = toDos.some(
		(toDo) => toDo.value.toUpperCase() === toDoValue.toUpperCase()
	);
	if (isEmpty) {
		alert('input is empty!');
	} else if (isDuplicate) {
		alert('To Do already exists!');
	} else {
		toDos.push({
			value: toDoValue,
			checked: false,
			color: '#' + Math.floor(Math.random() * 16777215).toString(16),
		});
		//set to empty after push
		toDoInput.value = '';
	}
}

//Render ToDos

function renderToDos() {
	//clear todo and re-render
	toDoListEl.innerHTML = '';

	//render
	toDos.forEach((toDo, index) => {
		toDoListEl.innerHTML += `
			<div id="${index}" class="task-container__box">
				
                <i class="task-container__box--check-btn ${
									toDo.checked ? 'fa-solid fa-circle' : 'fa-regular fa-circle'
								}"
					style="color: ${toDo.color}"
                    data-action="check"
				></i>
				
                <p class="task-container__box--text">${toDo.value}</p>
				
                <button class="task-container__box--edit">
					<i class="fa-regular fa-pen-to-square" data-action="edit"></i>
				</button>
				
                <button class="task-container__box--delete">
					<i class="fa-regular fa-trash-can" data-action="delete"></i>
				</button>
			</div>
            `;
	});
}

// Click event listener - for all ToDos

toDoListEl.addEventListener('click', (event) => {
	const target = event.target;
	const parentElement = target.parentNode;

	if (parentElement.className !== 'task-container__box') return;

	//to Do ID
	const toDo = parentElement;
	const toDoId = Number(toDo.id);

	//target action

	const action = target.dataset.action;

	action === 'check' && checkToDo(toDoId);
	action === 'edit' && editToDo(toDoId);
	action === 'delete' && deleteToDo(toDoId);
});

//check a ToDo

function checkToDo(toDoId) {
	toDos = toDos.map((toDo, index) => ({
		...toDo,
		checked: index === toDoId ? !toDo.checked : toDo.checked,
	}));

	renderToDos();
}
//EDIT TODO

function editToDo(toDoId) {
	toDoInput.value = toDos[toDoId].value;
	EditToDoId = toDoId;
}

//DELETE TODO

function deleteToDo(toDoId) {
	toDos.filter((toDo, index) => index !== toDoId);
	EditToDoId = -1;

	renderToDos();
}
