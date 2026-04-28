function initCreateCookie(name, value, hours) {
	let expires = "";
	if (hours) {
		const date = new Date();
		date.setTime(date.getTime() + hours * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	const isSecure = location.protocol === "https:";
	const secureFlag = isSecure ? "; Secure" : "";
	document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax${secureFlag}`;
}

function initReadCookie(name) {
	const cookies = document.cookie.split(";");
	for (let cookie of cookies) {
		const [key, ...rest] = cookie.trim().split("=");
		const value = rest.join("=");
		if (key === name) return value;
	}
	return false;
}

function initCookieConsent() {
	// check to see if cookie is present + allows tracking
	const consent = initReadCookie("cookieConsent");
	if (consent === "Accept") {
		// load your tracking script here
		return;
	}
	if (consent === "Reject") return;

	const header = document.querySelector(".header");
	if (!header) return;

	// create the banner div
	const banner = document.createElement("div");
	banner.role = "Region";
	banner.setAttribute("aria-label", "Cookie Consent");
	banner.classList.add("consent_banner");

	// create all the things
	const wrap = document.createElement("div");
	wrap.classList.add("wrap");

	const link = document.createElement("a");
	link.href = `${window.location.origin}/privacy-policy/`;
	link.textContent = "Privacy Policy";

	const buttons = document.createElement("div");
	buttons.classList.add("consent_button-wrap");

	const p = document.createElement("p");
	p.append("We use cookies to improve your experience, analyze site usage, and support essential functionality. You can choose to accept or reject non-essential cookies. For more details, please review our ", link, ".");

	const btns = ["Accept", "Reject"];
	btns.forEach((btn) => {
		const button = document.createElement("button");
		button.type = "button";
		button.classList.add("button");
		button.textContent = `${btn} All`;
		buttons.append(button);

		button.addEventListener("click", () => {
			// set cookie for 30 days = 720 hours
			initCreateCookie("cookieConsent", btn, 720);
			banner.remove();
			if (btn === "Accept") {
				// load tracking script here
			}
		});
	});

	banner.append(wrap);
	wrap.append(p, buttons);
	header.insertAdjacentElement("beforebegin", banner);
}
initCookieConsent();
