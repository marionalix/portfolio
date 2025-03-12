// === CONST & SÉLECTEURS ===
const dockIcons = document.querySelectorAll('.dock-icon');
const windows = document.querySelectorAll('.window');

const mailWindow = document.getElementById('mail-window');
const closeMailBtn = document.getElementById('close-mail');
const maximizeMailBtn = document.getElementById('maximize-mail');
const minimizeMailBtn = document.getElementById('minimize-mail');
const sendMailBtn = document.getElementById('send-mail');
const menuTitle = document.getElementById('menu-title');
const contactForm = document.getElementById('contact-form');

const safariWindow = document.getElementById('safari-window');
const closeSafariBtn = document.getElementById('close-safari');
const maximizeSafariBtn = document.getElementById('maximize-safari');
const minimizeSafariBtn = document.getElementById('minimize-safari');

const mapsWindow = document.getElementById('maps-window');
const closeMapsBtn = document.getElementById('close-maps');
const maximizeMapsBtn = document.getElementById('maximize-maps');
const minimizeMapsBtn = document.getElementById('minimize-maps');

const pagesWindow = document.getElementById('pages-window');
const closePagesBtn = document.getElementById('close-pages');
const maximizePagesBtn = document.getElementById('maximize-pages');
const minimizePagesBtn = document.getElementById('minimize-pages');

document.addEventListener('DOMContentLoaded', () => {
	
	makeDraggable(mailWindow);
	makeDraggable(safariWindow);
	makeDraggable(mapsWindow);
	makeDraggable(pagesWindow);

	// === GESTION DU DOCK ===
	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			if (app === 'mail') openWindow(mailWindow, 'Mail', icon);
			else if (app === 'safari') openWindow(safariWindow, 'Safari', icon);
			else if (app === 'maps') openWindow(mapsWindow, 'Maps', icon);
			else if (app === 'pages') openWindow(pagesWindow, 'Pages', icon);
		});
	});

	// === GESTION FENÊTRES (FERMER | MAXIMISER | MINIMISER) ===
	closeMailBtn.addEventListener('click', () => closeWindow(mailWindow, 'mail', true));
	closeSafariBtn.addEventListener('click', () => closeWindow(safariWindow, 'safari', true));
	closeMapsBtn.addEventListener('click', () => closeWindow(mapsWindow, 'maps', true));
	closePagesBtn.addEventListener('click', () => closeWindow(pagesWindow, 'pages', true));

	maximizeMailBtn.addEventListener('click', () => toggleMaximize(mailWindow));
	maximizeSafariBtn.addEventListener('click', () => toggleMaximize(safariWindow));
	maximizeMapsBtn.addEventListener('click', () => toggleMaximize(mapsWindow));
	maximizePagesBtn.addEventListener('click', () => toggleMaximize(pagesWindow));

	minimizeMailBtn.addEventListener('click', () => minimizeWindow(mailWindow));
	minimizeSafariBtn.addEventListener('click', () => minimizeWindow(safariWindow));
	minimizeMapsBtn.addEventListener('click', () => minimizeWindow(mapsWindow));
	minimizePagesBtn.addEventListener('click', () => minimizeWindow(pagesWindow));

	// === GESTION FORMULAIRE MAIL ===
	sendMailBtn.addEventListener('click', () => {
		if (contactForm.checkValidity()) {
			alert("✅ Votre message a été envoyé avec succès !");
			contactForm.reset();
		} else {
			alert("⚠️ Veuillez remplir tous les champs requis.");
		}
	});

	// === HORLOGE ===
	function updateClock() {
		const clockElement = document.getElementById('clock');
		const now = new Date();
		const date = now.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
		const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		clockElement.textContent = `${date} ${time}`;
	}
	setInterval(updateClock, 1000);
	updateClock();

	// === FONCTIONS UTILITAIRES ===
	function openWindow(windowEl, title, icon) {
		windowEl.classList.remove('hidden', 'minimized');
		menuTitle.textContent = title;
		updateDockFocus(icon, windowEl);
	}

	function closeWindow(windowEl, appName, resetForm = false) {
		if (resetForm) contactForm.reset();
		windowEl.classList.add('hidden');
		windowEl.classList.remove('maximized', 'minimized');
		menuTitle.textContent = 'Portfolio';
		removeDockFocus(appName);
	}

	function toggleMaximize(windowEl) {
		windowEl.classList.toggle('maximized');
	}

	function minimizeWindow(windowEl) {
		windowEl.classList.add('minimized');
	}

	function updateDockFocus(activeIcon, activeWindow) {
		dockIcons.forEach(icon => icon.classList.remove('active'));
		activeIcon.classList.add('active');
		windows.forEach(win => win.classList.remove('active'));
		activeWindow.classList.add('active');
	}

	function removeDockFocus(appName) {
		const appIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
		if (appIcon) appIcon.classList.remove('active');
	}
});

// === ANIMATION DOCK (REBOND) ===
document.querySelectorAll('.dock-icon').forEach(icon => {
	icon.addEventListener('click', () => {
		icon.classList.add('bouncing');
		setTimeout(() => icon.classList.remove('bouncing'), 600);
	});
});

// === DRAGGABLE WINDOWS ===
function makeDraggable(elmnt) {
	const header = elmnt.querySelector('.window-header');
	let offsetX = 0, offsetY = 0;

	header.onmousedown = (e) => {
		e.preventDefault();
		offsetX = e.clientX - elmnt.offsetLeft;
		offsetY = e.clientY - elmnt.offsetTop;

		document.onmousemove = (e) => {
			if (!elmnt.classList.contains('maximized')) {
				elmnt.style.left = `${e.clientX - offsetX}px`;
				elmnt.style.top = `${e.clientY - offsetY}px`;
			}
		};

		document.onmouseup = () => document.onmousemove = null;
	};
}

// Donne le focus à la fenêtre cliquée + MAJ du menu & dock
document.querySelectorAll('.window').forEach(windowEl => {
	windowEl.addEventListener('mousedown', function() {
		// Retire le focus des autres fenêtres
		windows.forEach(w => w.classList.remove('active'));
		this.classList.add('active');

		// MAJ du titre dans la barre de menu
		if (this.id === 'mail-window') menuTitle.textContent = 'Mail';
		else if (this.id === 'safari-window') menuTitle.textContent = 'Safari';
		else if (this.id === 'pages-window') menuTitle.textContent = 'Pages';

		// MAJ de l'icône active dans le dock
		dockIcons.forEach(icon => icon.classList.remove('active'));
		const appName = this.id.split('-')[0]; // Ex : 'mail' de 'mail-window'
		const activeIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
		if (activeIcon) activeIcon.classList.add('active');
	});
});

document.getElementById("linkedin-icon").addEventListener("click", function() {
  window.open("https://www.linkedin.com/in/alix-marion-41b3a9157/", "_blank");
});

document.getElementById("send-mail").addEventListener("click", async function () {
	const form = document.getElementById("contact-form");
	const formData = new FormData(form);

	if (!form.checkValidity()) {
		alert("⚠️ Veuillez remplir tous les champs requis.");
		return;
	}

	try {
		const response = await fetch(form.action, {
			method: form.method,
			body: formData,
			headers: { 'Accept': 'application/json' }
		});

		if (response.ok) {
			alert("✅ Votre message a été envoyé avec succès !");
			form.reset();
		} else {
			alert("⚠️ Une erreur s'est produite, veuillez réessayer.");
		}
	} catch (error) {
		alert("❌ Erreur de connexion, veuillez vérifier votre connexion internet.");
	}
});

