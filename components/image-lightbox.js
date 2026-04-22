function initLightBox() {
	const body = document.body;
	const root = document.querySelector(".lightbox_gallery-viewer");
	if (!root) return;

	const buttons = root.querySelectorAll(".lightbox_trigger");
	const dialog = root.querySelector(".lightbox_dialog");
	const closeLightbox = root.querySelector(".close_lightbox");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			body.classList.add("lightbox_open");
			button.setAttribute("aria-selected", "true");
			const img = button.querySelector(".gallery_img");

			const lightboxFigure = document.createElement("figure");
			lightboxFigure.classList.add("figure");

			const lightboxImage = document.createElement("img");
			lightboxImage.src = img.src;
			lightboxImage.alt = img.alt;

			lightboxFigure.append(lightboxImage);
			dialog.append(lightboxFigure);
			dialog.showModal();

			closeLightbox.addEventListener("click", () => {
				body.classList.remove("lightbox_open");
				lightboxFigure.remove();
				dialog.close();
				button.setAttribute("aria-selected", "false");
			});

			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					body.classList.remove("lightbox_open");
					lightboxFigure.remove();
					dialog.close();
					button.setAttribute("aria-selected", "false");
				}
			});
		});
	});
}
initLightBox();
