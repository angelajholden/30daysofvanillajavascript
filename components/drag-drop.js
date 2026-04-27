function initDragAndDrop() {
	const root = document.querySelector(".drag_list");
	if (!root) return;

	const savedList = localStorage.getItem("ordered_list");
	const savedOrder = savedList ? JSON.parse(savedList) : [];
	let dragged;

	function saveOrder() {
		const items = root.querySelectorAll("li");
		const order = Array.from(items).map((item) => item.textContent.trim());
		localStorage.setItem("ordered_list", JSON.stringify(order));
	}

	function restoreOrder() {
		if (!savedOrder.length) return;
		const items = Array.from(root.querySelectorAll("li"));
		savedOrder.forEach((savedText) => {
			const matchingItem = items.find((item) => {
				return item.textContent.trim() === savedText;
			});

			if (matchingItem) {
				root.append(matchingItem);
			}
		});
	}

	function addDragEvents() {
		const items = root.querySelectorAll('li[draggable="true"]');
		items.forEach((item) => {
			item.addEventListener("dragstart", (e) => {
				dragged = e.target;
			});
			item.addEventListener("dragend", (e) => {
				dragged = null;
			});
		});
	}

	restoreOrder();
	addDragEvents();

	root.addEventListener("dragover", (e) => {
		e.preventDefault();
		const target = e.target.closest("li");
		if (!target || target === dragged) return;
		root.insertBefore(dragged, target);
	});

	root.addEventListener("drop", saveOrder);
}
initDragAndDrop();
