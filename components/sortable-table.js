function initSortableTable() {
	const root = document.querySelector(".sortable_table-section");
	if (!root) return;

	const buttons = root.querySelectorAll(".sort_button");
	// console.log(rows);
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const rows = Array.from(root.querySelectorAll("tbody tr"));
			// console.log(rows);
			const columnIndex = button.dataset.column;

			rows.forEach((row) => {
				console.log(row.children[columnIndex]);
			});

			// rows.forEach((row) => {
			// 	console.log(row);
			// 	const trRows = row.querySelectorAll();
			// 	// const cells = Array.from(row.children);
			// 	// cells.forEach((cell) => {
			// 	// 	let value;
			// 	// 	if (cell.dataset.value) {
			// 	// 		value = cell.dataset.value;
			// 	// 	} else {
			// 	// 		value = cell.textContent.trim();
			// 	// 	}
			// 	// 	console.log(value);
			// 	// });
			// });
		});
	});
}
initSortableTable();
