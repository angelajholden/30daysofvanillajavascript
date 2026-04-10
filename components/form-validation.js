function initFormValidation() {
	const root = document.querySelector(".form");
	if (!root);

	// get hidden field values
	const path = root.querySelector("input[name=page_path]");
	if (path) path.value = window.location.pathname;
	const url = root.querySelector("input[name=page_url]");
	if (url) url.value = window.location.href;

	// fields the user fills out
	// could probably loop through the inputs, too
	const name = root.querySelector("input[name=name]");
	const email = root.querySelector("input[name=email]");
	const textarea = root.querySelector("textarea[name=message-field]");

	// submit button
	const submit = root.querySelector("button[type=submit]");

	// inline errors/success
	const nameError = root.querySelector("#name-error");
	const emailError = root.querySelector("#email-error");
	const messageError = root.querySelector("#message-error");
	const formSuccess = root.querySelector("#form-success");

	root.addEventListener("submit", (e) => {
		if (name.value === null || name.value === "") {
			e.preventDefault();
			nameError.removeAttribute("hidden", "");
			return;
		} else {
			nameError.setAttribute("hidden", "");
		}

		if (email.value === null || email.value === "") {
			e.preventDefault();
			emailError.removeAttribute("hidden", "");
			return;
		} else {
			emailError.setAttribute("hidden", "");
		}

		if (textarea.value === null || textarea.value === "") {
			e.preventDefault();
			messageError.removeAttribute("hidden", "");
			return;
		} else {
			messageError.setAttribute("hidden", "");
		}

		formSuccess.removeAttribute("hidden", "");
	});
}
initFormValidation();
