function initCopyright() {
	const year = document.getElementById("year");
	if (!year) return;
	const date = new Date().getFullYear();
	year.textContent = date;
}
initCopyright();
