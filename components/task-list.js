function initTaskList() {
	const root = document.querySelector(".simple_task-list");
	if (!root) return;

	const form = root.querySelector("#task-form");
	const taskInput = root.querySelector("#task-input");
	const taskList = root.querySelector(".task_list");

	const savedList = localStorage.getItem("task_list");
	let listArray = JSON.parse(savedList) || [];

	function createListItems(text) {
		// create the elements
		const taskItem = document.createElement("li");
		const span = document.createElement("span");
		const button = document.createElement("button");

		// set the attributes
		taskItem.classList.add("task_item");
		span.textContent = text;
		button.setAttribute("type", "button");
		button.classList.add("button");
		button.classList.add("button_outline");
		button.textContent = "Remove";

		// add li to the list
		taskItem.append(span, button);
		taskList.insertAdjacentElement("beforeend", taskItem);

		button.addEventListener("click", (e) => {
			const item = e.target.closest(".task_item");
			const span = item.querySelector("span");

			listArray = listArray.filter((listItem) => listItem !== span.textContent);
			localStorage.setItem("task_list", JSON.stringify(listArray));

			item.remove();
		});
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		createListItems(taskInput.value);

		listArray.push(taskInput.value);
		localStorage.setItem("task_list", JSON.stringify(listArray));

		// clear the input after it's added to the list
		taskInput.value = "";
	});

	listArray.forEach((listItem) => {
		createListItems(listItem);
	});
}
initTaskList();
