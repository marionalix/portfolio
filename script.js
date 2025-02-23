document.addEventListener('DOMContentLoaded', () => {
	const dockIcons = document.querySelectorAll('.dock-icon');
	const mailWindow = document.getElementById('mail-window');
	const closeMailBtn = document.getElementById('close-mail');

	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			dockIcons.forEach(i => i.classList.remove('active'));
			icon.classList.add('active');
			const app = icon.dataset.app;

			if (app === 'mail') {
				mailWindow.classList.remove('hidden');
			}
		});
	});

	closeMailBtn.addEventListener('click', () => {
		mailWindow.classList.add('hidden');
		document.querySelector(".dock-icon[data-app='mail']").classList.remove('active');
	});

	document.getElementById('contact-form').addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Message envoyé avec succès !');
		mailWindow.classList.add('hidden');
		document.querySelector(".dock-icon[data-app='mail']").classList.remove('active');
	});
});


// Mise à jour de l'horloge en haut à droite
function updateClock() {
	const clockElement = document.getElementById('clock');
	const now = new Date();
	const optionsDate = { weekday: 'short', day: '2-digit', month: 'short' };
	const optionsTime = { hour: '2-digit', minute: '2-digit' };
	
	const date = now.toLocaleDateString('fr-FR', optionsDate);
	const time = now.toLocaleTimeString('fr-FR', optionsTime);
	
	clockElement.textContent = `${date} ${time}`; // Suppression du "à"
}

// Actualise toutes les minutes
setInterval(updateClock, 1000);
updateClock();

// Interaction du dock
document.addEventListener('DOMContentLoaded', () => {
	const dockIcons = document.querySelectorAll('.dock-icon');

	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			console.log(`Ouverture de l'application : ${app}`);
		});
	});
});
