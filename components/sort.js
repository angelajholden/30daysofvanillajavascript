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
			duration: item.duration,
			time: `${item.duration} min`,
			featured: item.is_featured,
		};
	});
	return mapped;
}

function initRenderMapUI(data) {
	console.log("Mapped: ", data);
	const root = document.querySelector(".transform_sort");
	if (!root) return;

	const cards = root.querySelector(".transformed_cards");
	const buttons = root.querySelectorAll(".button");

	function renderSortedResults(data) {
		// clear the articles before re-render
		cards.innerHTML = "";
		// render the articles
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
			cards.append(article);
		});
	}

	renderSortedResults(data);

	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			// re-render the sorted articles
			let sorted;
			if (btn.textContent === "A-Z") {
				sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
			} else if (btn.textContent === "Z-A") {
				sorted = [...data].sort((a, b) => b.title.localeCompare(a.title));
			} else if (btn.textContent === "Low to High") {
				sorted = [...data].sort((a, b) => Number(a.duration) - Number(b.duration));
			} else if (btn.textContent === "High to Low") {
				sorted = [...data].sort((a, b) => Number(b.duration) - Number(a.duration));
			}
			renderSortedResults(sorted);
		});
	});
}

async function init() {
	const data = await fetchSharedData();
	if (!data) return;

	const transformed = initTransformedData(data);
	initRenderMapUI(transformed);
}
init();
