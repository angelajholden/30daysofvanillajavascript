async function fetchSharedData() {
	try {
		const response = await fetch("../data/shared-map-sort.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem: ", error);
	}
}

function initTransformedData(data) {
	console.log("Original: ", data);

	const labels = {
		javascript: "JavaScript",
		css: "CSS",
		html: "HTML",
	};

	const mapped = data.map((item) => {
		return {
			id: item.id,
			title: item.title.replaceAll("-", " "),
			category: labels[item.category] || item.category,
			difficulty: item.difficulty,
			time: `${item.duration} min`,
			featured: item.is_featured,
		};
	});
	return mapped;
}

function initRenderMapUI(data) {
	console.log("Mapped: ", data);
	/**
 * <article class="article">
		<h3 class="tertiary_heading">1. Modal Dialog</h3>
		<p>Category: </p>
		<p>Difficulty: </p>
		<p>Duration: </p>
		<p>Featured</p>
	</article>
	*/
	const root = document.querySelector(".transformed_cards");
	if (!root) return;

	data.forEach((item) => {
		const article = document.createElement("article");
		article.classList.add("article");
		const h3 = document.createElement("h3");
		h3.classList.add("tertiary_heading");
		const category = document.createElement("p");
		const difficulty = document.createElement("p");
		const duration = document.createElement("p");
		const featured = document.createElement("p");
		featured.classList.add("featured");

		h3.textContent = `${item.id}) ${item.title}`;
		category.textContent = `Category: ${item.category}`;
		difficulty.textContent = `Difficulty: ${item.difficulty}`;
		duration.textContent = `Duration: ${item.time}`;
		featured.textContent = "Featured";

		if (item.featured) {
			article.append(h3, category, difficulty, duration, featured);
		} else {
			article.append(h3, category, difficulty, duration);
		}
		root.append(article);
	});
}

async function init() {
	const data = await fetchSharedData();
	if (!data) return;

	const transformed = initTransformedData(data);
	initRenderMapUI(transformed);
}
init();
