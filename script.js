const body = document.body;
const open = document.querySelector(".menu_open");

function initDynamicBreadcrumbs() {
	// stops this from working on the homepage
	const pathIndex = "/index.html";
	const pathSlash = "/";
	const pathname = window.location.pathname;
	if (pathIndex === pathname || pathSlash === pathname) return;

	const root = document.querySelector(".page_header");
	if (!root) return;

	const pathSplit = pathname.split("/");
	const filteredPath = pathSplit.filter((path) => path !== "" && path !== "index.html");

	const nav = document.createElement("nav");
	nav.classList.add("breadcrumbs");
	const ul = document.createElement("ul");
	ul.classList.add("bread_list");

	// static home breadcrumb
	const homeItem = document.createElement("li");
	const homeLink = document.createElement("a");
	homeLink.href = window.location.origin;
	homeLink.textContent = "Home";
	homeItem.append(homeLink);

	filteredPath.forEach((crumb, index) => {
		const crumbText = crumb.replaceAll("-", " ");

		const li = document.createElement("li");
		const link = document.createElement("a");

		// works for shallow paths
		link.href = `/${crumb}/`;
		link.textContent = crumbText;

		// get last item in array
		if (index === filteredPath.length - 1) {
			link.setAttribute("aria-current", "page");
		}

		li.append(link);
		ul.append(homeItem, li);
	});
	nav.append(ul);
	root.insertAdjacentElement("afterbegin", nav);
}

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
		const [key, value] = cookie.trim().split("=");
		if (key === name) return value;
	}
	return false;
}

function initConsentBanner() {
	const header = document.querySelector(".header");
	if (!header) return;

	// create the banner div
	const banner = document.createElement("div");

	// check to see if cookie is present + allows tracking
	const consent = initReadCookie("cookieConsent");
	if (consent === "accept") {
		banner.setAttribute("hidden", "");
		// load your tracking script here
	}

	// create all the things
	const wrap = document.createElement("div");
	const p = document.createElement("p");
	const link = document.createElement("a");
	const accept = document.createElement("button");
	const reject = document.createElement("button");

	banner.setAttribute("role", "region");
	banner.setAttribute("aria-label", "Cookie consent");
	banner.classList.add("consent_banner");
	wrap.classList.add("wrap");
	link.href = `${window.location.origin}/privacy-policy/`;
	link.textContent = "Privacy Policy";
	p.append("We use cookies to improve your experience, analyze site usage, and support essential functionality. You can choose to accept or reject non-essential cookies. For more details, please review our ", link, ".");

	accept.setAttribute("type", "button");
	accept.classList.add("button");
	accept.classList.add("accept_button");
	accept.textContent = "Accept All";

	reject.setAttribute("type", "button");
	reject.classList.add("button");
	reject.classList.add("reject_button");
	reject.textContent = "Reject All";

	banner.append(wrap);
	wrap.append(p, accept, " ", reject);

	header.insertAdjacentElement("beforebegin", banner);

	accept.addEventListener("click", () => {
		// set cookie for 7 days = 168 hours
		initCreateCookie("cookieConsent", "accept", 168);
		banner.setAttribute("hidden", "");
		// load your tracking script here
	});

	reject.addEventListener("click", () => {
		// set cookie for 7 days = 168 hours
		initCreateCookie("cookieConsent", "reject", 168);
		banner.setAttribute("hidden", "");
		// do not load your tracking script when rejected
	});
}

function initNavSeaech() {
	const root = document.querySelector(".navigation");
	let input = root.querySelector("#filter-navigation");
	if (!root || !input) return;
	const reset = root.querySelector("#reset-button");
	const items = root.querySelectorAll(".main_nav li");
	const empty = root.querySelector(".empty_state");

	input.addEventListener("input", (e) => {
		// get text from input
		let text = e.target.value;
		text = text.toLowerCase().trim();
		const matchedNavItems = Array.from(items).filter((item) => {
			const match = item.textContent.toLowerCase().includes(text);
			// hide list items if not matched
			if (!match) {
				item.setAttribute("hidden", "");
			} else {
				item.removeAttribute("hidden", "");
			}
			// reset the input and show the list items
			reset.addEventListener("click", () => {
				input.value = "";
				item.removeAttribute("hidden", "");
				empty.setAttribute("hidden", "");
			});
			return match;
		});
		// show empty message if no matches
		if (matchedNavItems.length === 0) {
			empty.removeAttribute("hidden", "");
		} else {
			empty.setAttribute("hidden", "");
		}
	});
}

