function initOnScrollHeader() {
	const body = document.body;
	const header = document.querySelector(".header");
	if (!header) return;

	window.addEventListener("scroll", () => {
		if (window.scrollY > 50) {
			body.classList.add("scroll_active");
		} else {
			body.classList.remove("scroll_active");
		}
	});
}
initOnScrollHeader();

function initScrollToTop() {
	const button = document.querySelector(".scroll_top");
	if (!button) return;
	const logo = document.querySelector(".primary-logo a");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 100) {
			button.removeAttribute("hidden", "");
		} else {
			button.setAttribute("hidden", "");
		}
	});

	button.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		logo.focus();
	});
}
initScrollToTop();
