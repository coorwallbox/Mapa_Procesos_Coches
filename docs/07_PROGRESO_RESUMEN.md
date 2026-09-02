# 07 — Progreso (resumen)

Estado por fases del proyecto **Mapa de procesos (ISO 9001)**.

## Estado general

Fase 1 y Fase 2 completadas. Estructura del mapa, tarjetas de partes
interesadas, alineación y ficha de detalle por proceso validadas.

## Fases

### Fase 0 — Documentación base
**Estado:** Completada
Creación de la plantilla mínima de `docs/` (00, 01, 06, 07).

### Fase 1 — Estructura del mapa + navegación por bandas
**Estado:** Completada
Alcance final (incluye ampliación de alcance aprobada durante la fase):
- 4 bandas ISO 9001 renderizadas desde `PROCESS_MAP`, compactadas al cargar.
- Expand/colapso independiente por banda (multi-expansible).
- Tarjetas de proceso en fila horizontal centrada, con layout de altura fija:
  íconos alineados arriba, primera línea de texto alineada, truncado a 2 líneas.
  Sin scroll: si una banda supera 5 tarjetas, las siguientes bajan a una fila
  nueva (`flex-wrap`) en vez de scrollear.
- Título de banda centrado en el ancho TOTAL de la banda al expandir (no en
  el espacio sobrante junto al contador/chevron).
- Dos tarjetas laterales "Partes interesadas" (icono + 6 viñetas: Cliente,
  Empleados, Proveedores, Accionistas, Entidades de control, Comunidad),
  con título propio por lado — izquierda "Solicitudes partes interesadas",
  derecha "Satisfacción partes interesadas" — ambas comparten siempre la
  misma altura: la costura entre las bandas "Procesos misionales" y
  "Procesos de apoyo", recalculada en vivo al expandir/colapsar cualquier banda.
- Datos embebidos en JS; tres archivos separados.

Criterio de validación:
- [x] Las 4 bandas cargan compactadas.
- [x] Cada banda expande/colapsa sin afectar a las demás.
- [x] Tarjetas con nombres correctos en fila con espaciado, centradas.
- [x] Confirmación final visual de alineación de íconos y textos (medido con
      `getBoundingClientRect`, no solo visual).
- [x] Tarjetas laterales alineadas entre sí y con la costura Misionales/Apoyo
      en los 4 estados de expansión probados.
- [x] Títulos de banda centrados respecto al ancho real de la banda (no del
      espacio sobrante).
- [x] Sin scroll horizontal ni vertical dentro de una banda; mínimo 5
      tarjetas por fila antes de bajar a una fila nueva (verificado con
      simulación de 8 tarjetas → 5+3).

Decisiones tomadas durante la fase:
- Extensión real de íconos: `.png` (código ajustado; antes pedía `.svg` y
  los 5 archivos existentes no cargaban).
- Icono/lista de "Partes interesadas": misma tarjeta a ambos lados, título
  distinto por lado.

Decisiones abiertas:
- Faltan 9 de 14 íconos de proceso + el de "Partes interesadas" en
  `img/iconos/` (no bloquea el cierre; el placeholder cubre el caso).
- Existencia y origen de subtítulos de proceso (`card-subtitle`, aún sin uso).

### Fase 2 — Ficha de detalle por proceso
**Estado:** Completada
Alcance acordado con el usuario:
- Panel lateral deslizante (overlay + aside fijo a la derecha), no modal ni
  expansión inline.
- Datos de ejemplo — Descripción y Responsable — únicamente en los procesos
  de las bandas "Procesos misionales" y "Procesos de apoyo" (4 procesos:
  Comercial, Posventa, Administrativos, Financieros). Estratégicos y
  Evaluación y mejora quedan igual que en Fase 1, sin ficha.
- Solo las tarjetas con datos de detalle son clicables/enfocables
  (`.has-detail`); el resto conserva `cursor:default` y no entra al tab order.
