function initSplitViewPanels() {
	const root = document.querySelector(".split_view");
	if (!root) return;

	const left = root.querySelector(".split_panel-left");
	const seperator = root.querySelector(".split_handle");

	console.log(root.getBoundingClientRect());
	let isResizing = false;

	seperator.addEventListener("mousedown", (e) => {
		isResizing = true;
	});

	document.addEventListener("mousemove", (e) => {
		if (!isResizing) return;

		const rootRect = root.getBoundingClientRect();
		const newLeftWidth = e.clientX - rootRect.left;
		const minWidth = 240;
		const maxWidth = rootRect.width - minWidth;

		if (newLeftWidth < minWidth || newLeftWidth > maxWidth) return;

		left.style.width = `${newLeftWidth}px`;

		document.addEventListener("mouseup", () => {
			if (!isResizing) return;
			isResizing = false;
		});
	});
}
initSplitViewPanels();
