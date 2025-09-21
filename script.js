const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', async (event) => {
    // 1. Obtener el archivo del input
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    // 2. Leer el archivo como un ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    try {
        // 3. Descomprimir el archivo en memoria usando unrar.js
        const { files } = await Unrar(fileBuffer);

        // 4. Limpiar el contenedor de imágenes anterior
        imageContainer.innerHTML = '';

        // 5. Iterar sobre los archivos extraídos
        for (const extractedFile of files) {
            // Verificar si es un archivo de imagen JPG
            if (extractedFile.name.toLowerCase().endsWith('.jpg') || extractedFile.name.toLowerCase().endsWith('.jpeg')) {
                // 6. Crear un Blob a partir de los datos del archivo
                const blob = new Blob([extractedFile.fileData], { type: 'image/jpeg' });

                // 7. Crear una URL de objeto temporal
                const imageUrl = URL.createObjectURL(blob);

                // 8. Crear una etiqueta <img> y mostrar la imagen
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.maxWidth = '100%';
                img.style.margin = '10px';

                // Agregar la imagen al contenedor
                imageContainer.appendChild(img);

                console.log(`Imagen '${extractedFile.name}' extraída y mostrada.`);
            }
        }
    } catch (error) {
        console.error('Error al descomprimir el archivo RAR:', error);
        alert('Hubo un error al procesar el archivo. Asegúrate de que es un RAR válido.');
    }
});