function initNavSeaech() {
	const root = document.querySelector(".navigation");
	let input = root.querySelector("#filter-navigation");
	if (!root || !input) return;
	const reset = root.querySelector("#reset-button");
	const items = root.querySelectorAll(".main_nav li");
	const empty = root.querySelector(".empty_state");

	input.addEventListener("input", (e) => {
		// get text from input
		let text = e.target.value;
		text = text.toLowerCase().trim();
		const matchedNavItems = Array.from(items).filter((item) => {
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
		if (matchedNavItems.length === 0) {
			empty.removeAttribute("hidden", "");
		} else {
			empty.setAttribute("hidden", "");
		}
	});
}
initNavSeaech();
