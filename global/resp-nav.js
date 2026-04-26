const body = document.body;
const open = document.querySelector(".menu_open");

function initMenuToggle() {
	const buttons = document.querySelectorAll(".menu_button");
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

function initEscapeToggle() {
	if (!open) return;
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			open.setAttribute("aria-expanded", "false");
		}
	});
}

initMenuToggle();
initEscapeToggle();
