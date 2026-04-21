function initLoadVideo() {
	const root = document.querySelector(".yt_video");
	if (!root) return;

	// if multiple videos per page
	// use querySelectorAll + forEach through the video containers
	const videoContainer = root.querySelector(".yt_video-container");

	// get the video id from the data-video attribute
	const videoId = root.dataset.video;

	// if no figcaption, just skip it
	const figCap = root.querySelector("figcaption");
	let figCapText;
	if (figCap) {
		figCapText = figCap.textContent;
	}

	// on page load, load the YouTube thumbnail
	// and replace the fallback image + alt text
	const thumb = root.querySelector(".yt_thumb");
	thumb.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	if (figCap) {
		thumb.alt = figCapText;
	} else {
		thumb.alt = "YouTube thumbnail image.";
	}

	// get the play button
	const playButton = root.querySelector(".play_button");
	// when clicking the play button...
	playButton.addEventListener("click", () => {
		// create the iframe + set attributes
		const iframe = document.createElement("iframe");
		iframe.classList.add("yt_iframe");
		iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
		if (figCap) {
			iframe.title = figCapText;
		} else {
			iframe.title = "YouTube video player";
		}
		iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.allowFullscreen = true;

		// append the iframe to the container
		videoContainer.append(iframe);
		// add class to thumbnail for transition
		thumb.classList.add("yt_fade");
		// remove play button immediately to prevent extra clicks
		playButton.remove();

		setTimeout(() => {
			// remove the thumbnail after 750ms
			thumb.remove();
		}, 750);
	});
}
initLoadVideo();
