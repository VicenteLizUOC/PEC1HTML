import Navigo from "navigo";
import { recetas } from "../data.js";
// import { recetas } from "./data2.js";
// Remove-Item -Recurse -Force .parcel-cache, dist

const router = new Navigo("/", { hash: true });

function mostrarPortada() {
  const app = document.getElementById("app");
  if (!app) return;

  const recetasDestacadas = recetas.slice(0, 3);

  app.innerHTML = `
    <section class="portada">
      <h1 class="titulo-portada">Platos tradicionales de Aragón</h1>
      <a href="#" id="boton-receta-aleatoria" class="boton-ir-recetas">Inspírame</a>
    </section>

    <section class="intro-gastro">
      <h2>Un viaje a través del sabor</h2>
      <p>La gastronomía aragonesa combina tradición, productos locales y el arte de cocinar con paciencia. Desde sus carnes asadas hasta sus postres únicos, cada plato cuenta una historia.</p>
    </section>

    <section class="destacados">
      ${recetasDestacadas
        .map(
          (receta) => `
            <a class="destacado" href="#/recetas/${encodeURIComponent(
              receta.titulo.toLowerCase()
            )}">
              <img src="${receta.imagenes[0]}" alt="${receta.titulo}" />
              <h3>${receta.titulo}</h3>
              <p>${receta.descripcion}</p>
            </a>
          `
        )
        .join("")}
    </section>
  `;
}

function mostrarRecetas() {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <h1 class="titulo-recetas">Recetas tradicionales</h1>
      <div class="grid-recetas">
        ${recetas
          .map(
            (receta) => `
              <a class="card-receta" href="#/recetas/${encodeURIComponent(
                receta.titulo.toLowerCase()
              )}">
                <img src="${receta.imagenes[0]}" alt="${receta.titulo}" />
                <h2>${receta.titulo}</h2>
              </a>
            `
          )
          .join("")}
      </div>
    `;
  }
}

function mostrarDetalleReceta({ data }) {
  const app = document.getElementById("app");
  if (!app) return;

  const nombreReceta = decodeURIComponent(data.nombre).toLowerCase();
  const receta = recetas.find((r) => r.titulo.toLowerCase() === nombreReceta);

  if (!receta) {
    app.innerHTML = "<h1>Receta no encontrada</h1>";
    return;
  }

  app.innerHTML = `
    <section class="detalle-receta">
      <h1>${receta.titulo}</h1>
      
      <div class="carrusel">
        <div class="carrusel-inner">
          ${receta.imagenes
            .map((item) => `<img src="${item}" alt="${receta.titulo}">`)
            .join("")}
        </div>
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
      </div>

      <p class="descripcion">${receta.descripcion}</p>

      <h2>Ingredientes</h2>
      <ul>
        ${receta.ingredientes.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>

      <h2>Preparación</h2>
      <p>${receta.preparacion}</p>
      
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-WtcxAcY5AM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </section>
  `;

  const images = document.querySelectorAll(".carrusel-inner img");
  let index = 0;

  function showImage(i) {
    images.forEach((img, idx) => {
      img.style.display = idx === i ? "block" : "none";
    });
  }

  showImage(index);

  document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });
}

function mostrarSobre() {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
        <section class="sobre-nosotros">
          <h1>Sobre nosotros</h1>
          <p>Este proyecto ha sido desarrollado como parte de la asignatura de HTML y CSS del Master de Desarrollo de Sitios y Aplicaciones Web de la Universitat Oberta de Catalunya (UOC).</p>
          <a href="https://surl.li/zqcuxd">Documentación</a>
        </section>
      `;
  }
}

router
  .on("/", mostrarPortada)
  .on("/recetas", mostrarRecetas)
  .on("/recetas/:nombre", mostrarDetalleReceta)
  .on("/sobre", mostrarSobre)
  .notFound(() => {
    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = "<h1>404 - Página no encontrada</h1>";
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  router.resolve();

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.id === "random-receta") {
      e.preventDefault();
      const recetaAleatoria =
        recetas[Math.floor(Math.random() * recetas.length)];
      const slug = encodeURIComponent(recetaAleatoria.titulo.toLowerCase());
      window.location.hash = `#/recetas/${slug}`;
    }

    if (target && target.id === "boton-receta-aleatoria") {
      e.preventDefault();
      const recetaAleatoria =
        recetas[Math.floor(Math.random() * recetas.length)];
      const slug = encodeURIComponent(recetaAleatoria.titulo.toLowerCase());
      window.location.hash = `#/recetas/${slug}`;
    }
  });
});
