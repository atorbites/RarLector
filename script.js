const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Leer el archivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Crear instancia Unrar
    const extractor = new Unrar(arrayBuffer);

    imageContainer.innerHTML = '';

    while (true) {
        const entry = extractor.next();
        if (!entry) break; // No hay más archivos

        // Solo procesar imágenes JPG/JPEG
        if (
            entry.filename.toLowerCase().endsWith('.jpg') ||
            entry.filename.toLowerCase().endsWith('.jpeg')
        ) {
            const blob = new Blob([entry.extract()], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100%';
            img.style.margin = '10px';
            imageContainer.appendChild(img);
            console.log(`Imagen '${entry.filename}' extraída y mostrada.`);
        }
    }
});
