function initTaskList() {
	const root = document.querySelector(".persistent_task-list");
	if (!root) return;

	const form = root.querySelector("#task-form");
	const taskInput = root.querySelector("#task-input");
	const taskList = root.querySelector(".task_list");
	const empty = root.querySelector(".empty_state");

	// check localStorage for the task list
	const savedList = localStorage.getItem("task_list");
	let listArray = JSON.parse(savedList) || [];

	// show the 'no tasks yet' message
	// if no tasks on page load
	if (listArray.length === 0) {
		empty.removeAttribute("hidden", "");
	} else {
		empty.setAttribute("hidden", "");
	}

	// create or remove a task function
	function createListItems(text) {
		// create the elements
		const taskItem = document.createElement("li");
		const span = document.createElement("span");
		const button = document.createElement("button");

		// set the attributes
		taskItem.classList.add("task_item");
		span.textContent = text;
		button.setAttribute("type", "button");
		button.setAttribute("aria-label", "Remove List Item");
		button.classList.add("icon_button");
		button.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>';

		// add li to the list
		taskItem.append(span, button);
		taskList.insertAdjacentElement("beforeend", taskItem);

		// remove a task
		button.addEventListener("click", (e) => {
			const item = e.target.closest(".task_item");
			const span = item.querySelector("span");

			// update the localStorage task list
			listArray = listArray.filter((listItem) => listItem !== span.textContent);
			localStorage.setItem("task_list", JSON.stringify(listArray));

			// show the 'no tasks yet' message if no tasks
			if (listArray.length === 0) {
				empty.removeAttribute("hidden", "");
			} else {
				empty.setAttribute("hidden", "");
			}

			// remove a task
			item.remove();
		});
	}

	// add or remove tasks
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		createListItems(taskInput.value);

		listArray.push(taskInput.value);
		localStorage.setItem("task_list", JSON.stringify(listArray));

		if (listArray.length === 0) {
			empty.removeAttribute("hidden", "");
		} else {
			empty.setAttribute("hidden", "");
		}

		// clear the input after it's added to the list
		taskInput.value = "";
	});

	// get and display tasks on page load
	listArray.forEach((listItem) => {
		createListItems(listItem);
	});
}
initTaskList();
