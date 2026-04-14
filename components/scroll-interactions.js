function initScrollInteractions() {
	const body = document.body;
	const header = document.querySelector(".header");
	const button = document.querySelector(".scroll_top");
	if (!header || !button) return;

	const logo = document.querySelector(".primary-logo a");
	let shouldFocusLogo = false;

	window.addEventListener("scroll", () => {
		if (window.scrollY > 50) {
			body.classList.add("scroll_active");
		} else {
			body.classList.remove("scroll_active");
		}

		if (window.scrollY > 100) {
			button.removeAttribute("hidden", "");
		} else {
			button.setAttribute("hidden", "");
		}
	});

	button.addEventListener("click", () => {
		shouldFocusLogo = true;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// wait for the scroll to finish
	window.addEventListener("scrollend", () => {
		if (!shouldFocusLogo) return;
		logo.focus();
		shouldFocusLogo = false;
	});
}
initScrollInteractions();
