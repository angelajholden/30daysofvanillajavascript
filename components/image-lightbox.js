function initLightBox() {
	const body = document.body;
	const root = document.querySelector(".lightbox_gallery-viewer");
	if (!root) return;

	const buttons = root.querySelectorAll(".lightbox_trigger");
	const dialog = root.querySelector(".lightbox_dialog");
	const closeLightbox = root.querySelector(".close_lightbox");
	const next = root.querySelector(".next_button");
	const prev = root.querySelector(".prev_button");
	const totalImages = buttons.length;

	let currentIndex = 0;

	const lightboxFigure = document.createElement("figure");
	lightboxFigure.classList.add("figure");

	const lightboxImage = document.createElement("img");
	lightboxFigure.append(lightboxImage);

	const updateImages = () => {
		const currentButton = buttons[currentIndex];
		const currentImg = currentButton.querySelector(".gallery_img");

		lightboxImage.src = currentImg.src;
		lightboxImage.alt = currentImg.alt;

		buttons.forEach((button, index) => {
			button.setAttribute("aria-selected", index === currentIndex ? "true" : "false");
		});
	};

	const openLightbox = () => {
		body.classList.add("lightbox_open");

		if (!dialog.contains(lightboxFigure)) {
			dialog.append(lightboxFigure);
		}

		updateImages();
		dialog.showModal();
	};

	const closeDialog = () => {
		body.classList.remove("lightbox_open");
		dialog.close();

		buttons.forEach((button) => {
			button.setAttribute("aria-selected", "false");
		});
	};

	const showNext = () => {
		currentIndex = (currentIndex + 1) % totalImages;
		updateImages();
	};

	const showPrev = () => {
		currentIndex = (currentIndex - 1 + totalImages) % totalImages;
		updateImages();
	};

	buttons.forEach((button, index) => {
		button.setAttribute("aria-label", `Image ${index + 1} of ${totalImages}`);
		button.setAttribute("aria-selected", "false");

		button.addEventListener("click", () => {
			currentIndex = index;
			openLightbox();
		});
	});

	next?.addEventListener("click", showNext);
	prev?.addEventListener("click", showPrev);
	closeLightbox?.addEventListener("click", closeDialog);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && dialog.open) {
			closeDialog();
		}
	});
}

initLightBox();
