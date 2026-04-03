function initAccordion() {
	const root = document.querySelector(".accordion");
	if (!root) return;
	const items = root.querySelectorAll(".accordion_item");
	const triggers = root.querySelectorAll(".accordion_trigger");

	// first accordion is active and aria-expanded=true
	items[0].classList.toggle("active");
	triggers[0].setAttribute("aria-expanded", "true");

	items.forEach((item) => {
		const trigger = item.querySelector(".accordion_trigger");
		trigger.addEventListener("click", () => {
			// check for an active class
			const isActive = item.classList.contains("active");
			// on click, remove any active class
			items.forEach((itm) => {
				itm.classList.remove("active");
				itm.querySelector(".accordion_trigger").setAttribute("aria-expanded", "false");
			});
			// add the active class if not active
			if (!isActive) {
				item.classList.add("active");
				trigger.setAttribute("aria-expanded", "true");
			}
		});
	});
}
initAccordion();
