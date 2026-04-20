function initSortableTable() {
	const root = document.querySelector("#sortable_table");
	if (!root) return;

	const tbody = root.querySelector("tbody");
	if (!tbody) return;

	// get all the buttons (node list)
	const buttons = root.querySelectorAll(".sort_button");

	// loop through each button
	buttons.forEach((button) => {
		// when clicking on a button...
		button.addEventListener("click", () => {
			// get all rows (node list) + make an array
			const rowsArray = Array.from(tbody.querySelectorAll("tr"));
			// get the column number from the data-* attribute
			const columnIndex = Number(button.dataset.column);

			// get the aria-sort attribute + check the status
			const currentSort = button.getAttribute("aria-sort");
			const nextSort = currentSort === "ascending" ? "descending" : "ascending";

			// reset aria-sort=none
			buttons.forEach((btn) => {
				btn.setAttribute("aria-sort", "none");
			});

			// sort the rows arrays asc or desc
			rowsArray.sort((a, b) => {
				// get the children of  the rows
				const cellA = a.children[columnIndex];
				const cellB = b.children[columnIndex];
				// check the children for either a data-* (number) or text
				const valueA = cellA.dataset.value ? cellA.dataset.value : cellA.textContent.trim();
				const valueB = cellB.dataset.value ? cellB.dataset.value : cellB.textContent.trim();

				// check the aria-sort + sort by number accordingly
				if (cellA.dataset.value) {
					return nextSort === "ascending" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
				}

				// check the text and sort a-z or z-a
				return nextSort === "ascending" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
			});

			// append the rows by sort order
			rowsArray.forEach((row) => {
				tbody.append(row);
			});

			// set the aria-sort to the new sort value
			button.setAttribute("aria-sort", nextSort);
		});
	});
}

initSortableTable();
