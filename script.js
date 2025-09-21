const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Leer el archivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Cargar el ZIP usando JSZip
    const zip = await JSZip.loadAsync(arrayBuffer);

    imageContainer.innerHTML = '';

    // Iterar sobre los archivos del ZIP
    zip.forEach(async (relativePath, zipEntry) => {
        // Solo procesar imágenes JPG/JPEG/PNG
        if (
            zipEntry.name.toLowerCase().endsWith('.jpg') ||
            zipEntry.name.toLowerCase().endsWith('.jpeg') ||
            zipEntry.name.toLowerCase().endsWith('.png')
        ) {
            const type = zipEntry.name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
            const blob = await zipEntry.async('blob');
            const url = URL.createObjectURL(new Blob([blob], { type }));
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100%';
            img.style.margin = '10px';
            imageContainer.appendChild(img);
            console.log(`Imagen '${zipEntry.name}' extraída y mostrada.`);
        }
    });
});
