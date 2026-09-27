/* ============================================================
   Mapa de procesos ISO 9001 — Fase 1
   Datos embebidos + render de bandas + expand/colapso independiente
   Identificadores en inglés, comentarios en español.
   ============================================================ */

/* --- Carpeta de iconos (relativa al index.html) --- */
const ICON_BASE = "img/iconos";

/* --- Datos del mapa (objeto embebido; editar aquí para cambiar procesos) ---
   Cada proceso: { name, icon }  (icon = nombre de archivo en img/iconos/)
   Campo opcional futuro: subtitle -> se muestra a 12px si existe. */
const PROCESS_MAP = [
  {
    id: "strategic",
    name: "Procesos estratégicos",
    colorVar: "--strategic",
    processes: [
      { name: "Gerencia", icon: "gerencia.png" },
      { name: "Sistema Integrado de Gestión", icon: "sistema-integrado-gestion.png" },
      { name: "Auditoría", icon: "auditoria.png" },
      { name: "Sagrilaf", icon: "sagrilaf.png" },
      { name: "Gestión Jurídica", icon: "gestion-juridica.png" }
    ]
  },
  {
    id: "support",
    name: "Procesos de apoyo",
    colorVar: "--support",
    processes: [
      {
        name: "Administrativos",
        icon: "administrativos.png",
        // Campos de ejemplo (Fase 2): solo Misionales/Apoyo tienen ficha de detalle.
        description: "Provee los recursos, infraestructura y servicios administrativos que soportan la operación de los demás procesos.",
        responsible: "Jefe Administrativo"
      },
      {
        name: "Financieros",
        icon: "financieros.png",
        description: "Planifica y controla los recursos financieros de la organización, incluyendo presupuesto, tesorería y cartera.",
        responsible: "Jefe Financiero"
      }
    ]
  },
  {
    id: "core",
    name: "Procesos misionales",
    colorVar: "--core",
    processes: [
      {
        name: "Comercial",
        icon: "comercial.png",
        description: "Gestiona la relación con el cliente desde la oferta hasta el cierre de la venta, asegurando el cumplimiento de los requisitos comerciales.",
        responsible: "Jefe Comercial"
      },
      {
        name: "Posventa",
        icon: "posventa.png",
        description: "Atiende garantías, reclamos y soporte posteriores a la venta, asegurando la satisfacción continua del cliente.",
        responsible: "Coordinador de Posventa"
      }
    ]
  },
  {
    id: "improvement",
    name: "Procesos de evaluación y mejora",
    colorVar: "--improvement",
    processes: [
      { name: "Seguimiento y medición", icon: "seguimiento-medicion.png" },
      { name: "Auditoría interna", icon: "auditoria-interna.png" },
      { name: "Gestión de no conformidades", icon: "no-conformidades.png" },
      { name: "Acciones correctivas y preventivas", icon: "acciones-correctivas-preventivas.png" },
      { name: "Mejora continua", icon: "mejora-continua.png" }
    ]
  }
];

/* --- Partes interesadas: misma tarjeta (icono + lista) a cada lado del mapa,
   con un título distinto por lado. --- */
const STAKEHOLDERS = {
  // Salto de línea forzado (no el wrap natural) para que las dos tarjetas
  // sigan siempre el mismo patrón: palabra corta arriba, "partes interesadas" abajo.
  titleLeft: "Solicitudes<br>partes interesadas",
  titleRight: "Satisfacción<br>partes interesadas",
  icon: "partes-interesadas.png", // aún no existe -> cae al placeholder, igual que el resto
  items: ["Cliente", "Empleados", "Proveedores", "Accionistas", "Entidades de control", "Comunidad"]
};

/* Las dos tarjetas comparten UNA sola altura: el punto medio del bloque
   formado por ambas bandas juntas (Apoyo + Misionales), no el centro de cada
   banda por separado. */
const STAKEHOLDER_TOP_BAND_ID = "support";  // Procesos de apoyo
const STAKEHOLDER_BOTTOM_BAND_ID = "core";  // Procesos misionales

/* --- SVG del chevron (indicador de expand/colapso) --- */
const CHEVRON_SVG =
  '<svg class="band-chevron" viewBox="0 0 24 24" fill="none" ' +
  'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" ' +
  'stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

/* --- Placeholder neutro cuando el archivo de icono aún no existe --- */
function buildIconFallback() {
  const box = document.createElement("span");
  box.className = "card-icon-fallback";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/>' +
    '<path d="M8 8h8M8 12h8M8 16h5"/></svg>';
  return box;
}

