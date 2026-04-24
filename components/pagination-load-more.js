async function fetchLoadPaginationData() {
	try {
		const response = await fetch("../data/load-more-pagination.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status:  ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem: ", error);
	}
}

let page = 0;
const itemsPerPage = 6;

function countAndSliceData(data, page) {
	let start = page * itemsPerPage;
	let end = start + itemsPerPage;

	let visible = data.slice(start, end);
	return visible;
}

function renderUI(data) {
	const root = document.querySelector(".pagination");
	if (!root) return;

	const items = root.querySelector(".items");
	items.textContent = "";

	const visible = countAndSliceData(data, page);
	visible.forEach((item) => {
		const article = document.createElement("article");
		article.classList.add("article");

		const figure = document.createElement("figure");
		figure.classList.add("figure");

		const img = document.createElement("img");
		const h4 = document.createElement("h4");
		const desc = document.createElement("p");
		const link = document.createElement("a");

		h4.textContent = `${item.id}. ${item.title}`;
		img.src = item.image;
		img.alt = item.title;
		desc.textContent = item.description;
		link.href = item.url;
		link.textContent = "Read more... ";

		figure.append(img);
		article.append(figure, h4, desc, link);
		items.append(article);
	});
}

async function init() {
	const data = await fetchLoadPaginationData();
	if (!data) return;

	/**
	 * @TODO
	 * You’ll also want to prevent page from going:
	 * below 0 and above the last page
	 * Otherwise your slice can go weird or empty.
	 */

	const prev = document.querySelector(".prev_button");
	prev.disabled = true;

	const next = document.querySelector(".next_button");
	next.disabled = false;

	const totalPages = Math.ceil(data.length / itemsPerPage);

	console.log({ totalPages });
	console.log({ page });

	prev.addEventListener("click", () => {
		if (page > 0) {
			page--;
			console.log({ page });
			renderUI(data);
			next.disabled = false;
		}
		if (page === 0) {
			prev.disabled = true;
		}
	});

	next.addEventListener("click", () => {
		if (page < totalPages - 1) {
			page++;
			console.log({ page });
			renderUI(data);
			prev.disabled = false;
		}
		if (page === totalPages - 1) {
			next.disabled = true;
		}
	});

	renderUI(data);
}
init();
