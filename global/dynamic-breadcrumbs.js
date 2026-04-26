function initDynamicBreadcrumbs() {
	// stops this from rendering on the homepage
	const pathIndex = "/index.html";
	const pathSlash = "/";
	const pathname = window.location.pathname;
	if (pathIndex === pathname || pathSlash === pathname) return;

	const root = document.querySelector(".page_header");
	if (!root) return;

	const pathSplit = pathname.split("/");
	const filteredPath = pathSplit.filter((path) => path !== "" && path !== "index.html");

	const nav = document.createElement("nav");
	nav.classList.add("breadcrumbs");
	const ul = document.createElement("ul");
	ul.classList.add("bread_list");

	// static home breadcrumb
	const homeItem = document.createElement("li");
	const homeLink = document.createElement("a");
	homeLink.href = window.location.origin;
	homeLink.textContent = "Home";
	homeItem.append(homeLink);

	filteredPath.forEach((crumb, index) => {
		const crumbText = crumb.replaceAll("-", " ");

		const li = document.createElement("li");
		const link = document.createElement("a");

		// works for shallow paths
		link.href = `/${crumb}/`;
		link.textContent = crumbText;

		// get last item in array
		if (index === filteredPath.length - 1) {
			link.setAttribute("aria-current", "page");
		}

		li.append(link);
		ul.append(homeItem, li);
	});
	nav.append(ul);
	root.insertAdjacentElement("afterbegin", nav);
}
initDynamicBreadcrumbs();