function menuToggle() {
	const buttons = document.querySelectorAll(".menu_button");
	if (!open) return;
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const isActive = body.classList.toggle("menu_active");
			if (isActive) {
				open.setAttribute("aria-expanded", "true");
			} else {
				open.setAttribute("aria-expanded", "false");
			}
		});
	});
}

function escapeToggle() {
	if (!open) return;
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			open.setAttribute("aria-expanded", "false");
		}
	});
}

function initSocialSharing() {
	// create elements
	const about = document.querySelector(".about_me");
	const root = document.createElement("section");
	if (!about || !root) return;

	// add classes
	root.classList.add("section");
	root.classList.add("social_sharing");

	// add the header
	const h2 = document.createElement("h2");
	h2.classList.add("secondary_heading");
	h2.textContent = "Share This Page";

	// get the url and title of the page
	const URL = window.location.href;
	const title = document.querySelector(".page_title").textContent;

	// get the image url from the open graph meta tag
	const imgMeta = document.querySelector('meta[property="og:image"]');
	const image = imgMeta ? imgMeta.getAttribute("content") : null;

	// create an unordered list
	const ul = document.createElement("ul");
	ul.classList.add("sharing_list");

	// the loop
	const socials = ["facebook", "x", "pinterest", "linkedin", "email"];
	socials.forEach((social) => {
		const li = document.createElement("li");
		const link = document.createElement("a");
		const span = document.createElement("span");

		if (social === "facebook") {
			span.textContent = "Share on Facebook";
			link.href = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${URL}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fill-rule="evenodd"/></svg> Share';
		} else if (social === "x") {
			span.textContent = "Share on X";
			link.href = encodeURI(`https://twitter.com/intent/tweet?text=${title} ${URL}`);
			link.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" aria-hidden="true"><g><path stroke="none" d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg> Post';
		} else if (social === "pinterest") {
			span.textContent = "Share on Pinterest";
			link.href = encodeURI(`https://www.pinterest.com/pin/create/button/?url=${URL}&media=${image}&description=${title}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4 4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5-1.1 4.1-3.5 14-4.6 18-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9 0 0-13 51.6-15.8 61.6-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0063.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z"/></svg> Pin';
		} else if (social === "linkedin") {
			span.textContent = "Share on LinkedIn";
			link.href = encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=${URL}`);
			link.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"/></svg> Link';
		} else if (social === "email") {
			span.textContent = "Email a Friend";
			link.href = encodeURI(`mailto:?subject=${title}&body=${title} ${URL}`);
			link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 160l144 112 144-112"/></svg> Email';
		}

		// set some attributes and classes
		link.setAttribute("target", "_blank");
		link.classList.add("social_icon");
		span.classList.add("sr-only");

		// append the elements
		ul.append(li);
		li.append(link);
		link.append(span);
	});

	// insert the stuff
	root.append(h2, ul);
	about.insertAdjacentElement("beforebegin", root);
}

function copyright() {
	const year = document.getElementById("year");
	if (!year) return;
	const date = new Date().getFullYear();
	year.textContent = date;
}

document.addEventListener("DOMContentLoaded", () => {
	initConsentBanner();
	initNavSeaech();
	menuToggle();
	escapeToggle();
	initDynamicBreadcrumbs();
	initSocialSharing();
	copyright();
});

