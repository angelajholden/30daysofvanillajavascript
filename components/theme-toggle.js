function initThemeToggle() {
	const body = document.body;
	const root = document.querySelector(".theme_toggle");
	if (!root) return;
	const title = root.querySelector("#toggle_title");
	const toggle = root.querySelector(".toggle_button");

	// get saved theme on page load
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "light") {
		body.classList.add("light_mode");
		title.textContent = "Light";
	} else {
		title.textContent = "Dark";
	}

	toggle.addEventListener("click", () => {
		const isActiveToggle = body.classList.toggle("light_mode");
		if (isActiveToggle) {
			title.textContent = "Light";
			localStorage.setItem("theme", "light");
		} else {
			title.textContent = "Dark";
			localStorage.setItem("theme", "dark");
		}
	});
}
initThemeToggle();
