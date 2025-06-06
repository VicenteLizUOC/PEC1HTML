import Navigo from "navigo";
import { recetas } from "../data.js";

const router = new Navigo("/", { hash: true });

function mostrarPortada() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <section class="portada">
      <h1 class="titulo-portada">Platos tradicionales de Aragón</h1>
      <a href="#" id="boton-receta-aleatoria" class="boton-ir-recetas">Inspírame</a>
    </section>

    <section class="intro-gastro">
      <h2>
      <div class="imagen-clip"></div>  
      Un viaje a través del sabor
      </h2>
      <p>La gastronomía aragonesa combina tradición, productos locales y el arte de cocinar con paciencia. Desde sus carnes asadas hasta sus postres únicos, cada plato cuenta una historia.</p>
    </section>

    <section class="destacados">
      <div class="destacado-container">
        <a class="destacado destacado-ternasco" href="#/recetas/ternasco-de-aragon">
          <div class="image-container"></div>
          <div class="info">
            <h3>Ternasco de Aragón</h3>
            <p>Un clásico aragonés al horno, jugoso y lleno de sabor.</p>
          </div>
        </a>
      </div>

      <div class="destacado-container">
        <a class="destacado destacado-trenza" href="#/recetas/trenza-de-almudevar">
          <div class="image-container"></div>
          <div class="info">
            <h3>Trenza de Almudévar</h3>
            <p>Dulce típico de hojaldre con frutos secos.</p>
          </div>
        </a>
      </div>

      <div class="destacado-container">
        <a class="destacado destacado-cordero" href="#/recetas/cordero-pastora">
          <div class="image-container"></div>
          <div class="info">
            <h3>Cordero a la pastora</h3>
            <p>Estofado de cordero tradicional con verduras.</p>
          </div>
        </a>
      </div>
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
              <a class="card-receta card-${receta.urlName}" href="#/recetas/${encodeURIComponent(
              receta.urlName.toLowerCase()
            )}">
                <div class="image-container"></div>
                <div class="info">
                  <h2>${receta.titulo}</h2>
                  <p>${receta.descripcion}</p>
                </div>
              </a>
            `
          )
          .join("")}
      </div>
    `;
  }
}


function mostrarDetalleReceta() {
  const app = document.getElementById("app");
  if (!app) return;

  const url = window.location.href;
  const ultimaParte = url.split('/').pop();
  console.log(ultimaParte);

  const receta = recetas.find((r) => r.urlName.toLowerCase() === ultimaParte);

  if (!receta) {
    app.innerHTML = "<h1>Receta no encontrada</h1>";
    return;
  }

  app.innerHTML = `
    <section class="detalle-receta">
      <h1>${receta.titulo}</h1>
      
      <div class="carrusel">
        <div class="carrusel-inner">
          <div class="carruselImage-${ultimaParte}"></div>
          <div class="carruselImage-2"></div>
          <div class="carruselImage-3"></div>
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


  const carruselItems = document.querySelectorAll(`.carrusel-inner > div`);
  let index = 0;

  function showImage(i) {
    carruselItems.forEach((item, idx) => {
      item.style.display = idx === i ? "block" : "none";
    });
  }

  showImage(index);

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % carruselItems.length;
    showImage(index);
  });

  document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + carruselItems.length) % carruselItems.length;
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

function mostrarEnlaces() {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <h1 class="lista-titulo">Lista de enlaces y fuentes</h1>
      <div class="lista-enlaces">
        ${[
          {
            url: "https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2024/11/22/ternasco-asado-con-patatas-gsc1.jpeg",
            fuente: "Heraldo.es",
            licencia: "Sacada de la cuenta pública de Instagram del Ternasco de Aragón IGP",
          },
          {
            url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Bandera_de_Arag%C3%B3n_ondeando_%28Navard%C3%BAn%2C_Zaragoza%29.jpg",
            fuente: "Wikipedia",
            licencia: "Creative Commons (CC BY-SA 3.0)",
          },
          {
            url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Localizaci%C3%B3n_de_Arag%C3%B3n.svg",
            fuente: "Wikipedia",
            licencia: "Creative Commons (CC BY-SA 3.0)",
          },
          {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQDRzHsHvu-gXuq32Yy-K6NDibT-Nff_8RA&s",
            fuente: "Desconocida / Google",
            licencia: "Permitido por Adobe para productos no comerciales",
          },
          {
            url: "https://recetasdecocina.elmundo.es/wp-content/uploads/2016/10/receta-pollo-al-chilindron.jpg",
            fuente: "Elmundo.es",
            licencia: "Uso informativo",
          },
          {
            url: "https://www.alberguemilpes.com/wp-content/uploads/2019/06/receta-bacalao-al-ajoarriero.jpg",
            fuente: "Alberguemilpes.com",
            licencia: "Uso informativo",
          },
          {
            url: "https://cocina-familiar.com/wp-content/uploads/2024/06/IMG_8088.jpg",
            fuente: "Cocina-familiar.com",
            licencia: "Uso informativo",
          },
          {
            url: "https://www.espancomido.com/wp-content/uploads/2014/02/Huevos-al-salmorejo.jpg",
            fuente: "Espancomido.com",
            licencia: "Uso informativo",
          },
          {
            url: "https://content-cocina.lecturas.com/medio/2024/03/30/trenza-de-almudevar_00000000_5d19875f_240330122856_1200x1200.jpg",
            fuente: "Lecturas.com",
            licencia: "Uso informativo",
          },
          {
            url: "https://www.huescalamagia.es/blog/wp-content/uploads/2013/03/crespillos.jpg",
            fuente: "Huescalamagia.es",
            licencia: "Uso informativo",
          },
        ]
          .map(
            (img) => `
              <div class="item-enlace">
                <div class="info-enlace">
                  <p><strong>URL:</strong> <a href="${img.url}" target="_blank" rel="noopener">${img.url}</a></p>
                  <p><strong>Fuente:</strong> ${img.fuente}</p>
                  <p><strong>Licencia:</strong> ${img.licencia}</p>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}



router
  .on("/", mostrarPortada)
  .on("/recetas", mostrarRecetas)
  .on("/recetas/:nombre", mostrarDetalleReceta)
  .on("/sobre", mostrarSobre)
  .on("/enlaces", mostrarEnlaces)
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
      const slug = encodeURIComponent(recetaAleatoria.urlName.toLowerCase());
      window.location.hash = `#/recetas/${slug}`;
    }

    if (target && target.id === "boton-receta-aleatoria") {
      e.preventDefault();
      const recetaAleatoria =
        recetas[Math.floor(Math.random() * recetas.length)];
      const slug = encodeURIComponent(recetaAleatoria.urlName.toLowerCase());
      window.location.hash = `#/recetas/${slug}`;
    }
  });
});
