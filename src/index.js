import Navigo from "navigo";
import { recetas } from "../data.js";
// import { recetas } from "./data2.js";

const router = new Navigo("/", { hash: true });

function mostrarPortada() {
    const app = document.getElementById("app");
    if (!app) return;

    const recetasDestacadas = recetas.slice(0, 3);

    app.innerHTML = `
    <section class="portada">
      <h1 class="titulo-portada">Platos tradicionales de Aragón</h1>
      <a href="#" id="boton-receta-aleatoria" class="boton-ir-recetas">Ver receta del día</a>
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
              <img src="${receta.imagen}" alt="${receta.titulo}" />
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
                  <img src="${receta.imagen}" alt="${receta.titulo}" />
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

    // console.log(receta);

    app.innerHTML = `
      <section class="detalle-receta">
        <h1>${receta.titulo}</h1>
        <img src="${receta.imagen}" alt="${receta.titulo}" />

        <p class="descripcion">${receta.descripcion}</p>
  
        <h2>Ingredientes</h2>
        <ul>
          ${receta.ingredientes.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
  
        <h2>Preparación</h2>
        <p>${receta.preparacion}</p>
      </section>
    `;
}

function mostrarSobre() {
    const app = document.getElementById("app");
    if (app) {
        app.innerHTML = `
        <section class="sobre-nosotros">
          <h1>Sobre nosotros</h1>
          <p>Este proyecto ha sido desarrollado como parte de la asignatura de HTML y CSS del Master de desarrollo web de la Universitat Oberta de Catalunya (UOC).</p>
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
            const slug = encodeURIComponent(
                recetaAleatoria.titulo.toLowerCase()
            );
            window.location.hash = `#/recetas/${slug}`;
        }

        if (target && target.id === "boton-receta-aleatoria") {
            e.preventDefault();
            const recetaAleatoria =
                recetas[Math.floor(Math.random() * recetas.length)];
            const slug = encodeURIComponent(
                recetaAleatoria.titulo.toLowerCase()
            );
            window.location.hash = `#/recetas/${slug}`;
        }
    });
});
