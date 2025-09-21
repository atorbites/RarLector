---
layout: default
title: ZIPLector
---

# ZIP Lector

## Descomprimir archivo ZIP local
- **Archivo ZIP local**:  
  `<input type="file" id="fileInput" accept=".zip">`  
- **Botón**:  
  `<button id="extractFileBtn">Descomprimir archivo</button>`

---

## Descomprimir ZIP desde URL
- **Campo de texto**:  
  `<input type="text" id="urlInput" placeholder="Pega aquí la URL de un archivo ZIP">`  
- **Botón**:  
  `<button id="downloadBtn">Descargar y descomprimir</button>`

---

## Archivos extraídos
- `<ul id="fileList"></ul>`

---

<div id="message"></div>

---

### Pie de página
Desarrollado por [atorbites](https://github.com/atorbites)

---

### Scripts utilizados
- [JSZip 3.10.1](https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js)  
- `script.js`
