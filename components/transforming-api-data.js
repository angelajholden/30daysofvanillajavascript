async function fetchDogBreeds() {
	try {
		const response = await fetch("../data/dog-breeds.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem: ", error);
	}
}

function initTransformData(data) {
	const breedKeysAndValues = Object.entries(data);
	const breedKeys = Object.keys(data);
	const firstLetter = breedKeys.map((letter) => letter[0]);
	const heading = firstLetter.filter((first, index) => firstLetter.indexOf(first) === index);
	heading.sort();

	const newBreedsArray = [];
	heading.forEach((letter) => {
		const newListObject = {
			heading: letter,
			list: [],
		};

		breedKeysAndValues.forEach((items) => {
			const keyLetter = items[0].charAt(0);
			const link = items[0].replaceAll(" ", "-").toLowerCase();

			const newBreedObject = {
				breed: items[0],
				count: items[1],
				url: link,
			};

			if (keyLetter === letter) {
				newListObject.list.push(newBreedObject);
			}
		});
		newBreedsArray.push(newListObject);
	});
	console.log(newBreedsArray);
	return newBreedsArray;
}

function initRenderUI(data) {
	const root = document.querySelector(".transformed_data");
	if (!root) return;

	const columns = document.createElement("div");
	columns.classList.add("columns_wrap");

	data.forEach((items) => {
		const article = document.createElement("article");
		article.classList.add("article");

		const h3 = document.createElement("h3");
		h3.classList.add("tertiary_heading");
		h3.textContent = items.heading;

		const ul = document.createElement("ul");
		ul.classList.add("list_items");

		const origin = window.location.origin;

		items.list.forEach((item) => {
			const li = document.createElement("li");
			const link = document.createElement("a");

			if (item.count > 0) {
				link.href = `${origin}/${item.url}`;
				link.textContent = item.breed;
				li.append(link);
			} else if (item.count === 0) {
				li.textContent = item.breed;
			}
			ul.append(li);
		});
		article.append(h3, ul);
		columns.append(article);
	});
	root.append(columns);
}

async function init() {
	const data = await fetchDogBreeds();
	if (!data) return;

	const transformed = initTransformData(data);
	initRenderUI(transformed);
}
init();
