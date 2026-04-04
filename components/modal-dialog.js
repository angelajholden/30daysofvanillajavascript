function initModalDialog() {
	const body = document.body;
	const root = document.querySelector(".modal_dialog");
	if (!root) return;
	const modal = root.querySelector(".modal");
	const openModal = root.querySelector(".button[data-open-modal='demo-modal']");
	const confirmModal = root.querySelector(".confirm_button");

	// open the modal
	if (openModal) {
		openModal.addEventListener("click", () => {
			modal.showModal();
			body.classList.add("modal_open");
		});
	}

	// confirm and close the modal
	if (confirmModal) {
		confirmModal.addEventListener("click", (e) => {
			const confirm = e.target;
			modal.close(confirm.value);
			body.classList.remove("modal_open");
		});
	}

	function updateReturnValue() {
		// do with this whatever you want
		console.log(`Return value: "${modal.returnValue}"`);
	}

	modal.addEventListener("close", updateReturnValue);

	// click the backdrop to close the modal
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			body.classList.remove("modal_open");
			modal.close();
		}
	});

	// hit escape to close the modal
	document.addEventListener("keydown", (e) => {
		if (!body.classList.contains("modal_open")) return;
		if (e.key === "Escape") {
			body.classList.remove("modal_open");
			modal.close();
		}
	});
}
initModalDialog();
