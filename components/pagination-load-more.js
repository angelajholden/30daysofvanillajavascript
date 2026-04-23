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
function countAndSliceData(data, page) {
	const itemsPerPage = 3;
	const total = data.length / itemsPerPage;
	const totalRounded = Math.ceil(total);

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
		const div = document.createElement("div");
		const h4 = document.createElement("h4");
		const figure = document.createElement("figure");
		const img = document.createElement("img");
		const desc = document.createElement("p");
		const link = document.createElement("a");

		h4.textContent = `${item.id}: ${item.title}`;
		img.src = item.image;
		img.alt = item.title;
		desc.textContent = item.description;
		link.href = item.url;
		link.textContent = "Read more... ";

		figure.append(img);
		div.append(h4, figure, desc, link);
		items.append(div);
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
	const next = document.querySelector(".next_button");

	prev.addEventListener("click", () => {
		page--;
		renderUI(data);
	});

	next.addEventListener("click", () => {
		page++;
		renderUI(data);
	});

	renderUI(data);
}
init();
