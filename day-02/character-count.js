function init() {
	const textarea = document.getElementById("message");
	const charCount = document.getElementById("character-count");
	const maxLength = document.getElementById("max-length");
	const fieldMeta = document.querySelector(".field_meta");

	// guard these elements
	if (!textarea || !charCount || !maxLength || !fieldMeta) return;

	textarea.setAttribute("maxlength", "250");
	textarea.addEventListener("input", updateValue);

	function updateValue(e) {
		// first = count the characters
		// second = warning style near limit (within 10)
		// third = hard max limit 250 characters
		// fourth = remaining characters instead of total count
		const count = e.target.value;
		console.log(e.target.value);
		charCount.textContent = count.length;
		maxLength.textContent = 250 - count.length;
		if (count.length >= 240) {
			fieldMeta.classList.add("red");
		} else {
			fieldMeta.classList.remove("red");
		}
	}
}
init();
