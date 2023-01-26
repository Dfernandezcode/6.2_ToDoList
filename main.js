//Element Selection

const form = document.getElementById('toDoForm');

// Variables
let toDos = [];

// Form Submission
form.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log('submit');

	saveToDo();
});
// Save TODO function
function saveToDo() {}
