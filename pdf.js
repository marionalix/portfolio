pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const url = 'assets/cv.pdf';
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
let pdfDoc = null, pageNum = 1, scale = 1.7, minScale = 0.7, maxScale = 2.4;

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
	pdfDoc = pdfDoc_;
	renderPage(pageNum);
});

// Fonction pour afficher la page
function renderPage(num) {
	pdfDoc.getPage(num).then((page) => {
		const viewport = page.getViewport({ scale });
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		const renderContext = { canvasContext: ctx, viewport: viewport };
		page.render(renderContext);
	});
}

// ➕ Zoom avant
document.getElementById('zoom-in').addEventListener('click', () => {
	if (scale < maxScale) {
		scale += 0.1;
		renderPage(pageNum);
	}
});

// ➖ Zoom arrière
document.getElementById('zoom-out').addEventListener('click', () => {
	if (scale > minScale) {
		scale -= 0.1;
		renderPage(pageNum);
	}
});