- Cierre por botón X, clic en el overlay, o tecla Escape; el foco vuelve a la
  tarjeta que abrió el panel.

Criterio de validación:
- [x] Clic en una tarjeta con detalle abre el panel con título, descripción
      y responsable correctos (verificado con `page.evaluate`, 2 procesos
      distintos).
- [x] Clic en una tarjeta sin datos de detalle no reacciona (verificado:
      `has-detail` ausente, `tabIndex -1`, sin `role`).
- [x] El panel cierra con Escape, con clic en overlay y con el botón X; el
      foco regresa a la tarjeta que lo abrió.
- [x] Confirmación visual del usuario.

Decisiones tomadas durante la fase:
- Alcance de datos limitado a Misionales/Apoyo por pedido explícito del
  usuario; Estratégicos/Evaluación y mejora quedan sin ficha por ahora.
- Origen del dato: sigue embebido en `PROCESS_MAP` (script.js), mismo patrón
  que Fase 1; no se separó a una fuente externa.

## Bitácora

- Fase 1: layout de tarjetas ajustado en dos iteraciones — de centrado
  vertical a altura fija con íconos y primera línea de texto alineados arriba.
- Fase 1: corregida extensión de íconos de `.svg` a `.png` (coincide con los
  archivos reales); verificado con navegador headless (antes: 14/14 íconos
  en placeholder, después: 5/14 cargando, 9/14 en placeholder por archivo
  faltante, no por bug).
- Fase 1: ampliación de alcance aprobada — tarjetas centradas por banda +
  dos tarjetas laterales "Partes interesadas". Posición lateral corregida
  dos veces tras feedback visual: primero centrada por banda individual,
  luego unificada a la costura Misionales/Apoyo (que es lo pedido).
- Fase 1: cambiado scroll horizontal de tarjetas por `flex-wrap` (mínimo 5
  por fila); ajustado ancho de columnas laterales (170px→150px) porque la
  columna central quedaba 12px corta para 5 tarjetas.
- Fase 1: corregido centrado del título de banda — se centraba en el
  espacio sobrante junto al contador/chevron (62px desviado del centro
  real), no en el ancho total de la banda; detectado por feedback visual
  del usuario y confirmado por medición antes/después.
- Fase 2: implementado panel de detalle (overlay + aside deslizante) con
  datos de ejemplo en Comercial/Posventa/Administrativos/Financieros;
  verificado con navegador headless (apertura, contenido, cierre por 3 vías,
  retorno de foco, y que las tarjetas sin datos no reaccionan) y con
  captura de pantalla.
- Ajuste posterior al cierre de Fase 2: contorno de 2px con el color de la
  banda (`--band-color`) en el hover de las 14 tarjetas de proceso, sin
  distinción entre clicables y no clicables (decisión del usuario). No
  cambia cursor, tabindex ni comportamiento de clic — solo refuerzo visual.
  Verificado por código (`boxShadow` toma el color correcto por banda) y
  captura de pantalla.
- Ajuste posterior al cierre de Fase 2: en móvil (≤640px) la tarjeta
  "Partes interesadas" se estiraba a todo el ancho de pantalla; corregido
  a su ancho compacto de escritorio (150px) centrada en la columna
  apilada. Verificado con viewport de 390px (`getBoundingClientRect`) y
  captura de pantalla.
- Ajuste posterior al cierre de Fase 2: en móvil el centrado "real" del
  título de banda (position:absolute sobre el ancho total, ver Fase 1) se
  solapaba con el contador+chevron cuando el título envolvía a 2 líneas
  (ej. "Procesos de evaluación y mejora"). Corregido volviendo al flujo
  flex normal (título a la izquierda) solo en la media query de ≤640px;
  el centrado real de escritorio no cambió. Verificado sin solape en las
  4 bandas (`getBoundingClientRect`, viewport 390px) y captura de pantalla.
