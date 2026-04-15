function initScrollProgressBar() {
	const docElement = document.documentElement;
	const root = document.querySelector(".progress_indicator");
	if (!root) return;

	// scroll width
	const scroll = root.querySelector(".progress_scroll");

	// listen for the scroll
	document.addEventListener("scroll", () => {
		// document height
		const docHeight = docElement.scrollHeight;
		const viewHeight = window.innerHeight;

		// calculations
		const scrollTop = window.scrollY;
		const scrollableDistance = docHeight - viewHeight;
		const progress = scrollTop / scrollableDistance;
		const progressPercent = progress * 100;
		scroll.style.width = `${progressPercent}%`;
	});
}
initScrollProgressBar();
