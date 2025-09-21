---
layout: default
title: ZIPLector
---

<head>
  <meta charset="UTF-8">
  <title>ZIP Lector</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <main>
    <h1>ZIP Lector</h1>

    <section>
      <h2>Descomprimir archivo ZIP local</h2>
      <input type="file" id="fileInput" accept=".zip">
      <button id="extractFileBtn">Descomprimir archivo</button>
    </section>

    <section>
      <h2>Descomprimir ZIP desde URL</h2>
      <input type="text" id="urlInput" placeholder="Pega aquí la URL de un archivo ZIP">
      <button id="downloadBtn">Descargar y descomprimir</button>
    </section>

    <section>
      <h2>Archivos extraídos</h2>
      <ul id="fileList"></ul>
    </section>

    <div id="message"></div>
  </main>

  <footer>
    <small>
      Desarrollado por
      <a href="https://github.com/atorbites" target="_blank">atorbites</a>
    </small>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
  <script src="script.js"></script>
</body>

</html>
