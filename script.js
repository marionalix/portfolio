// Interaction basique : log de l'app cliquée
document.addEventListener('DOMContentLoaded', () => {
	const dockIcons = document.querySelectorAll('.dock-icon');

	dockIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			const app = icon.dataset.app;
			console.log(`Ouverture de l'application : ${app}`);
			// Ici on ajoutera l'ouverture des fenêtres plus tard
		});
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
