# 06 — Implementación

Detalle técnico de la solución. Complementa [[Proyectos/Formularios/Mapa_de_procesos/docs/00_README|00_README]].

> Nota: en este proyecto el checklist de fases (con criterios de cierre) vive
> en [[Proyectos/Formularios/Mapa_de_procesos/docs/07_PROGRESO_RESUMEN|07_PROGRESO_RESUMEN]],
> no acá — este archivo se usa solo para detalle técnico (ver `01_INDEX`).

## Arquitectura

Separación de responsabilidades en tres archivos:

- **`index.html`** — solo el contenedor raíz (`#mapBands`). No contiene datos;
  las bandas se inyectan desde JS.
- **`styles.css`** — diseño autónomo con tokens en `:root`. Sin fuentes ni
  librerías externas (evita bloqueos dentro del iframe de SharePoint).
- **`script.js`** — datos, render e interacción.

## Datos: objeto `PROCESS_MAP`

Fuente única de verdad. Un arreglo de bandas; cada banda tiene `id`, `name`,
`colorVar` (variable CSS del color de categoría) y `processes`.

Cada proceso es un objeto:

```js
{ name: "Gerencia", icon: "gerencia.svg" }   // subtitle opcional (futuro)
```

Para agregar, quitar o renombrar procesos se edita únicamente este objeto.

## Bandas (4 categorías ISO 9001)

| Banda | colorVar | Color |
|-------|----------|-------|
| Procesos estratégicos | `--strategic` | azul dirección |
| Procesos misionales | `--core` | teal (flujo de valor) |
| Procesos de apoyo | `--support` | ámbar |
| Procesos de evaluación y mejora | `--improvement` | violeta |

El color de cada banda se propaga a su franja izquierda y a la interacción de
sus tarjetas vía la variable `--band-color`.

## Interacción

- Bandas **compactadas** al cargar.
- Clic en la cabecera: expande/colapsa esa banda (`toggleBand`), con
  `aria-expanded` sincronizado.
- **Multi-expansible**: cada banda es independiente (no acordeón exclusivo).
- Al expandir, el nombre de la banda se centra.

## Layout de tarjetas (altura fija)

El tamaño de la tarjeta define el comportamiento del texto, no al revés:

- Slot padre de ancho fijo **130px**; tarjeta **100% × 100px**,
  `box-sizing: border-box`, sin bordes, radio 4px, fondo blanco.
- **Ícono** en contenedor de altura fija (52px) a **40×40** → la línea
  superior de todos los íconos queda alineada.
- **Título** anclado bajo el ícono (gap 4px), 14px, `line-height: 1.2`,
  truncado a **2 líneas** con `-webkit-line-clamp` → la primera línea de todos
  los títulos cae en la misma Y; los largos crecen hacia abajo.
- Slot de **subtítulo** (12px) preparado; se muestra solo si el dato existe.

## Iconos

- Ubicación: `img/iconos/<archivo>`.
- Nombre por proceso definido en el campo `icon` de `PROCESS_MAP`.
- Si el archivo no existe aún, la tarjeta muestra un **placeholder** neutro
  (SVG inline) para no romper la maqueta.
- Nombres actuales: gerencia, sistema-integrado-gestion, auditoria, sagrilaf,
  gestion-juridica, comercial, posventa, administrativos, financieros,
  seguimiento-medicion, auditoria-interna, no-conformidades,
  acciones-correctivas-preventivas, mejora-continua.

## Accesibilidad

- Cabeceras de banda son `<button>` con `aria-expanded` / `aria-controls`.
- Tarjetas con `tabindex="0"` (preparadas para la ficha de detalle futura).
- Foco visible; `prefers-reduced-motion` respetado.

## Publicación (SharePoint)

Ver [[Proyectos/Formularios/Mapa_de_procesos/docs/00_README|00_README]]. Clave: servir por **GitHub Pages** (no `raw`), y que el admin
del tenant permita `github.io` como dominio incrustable si aplica.

## Pendientes / decisiones abiertas

- Confirmar extensión real de los iconos (`.svg` vs `.png`).
- Definir si habrá subtítulos por proceso y su origen.
- Ficha de detalle por proceso (entradas/salidas, responsable, indicadores):
  fase futura.
