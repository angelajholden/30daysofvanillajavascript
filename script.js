const body = document.body;
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".menu_open");

function menuToggle() {
	if (!open) return;
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const isActive = body.classList.toggle("menu_active");
			if (isActive) {
				open.setAttribute("aria-expanded", "true");
			} else {
				open.setAttribute("aria-expanded", "false");
			}
		});
	});
}

function escapeToggle() {
	if (!open) return;
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			open.setAttribute("aria-expanded", "false");
		}
	});
}

function copyright() {
	const year = document.getElementById("year");
	const date = new Date().getFullYear();
	if (!year) return;
	year.textContent = date;
}

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	escapeToggle();
	copyright();
});
