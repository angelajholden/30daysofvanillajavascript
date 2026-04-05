function initTabsComponent() {
	const root = document.querySelector(".tabs_component");
	if (!root) return;
	const buttons = root.querySelectorAll(".button");
	const panels = root.querySelectorAll(".tab_item");

	// activate first panel
	buttons[0].classList.add("active");
	buttons[0].setAttribute("aria-selected", "true");
	buttons[0].setAttribute("tabindex", "0");
	panels[0].classList.add("active");

	function activateTab(button) {
		// deactivate all buttons
		buttons.forEach((btn) => {
			btn.classList.remove("active");
			btn.setAttribute("aria-selected", "false");
			btn.setAttribute("tabindex", "-1");
		});

		// activate button clicked
		button.classList.add("active");
		button.setAttribute("aria-selected", "true");
		button.setAttribute("tabindex", "0");

		// deactivate, then activate matching panel
		panels.forEach((item) => {
			item.classList.remove("active");
			if (button.dataset.tabTarget === item.id) {
				item.classList.add("active");
			}
		});
	}

	buttons.forEach((button, index) => {
		["click", "keydown"].forEach((eventType) => {
			button.addEventListener(eventType, (e) => {
				// activate and focus via keyboard arrows
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

				// activate tabs on click
				if (eventType === "click") {
					activateTab(button);
				}
			});
		});
	});
}
initTabsComponent();
