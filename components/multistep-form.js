function initConditionalForm() {
	const root = document.querySelector(".conditional_form");
	if (!root) return;

	const inquiryType = root.querySelectorAll('input[name="inquiry_type"]');
	const groups = root.querySelectorAll(".conditional_group");
	const reset = root.querySelector(".text_button");

	const name = root.querySelector('input[name="name"]');
	const email = root.querySelector('input[name="email"]');

	const interestError = root.querySelector("#interest-error");
	const nameError = root.querySelector("#name-error");
	const emailError = root.querySelector("#email-error");

	/**
	 * logic to show groups based on radio input
	 */
	inquiryType.forEach((type) => {
		type.addEventListener("change", (e) => {
			interestError.hidden = true;
			const show = type.dataset.show;
			groups.forEach((group) => {
				group.hidden = true;
				const id = group.getAttribute("id");
				if (id === show) {
					group.hidden = false;
				}
			});
		});
	});

	/**
	 * light form vaildation
	 */
	root.addEventListener("submit", (e) => {
		// name input
		if (name.value === null || name.value === "") {
			e.preventDefault();
			nameError.hidden = false;
			return;
		} else {
			nameError.hidden = true;
		}

		// email input
		if (email.value === null || email.value === "") {
			e.preventDefault();
			emailError.hidden = false;
			return;
		} else {
			emailError.hidden = true;
		}

		// check the radio group for something checked
		// there can only be one
		const checked = root.querySelector('input[name="inquiry_type"]:checked');
		if (!checked) {
			console.log({ checked });
			e.preventDefault();
			interestError.hidden = false;
			return;
		} else {
			console.log("something is checked");
			interestError.hidden = true;
		}

		// this is not a working form
		// remove if there's an endpoint
		e.preventDefault();
	});

	/**
	 * reset the form and hide the errors
	 */
	reset.addEventListener("click", () => {
		groups.forEach((group) => {
			group.hidden = true;
		});
		interestError.hidden = true;
		nameError.hidden = true;
		emailError.hidden = true;
	});
}
initConditionalForm();
