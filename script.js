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
