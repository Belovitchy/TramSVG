// Ce code JavaScript gère la logique de notre application de tramage d'images.

// Contient les données des fichiers SVG pour éviter les problèmes de CORS avec le protocole file://
// SVG data is formatted as concatenated strings to prevent file corruption issues.
const SVG_DATA = {
  "Plan de travail 1.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M45.24,63.57c-1.92-5.29-5.78-9.76-6.19-15.84s2.56-8.62,8.83-9.28c4.78-.51,9.26,1.29,13.06,3.72s4.47.67,5.23-2.4a33.24,33.24,0,0,1,3.94-9.59C74,24,80.25,23.45,85.27,28.93c3,3.25,4.55,7.27,5.69,11.41.89,3.27,2,3.8,5,1.85a40.51,40.51,0,0,1,9-4c3.32-1.15,6.94-1.92,9.79.93a10.82,10.82,0,0,1,2.8,11.41,67.42,67.42,0,0,1-4.19,10c-1.12,2.22-1.55,3.11,1.57,4,5.21,1.43,10.36,3.4,14.23,7.54,3.4,3.62,3,7.84-.91,10.94a34.17,34.17,0,0,1-12.73,6.2c-2.8.75-3.87,1.2-2,4.45,2.82,4.77,5.06,10,4.52,15.88-.4,4.39-2.36,6.67-6.89,6.63-5.49-.06-10.22-2.22-14.85-4.89-2-1.17-3.8-2.29-4.59,1.78a29.39,29.39,0,0,1-6.34,13.26c-4.22,5-8.43,5-12.56,0a24.82,24.82,0,0,1-5.52-11.41c-.8-4.59-2.37-4.65-5.86-2.47a29.68,29.68,0,0,1-13.55,4.25c-5.27.39-8.19-2.72-7.88-8a28.78,28.78,0,0,1,4.5-13.43c2.11-3.42,1-4.3-2.32-5A33.48,33.48,0,0,1,33,86.77c-3.48-1.87-7.1-3.74-6.62-8.23a12.16,12.16,0,0,1,7.47-10.31C37.61,66.63,41.39,65.14,45.24,63.57Z"/></svg>',
  "Plan de travail 1_1.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M30.89,22c5.25,1.25,9.63,4.51,13.85,7.8A257.31,257.31,0,0,1,73.41,56.41c2.69,2.87,4.19,2.78,6.91,0,10.94-11.24,21.74-22.68,35.14-31.18a25.35,25.35,0,0,1,2.94-1.79c2.71-1.22,5.79-2.48,8.24-.18,2.63,2.48.2,5.21-.89,7.58-5.3,11.42-13.17,21.12-21,30.85C101.28,66,97.64,70.27,94,74.53,92.77,76,92.5,77.25,94,78.85a284.85,284.85,0,0,1,25.34,32.27c3.3,4.85,6.4,9.78,7.92,15.63a5.85,5.85,0,0,1-1,5.5c-1.38,1.52-3.65.77-5.51-.19-9.46-4.93-17.19-12.06-24.78-19.38-5.82-5.62-12.24-10.63-17.23-17.08-1.68-2.17-2.76-1-4.25.51-8.48,8.71-17,17.44-26.35,25.17-4.45,3.66-9.19,7-14,10.22-2,1.38-4.86,2.65-6.86.72-1.76-1.71-1.61-4.47-.68-7,2.6-7.17,7-13.31,11.29-19.42A254.3,254.3,0,0,1,58.61,80c1.73-1.86,2.3-3.23.32-5.68C49,62,38.68,50.06,30.57,36.43a37,37,0,0,1-4.1-8.9C25.4,23.65,26.81,21.82,30.89,22Z"/></svg>',
  "Plan de travail 1_2.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M98.61,91.48c3.53,7.19,6.81,13.67,9.9,20.24a52.25,52.25,0,0,1,3.24,8.64c.68,2.51.06,5.32-2.21,6.56-1.78,1-3.5-.93-4.92-2.29-6.9-6.61-13.49-13.49-18.78-21.5-.64-1-1.45-2.37-2.49-2-.69.22-1,1.94-1.3,3-1.74,7.48-4.7,14.55-7.31,21.73a22.78,22.78,0,0,1-3.61,5.84c-1.2,1.54-2.73,3.37-5,2.51s-2.11-3-2.12-5c0-9.4-.31-18.81,1.93-28.07a21.2,21.2,0,0,0,0-4.36c-9.15,4.66-17.44,9.73-26.69,12.73a9.38,9.38,0,0,1-2.76.9c-2.2-.07-5,1.12-6.29-1.59-1.23-2.52.69-4.4,2.21-6.08A125.07,125.07,0,0,1,52.26,85.53c1.32-1,2.49-2.1,4-3.39-9.37-2.92-18.52-5.26-27-9.48a12.86,12.86,0,0,1-2.63-1.29c-2-1.67-5.12-3.17-4.09-6.14.86-2.48,4-2.46,6.51-2.57,10.46-.45,20.73,1.37,31.6,2.57-2.72-5.27-5.32-10.33-8-15.36A88.26,88.26,0,0,1,46.76,36c-.76-2.38-1.76-5.13.73-6.72s4.64.32,6.55,2c7.36,6.34,13.33,13.89,19,21.68.58.8,1,1.74,2.43,1.6,2.69-9.25,5.36-18.58,9.53-27.38a20.15,20.15,0,0,1,1.4-2.59c1.07-1.62,1.92-3.92,4.29-3.5S93.62,23.8,94,26c1.65,10.22-.44,20.2-1.77,30.24a24.16,24.16,0,0,0,0,2.73c7.47-3.44,14.06-7.87,21.46-10.61,2.61-1,5.24-1.84,7.82-2.84,2.07-.8,4.39-1.74,5.84.46s.21,4.28-1.23,6.32c-3.89,5.52-9.35,9.31-14.4,13.55-3.26,2.73-6.72,5.21-10.54,8.16,10.21,3.19,20.21,5.56,29.26,10.47,2.25,1.22,5.76,1.91,5.11,5.13-.7,3.45-4.46,3.61-7.31,3.84C120.73,94,113.35,92.8,106,92,103.71,91.72,101.46,91.66,98.61,91.48Z"/></svg>',
  "Plan de travail 1_3.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M65.24,112.16c-18,9.85-23.13,10.24-29.57,2.38s-5.1-17.38,4.53-28.89c-8.53-2.87-13.68-8.83-16-17.38C23,63.86,26.94,55.51,32.26,52.61,38,49.48,44.1,47,50.91,49c2.65.81,2.46-.76,2.73-2.56,1.17-7.82,3.13-15.23,10.35-20C76.54,18.11,89.51,23.2,92.3,38c.85,4.51,1.7,2.92,3.91,1.13,12.15-9.89,27-6.15,31.15,4.43,2.58,6.55,1.14,13-2.68,18.62-1.86,2.74-3.5,6-7.87,7.35,4.85,3.14,9.68,4.79,12.84,9.24,7.14,10,5.15,24.88-6.35,30.43-4.81,2.32-10.61,1.35-15.8-.64-.92-.35-1.9-1-2.67-.35s-.27,1.76,0,2.75c1.5,6.15-2.35,16-7.31,18.94-7.56,4.49-16.59,4-22.83-1.31C69.56,124.3,65.68,119.24,65.24,112.16Zm46.59-12c4.53.57,8-1.49,9.9-5.9,2-4.57-.33-7.85-3.59-10.78-4.46-4-10-5.94-15.36-8.25-1.73-.74-4.21-.87-4.25-3.4,0-2.34,2.1-3.09,3.85-4,4.93-2.59,9.72-5.4,13.56-9.54,2.22-2.38,2.89-4.83,1-7.92-2.46-4.05-7.5-5.23-13-3.22s-9.44,5.74-13.73,9.25c-.9.74-1.31,2.76-2.92,1.77C86.16,57.39,86,56.05,86,54.39A37.33,37.33,0,0,0,83.4,40.24c-2.29-5.55-8.5-7.73-12.75-4.32a24.31,24.31,0,0,0-8.18,10.86c-1.66,4.67-.78,9,.61,13.36a3,3,0,0,1-.62,3.07c-1.19,1.51-1.75-.42-2.46-.84C54.31,59,47.48,61.15,43.18,64.25c-2.81,2-3.09,4.46-1.7,7.76,2.28,5.41,6.86,7.47,11.75,9.45,4.21,1.7,4.31,2.82.8,5.74a58.89,58.89,0,0,0-5,4c-2.92,3-3.6,6.62-1.47,10.3,2.45,4.24,6,2.49,9,.94A105.76,105.76,0,0,0,67,96.05c1.33-.88,2.26-2.66,4.21-1.57,1.6.89,1.31,2.54,1.26,4-.18,5.09,1.72,9.58,4.12,13.84,2.67,4.74,8.35,8.07,11.71,6.55,4.72-2.14,6-6.65,6.08-11.45,0-3.27.36-6.53-.77-9.81-.46-1.3-1.25-3.58,1.21-4.7S97.78,94,98.71,95C102.19,98.82,106.46,100.33,111.83,100.11Z"/></svg>',
  "Plan de travail 1_4.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M57.55,65.7c.62,1.74,1,3.21-.58,4.93Q43.13,86.19,29.59,102c-2,2.37-3.29,2.93-5.77.35-5.46-5.67-5.46-5.38-.21-11.5Q35.24,77.34,46.37,63.42c2.09-2.63,3.61-2.71,5.79-.59a11.34,11.34,0,0,0,5.56,3Z"/><path d="M138,71.21c.36,2.48-.93,3.52-1.85,4.59-8.66,10.13-17.46,20.14-26.05,30.33-2.4,2.85-4.39,2.38-6.37,0s-6.63-3.47-2.63-8.08c8.29-9.58,16.2-19.49,24.41-29.14,1.24-1.45,2.42-4.45,4.89-3.16C133.31,67.25,136.38,68.89,138,71.21Z"/><path d="M96.22,98.27C93.75,97.15,92,94.64,90,92.54c-1.85-1.91.09-3.4,1.15-4.69,7.42-9,14.81-18.1,22.43-27,5.77-6.71,5.89-6.56,13-1.2,1.8,1.37,2.26,2.61.64,4.46Q112.76,80.51,98.46,97C97.91,97.59,97.62,98.38,96.22,98.27Z"/><path d="M68.52,79.26a16.68,16.68,0,0,1-1.26,1.88c-9.53,11-19.13,21.89-28.55,33-1.19,1.4-2.06,1.58-3.19.62a62.41,62.41,0,0,1-5.33-5.21c-1.57-1.72-.15-2.9.94-4.22q13.2-16,26.34-32.07c.57-.7,1.06-1.8,2.32-1,2.71,1.8,5.45,3.57,8.13,5.42C68.24,77.9,68.27,78.56,68.52,79.26Z"/><path d="M102.23,68.14c-1.76,2.6-3.2,5.94-5.69,8.07-2.23,1.9-4-1.06-5.68-2.51-9.71-8.38-19.32-16.87-29.17-25.09-3.09-2.58-2.53-4.27,0-6.71,4.93-4.84,4.78-4.86,10-.38,9.37,8,18.83,15.94,28.23,23.91C100.75,66.13,102.12,66.35,102.23,68.14Z"/><path d="M57.72,65.87a21.67,21.67,0,0,0-5.45-5.68c-2.38-1.93-2.46-3.71-.2-5.69a4.32,4.32,0,0,0,1-1c2.93-5.14,5.88-3.19,9.23-.32Q76.81,65.49,91.51,77.53c1.58,1.3,1.82,2.17.82,4C87.7,90,87.54,90.21,80.27,84.35,74,79.28,68,73.82,61.89,68.58c-1.33-1.13-2.15-3-4.34-2.89C57.55,65.7,57.72,65.87,57.72,65.87Z"/></svg>',
  "Plan de travail 1_5.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M50.79,124.82c-5.59-2.54-9.52-8.22-14.13-13-4.18-4.3.21-7.66,2.6-10.58C56,80.84,72.75,60.35,90,40.3c13-15.17,13.31-14.83,29.3-2.71,4.08,3.09,5.12,5.9,1.45,10.08q-32.57,37-64.9,74.19C54.6,123.28,54,125.06,50.79,124.82Z"/></svg>',
  "Plan de travail 1_6.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M103.5,86.18A7.55,7.55,0,0,1,95.86,79a8,8,0,0,1,15.92-.46C111.92,82.86,108.39,86.12,103.5,86.18Z"/><path d="M103.13,52.32a7.55,7.55,0,0,1-7.28-7.56c0-4.17,3.61-7.43,8.1-7.37A7.66,7.66,0,0,1,111.79,45C111.69,49.39,108.13,52.38,103.13,52.32Z"/><path d="M44,60.48a7.55,7.55,0,0,1-7.54,7.77c-4.21,0-7.45-3.56-7.4-8s3.52-8,7.62-7.83A7.76,7.76,0,0,1,44,60.48Z"/><path d="M81.5,93.61c.11,3.76-4.13,8.28-8,8.46s-7.38-3.18-7.6-7.41c-.23-4.54,2.79-8.12,7.09-8.42C76.83,86,81.39,89.94,81.5,93.61Z"/><path d="M91.69,87.18c4.65-.05,8.19,3.16,8.13,7.4a7.62,7.62,0,0,1-8,7.53c-4.5,0-8-3.46-7.89-7.65A7.62,7.62,0,0,1,91.69,87.18Z"/><path d="M54.72,68.25c-4.35.06-7.3-2.86-7.39-7.32s3.05-7.61,7.68-7.6A7.65,7.65,0,0,1,63,60.93C62.86,65.16,59.46,68.18,54.72,68.25Z"/><path d="M119.83,62.47c-.09,4-3.93,7.84-7.74,7.73-4.19-.11-7.38-3.69-7.27-8.17s3.66-7.93,7.77-7.66A7.65,7.65,0,0,1,119.83,62.47Z"/><path d="M46.69,85.18a7.47,7.47,0,0,1-.42-14.93c4.84-.08,8.7,3.24,8.68,7.48C54.94,81.24,50.62,85.13,46.69,85.18Z"/><path d="M46.3,51.32a7.46,7.46,0,0,1,.36-14.92c4.53,0,8.19,3.29,8.28,7.37C55,47.41,50.48,51.38,46.3,51.32Z"/><path d="M62.64,117.05A7.55,7.55,0,0,1,55,109.76c-.09-3.7,3.8-7.67,7.5-7.64,4.73,0,8.21,3,8.39,7.18C71.1,113.69,67.56,117,62.64,117.05Z"/><path d="M75.92,110.07c0-4.21,3.24-7.92,6.94-7.94a8,8,0,0,1,8,8.18c-.09,3.6-4.39,7.75-8,7.72S75.92,114.28,75.92,110.07Z"/><path d="M101.71,118a7.61,7.61,0,0,1-7.85-7.6,7.53,7.53,0,0,1,7.49-7.32c4.71,0,8.32,3,8.41,7.09C109.83,113.53,105.18,118.06,101.71,118Z"/><path d="M110.16,103.1c-3.62-.07-7.21-3.9-7.32-7.82-.12-4.36,3.29-7.22,8.5-7.1,3.86.09,7.4,3.4,7.41,6.94S114,103.18,110.16,103.1Z"/><path d="M34.63,101.11a7.62,7.62,0,0,1-7.53-8c0-3.57,3.63-6.93,7.41-6.94,4.71,0,8.51,3.1,8.49,7S38.69,101.08,34.63,101.11Z"/><path d="M58,44.23c0-4.18,3.31-7.84,7-7.82a8,8,0,0,1,7.93,8.18c-.08,3.43-4.78,7.86-8.18,7.71C61,52.14,58,48.46,58,44.23Z"/><path d="M127.75,111.08a7.49,7.49,0,1,1-15,.1c0-4.84,2.24-7.08,7.17-7.07C125.49,104.12,127.74,106.13,127.75,111.08Z"/><path d="M122.17,53.31a7.64,7.64,0,0,1-7.38-8.09c.06-3.94,3.51-6.94,7.86-6.83,4.64.11,8.09,3.3,8,7.43C130.65,49.06,125.76,53.36,122.17,53.31Z"/><path d="M58,78.17c0-4.18,3.25-7.87,6.93-7.9a8,8,0,0,1,8,8.09c-.06,3.52-4.6,7.9-8.1,7.8C61.1,86.06,58,82.4,58,78.17Z"/><path d="M92.85,78.5a7.53,7.53,0,0,1-7.22,7.67,7.61,7.61,0,0,1-7.72-7.81c-.06-4.69,2.19-7.08,6.72-7.12C90.45,71.18,92.77,73.24,92.85,78.5Z"/><path d="M93.53,69.24a7.62,7.62,0,0,1-7.63-7.36c-.24-3.78,3.3-7.49,7.2-7.56,4.71-.08,8.51,2.85,8.7,6.72C102,64.64,97.45,69.14,93.53,69.24Z"/><path d="M44.33,102.12c5.16-.07,8.22,2.78,8.14,7.55-.07,3.56-4,7.29-7.82,7.37a7.64,7.64,0,0,1-7.6-7.83C37,104.49,39.35,102.18,44.33,102.12Z"/><path d="M122.46,72.25c4.7.06,8.08,3,8.22,7.22.11,3.43-5,7.88-8.76,7.7a7.65,7.65,0,0,1-7.13-7.8A7.52,7.52,0,0,1,122.46,72.25Z"/><path d="M85.3,37.39c5.32.09,7.75,2.47,7.55,7.39a7.61,7.61,0,0,1-7.46,7.53c-4.22,0-7.51-3.52-7.48-8C78,39.5,80.3,37.3,85.3,37.39Z"/><path d="M52.8,101.11c-4.71,0-6.8-2.36-6.78-7.51a7.47,7.47,0,0,1,14.94,0C61,98.23,57.83,101.16,52.8,101.11Z"/><path d="M74.88,68.25c-4.76,0-6.9-2.28-6.94-7.36a7.47,7.47,0,1,1,14.94.16C82.82,65.4,79.64,68.26,74.88,68.25Z"/></svg>',
  "Plan de travail 1_7.svg":
    '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.79 155.43"><path d="M117.25,77c0,24.72-17.76,43.94-41.09,44.36S34.06,102.37,33.85,77.5c-.22-27,12.46-39.46,40-39.41C104.69,38.15,117.21,49.36,117.25,77Z"/></svg>',
};

