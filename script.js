const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    imageContainer.innerHTML = '';

    // 1. Juntar las entradas de imagen en un array
    const imageEntries = [];
    zip.forEach((relativePath, zipEntry) => {
        if (
            zipEntry.name.toLowerCase().endsWith('.jpg') ||
            zipEntry.name.toLowerCase().endsWith('.jpeg') ||
            zipEntry.name.toLowerCase().endsWith('.png')
        ) {
            imageEntries.push(zipEntry);
        }
    });

    // 2. Ordenar alfabéticamente por nombre
    imageEntries.sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }));

    // 3. Mostrar las imágenes en el orden correcto
    for (const zipEntry of imageEntries) {
        const type = zipEntry.name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        const blob = await zipEntry.async('blob');
        const url = URL.createObjectURL(new Blob([blob], { type }));
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        img.style.margin = '10px';
        imageContainer.appendChild(img);
    }
});
