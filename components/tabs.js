function initTabsComponent() {
	const root = document.querySelector(".tabs_component");
	if (!root) return;
	const buttons = root.querySelectorAll(".button");
	const panels = root.querySelectorAll(".tab_item");

	// make first items active on page load
	buttons[0].classList.add("active");
	buttons[0].setAttribute("aria-selected", "true");
	buttons[0].setAttribute("tabindex", "0");
	panels[0].classList.add("active");

	function activateTab(button) {
		// remove all active classes first
		buttons.forEach((btn) => {
			btn.classList.remove("active");
			btn.setAttribute("aria-selected", "false");
			btn.setAttribute("tabindex", "-1");
		});
		panels.forEach((itm) => {
			itm.classList.remove("active");
		});
		// add active class to button clicked
		button.classList.add("active");
		button.setAttribute("aria-selected", "true");
		button.setAttribute("tabindex", "0");
		panels.forEach((item) => {
			// if the target clicked is a button
			// and the button data=* equals the item id
			// add an active class to the item
			if (button.dataset.tabTarget === item.id) {
				item.classList.add("active");
			}
		});
	}

	buttons.forEach((button, index) => {
		["click", "keydown"].forEach((eventType) => {
			button.addEventListener(eventType, (e) => {
				// activate and focus the keyboard arrows
				let newIndex = index;
				if (e.key === "ArrowRight") {
					newIndex = (index + 1) % buttons.length;
				}

				if (e.key === "ArrowLeft") {
					newIndex = (index - 1 + buttons.length) % buttons.length;
				}

				if (newIndex !== index) {
					e.preventDefault();
					buttons[newIndex].focus();
					activateTab(buttons[newIndex]);
					return;
				}

				if (e.key === "Home") newIndex = 0;
				if (e.key === "End") newIndex = tabs.length - 1;

				if (eventType === "click") {
					activateTab(button);
				}
			});
		});
	});
}
initTabsComponent();
