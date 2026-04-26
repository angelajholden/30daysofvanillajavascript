function initSocialSharing() {
	// create elements
	const about = document.querySelector(".about_me");
	const root = document.createElement("section");
	if (!about || !root) return;

	// add classes
	root.classList.add("section");
	root.classList.add("social_sharing");

	// add the header
	const h2 = document.createElement("h2");
	h2.classList.add("secondary_heading");
	h2.textContent = "Share This Page";

	// get the url and title of the page
	const URL = window.location.href;
	const title = document.querySelector(".page_title").textContent;

	// get the image url from the open graph meta tag
	const imgMeta = document.querySelector('meta[property="og:image"]');
	const image = imgMeta ? imgMeta.getAttribute("content") : null;

	// create an unordered list
	const ul = document.createElement("ul");
	ul.classList.add("sharing_list");

	// the loop
	const socials = ["facebook", "x", "pinterest", "linkedin", "email"];
	socials.forEach((social) => {
		const li = document.createElement("li");
		const link = document.createElement("a");
		const span = document.createElement("span");

		if (social === "facebook") {
			span.textContent = "Share on Facebook";
			link.href = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${URL}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fill-rule="evenodd"/></svg> Share';
		} else if (social === "x") {
			span.textContent = "Share on X";
			link.href = encodeURI(`https://twitter.com/intent/tweet?text=${title} ${URL}`);
			link.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" aria-hidden="true"><g><path stroke="none" d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg> Post';
		} else if (social === "pinterest") {
			span.textContent = "Share on Pinterest";
			link.href = encodeURI(`https://www.pinterest.com/pin/create/button/?url=${URL}&media=${image}&description=${title}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4 4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5-1.1 4.1-3.5 14-4.6 18-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9 0 0-13 51.6-15.8 61.6-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0063.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z"/></svg> Pin';
		} else if (social === "linkedin") {
			span.textContent = "Share on LinkedIn";
			link.href = encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=${URL}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"/></svg> Link';
		} else if (social === "email") {
			span.textContent = "Email a Friend";
			link.href = encodeURI(`mailto:?subject=${title}&body=${title} ${URL}`);
			link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 160l144 112 144-112"/></svg> Email';
		}

		// set some attributes and classes
		link.setAttribute("target", "_blank");
		link.classList.add("social_icon");
		span.classList.add("sr-only");

		// append the elements
		ul.append(li);
		li.append(link);
		link.append(span);
	});

	// insert the stuff
	root.append(h2, ul);
	about.insertAdjacentElement("beforebegin", root);
}
initSocialSharing();