document.addEventListener("DOMContentLoaded", () => {
  // --- SÉLECTEURS D'ÉLÉMENTS HTML ---
  const imageLoader = document.getElementById("imageLoader");
  const processButton = document.getElementById("processButton");
  const downloadPNGButton = document.getElementById("downloadPNGButton");
  const downloadJPEGButton = document.getElementById("downloadJPEGButton");
  const downloadSVGButton = document.getElementById("downloadSVGButton");
  const downloadPDFButton = document.getElementById("downloadPDFButton");
  const sourceCanvas = document.getElementById("sourceCanvas");
  const resultCanvas = document.getElementById("resultCanvas");
  const pixelSizeInput = document.getElementById("pixelSize");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const controlsContainer = document.getElementById("svgControls");
  const sourceDimensionsSpan = document.getElementById("sourceDimensions");
  const resultDimensionsSpan = document.getElementById("resultDimensions");

  const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
  const resultCtx = resultCanvas.getContext("2d", { willReadFrequently: true });
  let img = new Image();

  // Canevas caché pour la version dégradée de l'image
  const degradedSourceCanvas = document.createElement("canvas");
  const degradedSourceCtx = degradedSourceCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  // --- CONFIGURATION ---
  const SVG_FILES = Object.keys(SVG_DATA);
  let paletteSettings = []; // [{ svgFile: '...', color: '#...', size: 1.0 }, ...]
  let gridBrushIndices = []; // Stocke l'index du pinceau pour chaque 'pixel' de la grille

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---
  imageLoader.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      img.onload = () => {
        // 1. Redimensionner l'image et l'afficher dans le canevas "Originale"
        const { width, height } = resizeImage(img, 400);
        sourceCanvas.width = width;
        sourceCanvas.height = height;
        sourceCtx.drawImage(img, 0, 0, width, height);

        // 2. Mettre à jour le texte des dimensions
        const newDimensionsText = `(${width}x${height})`;
        sourceDimensionsSpan.innerText = newDimensionsText;
        resultDimensionsSpan.innerText = newDimensionsText;
        resultCanvas.width = width;
        resultCanvas.height = height;

        // 3. Lancer le premier calcul de la version dégradée et de la palette
        updateDegradedSourceAndPalette();
        processImage(true); // Lancer le rendu initial automatiquement
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  pixelSizeInput.addEventListener("change", () => {
    if (img.src) {
      updateDegradedSourceAndPalette();
      processImage(false); // Relancer un rendu complet car la grille a changé, mais ne pas redessiner de suite.
    }
  });

  processButton.addEventListener("click", () => {
    if (!img.src) {
      alert("Veuillez d'abord charger une image.");
      return;
    }
    if (gridBrushIndices.length === 0) {
        alert("Veuillez d'abord charger une image ou modifier la taille de la trame pour générer la distribution initiale.");
        return;
    }
    redrawResult(); // Lancer un redessin rapide avec la distribution existante
  });

  downloadPNGButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "tramage-image.png";
    link.href = resultCanvas.toDataURL("image/png");
    link.click();
  });

  downloadJPEGButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "tramage-image.jpg";
    // When converting to JPEG, the background must be filled, as JPEG doesn't support transparency.
    // The current processImage already fills the background, so we just need to convert.
    link.href = resultCanvas.toDataURL("image/jpeg", 0.9);
    link.click();
  });

  downloadSVGButton.addEventListener("click", () => {
    if (!img.src) {
      alert("Veuillez d'abord générer une image.");
      return;
    }
    generateAndDownloadSVG();
  });

  downloadPDFButton.addEventListener("click", () => {
    if (!img.src) {
      alert("Veuillez d'abord générer une image.");
      return;
    }
    generateAndDownloadPDF();
  });


  // Gestion de l'aperçu de la couleur de fond
  const bgPickerWrapper = backgroundColorInput.parentElement;
  bgPickerWrapper.style.backgroundColor = backgroundColorInput.value;
  backgroundColorInput.addEventListener("input", (e) => {
    bgPickerWrapper.style.backgroundColor = e.target.value;
    const datalist = document.getElementById("dominant-colors");
    if (datalist) {
      const firstOption = datalist.querySelector("option");
      // The datalist is structured with the background color as the first option.
      if (firstOption) {
        firstOption.value = e.target.value;
      }
    }
  });

  // --- LOGIQUE PRINCIPALE ---

  /**
   * Redimensionne une image en conservant ses proportions.
   */
  function resizeImage(image, maxDimension) {
    let { width, height } = image;
    if (width > height) {
      if (width > maxDimension) {
        height = Math.round(height * (maxDimension / width));
        width = maxDimension;
      }
    } else {
      if (height > maxDimension) {
        width = Math.round(width * (maxDimension / height));
        height = maxDimension;
      }
    }
    return { width, height };
  }

  /**
   * Crée la version dégradée (pixelisée) de l'image source et met à jour la palette.
   * C'est le nouveau cœur du prétraitement.
   */
  function updateDegradedSourceAndPalette() {
    if (!img.src) return;
    document.body.style.cursor = "wait";
    try {
      const pixelSize = parseInt(pixelSizeInput.value, 10);
      if (pixelSize <= 0) {
          console.error("Invalid pixelSize (<= 0).");
          return;
      }

      console.log(
        `Dégradation de la source pour une trame de ${pixelSize}px...`
      );

      const sourceWidth = sourceCanvas.width;
      const sourceHeight = sourceCanvas.height;

      const degradedWidth = Math.ceil(sourceWidth / pixelSize);
      const degradedHeight = Math.ceil(sourceHeight / pixelSize);
      degradedSourceCanvas.width = degradedWidth;
      degradedSourceCanvas.height = degradedHeight;

      for (let y = 0; y < degradedHeight; y++) {
        for (let x = 0; x < degradedWidth; x++) {
          const avgColor = getAverageColorForArea(
            x * pixelSize,
            y * pixelSize,
            pixelSize,
            pixelSize
          );
          degradedSourceCtx.fillStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${
            avgColor.b
          }, ${avgColor.a / 255})`;
          degradedSourceCtx.fillRect(x, y, 1, 1);
        }
      }
      console.log(
        `Source dégradée créée (${degradedWidth}x${degradedHeight} pixels).`
      );

      setupPaletteControls();
    } finally {
      document.body.style.cursor = "default";
    }
  }

  /**
   * Génère l'image finale en utilisant la source dégradée et la palette configurée.
   */
  async function processImage(shouldRedrawImmediately = true) {
    if (degradedSourceCanvas.width === 0) {
      alert(
        "La source dégradée n'a pas été calculée. Changez la taille de la trame."
      );
      return;
    }

    document.body.style.cursor = "wait";
    try {
      const paletteRgbColors = paletteSettings.map((p) => ({
        ...p,
        rgb: hexToRgb(p.color),
      }));
      if (paletteRgbColors.length === 0) return;

      const degradedData = degradedSourceCtx.getImageData(
        0,
        0,
        degradedSourceCanvas.width,
        degradedSourceCanvas.height
      ).data;
      
      gridBrushIndices = []; // Réinitialiser le mappage

      for (let i = 0; i < degradedData.length; i += 4) {
        const r = degradedData[i];
        const g = degradedData[i + 1];
        const b = degradedData[i + 2];
        const a = degradedData[i + 3];

        if (a === 0) {
          gridBrushIndices.push(-1); // -1 pour les pixels transparents
          continue;
        }

        const avgColor = { r, g, b };
        
        let closestPaletteIndex = 0;
        let minDistance = Infinity;

        paletteRgbColors.forEach((entry, index) => {
          if (!entry.rgb) return;
          const dist = colorDistance(avgColor, entry.rgb);
          if (dist < minDistance) {
            minDistance = dist;
            closestPaletteIndex = index;
          }
        });
        gridBrushIndices.push(closestPaletteIndex);
      }
      
      console.log("Mappage des couleurs terminé. Lancement du redessin.");
      if (shouldRedrawImmediately) {
        await redrawResult(); // Appel de la nouvelle fonction de dessin
      }
      
    } finally {
      document.body.style.cursor = "default";
    }
  }

  /**
   * (Nouvelle fonction) Redessine le canevas de résultat en utilisant le mappage de pinceaux pré-calculé.
   */
  async function redrawResult() {
    document.body.style.cursor = "wait";
    try {
      const pixelSize = parseInt(pixelSizeInput.value, 10);
      const backgroundColor = backgroundColorInput.value;

      resultCtx.fillStyle = backgroundColor;
      resultCtx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

      if (gridBrushIndices.length === 0) return;

      const drawPromises = [];

      for (let i = 0; i < gridBrushIndices.length; i++) {
        const brushIndex = gridBrushIndices[i];
        if (brushIndex === -1) continue; // Ignorer les pixels transparents

        const settings = paletteSettings[brushIndex];
        if (settings && SVG_DATA[settings.svgFile]) {
          const x = (i % degradedSourceCanvas.width) * pixelSize;
          const y = Math.floor(i / degradedSourceCanvas.width) * pixelSize;

          drawPromises.push(
            drawSvg(
              resultCtx,
              SVG_DATA[settings.svgFile],
              x,
              y,
              pixelSize * settings.size,
              settings.color
            )
          );
        }
      }

      await Promise.all(drawPromises);
      console.log("Génération terminée !");
    } finally {
      document.body.style.cursor = "default";
    }
  }

  // --- FONCTIONS DE MISE EN PLACE DE L'UI ---

  function getStyledSvg(svgText, color) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Find all shape elements and set their fill attribute
    const shapes = svgElement.querySelectorAll("path, circle, rect, polygon, line, polyline");
    shapes.forEach(shape => {
      shape.setAttribute("fill", color);
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgElement);
  }

  function setupPaletteControls() {
    if (!controlsContainer) {
      console.error("Le conteneur #svgControls n'a pas été trouvé.");
      return;
    }

    const imageData = degradedSourceCtx.getImageData(
      0,
      0,
      degradedSourceCanvas.width,
      degradedSourceCanvas.height
    );
    const dominantColors = getDominantColors(imageData, 8);

    controlsContainer.innerHTML = "";

    paletteSettings = [];
    for (let i = 0; i < 8; i++) {
      paletteSettings.push({
        svgFile: SVG_FILES[i % SVG_FILES.length],
        color: dominantColors[i % dominantColors.length] || "#000000",
        size: 1.6, // Adjusted default size for increased visual density
      });
    }

    const listContainer = document.createElement("div");
    listContainer.className = "palette-control-list";

    paletteSettings.forEach((settings, index) => {
      const controlEl = document.createElement("div");
      controlEl.className = "palette-control";

      const svgOptions = SVG_FILES.map((file, idx) => {
        const displayName = `Forme ${idx + 1}`;
        const isSelected = file === settings.svgFile ? "selected" : "";
        return `<option value="${file}" ${isSelected}>${displayName}</option>`;
      }).join("");

      const defaultSvgContent = settings.svgFile
        ? getStyledSvg(SVG_DATA[settings.svgFile], settings.color)
        : "";

      controlEl.innerHTML = `
                <div class="palette-control-header">
                     <strong>Pinceau ${index + 1}</strong>
                </div>
                <div class="palette-row">
                    <label>Forme:</label>
                    <div class="shape-selector-container">
                        <div class="shape-preview">${defaultSvgContent}</div>
                        <select class="svg-select">${svgOptions}</select>
                    </div>
                </div>
                 <div class="palette-row">
                    <label for="color-${index}">Couleur:</label>
                    <input type="color" id="color-${index}" class="color-input" value="${
        settings.color
      }" list="dominant-colors">
                </div>
                <div class="palette-row">
                    <label for="size-${index}">Taille:</label>
                    <input type="range" id="size-${index}" class="size-slider" min="0.2" max="3.0" step="0.05" value="${
        settings.size
      }">
                </div>
            `;

      const selectEl = controlEl.querySelector(".svg-select");
      const previewEl = controlEl.querySelector(".shape-preview");
      const colorEl = controlEl.querySelector(".color-input");
      const sizeEl = controlEl.querySelector(".size-slider");

      selectEl.addEventListener("change", (e) => {
        const newSvgFile = e.target.value;
        paletteSettings[index].svgFile = newSvgFile;
        if (SVG_DATA[newSvgFile]) {
          previewEl.innerHTML = getStyledSvg(
            SVG_DATA[newSvgFile],
            paletteSettings[index].color
          );
        }
      });

      colorEl.addEventListener("input", (e) => {
        paletteSettings[index].color = e.target.value;
      });

      sizeEl.addEventListener("input", (e) => {
        paletteSettings[index].size = parseFloat(e.target.value);
      });

      listContainer.appendChild(controlEl);
    });

    const datalist = document.createElement("datalist");
    datalist.id = "dominant-colors";
    
    const backgroundColor = backgroundColorInput.value;
    let datalistHTML = `<option value="${backgroundColor}"></option>`;
    datalistHTML += dominantColors
      .map((c) => `<option value="${c}"></option>`)
      .join("");
    datalist.innerHTML = datalistHTML;

    controlsContainer.appendChild(datalist);
    controlsContainer.appendChild(listContainer);
  }

  // --- FONCTIONS UTILITAIRES ---

  function getAverageColorForArea(x, y, width, height) {
    const imageData = sourceCtx.getImageData(x, y, width, height);
    const data = imageData.data;
    let r = 0,
      g = 0,
      b = 0,
      a = 0,
      count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
      count++;
    }
    if (count === 0) return { r: 0, g: 0, b: 0, a: 0 };
    return {
      r: Math.floor(r / count),
      g: Math.floor(g / count),
      b: Math.floor(b / count),
      a: Math.floor(a / count),
    };
  }

  function getDominantColors(imageData, colorCount) {
    const MIN_COLOR_DISTANCE = 30;

    const data = imageData.data;
    const colorMap = {};
    const bitShift = 4;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 128) continue;
      const r = data[i] >> bitShift;
      const g = data[i + 1] >> bitShift;
      const b = data[i + 2] >> bitShift;
      const key = (r << (bitShift * 2)) | (g << bitShift) | b;
      if (!colorMap[key]) colorMap[key] = { r: 0, g: 0, b: 0, count: 0 };
      colorMap[key].r += data[i];
      colorMap[key].g += data[i + 1];
      colorMap[key].b += data[i + 2];
      colorMap[key].count++;
    }
    const sortedColorGroups = Object.values(colorMap).sort(
      (a, b) => b.count - a.count
    );

    const finalPalette = [];
    const rejectedColors = [];

    for (const colorGroup of sortedColorGroups) {
      if (finalPalette.length >= colorCount) break;

      const r = Math.floor(colorGroup.r / colorGroup.count);
      const g = Math.floor(colorGroup.g / colorGroup.count);
      const b = Math.floor(colorGroup.b / colorGroup.count);
      const candidateHex = rgbToHex(r, g, b);

      let isTooSimilar = false;
      for (const paletteHex of finalPalette) {
        const paletteRgb = hexToRgb(paletteHex);
        if (
          paletteRgb &&
          colorDistance({ r, g, b }, paletteRgb) < MIN_COLOR_DISTANCE
        ) {
          isTooSimilar = true;
          break;
        }
      }

      if (!isTooSimilar) {
        finalPalette.push(candidateHex);
      } else {
        rejectedColors.push(candidateHex);
      }
    }

    let i = 0;
    while (finalPalette.length < colorCount && i < rejectedColors.length) {
      if (!finalPalette.includes(rejectedColors[i])) {
        finalPalette.push(rejectedColors[i]);
      }
      i++;
    }

    if (finalPalette.length < colorCount && !finalPalette.includes("#000000"))
      finalPalette.push("#000000");
    if (finalPalette.length < colorCount && !finalPalette.includes("#ffffff"))
      finalPalette.push("#ffffff");

    return finalPalette;
  }

  function colorDistance(rgb1, rgb2) {
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function hexToRgb(hex) {
    const parts = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!parts) return null;
    return {
      r: parseInt(parts[1], 16),
      g: parseInt(parts[2], 16),
      b: parseInt(parts[3], 16),
    };
  }

  function drawSvg(ctx, svgText, x, y, size, color) {
    return new Promise((resolve, reject) => {
      const style = `<style> * { fill: ${color} !important; } </style>`;
      const styledSvg = svgText.replace(/(<svg[^>]*>)/, `$1${style}`);
      const svgBlob = new Blob([styledSvg], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const svgImage = new Image();

      const viewBoxMatch = svgText.match(
        /viewBox="([0-9.]+) ([0-9.]+) ([0-9.]+) ([0-9.]+)"/
      );
      let aspect = 1.0;
      if (viewBoxMatch && viewBoxMatch[3] && viewBoxMatch[4]) {
        const vbW = parseFloat(viewBoxMatch[3]);
        const vbH = parseFloat(viewBoxMatch[4]);
        if (vbH > 0) {
          aspect = vbW / vbH;
        }
      }

      const RASTER_RESOLUTION = 100;
      svgImage.width = RASTER_RESOLUTION;
      svgImage.height = RASTER_RESOLUTION / aspect;

      svgImage.onload = () => {
        const effectiveSize = size;

        let targetW = effectiveSize;
        let targetH = effectiveSize;
        if (aspect > 1) {
          targetH = effectiveSize / aspect;
        } else {
          targetW = effectiveSize * aspect;
        }

        const cell_size = parseInt(pixelSizeInput.value, 10);
        const centeredX = x + (cell_size - targetW) / 2;
        const centeredY = y + (cell_size - targetH) / 2;

        ctx.drawImage(svgImage, centeredX, centeredY, targetW, targetH);
        URL.revokeObjectURL(url);
        resolve();
      };

      svgImage.onerror = (err) => {
        console.error("Erreur de chargement de l'image SVG via blob URL.", err);
        URL.revokeObjectURL(url);
        reject(err);
      };

      svgImage.src = url;
    });
  }

  function sanitizeForId(text) {
    // Replaces spaces with underscores and dots with hyphens to create a valid XML ID
    return text.replace(/\s/g, '_').replace(/\./g, '-');
  }

    function generateAndDownloadSVG() {
      console.log("Génération du SVG (mode de compatibilité maximale)...");
      document.body.style.cursor = 'wait';
      try {
          if (gridBrushIndices.length === 0) {
              alert("Veuillez d'abord générer l'image sur le canevas.");
              return;
          }
  
          const pixelSize = parseInt(pixelSizeInput.value, 10);
          const backgroundColor = backgroundColorInput.value;
          const finalWidth = resultCanvas.width;
          const finalHeight = resultCanvas.height;
  
          let svgContent = `<svg width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}" xmlns="http://www.w3.org/2000/svg">`;
          svgContent += `<rect width="100%" height="100%" fill="${backgroundColor}" />`;
  
          for (let i = 0; i < gridBrushIndices.length; i++) {
              const brushIndex = gridBrushIndices[i];
              if (brushIndex === -1) continue; // Ignorer les pixels transparents
  
              const settings = paletteSettings[brushIndex];
              if (settings && SVG_DATA[settings.svgFile]) {
                  const gridX = i % degradedSourceCanvas.width;
                  const gridY = Math.floor(i / degradedSourceCanvas.width);
  
                  const x = gridX * pixelSize;
                  const y = gridY * pixelSize;
  
                  const size = pixelSize * settings.size;
                  const svgText = SVG_DATA[settings.svgFile];
  
                  const innerSvgContentMatch = svgText.match(/<svg[^>]*>(.*)<\/svg>/s);
                  if (!innerSvgContentMatch) continue;
                  const pathContent = innerSvgContentMatch[1];
  
                  const viewBoxMatch = svgText.match(/viewBox="([0-9.]+) ([0-9.]+) ([0-9.]+) ([0-9.]+)"/);
                  let aspect = 1.0;
                  let vbW = 1, vbH = 1;
                  if (viewBoxMatch && viewBoxMatch[3] && viewBoxMatch[4]) {
                      vbW = parseFloat(viewBoxMatch[3]);
                      vbH = parseFloat(viewBoxMatch[4]);
                      if (vbW > 0 && vbH > 0) {
                         aspect = vbW / vbH;
                      }
                  }
  
                  let targetW = size;
                  let targetH = size;
                  if (aspect > 1) {
                      targetH = size / aspect;
                  } else {
                      targetW = size * aspect;
                  }
  
                  const centeredX = x + (pixelSize - targetW) / 2;
                  const centeredY = y + (pixelSize - targetH) / 2;
  
                  const scaleX = vbW !== 0 ? targetW / vbW : 0;
                  const scaleY = vbH !== 0 ? targetH / vbH : 0;
  
                  // Inject the fill color directly into the path(s)
                  const pathWithFill = pathContent.replace(/<path/g, `<path fill="${settings.color}"`);
  
                  // Wrap in a <g> tag to apply transformations
                  svgContent += `<g transform="translate(${centeredX} ${centeredY}) scale(${scaleX} ${scaleY})">${pathWithFill}</g>`;
              }
          }
  
          svgContent += '</svg>';
  
          // Create blob and trigger download
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'tramage-image.svg';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          console.log("Téléchargement SVG initié.");
  
      } finally {
          document.body.style.cursor = 'default';
      }
    } // Missing closing brace for generateAndDownloadSVG()
  function generateAndDownloadPDF() {
    console.log("Génération du PDF...");
    document.body.style.cursor = 'wait';
    try {
        if (gridBrushIndices.length === 0) {
            alert("Veuillez d'abord générer l'image sur le canevas.");
            return;
        }

        const pixelSize = parseInt(pixelSizeInput.value, 10);
        const backgroundColor = backgroundColorInput.value;
        const finalWidth = resultCanvas.width;
        const finalHeight = resultCanvas.height;

        let svgContentString = `<svg width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}" xmlns="http://www.w3.org/2000/svg">`;
        svgContentString += `<rect width="100%" height="100%" fill="${backgroundColor}" />`;

        for (let i = 0; i < gridBrushIndices.length; i++) {
            const brushIndex = gridBrushIndices[i];
            if (brushIndex === -1) continue;

            const settings = paletteSettings[brushIndex];
            if (settings && SVG_DATA[settings.svgFile]) {
                const gridX = i % degradedSourceCanvas.width;
                const gridY = Math.floor(i / degradedSourceCanvas.width);

                const x = gridX * pixelSize;
                const y = gridY * pixelSize;

                const size = pixelSize * settings.size;
                const svgText = SVG_DATA[settings.svgFile];

                const innerSvgContentMatch = svgText.match(/<svg[^>]*>(.*)<\/svg>/s);
                if (!innerSvgContentMatch) continue;
                const pathContent = innerSvgContentMatch[1];

                const viewBoxMatch = svgText.match(/viewBox="([0-9.]+)\s([0-9.]+)\s([0-9.]+)\s([0-9.]+)"/);
                let aspect = 1.0;
                let vbW = 1, vbH = 1;
                if (viewBoxMatch && viewBoxMatch[3] && viewBoxMatch[4]) {
                    vbW = parseFloat(viewBoxMatch[3]);
                    vbH = parseFloat(viewBoxMatch[4]);
                    if (vbW > 0 && vbH > 0) {
                       aspect = vbW / vbH;
                    }
                }

                let targetW = size;
                let targetH = size;
                if (aspect > 1) {
                    targetH = size / aspect;
                } else {
                    targetW = size * aspect;
                }

                const centeredX = x + (pixelSize - targetW) / 2;
                const centeredY = y + (pixelSize - targetH) / 2;

                const scaleX = vbW !== 0 ? targetW / vbW : 0;
                const scaleY = vbH !== 0 ? targetH / vbH : 0;

                const pathWithFill = pathContent.replace(/<path/g, `<path fill="${settings.color}"`);

                svgContentString += `<g transform="translate(${centeredX} ${centeredY}) scale(${scaleX} ${scaleY})">${pathWithFill}</g>`;
            }
        }
        svgContentString += '</svg>';

        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const orientation = finalWidth > finalHeight ? 'l' : 'p';
        const doc = new jsPDF(orientation, 'pt', [finalWidth, finalHeight]);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = finalWidth;
        tempCanvas.height = finalHeight;
        const tempCtx = tempCanvas.getContext('2d');

        const svgImage = new Image();
        const svgBlob = new Blob([svgContentString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        svgImage.onload = () => {
            tempCtx.drawImage(svgImage, 0, 0, finalWidth, finalHeight);
            const imgData = tempCanvas.toDataURL('image/png');
            URL.revokeObjectURL(url);

            doc.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
            doc.save("tramage-image.pdf");
            console.log("Téléchargement PDF initié.");
        };

        svgImage.onerror = (err) => {
            console.error("Erreur de chargement de l'image SVG pour le PDF.", err);
            URL.revokeObjectURL(url);
        };

        svgImage.src = url;

    } finally {
        document.body.style.cursor = 'default';
    }
  }
});
