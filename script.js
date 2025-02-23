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

document.addEventListener('DOMContentLoaded', () => {
	const dockIcons = document.querySelectorAll('.dock-icon');
	const mailWindow = document.getElementById('mail-window');
	const mailContent = document.getElementById('mail-content');
	const closeMailBtn = document.getElementById('close-mail');
	const maximizeMailBtn = document.getElementById('maximize-mail');
	const minimizeMailBtn = document.getElementById('minimize-mail');
	const sendMailBtn = document.getElementById('send-mail');
	const menuTitle = document.getElementById('menu-title');
	const contactForm = document.getElementById('contact-form');

	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			if (app === 'mail') {
				mailWindow.classList.remove('hidden');
				menuTitle.textContent = 'Mail';
				updateDockFocus(icon, mailWindow);
			}
		});
	});
	
	closeMailBtn.addEventListener('click', () => {
		mailWindow.classList.remove('visible');
		mailWindow.classList.add('hidden');
		menuTitle.textContent = 'Portfolio';
		removeDockFocus('mail');
	});
	
	maximizeMailBtn.addEventListener('click', () => {
		mailWindow.classList.add('maximize');
		mailContent.classList.add('maximize');
	});
	
	minimizeMailBtn.addEventListener('click', () => {
		mailWindow.classList.remove('maximize');
		mailContent.classList.remove('maximize');
	});

	sendMailBtn.addEventListener('click', () => {
		if (contactForm.checkValidity()) {
			alert('Message envoyé avec succès !');
			mailWindow.classList.remove('visible');
			mailWindow.classList.add('hidden');
			menuTitle.textContent = 'Portfolio';
			removeDockFocus('mail');
			contactForm.reset();
		} else {
			alert('Veuillez remplir tous les champs obligatoires.');
		}
	});

	function updateDockFocus(icon, windowElement) {
		const allIndicators = document.querySelectorAll('.dock-icon .indicator');
		allIndicators.forEach(i => i.classList.remove('active'));

		if (!windowElement.classList.contains('hidden')) {
			icon.querySelector('.indicator').classList.add('active');
		}
	}

	function removeDockFocus(appName) {
		const icon = document.querySelector(`.dock-icon[data-app='${appName}'] .indicator`);
		if (icon) icon.classList.remove('active');
	}
});