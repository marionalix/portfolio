document.addEventListener('DOMContentLoaded', () => {
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

	// Gestion de l'ouverture depuis le dock
	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			if (app === 'mail') {
				mailWindow.classList.remove('hidden', 'minimized');
				menuTitle.textContent = 'Mail';
				updateDockFocus(icon, mailWindow);
			}
			else if (app === 'safari') {
				safariWindow.classList.remove('hidden', 'minimized');
				menuTitle.textContent = 'Safari';
				updateDockFocus(icon, safariWindow);
			}
		});
	});

	// Fermeture de la fenêtre Mail
	closeMailBtn.addEventListener('click', () => {
		const form = document.getElementById('contact-form');
		form.reset(); // Vide tous les champs du formulaire
		mailWindow.classList.add('hidden');
		mailWindow.classList.remove('maximized', 'minimized');
		menuTitle.textContent = 'Portfolio';
		removeDockFocus('mail');
	});
	
	// Fermeture de la fenêtre Safari
	closeSafariBtn.addEventListener('click', () => {
		safariWindow.classList.add('hidden');
		safariWindow.classList.remove('maximized', 'minimized');
		menuTitle.textContent = 'Portfolio';
		removeDockFocus('safari');
	});
	
	// Maximiser ou restaurer la taille de la fenêtre Mail
	maximizeMailBtn.addEventListener('click', () => {
		mailWindow.classList.toggle('maximized');
	});
	
	// Maximiser ou restaurer la taille de la fenêtre Safari
	maximizeSafariBtn.addEventListener('click', () => {
		safariWindow.classList.toggle('maximized');
	});

	// Minimiser la fenêtre Mail
	minimizeMailBtn.addEventListener('click', () => {
		mailWindow.classList.add('minimized');
	});
	
	// Minimiser la fenêtre Safari
	minimizeSafariBtn.addEventListener('click', () => {
		safariWindow.classList.add('minimized');
	});

	// Gestion du bouton Envoyer
	sendMailBtn.addEventListener('click', () => {
		if (contactForm.checkValidity()) {
			alert("Votre message a été envoyé avec succès !");
			contactForm.reset();
		} else {
			alert("Veuillez remplir tous les champs requis.");
		}
	});
	
	// Mise à jour des indicateurs dans le dock
	function updateDockFocus(activeIcon, activeWindow) {
		// dockIcons.forEach(icon => icon.classList.remove('focused'));
		activeIcon.classList.add('active');
		windows.forEach(win => win.classList.remove('active'));
		activeWindow.classList.add('active');
	}
	
	function removeDockFocus(appName) {
		const appIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
		if (appIcon) appIcon.classList.remove('active');
	}
});

document.querySelectorAll('.dock-icon').forEach(icon => {
	icon.addEventListener('click', () => {
		// Ajoute la classe 'bouncing' pour démarrer l'animation
		icon.classList.add('bouncing');

		// Supprime la classe après l'animation pour pouvoir la rejouer
		setTimeout(() => {
			icon.classList.remove('bouncing');
		}, 600); // Durée de l'animation (0.6s)
	});
});

function updateClock() {
	const clockElement = document.getElementById('clock');
	const now = new Date();
	const optionsDate = { weekday: 'short', day: '2-digit', month: 'short' };
	const optionsTime = { hour: '2-digit', minute: '2-digit' };

	const date = now.toLocaleDateString('fr-FR', optionsDate);
	const time = now.toLocaleTimeString('fr-FR', optionsTime);

	clockElement.textContent = `${date} ${time}`;
}

setInterval(updateClock, 1000);
updateClock();