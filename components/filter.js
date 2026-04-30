async function initFetchFilteredData() {
	try {
		const response = await fetch("../data/filterd-data.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem: ", error);
	}
}

function initRenderFilteredUI(data) {
	console.log("Original: ", data);
	const root = document.querySelector(".search_section");
	if (!root) return;

	const input = root.querySelector(".search_input");
	const clear = root.querySelector(".search_clear");
	const empty = root.querySelector(".search_empty");
	const cards = root.querySelector(".search_results");

	function renderFilteredResults(data) {
		// clear the articles before render
		cards.innerHTML = "";

		// render the articles
		data.forEach((item) => {
			// console.log(item);
			const article = document.createElement("article");
			article.classList.add("article");

			const h3 = document.createElement("h3");
			h3.classList.add("tertiary_heading");

			const role = document.createElement("p");
			const topic = document.createElement("p");
			const location = document.createElement("p");

			const featured = document.createElement("p");
			featured.classList.add("featured");

			h3.textContent = `${item.id}) ${item.name}`;
			role.textContent = `Role: ${item.role}`;
			topic.textContent = `Topic: ${item.topic}`;
			location.textContent = `Location: ${item.location}`;
			featured.textContent = "Featured";

			if (item.featured) {
				article.append(h3, role, topic, location, featured);
			} else {
				article.append(h3, role, topic, location);
			}
			cards.append(article);
		});
	}

	// all good so far!
	renderFilteredResults(data);

	let timer;
	input.addEventListener("input", (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const search = e.target.value.toLowerCase().trim();
			const matchedItems = data.filter((item) => {
				const match = item.name.toLowerCase().includes(search) || item.role.toLowerCase().includes(search) || item.topic.toLowerCase().includes(search);
				return match;
			});

			console.log("Filtered Data: ", matchedItems);
			renderFilteredResults(matchedItems);

			// i think this is fine...
			if (matchedItems.length === 0) {
				empty.hidden = false;
			} else {
				empty.hidden = true;
			}
		}, 500);
	});

	clear.addEventListener("click", () => {
		input.value = "";
		renderFilteredResults(data);
	});
}

async function init() {
	const data = await initFetchFilteredData();
	if (!data) return;

	initRenderFilteredUI(data);
}
init();
