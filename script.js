const fileInput = document.getElementById('fileInput');
const extractFileBtn = document.getElementById('extractFileBtn');
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const fileList = document.getElementById('fileList');
const message = document.getElementById('message');

function showMessage(msg, error = false) {
  message.textContent = msg;
  message.style.color = error ? '#d32f2f' : '#388e3c';
}

function clearFiles() {
  fileList.innerHTML = '';
}

function renderFiles(zip) {
  clearFiles();
  Object.keys(zip.files).forEach(async (filename) => {
    const file = zip.files[filename];
    if (!file.dir) {
      const blob = await file.async('blob');
      const url = URL.createObjectURL(blob);
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.textContent = filename;
      link.target = '_blank';
      li.appendChild(link);
      fileList.appendChild(li);
    }
  });
}

extractFileBtn.onclick = async () => {
  clearFiles();
  showMessage('');
  if (!fileInput.files.length) {
    showMessage('Selecciona un archivo ZIP.', true);
    return;
  }
  const file = fileInput.files[0];
  if (!file.name.endsWith('.zip')) {
    showMessage('El archivo debe ser un ZIP.', true);
    return;
  }
  showMessage('Descomprimiendo...');
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    renderFiles(zip);
    showMessage('¡Archivos extraídos!');
  } catch (err) {
    showMessage('Error al descomprimir el archivo.', true);
  }
};

downloadBtn.onclick = async () => {
  clearFiles();
  showMessage('');
  const url = urlInput.value.trim();
  if (!url || !url.toLowerCase().endsWith('.zip')) {
    showMessage('Ingresa una URL válida que termine en .zip', true);
    return;
  }
  showMessage('Descargando y descomprimindo...');
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo descargar el archivo ZIP.');
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    renderFiles(zip);
    showMessage('¡Archivos extraídos!');
  } catch (err) {
    showMessage('No se pudo descargar o descomprimir el ZIP.', true);
  }
};
