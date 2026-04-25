function initUrlQueryParams() {
	const root = document.querySelector(".query_params_form");
	if (!root) return;

	const clear = root.querySelector(".clear_filters");
	let timer;

	function updateUrl() {
		const url = new URL(window.location);
		const params = url.searchParams;

		const keyword = root.querySelector('input[name="keyword"]').value;
		const category = root.querySelector('select[name="category"]').value;
		const difficulty = root.querySelector('input[name="difficulty"]:checked')?.value || "";
		const featured = root.querySelector('input[name="featured"]:checked')?.value || "";

		clearTimeout(timer);
		timer = setTimeout(() => {
			if (keyword) {
				params.set("keyword", keyword);
			} else {
				params.delete("keyword");
			}

			if (category) {
				params.set("category", category);
			} else {
				params.delete("category");
			}

			if (difficulty) {
				params.set("difficulty", difficulty);
			} else {
				params.delete("difficulty");
			}

			if (featured) {
				params.set("featured", featured);
			} else {
				params.delete("featured");
			}

			history.replaceState(null, "", url);
		}, 500);
	}

	clear.addEventListener("click", () => {
		root.reset();
		updateUrl();
	});

	root.addEventListener("input", updateUrl);
	root.addEventListener("change", updateUrl);

	function hydrateForm() {
		const params = new URLSearchParams(window.location.search);
		const keyword = params.get("keyword") || "";
		const category = params.get("category") || "";
		const difficulty = params.get("difficulty");
		const featured = params.get("featured");

		root.querySelector('input[name="keyword"]').value = keyword;
		root.querySelector('select[name="category"]').value = category;

		if (difficulty) {
			const radio = root.querySelector(`input[name=difficulty][value=${difficulty}]`);
			if (radio) radio.checked = true;
		}

		if (featured) {
			const checkbox = root.querySelector(`input[name="featured"][value=${featured}]`);
			if (checkbox) checkbox.checked = true;
		}
	}
	hydrateForm();
}
initUrlQueryParams();
