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

async function initTransformData() {
	const data = await fetchDogBreeds();
	if (!data) return;

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
			// const encode = encodeURIComponent(items[0].toLowerCase());
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
}
initTransformData();