/* --- Construye una tarjeta de proceso dentro de su slot de 130px ---
   Solo los procesos con datos de detalle (description/responsible, hoy
   Misionales y Apoyo) son clicables y abren la ficha lateral (Fase 2);
   el resto queda igual que en Fase 1, sin interacción. */
function buildProcessCard(process) {
  const slot = document.createElement("div");
  slot.className = "card-slot";

  const hasDetail = Boolean(process.description || process.responsible);

  const card = document.createElement("div");
  card.className = hasDetail ? "process-card has-detail" : "process-card";

  // Contenedor de ícono de altura fija: alinea la línea superior de todos los íconos
  const iconWrap = document.createElement("div");
  iconWrap.className = "card-icon-wrap";

  // Ícono: intenta cargar el archivo real; si falla, muestra el placeholder
  const icon = document.createElement("img");
  icon.className = "card-icon";
  icon.src = `${ICON_BASE}/${process.icon}`;
  icon.alt = ""; // decorativo: el nombre ya va en el título
  icon.addEventListener("error", () => icon.replaceWith(buildIconFallback()));
  iconWrap.appendChild(icon);

  // Título (14px, hasta 2 líneas, anclado abajo)
  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = process.name;

  card.appendChild(iconWrap);
  card.appendChild(title);

  // Subtítulo opcional (12px) — solo si el dato existe
  if (process.subtitle) {
    const subtitle = document.createElement("div");
    subtitle.className = "card-subtitle";
    subtitle.textContent = process.subtitle;
    card.appendChild(subtitle);
  }

  // Interacción de la ficha de detalle: solo si el proceso trae los datos
  if (hasDetail) {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.addEventListener("click", () => openDetailPanel(process));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetailPanel(process);
      }
    });
  }

  slot.appendChild(card);
  return slot;
}

/* --- Llena una tarjeta lateral de "Partes interesadas" (icono + título + lista) ---
   Recibe el <aside> ya presente en el HTML (conserva su id/aria-label) y el
   título propio de ese lado (STAKEHOLDERS.titleLeft / .titleRight).
   Icono + título forman un botón que despliega/colapsa la lista (cerrada por
   defecto, cada tarjeta independiente, igual que las bandas). */
function populateStakeholderCard(container, title) {
  if (!container) return;

  const listId = `${container.id}-list`;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "stakeholder-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", listId);

  const iconWrap = document.createElement("div");
  iconWrap.className = "card-icon-wrap";

  const icon = document.createElement("img");
  icon.className = "card-icon";
  icon.src = `${ICON_BASE}/${STAKEHOLDERS.icon}`;
  icon.alt = "";
  icon.addEventListener("error", () => icon.replaceWith(buildIconFallback()));
  iconWrap.appendChild(icon);

  const titleEl = document.createElement("div");
  titleEl.className = "card-title";
  titleEl.innerHTML = title; // trae un <br> fijo (ver STAKEHOLDERS), no texto de usuario

  const list = document.createElement("ul");
  list.className = "stakeholder-list";
  list.id = listId;
  STAKEHOLDERS.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  toggle.appendChild(iconWrap);
  toggle.appendChild(titleEl);
  toggle.insertAdjacentHTML("beforeend", CHEVRON_SVG);

  // Al abrir/cerrar cambia el alto de la tarjeta, así que se recentra
  toggle.addEventListener("click", () => {
    const isOpen = container.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    repositionStakeholders();
  });

  container.appendChild(toggle);
  container.appendChild(list);
}

/* --- Recalcula las dos tarjetas laterales; llamar tras cualquier cambio de alto ---
   Ambas comparten LA MISMA altura: el punto medio del bloque Misionales+Apoyo,
   que (con las dos bandas de alturas similares) cae en la costura entre ambas.
   Se recalcula en vivo porque cualquier banda anterior que cambie de alto
   (incluida Estratégicos) desplaza a Misionales y Apoyo hacia abajo. */
