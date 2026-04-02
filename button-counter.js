const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
const reset = document.getElementById("reset");
const label = document.querySelector(".counter_label");
const counter = document.getElementById("counter-value");

let count = 0;
decrement.setAttribute("disabled", "");

function disabled() {
	if (count === 0) {
		decrement.setAttribute("disabled", "");
	} else {
		decrement.removeAttribute("disabled", "");
	}
}

function changeColor() {
	if (count === 0) {
		label.classList.remove("black");
	} else if (count === 5) {
		label.classList.add("black");
	} else if (count === 10) {
		label.classList.remove("black");
	} else if (count === 15) {
		label.classList.add("black");
	} else {
		label.classList.remove("black");
	}
}

// when you call count++ it adds 1. 1*5 = 5, then 5+1=6, and 6*5 = 30
// credit to CaffineCowboy666 in the chat

increment.addEventListener("click", () => {
	count = count + 5;
	counter.textContent = count;
	disabled();
	changeColor();
});

decrement.addEventListener("click", () => {
	if (count > 0) {
		count = count - 5;
		counter.textContent = count;
	}
	disabled();
	changeColor();
});

reset.addEventListener("click", () => {
	count = 0;
	counter.textContent = count;
	disabled();
	changeColor();
});
