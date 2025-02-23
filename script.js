document.addEventListener('DOMContentLoaded', () => {
	// === CONST & SÉLECTEURS ===
	const dockIcons = document.querySelectorAll('.dock-icon');
	const windows = document.querySelectorAll('.window');
	const mailWindow = document.getElementById('mail-window');
	const safariWindow = document.getElementById('safari-window');
	const closeMailBtn = document.getElementById('close-mail');
	const maximizeMailBtn = document.getElementById('maximize-mail');
	const minimizeMailBtn = document.getElementById('minimize-mail');
	const closeSafariBtn = document.getElementById('close-safari');
	const maximizeSafariBtn = document.getElementById('maximize-safari');
	const minimizeSafariBtn = document.getElementById('minimize-safari');
	const sendMailBtn = document.getElementById('send-mail');
	const menuTitle = document.getElementById('menu-title');
	const contactForm = document.getElementById('contact-form');

	makeDraggable(mailWindow);
	makeDraggable(safariWindow);

	// === GESTION DU DOCK ===
	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			if (app === 'mail') openWindow(mailWindow, 'Mail', icon);
			else if (app === 'safari') openWindow(safariWindow, 'Safari', icon);
		});
	});

	// === GESTION FENÊTRES (FERMER | MAXIMISER | MINIMISER) ===
	closeMailBtn.addEventListener('click', () => closeWindow(mailWindow, 'mail', true));
	closeSafariBtn.addEventListener('click', () => closeWindow(safariWindow, 'safari'));

	maximizeMailBtn.addEventListener('click', () => toggleMaximize(mailWindow));
	maximizeSafariBtn.addEventListener('click', () => toggleMaximize(safariWindow));

	minimizeMailBtn.addEventListener('click', () => minimizeWindow(mailWindow));
	minimizeSafariBtn.addEventListener('click', () => minimizeWindow(safariWindow));

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