function repositionStakeholders() {
  const left = document.getElementById("stakeholderLeft");
  const right = document.getElementById("stakeholderRight");
  const layout = document.getElementById("mapLayout");
  const topBand = document.querySelector(`.band[data-band-id="${STAKEHOLDER_TOP_BAND_ID}"]`);
  const bottomBand = document.querySelector(`.band[data-band-id="${STAKEHOLDER_BOTTOM_BAND_ID}"]`);
  if (!left || !right || !layout || !topBand || !bottomBand) return;

  // Debajo de 640px el layout se apila en una columna; no aplica posicionamiento
  // ni conectores (el SVG se oculta por CSS y además se vacía aquí).
  if (window.matchMedia("(max-width: 640px)").matches) {
    left.style.marginTop = "0";
    right.style.marginTop = "0";
    const svg = document.getElementById("mapConnectors");
    if (svg) svg.innerHTML = "";
    return;
  }

  const layoutTop = layout.getBoundingClientRect().top;
  const topBandRect = topBand.getBoundingClientRect();
  const bottomBandRect = bottomBand.getBoundingClientRect();
  const seamY = (topBandRect.bottom + bottomBandRect.top) / 2;

  // Se guarda la posición FINAL de cada tarjeta (no la leída del DOM, que
  // durante la transición de margin-top aún no es la definitiva)
  const cardTops = {};
  [left, right].forEach((card) => {
    const desiredTop = Math.max(0, Math.round(seamY - layoutTop - card.offsetHeight / 2));
    card.style.marginTop = `${desiredTop}px`;
    cardTops[card.id] = desiredTop;
  });

  drawConnectors(left, right, cardTops, seamY - layoutTop);
}

/* --- Dibuja los conectores punteados y las flechas ">" (coordenadas del layout) ---
   Izquierda: de la tarjeta sube a la primera banda y baja a la última (en ángulo
   recto), con una flecha en el hueco central apuntando a las bandas.
   Derecha: el mismo trazo en espejo, con la flecha apuntando a la tarjeta. */
function drawConnectors(left, right, cardTops, seamY) {
  const svg = document.getElementById("mapConnectors");
  const layout = document.getElementById("mapLayout");
  const bandsBox = document.getElementById("mapBands");
  const headers = bandsBox ? bandsBox.querySelectorAll(".band-header") : [];
  if (!svg || !layout || headers.length === 0) return;

  const layoutRect = layout.getBoundingClientRect();
  const bandsRect = bandsBox.getBoundingClientRect();
  const firstHeader = headers[0].getBoundingClientRect();
  const lastHeader = headers[headers.length - 1].getBoundingClientRect();

  // Altura de los tramos horizontales: centro de la cabecera de la primera/última banda
  const topY = firstHeader.top + firstHeader.height / 2 - layoutRect.top;
  const bottomY = lastHeader.top + lastHeader.height / 2 - layoutRect.top;
  const bandsLeft = bandsRect.left - layoutRect.left;
  const bandsRight = bandsRect.right - layoutRect.left;
  const edgeGap = 4; // separación entre la línea y el borde de la banda

  const leftX = left.offsetLeft + left.offsetWidth / 2;
  const rightX = right.offsetLeft + right.offsetWidth / 2;
  const leftTop = cardTops[left.id];
  const leftBottom = leftTop + left.offsetHeight;
  const rightTop = cardTops[right.id];
  const rightBottom = rightTop + right.offsetHeight;

  const dashed = [
    `M${leftX},${leftTop} V${topY} H${bandsLeft - edgeGap}`,
    `M${leftX},${leftBottom} V${bottomY} H${bandsLeft - edgeGap}`,
    `M${bandsRight + edgeGap},${topY} H${rightX} V${rightTop}`,
    `M${bandsRight + edgeGap},${bottomY} H${rightX} V${rightBottom}`
  ];

  // Flechas ">" centradas en el hueco entre tarjeta y bandas, a la altura de la costura
  const arrow = (x) => `M${x - 3},${seamY - 6} L${x + 3},${seamY} L${x - 3},${seamY + 6}`;
  const leftArrowX = (left.offsetLeft + left.offsetWidth + bandsLeft) / 2;
  const rightArrowX = (bandsRight + right.offsetLeft) / 2;

  svg.innerHTML =
    dashed.map((d) => `<path class="connector-line" d="${d}"/>`).join("") +
    `<path class="connector-arrow" d="${arrow(leftArrowX)}"/>` +
    `<path class="connector-arrow" d="${arrow(rightArrowX)}"/>`;
}

/* --- Ficha de detalle de proceso (Fase 2): panel lateral deslizante ---
   Los nodos ya existen en index.html (ocultos); aquí solo se llenan y se
   alterna la visibilidad. Guarda el elemento que abrió el panel para
   devolverle el foco al cerrar (accesibilidad). */
let detailTriggerEl = null;

