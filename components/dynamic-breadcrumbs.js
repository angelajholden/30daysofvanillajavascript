function initDynamicBreadcrumbs() {
	// stops this from working on the homepage
	const pathIndex = "/index.html";
	const pathSlash = "/";
	const pathname = window.location.pathname;
	if (pathIndex === pathname || pathSlash === pathname) return;

	const root = document.querySelector(".page_header");
	if (!root) return;

	const pathSplit = pathname.split("/");

	let filteredPath = pathSplit.filter((path) => path !== "" && path !== "index.html");

	// ​​this is a visualization from nanoaquila :)

	// (path) => path !== "something"

	// function
	// functionName(path) {
	// 		return path !== "something";
	// }

	const nav = document.createElement("nav");
	nav.classList.add("breadcrumbs");
	const ul = document.createElement("ul");
	ul.classList.add("bread_list");

	filteredPath.forEach((crumb) => {
		const crumbText = crumb.replaceAll("-", " ");
		const homeItem = document.createElement("li");
		const homeLink = document.createElement("a");

		homeLink.href = origin;
		homeLink.textContent = "Home";
		homeItem.append(homeLink);

		const li = document.createElement("li");
		const link = document.createElement("a");

		link.href = `/${crumb}/`;
		link.textContent = crumbText;

		li.append(link);
		ul.append(homeItem, li);
	});
	nav.append(ul);
	root.insertAdjacentElement("afterbegin", nav);
}
initDynamicBreadcrumbs();
