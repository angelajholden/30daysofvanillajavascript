async function fetchData() {
	try {
		const response = await fetch("../data/projects.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem with the fetch: ", error);
	}
}

async function initFetchAndRender() {
	const data = await fetchData();
	if (!data) return;

	const root = document.querySelector(".fetch_render");
	if (!root) return;

	const grid = document.createElement("div");
	grid.classList.add("grid_articles");

	root.append(grid);

	data.forEach((item) => {
		console.log(item);
		const article = document.createElement("article");
		const figure = document.createElement("figure");
		const img = document.createElement("img");
		const h3 = document.createElement("h3");
		const p = document.createElement("p");
		const link = document.createElement("a");

		article.classList.add("article");
		figure.classList.add("figure");
		img.src = item.image;
		img.alt = item.title;
		h3.textContent = item.title;
		p.textContent = item.description;
		link.href = item.url;
		link.target = "_blank";
		link.textContent = "Read more...";

		figure.append(img);
		article.append(figure, h3, p, link);
		grid.append(article);
	});
}
initFetchAndRender();
