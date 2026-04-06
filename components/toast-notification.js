function initToastNotification() {
	const root = document.querySelector(".toast_notification");
	if (!root) return;
	const buttons = root.querySelectorAll("#show-toast-button");
	const lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const toast = document.createElement("div");
			const btn = document.createElement("button");
			const h3 = document.createElement("h3");
			const p = document.createElement("p");

			if (button.getAttribute("aria-controls") === "info-toast") {
				toast.classList.add("info");
				toast.setAttribute("id", "info-toast");
				btn.setAttribute("aria-label", "Close Info Toast");
				h3.textContent = `Info Toast Notification`;
			} else if (button.getAttribute("aria-controls") === "success-toast") {
				toast.classList.add("success");
				toast.setAttribute("id", "success-toast");
				btn.setAttribute("aria-label", "Close Success Toast");
				h3.textContent = `Success Toast Notification`;
			} else if (button.getAttribute("aria-controls") === "error-toast") {
				toast.classList.add("error");
				toast.setAttribute("id", "error-toast");
				btn.setAttribute("aria-label", "Close Error Toast");
				h3.textContent = `Error Toast Notification`;
			}

			toast.classList.add("toast_region");
			toast.setAttribute("aria-live", "polite");
			toast.setAttribute("aria-atomic", "true");

			btn.classList.add("icon_button");
			btn.setAttribute("type", "button");
			btn.innerHTML = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>`;

			p.textContent = `${lorem}`;
			toast.append(btn, h3, p);

			root.insertAdjacentElement("beforeend", toast);

			const regions = root.querySelectorAll(".toast_region");
			regions.forEach((region) => {
				const timeOutId = setTimeout(() => {
					region.remove();
				}, 5000); // five seconds

				const close = region.querySelector(".icon_button");
				close.addEventListener("click", () => {
					region.remove();
					clearTimeout(timeOutId);
				});
			});
		});
	});
}
initToastNotification();
