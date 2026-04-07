function initFilterableList() {
	const root = document.querySelector(".filterable_list");
	if (!root) return;
	let input = root.querySelector("#filter-input");
	const reset = root.querySelector("#reset-button");
	const items = root.querySelectorAll(".card_item");

	// hide the empty message on page load
	const empty = root.querySelector(".empty_state");
	empty.setAttribute("hidden", "");

	input.addEventListener("input", (e) => {
		// get text from input
		let text = e.target.value;
		text = text.toLowerCase().trim();
		const matchedItems = Array.from(items).filter((item) => {
			const match = item.textContent.toLowerCase().includes(text);
			// hide list items if not matched
			if (!match) {
				item.setAttribute("hidden", "");
			} else {
				item.removeAttribute("hidden", "");
			}

			// reset the input and show the list items
			reset.addEventListener("click", () => {
				input.value = "";
				item.removeAttribute("hidden", "");
				empty.setAttribute("hidden", "");
			});
			return match;
		});

		// show empty message if no matches
		if (matchedItems.length === 0) {
			empty.removeAttribute("hidden", "");
		} else {
			empty.setAttribute("hidden", "");
		}
	});
}
initFilterableList();
