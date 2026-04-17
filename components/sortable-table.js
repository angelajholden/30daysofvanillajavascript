function initSortableTable() {
	const root = document.querySelector(".sortable_table-section");
	if (!root) return;

	const tbody = root.querySelector("tbody");
	if (!tbody) return;

	const buttons = root.querySelectorAll(".sort_button");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const rowsArray = Array.from(tbody.querySelectorAll("tr"));
			const columnIndex = Number(button.dataset.column);

			const currentSort = button.getAttribute("aria-sort");
			const nextSort = currentSort === "ascending" ? "descending" : "ascending";

			buttons.forEach((btn) => {
				btn.setAttribute("aria-sort", "none");
			});

			rowsArray.sort((a, b) => {
				const cellA = a.children[columnIndex];
				const cellB = b.children[columnIndex];

				const valueA = cellA.dataset.value ? cellA.dataset.value : cellA.textContent.trim();

				const valueB = cellB.dataset.value ? cellB.dataset.value : cellB.textContent.trim();

				if (cellA.dataset.value) {
					return nextSort === "ascending" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
				}

				return nextSort === "ascending" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
			});

			rowsArray.forEach((row) => {
				tbody.append(row);
			});

			button.setAttribute("aria-sort", nextSort);
		});
	});
}

initSortableTable();
