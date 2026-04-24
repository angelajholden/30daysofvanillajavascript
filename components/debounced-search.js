function initDebouncedSearch() {
	const root = document.querySelector(".debounced_search");
	if (!root) return;

	let input = root.querySelector("#filter-input");
	const reset = root.querySelector("#reset-button");
	const items = root.querySelectorAll(".card_item");
	const empty = root.querySelector(".empty_state");

	let inputTimer;
	// listen for typing
	input.addEventListener("input", (e) => {
		// clear timer with each input
		clearTimeout(inputTimer);
		// when typing stops...
		// timer continues
		inputTimer = setTimeout(() => {
			const text = e.target.value.toLowerCase().trim();
			console.log(text);
			const matchedItems = Array.from(items).filter((item) => {
				const match = item.textContent.toLowerCase().includes(text);
				if (!match) {
					item.hidden = true;
				} else {
					item.hidden = false;
				}
				return match;
			});
			// if no matches
			if (matchedItems.length === 0) {
				empty.hidden = false;
			} else {
				empty.hidden = true;
			}
		}, 500);
	});

	// reset button
	reset.addEventListener("click", () => {
		clearTimeout(inputTimer);
		input.value = "";
		empty.hidden = true;
		items.forEach((item) => {
			item.hidden = false;
		});
	});
}

initDebouncedSearch();