function openDetailPanel(process) {
  const overlay = document.getElementById("detailOverlay");
  const panel = document.getElementById("detailPanel");
  if (!overlay || !panel) return;

  detailTriggerEl = document.activeElement;

  const iconWrap = document.getElementById("detailIconWrap");
  iconWrap.innerHTML = "";
  const icon = document.createElement("img");
  icon.className = "card-icon";
  icon.src = `${ICON_BASE}/${process.icon}`;
  icon.alt = "";
  icon.addEventListener("error", () => icon.replaceWith(buildIconFallback()));
  iconWrap.appendChild(icon);

  document.getElementById("detailTitle").textContent = process.name;
  document.getElementById("detailDescription").textContent = process.description || "—";
  document.getElementById("detailResponsible").textContent = process.responsible || "—";

  overlay.hidden = false;
  // requestAnimationFrame: aplica hidden=false antes de is-open para que la
  // transición de transform sí se anime (si se agregan a la vez, no hay transición).
  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
  });
  panel.setAttribute("aria-hidden", "false");
  document.getElementById("detailClose").focus();
}

function closeDetailPanel() {
  const overlay = document.getElementById("detailOverlay");
  const panel = document.getElementById("detailPanel");
  if (!overlay || !panel) return;

  overlay.classList.remove("is-open");
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  overlay.hidden = true;

  if (detailTriggerEl && typeof detailTriggerEl.focus === "function") {
    detailTriggerEl.focus();
  }
  detailTriggerEl = null;
}

/* --- Construye el nodo DOM de una banda --- */
function buildBand(band) {
  const wrapper = document.createElement("article");
  wrapper.className = "band";
  wrapper.dataset.bandId = band.id; // ancla de referencia para las tarjetas laterales
  wrapper.style.setProperty("--band-color", `var(${band.colorVar})`);

  const panelId = `panel-${band.id}`;
  const count = band.processes.length;

  // Cabecera clicable
  const header = document.createElement("button");
  header.className = "band-header";
  header.type = "button";
  header.setAttribute("aria-expanded", "false");
  header.setAttribute("aria-controls", panelId);
  // band-count + chevron van agrupados en "band-meta" para poder centrar
  // band-name respecto al ancho TOTAL de la banda (no solo el espacio que
  // le sobra a la derecha de ese grupo) cuando la banda está abierta.
  header.innerHTML =
    `<span class="band-name">${band.name}</span>` +
    `<span class="band-meta">` +
    `<span class="band-count">${count} ${count === 1 ? "proceso" : "procesos"}</span>` +
    CHEVRON_SVG +
    `</span>`;

  // Panel con la fila de tarjetas
  const panel = document.createElement("div");
  panel.className = "band-panel";
  panel.id = panelId;

  const track = document.createElement("div");
  track.className = "band-track";

  band.processes.forEach((process) => track.appendChild(buildProcessCard(process)));

  panel.appendChild(track);
  wrapper.appendChild(header);
  wrapper.appendChild(panel);

  // Alterna expand/colapso de esta banda sin afectar a las demás
  header.addEventListener("click", () => toggleBand(wrapper, header));

  return wrapper;
}

/* --- Alterna el estado de una banda (multi-expansible, colapso independiente) --- */
function toggleBand(wrapper, header) {
  const isOpen = wrapper.classList.toggle("is-open");
  header.setAttribute("aria-expanded", String(isOpen));
  // Cualquier banda que cambia de alto puede desplazar a las que le siguen,
  // así que las dos tarjetas laterales se recalculan siempre, no solo la propia.
  repositionStakeholders();
}

/* --- Renderiza todas las bandas en el contenedor --- */
function renderMap() {
  const container = document.getElementById("mapBands");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  PROCESS_MAP.forEach((band) => fragment.appendChild(buildBand(band)));
  container.appendChild(fragment);

  populateStakeholderCard(document.getElementById("stakeholderLeft"), STAKEHOLDERS.titleLeft);
  populateStakeholderCard(document.getElementById("stakeholderRight"), STAKEHOLDERS.titleRight);
  repositionStakeholders();
}

/* --- Arranque --- */
document.addEventListener("DOMContentLoaded", () => {
  renderMap();

  // Cierre de la ficha de detalle: botón X, clic en el overlay, o tecla Escape.
  document.getElementById("detailClose").addEventListener("click", closeDetailPanel);
  document.getElementById("detailOverlay").addEventListener("click", closeDetailPanel);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetailPanel();
  });
});
// El ancho de ventana afecta el ancho de columna disponible (y el corte a 640px
// que apila el layout), así que un resize también puede mover el punto de anclaje.
window.addEventListener("resize", repositionStakeholders);
