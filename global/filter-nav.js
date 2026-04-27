function initNavSeaech() {
	const root = document.querySelector(".navigation");
	let input = root.querySelector("#filter-navigation");
	if (!root || !input) return;
	const reset = root.querySelector("#reset-button");
	const items = root.querySelectorAll(".main_nav li");
	const empty = root.querySelector(".empty_state");
	let timer;

	input.addEventListener("input", (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// get text from input
			const text = e.target.value.toLowerCase().trim();
			const matchedNavItems = Array.from(items).filter((item) => {
				const match = item.textContent.toLowerCase().includes(text);
				// hide list items if not matched
				if (!match) {
					item.hidden = true;
				} else {
					item.hidden = false;
				}
				// reset the input and show the list items
				reset.addEventListener("click", () => {
					input.value = "";
					item.hidden = false;
					empty.hidden = true;
				});
				return match;
			});
			// show empty message if no matches
			if (matchedNavItems.length === 0) {
				empty.hidden = false;
			} else {
				empty.hidden = true;
			}
		}, 500);
	});
}
initNavSeaech();
