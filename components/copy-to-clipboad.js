async function writeClipboardText(text) {
	try {
		await navigator.clipboard.writeText(text);
	} catch (error) {
		console.error(error.message);
	}
}

function initCopyToClipboard() {
	const root = document.querySelector(".copy_clipboard");
	if (!root);

	const URL = window.location.href;
	const button = root.querySelector(".copy");
	const success = root.querySelector(".success-message");

	button.addEventListener("click", () => {
		writeClipboardText(URL);
		button.setAttribute("disabled", "");
		console.log("button disabled");
		setTimeout(() => {
			success.removeAttribute("hidden", "");
			console.log("show success");
		}, 500);
		setTimeout(() => {
			button.removeAttribute("disabled", "");
			success.setAttribute("hidden", "");
			console.log("enable button, remove success");
		}, 5000);
		return;
	});
}
initCopyToClipboard();