/*
 * PrismJS 1.30.0
 * https://prismjs.com/download#themes=prism&languages=markup+css+clike+javascript
 */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = (function (e) {
		var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
			t = 0,
			r = {},
			a = {
				manual: e.Prism && e.Prism.manual,
				disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
				util: {
					encode: function e(n) {
						return n instanceof i
							? new i(n.type, e(n.content), n.alias)
							: Array.isArray(n)
								? n.map(e)
								: n
										.replace(/&/g, "&amp;")
										.replace(/</g, "&lt;")
										.replace(/\u00a0/g, " ");
					},
					type: function (e) {
						return Object.prototype.toString.call(e).slice(8, -1);
					},
					objId: function (e) {
						return (e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id);
					},
					clone: function e(n, t) {
						var r, i;
						switch (((t = t || {}), a.util.type(n))) {
							case "Object":
								if (((i = a.util.objId(n)), t[i])) return t[i];
								for (var l in ((r = {}), (t[i] = r), n)) n.hasOwnProperty(l) && (r[l] = e(n[l], t));
								return r;
							case "Array":
								return (
									(i = a.util.objId(n)),
									t[i]
										? t[i]
										: ((r = []),
											(t[i] = r),
											n.forEach(function (n, a) {
												r[a] = e(n, t);
											}),
											r)
								);
							default:
								return n;
						}
					},
					getLanguage: function (e) {
						for (; e; ) {
							var t = n.exec(e.className);
							if (t) return t[1].toLowerCase();
							e = e.parentElement;
						}
						return "none";
					},
					setLanguage: function (e, t) {
						((e.className = e.className.replace(RegExp(n, "gi"), "")), e.classList.add("language-" + t));
					},
					currentScript: function () {
						if ("undefined" == typeof document) return null;
						if (document.currentScript && "SCRIPT" === document.currentScript.tagName) return document.currentScript;
						try {
							throw new Error();
						} catch (r) {
							var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
							if (e) {
								var n = document.getElementsByTagName("script");
								for (var t in n) if (n[t].src == e) return n[t];
							}
							return null;
						}
					},
					isActive: function (e, n, t) {
						for (var r = "no-" + n; e; ) {
							var a = e.classList;
							if (a.contains(n)) return !0;
							if (a.contains(r)) return !1;
							e = e.parentElement;
						}
						return !!t;
					},
				},
				languages: {
					plain: r,
					plaintext: r,
					text: r,
					txt: r,
					extend: function (e, n) {
						var t = a.util.clone(a.languages[e]);
						for (var r in n) t[r] = n[r];
						return t;
					},
					insertBefore: function (e, n, t, r) {
						var i = (r = r || a.languages)[e],
							l = {};
						for (var o in i)
							if (i.hasOwnProperty(o)) {
								if (o == n) for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
								t.hasOwnProperty(o) || (l[o] = i[o]);
							}
						var u = r[e];
						return (
							(r[e] = l),
							a.languages.DFS(a.languages, function (n, t) {
								t === u && n != e && (this[n] = l);
							}),
							l
						);
					},
					DFS: function e(n, t, r, i) {
						i = i || {};
						var l = a.util.objId;
						for (var o in n)
							if (n.hasOwnProperty(o)) {
								t.call(n, o, n[o], r || o);
								var s = n[o],
									u = a.util.type(s);
								"Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i)) : ((i[l(s)] = !0), e(s, t, null, i));
							}
					},
				},
				plugins: {},
				highlightAll: function (e, n) {
					a.highlightAllUnder(document, e, n);
				},
				highlightAllUnder: function (e, n, t) {
					var r = { callback: t, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
					(a.hooks.run("before-highlightall", r), (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))), a.hooks.run("before-all-elements-highlight", r));
					for (var i, l = 0; (i = r.elements[l++]); ) a.highlightElement(i, !0 === n, r.callback);
				},
				highlightElement: function (n, t, r) {
					var i = a.util.getLanguage(n),
						l = a.languages[i];
					a.util.setLanguage(n, i);
					var o = n.parentElement;
					o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
					var s = { element: n, language: i, grammar: l, code: n.textContent };
					function u(e) {
						((s.highlightedCode = e), a.hooks.run("before-insert", s), (s.element.innerHTML = s.highlightedCode), a.hooks.run("after-highlight", s), a.hooks.run("complete", s), r && r.call(s.element));
					}
					if ((a.hooks.run("before-sanity-check", s), (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"), !s.code)) return (a.hooks.run("complete", s), void (r && r.call(s.element)));
					if ((a.hooks.run("before-highlight", s), s.grammar))
						if (t && e.Worker) {
							var c = new Worker(a.filename);
							((c.onmessage = function (e) {
								u(e.data);
							}),
								c.postMessage(JSON.stringify({ language: s.language, code: s.code, immediateClose: !0 })));
						} else u(a.highlight(s.code, s.grammar, s.language));
					else u(a.util.encode(s.code));
				},
				highlight: function (e, n, t) {
					var r = { code: e, grammar: n, language: t };
					if ((a.hooks.run("before-tokenize", r), !r.grammar)) throw new Error('The language "' + r.language + '" has no grammar.');
					return ((r.tokens = a.tokenize(r.code, r.grammar)), a.hooks.run("after-tokenize", r), i.stringify(a.util.encode(r.tokens), r.language));
				},
				tokenize: function (e, n) {
					var t = n.rest;
					if (t) {
						for (var r in t) n[r] = t[r];
						delete n.rest;
					}
					var a = new s();
					return (
						u(a, a.head, e),
						o(e, a, n, a.head, 0),
						(function (e) {
							for (var n = [], t = e.head.next; t !== e.tail; ) (n.push(t.value), (t = t.next));
							return n;
						})(a)
					);
				},
				hooks: {
					all: {},
					add: function (e, n) {
						var t = a.hooks.all;
						((t[e] = t[e] || []), t[e].push(n));
					},
					run: function (e, n) {
						var t = a.hooks.all[e];
						if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n);
					},
				},
				Token: i,
			};
		function i(e, n, t, r) {
			((this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || "").length));
		}
		function l(e, n, t, r) {
			e.lastIndex = n;
			var a = e.exec(t);
			if (a && r && a[1]) {
				var i = a[1].length;
				((a.index += i), (a[0] = a[0].slice(i)));
			}
			return a;
		}
		function o(e, n, t, r, s, g) {
			for (var f in t)
				if (t.hasOwnProperty(f) && t[f]) {
					var h = t[f];
					h = Array.isArray(h) ? h : [h];
					for (var d = 0; d < h.length; ++d) {
						if (g && g.cause == f + "," + d) return;
						var v = h[d],
							p = v.inside,
							m = !!v.lookbehind,
							y = !!v.greedy,
							k = v.alias;
						if (y && !v.pattern.global) {
							var x = v.pattern.toString().match(/[imsuy]*$/)[0];
							v.pattern = RegExp(v.pattern.source, x + "g");
						}
						for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) {
							var P = w.value;
							if (n.length > e.length) return;
							if (!(P instanceof i)) {
								var E,
									S = 1;
								if (y) {
									if (!(E = l(b, A, e, m)) || E.index >= e.length) break;
									var L = E.index,
										O = E.index + E[0].length,
										C = A;
									for (C += w.value.length; L >= C; ) C += (w = w.next).value.length;
									if (((A = C -= w.value.length), w.value instanceof i)) continue;
									for (var j = w; j !== n.tail && (C < O || "string" == typeof j.value); j = j.next) (S++, (C += j.value.length));
									(S--, (P = e.slice(A, C)), (E.index -= A));
								} else if (!(E = l(b, 0, P, m))) continue;
								L = E.index;
								var N = E[0],
									_ = P.slice(0, L),
									M = P.slice(L + N.length),
									W = A + P.length;
								g && W > g.reach && (g.reach = W);
								var I = w.prev;
								if ((_ && ((I = u(n, I, _)), (A += _.length)), c(n, I, S), (w = u(n, I, new i(f, p ? a.tokenize(N, p) : N, k, N))), M && u(n, w, M), S > 1)) {
									var T = { cause: f + "," + d, reach: W };
									(o(e, n, t, w.prev, A, T), g && T.reach > g.reach && (g.reach = T.reach));
								}
							}
						}
					}
				}
		}
		function s() {
			var e = { value: null, prev: null, next: null },
				n = { value: null, prev: e, next: null };
			((e.next = n), (this.head = e), (this.tail = n), (this.length = 0));
		}
		function u(e, n, t) {
			var r = n.next,
				a = { value: t, prev: n, next: r };
			return ((n.next = a), (r.prev = a), e.length++, a);
		}
		function c(e, n, t) {
			for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
			((n.next = r), (r.prev = n), (e.length -= a));
		}
		if (
			((e.Prism = a),
			(i.stringify = function e(n, t) {
				if ("string" == typeof n) return n;
				if (Array.isArray(n)) {
					var r = "";
					return (
						n.forEach(function (n) {
							r += e(n, t);
						}),
						r
					);
				}
				var i = { type: n.type, content: e(n.content, t), tag: "span", classes: ["token", n.type], attributes: {}, language: t },
					l = n.alias;
				(l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run("wrap", i));
				var o = "";
				for (var s in i.attributes) o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
				return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">";
			}),
			!e.document)
		)
			return e.addEventListener
				? (a.disableWorkerMessageHandler ||
						e.addEventListener(
							"message",
							function (n) {
								var t = JSON.parse(n.data),
									r = t.language,
									i = t.code,
									l = t.immediateClose;
								(e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close());
							},
							!1,
						),
					a)
				: a;
		var g = a.util.currentScript();
		function f() {
			a.manual || a.highlightAll();
		}
		if ((g && ((a.filename = g.src), g.hasAttribute("data-manual") && (a.manual = !0)), !a.manual)) {
			var h = document.readyState;
			"loading" === h || ("interactive" === h && g && g.defer) ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
		}
		return a;
	})(_self);
("undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism));
((Prism.languages.markup = {
	comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
	prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
	doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } },
	cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: !0,
		inside: {
			tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
			"special-attr": [],
			"attr-value": {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					punctuation: [
						{ pattern: /^=/, alias: "attr-equals" },
						{ pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
					],
				},
			},
			punctuation: /\/?>/,
			"attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
		},
	},
	entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i],
}),
	(Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity),
	(Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup),
	Prism.hooks.add("wrap", function (a) {
		"entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
	}),
	Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
		value: function (a, e) {
			var s = {};
			((s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }), (s.cdata = /^<!\[CDATA\[|\]\]>$/i));
			var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
			t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
			var n = {};
			((n[a] = {
				pattern: RegExp(
					"(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
						return a;
					}),
					"i",
				),
				lookbehind: !0,
				greedy: !0,
				inside: t,
			}),
				Prism.languages.insertBefore("markup", "cdata", n));
		},
	}),
	Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
		value: function (a, e) {
			Prism.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"), lookbehind: !0, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: Prism.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } });
		},
	}),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup),
	(Prism.languages.xml = Prism.languages.extend("markup", {})),
	(Prism.languages.ssml = Prism.languages.xml),
	(Prism.languages.atom = Prism.languages.xml),
	(Prism.languages.rss = Prism.languages.xml));
!(function (s) {
	var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	((s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), lookbehind: !0 }, string: { pattern: e, greedy: !0 }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 }, punctuation: /[(){};:,]/ }), (s.languages.css.atrule.inside.rest = s.languages.css));
	var t = s.languages.markup;
	t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
	],
	string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
	"class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
	keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	boolean: /\b(?:false|true)\b/,
	function: /\b\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/,
};
((Prism.languages.javascript = Prism.languages.extend("clike", {
	"class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }],
	keyword: [
		{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
		{ pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 },
	],
	function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: !0 },
	operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
	(Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
	Prism.languages.insertBefore("javascript", "keyword", {
		regex: { pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"), lookbehind: !0, greedy: !0, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } },
		"function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" },
		parameter: [
			{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript },
			{ pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: Prism.languages.javascript },
			{ pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
			{ pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: Prism.languages.javascript },
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
	}),
	Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: "property" } }),
	Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: "property" } }),
	Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")),
	(Prism.languages.js = Prism.languages.javascript));
