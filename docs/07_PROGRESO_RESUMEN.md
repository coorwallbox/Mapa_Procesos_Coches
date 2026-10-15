---
fase_actual: 4
estado_resumen: "Fase 4 cerrada (mejoras de cumplimiento del mapa) — Fase 5 depende de la decisión de la dirección y del destino interno"
tolerancias_excedidas: 0
fases_reabiertas: 0
---

# 07 — Progreso (resumen)

Estado por fases del proyecto **Mapa de procesos (ISO 9001)**.

## Estado general

Fases 1, 2 y 3 completadas. Estructura del mapa, tarjetas de partes
interesadas, ficha de detalle y auditoría de concordancia validadas.
Fase 4 (mejoras de cumplimiento del mapa) completada; la Fase 5 depende de algo externo.

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

### Fase 3 — Auditoría de concordancia (carpetas vs. listado maestro)
**Estado:** Completada (2026-10-13)
Contexto: el mapa se integrará con `Consulta_Documental` (Entregables/Web), que
reemplaza la búsqueda manual en OneDrive. Fuentes: el mapa de procesos anterior
en PowerPoint (links por proceso a las carpetas de gestión documental) y el
listado maestro de documentos en Excel.

Decisiones del usuario (2026-10-08):
- Acceso a las carpetas desde la web, partiendo del link de cada proceso (no
  desde la carpeta raíz), y **solo nombres de archivo**: no se abre ni se
  descarga ningún documento.
- El mapa mantiene las 4 bandas ISO (la asignación de procesos reales a bandas
  va en la Fase 4).
- Los repos son públicos: los resultados (datos internos) viven en `auditoria/`,
  fuera de Git por el `.gitignore` del proyecto; nada de esto se publica.

Entregables (en `auditoria/`, no versionados):
- Inventario de carpetas (solo nombres), cruce por código `PROCESO-TIPO-Nº`,
  catálogo de procesos (código, nombre, macroproceso, carpeta) y reporte de
  concordancia por categoría, con los scripts que los generan.
- Informe de Word para la dirección (2026-10-08, pedido del usuario): estado
  actual, hallazgos priorizados, alternativas de mejora y anexos, con la marca
  del manual `Manual_Marca_Los_Coches` (paleta, Montserrat incrustada, logo).
  Lo arma `auditoria/informe.py` desde los mismos datos del reporte; Word
  actualiza la tabla de contenido y exporta el PDF. Revisado página por página.
- Ampliación del informe (2026-10-09, preguntas del usuario): «una sola lista de
  procesos» como primer punto, tablas de comparación listado frente a OneDrive
  calculadas por `auditoria/metricas.py`, cuatro hallazgos nuevos, clasificación
  y retención documental, y un anexo de estructura de carpetas para validar.
- Ampliación (2026-10-12/13, pedidos del usuario; todo en `auditoria/`, fuera de Git):
  - **Copia limpia del listado** (`limpiar_listado.py`) como fuente del cruce, con la columna de ubicación en OneDrive
    (`ubicar_onedrive.py`) y un **cuadro de control** en Excel con tablas dinámicas (`cuadro_control.py`).
  - **Análisis de SG-PR-001** «Control de documentos y registros» (leído a pedido del usuario) y correcciones al
    informe que el usuario autorizó: la regla de codificación existe pero está desactualizada (H2); SG-PR-001 es una
    cuarta lista de procesos (H1); GH-RG-006A2 pasa a variante AUTOS de GH-RG-006 (numeral 5.12). Se verificó que el
    prefijo «A-» no es variante: 7 de 8 archivos son documentos distintos de Los Autos con numeración propia.
  - **Dos propuestas en Word/PDF:** control documental (SG-PR-001 v9) y mapa de procesos (bandas, ubicaciones en
    discusión, soporte normativo, estructura de carpetas); plantilla en blanco del listado nuevo (20 columnas).
  - **Prototipo del mapa propuesto** (`auditoria/propuesta_mapa/`) con íconos de la marca (Lucide, trazo 2 px; dos
    propios dibujados en Illustrator), logo y favicon. No publicado: depende de la Fase 4.
  - **Propuestas alineadas con Consulta_Documental** (2026-10-13, aprobado por el usuario): niveles documentales
    con los nombres de la consulta (Estratégico, Táctico, Operativo, Evidencia); En revisión sin apertura ni descarga
    (15 días); una fila por empresa en las variantes; anexos con versión propia; nuevo numeral 3.7 de solicitud y
    aprobación en línea (5 casos), con renumeración de 3.8–3.10; licencia Premium de Power Automate como decisión
    solicitada; carpeta `_Solicitudes` en el Anexo B (compartido con la propuesta del mapa); plantilla del listado con
    las reglas de fecha de vigencia, control de cambios y observaciones.
  - **Listado migrado** (`migrar_listado.py`, 2026-10-13): el listado actual pasado a las 20 columnas como tabla de
    Excel `ListadoMaestro` (la que lee el flujo F1 de Consulta_Documental), con hojas Resumen, Revisar y Trazabilidad;
    `plantilla_listado.py` ahora también genera la plantilla en blanco como tabla. Probado: Excel la abre sin
    reparación y la consulta la lee completa con la respuesta de F1 simulada.

Criterio de validación:
- [x] Catálogo con todos los procesos del PPT y del listado, y los que solo
      están en una de las dos fuentes.
- [x] Reporte con las discrepancias por categoría (registro sin archivo,
      archivo sin registro, mismo código con otro nombre, versión distinta,
      archivo en carpeta de otro proceso, códigos repetidos o mal escritos).
- [x] Solo nombres de archivo; ningún documento abierto.
- [x] Resultados fuera de Git (`git status --ignored` muestra `auditoria/`).
- [x] Revisión del reporte por el usuario (2026-10-13: lo dio por revisado al aprobar la Fase 4).

Ajuste posterior (2026-10-13, desde la Fase 12 de Consulta_Documental): las plantillas del listado
(`plantilla_listado.py`, `migrar_listado.py`) pasan a 22 columnas (CLASIFICACIÓN y EMISOR) y suman el tipo `DE`
(documento externo); la migración sigue con 1049 filas.

Limitaciones: dos links del PPT rechazan el acceso de invitado (una carpeta se
cubrió desde su macroproceso; la otra queda sin listar). La categoría "mismo
código, nombre no coincide" se decide a mano: la similitud de nombres no separa
abreviaturas de documentos distintos.

### Fase 4 — Mejoras de cumplimiento del mapa
**Estado:** Completada (2026-10-13)
Origen: evaluación crítica del mapa frente a ISO 9001 y normas colombianas (12 vacíos, con fuentes). Se trabaja
sobre el prototipo `auditoria/propuesta_mapa/`, la propuesta `Propuesta_Mapa_de_Procesos` y scripts en `auditoria/`
(fuera de Git). Decisiones del usuario (2026-10-13): interacciones como **borrador para validar** (sin abrir
documentos); el ícono que replica el logo de Wallbox **se mantiene** (advertencia registrada: Decisión 486 de la CAN,
art. 155, y manual de marca p. 26); el mapa publicado en GitHub Pages **se deja** hasta tener el destino interno.

Alcance:
1. Cadena de valor sobre Misionales (requisitos del cliente → Comercial → Alistamiento → Posventa → satisfacción).
2. Ficha de caracterización para los 26 procesos: objetivo, responsable, «Recibe de» / «Entrega a» (borrador por
   validar, con enlaces entre fichas), riesgos e indicadores («Por completar» sin caracterización), normas que le
   aplican, requisitos ISO a su cargo y enlace a sus documentos en Consulta_Documental (`?proceso=SIGLA`).
3. Alcance del sistema: encabezado en el mapa y sección en la propuesta (texto modelo y exclusiones por confirmar).
   Ajuste posterior al cierre (2026-10-13, pedido del usuario): el alcance pasa al pie del mapa, debajo de «Procesos
   por ubicar»; la cadena de valor sigue bajo el título. QA del mapa 34/34; consulta 52/52 y cargue 54/54 sin cambios.
   Ajuste (2026-10-13): el texto ya no da por hecho un certificado ISO 9001 (no aparece en los archivos revisados);
   el alcance lo confirma Sistemas de Gestión con el certificado vigente o el documento de alcance del sistema
   (aprueba la gerencia). Mapa, propuesta §8.1 y paso 8 regenerados; QA 34/34.
   Ajuste (2026-10-13, pedido del usuario): la propuesta compara también con el mapa en PowerPoint (columna nueva
   en la sección 3: 3 bandas, Mercadeo repetido, tres tarjetas de mantenimiento, carpetas compartidas, 2 enlaces
   rotos) y suma la discusión 5.5 de Accesorios (VACC: Posventa en el PPT, Comercial en la propuesta), marcada
   «En discusión» en el mapa. Quedan cinco ubicaciones en discusión; propuesta de 24 páginas; QA 34/34.
   Ajuste (2026-10-13, pedido del usuario): la cadena de valor pasa al pie, debajo del alcance, con una descripción
   que cita ISO 9001:2015 §4.4.1 (secuencia e interacción de los procesos); propuesta §8.2 actualizada. Portada de
   los tres informes sin el cargo del autor. QA del mapa 36/36.
   Ajuste (2026-10-13, pedido del usuario): al pie va primero la cadena de valor y después el alcance, alineados
   a la izquierda con el título (a todo el ancho; la cadena cabe en una línea a 1280 px). QA del mapa 37/37.
4. Dueño de los requisitos ISO sin proceso (§8.5.3, §8.7, §9.3, §7.1.6, §9.1.2), en fichas y propuesta.
5. Regla de independencia de la auditoría interna a SG (§9.2.2 c).
6. Plantilla de normograma (Excel) prellenada, con estado de verificación de cada norma.
7. Hito SAGRILAFT: ajuste al capítulo IX antes del 31 de mayo de 2027 (CE 100-000020 de 2026).
8. PESV con la cita completa (Resolución 20223040040595 de 2022 y Resolución 5178 de 2023) y paso para unificar las
   dos políticas de seguridad vial.
9. Transición a ISO 9001:2026 (fechas y paso de revisión del mapa).
10. Script de control que compara las listas de procesos del mapa, de Consulta_Documental y de la plantilla del listado.

Criterio de validación:
- [x] Las 26 tarjetas abren su ficha con todas las secciones; los enlaces «Recibe de» / «Entrega a» abren la ficha
      del otro proceso; el borrador se distingue como «por validar»; el enlace a la consulta lleva `?proceso=SIGLA`.
- [x] Cadena de valor y alcance visibles; 375/768/1280 px sin desbordamiento; contraste AA; teclado y foco; 0 errores.
- [x] Propuesta regenerada con las secciones nuevas (diff de texto revisado, páginas registradas).
- [x] Normograma abre en Excel sin reparación, con todas las normas citadas y su estado de verificación.
- [x] El script de control corre y reporta las diferencias entre las listas.

Entregables (en `auditoria/`, fuera de Git):
- `caracterizacion_mapa.py` (nuevo): fuente única de nombres, propósito, interacciones (borrador), requisitos ISO, normas
  con su estado de verificación, alcance, cadena de valor, regla de independencia, hito SAGRILAFT y nota de Wallbox. La
  usan `datos_mapa.py` (prototipo), `propuesta_mapa_doc.py` (Word) y `normograma.py`.
- Prototipo `propuesta_mapa/`: alcance y cadena de valor bajo el título; ficha de caracterización en las 29 siglas
  (propósito, caracterización CA del listado, responsable y riesgos «por confirmar», interacciones en borrador con
  enlaces entre fichas, requisitos ISO, normas con estado y enlace a la fuente, documentos y enlace a la consulta
  `?proceso=SIGLA`); panel de 420 px.
- `normograma.py` (nuevo) → `informe/Normograma - propuesta.xlsx`: 49 filas norma × proceso, 18 normas (14 filas
  verificadas, 8 de fuente secundaria, 27 por verificar), tabla `Normograma` con listas de verificación y cumplimiento.
- `control_listas.py` (nuevo): compara mapa, catálogo de Consulta_Documental y listado; sale con código 1 si difieren.
- `Propuesta_Mapa_de_Procesos` (23 págs., antes 19): sección nueva 8 «Caracterización e interacción» (8.1 alcance,
  8.2 cadena de valor e interacciones de los misionales, 8.3 caracterizaciones, 8.4 dueños de requisitos ISO,
  8.5 independencia de SG, 8.6 normograma); carpetas pasa a 9 y próximos pasos a 10 (pasos 7–12 nuevos); dos decisiones
  nuevas en el resumen; hito SAGRILAFT en 4.1; condición de independencia en 5.1; ISO 9001:2026 con fechas, CE
  100-000020 con su plazo y PESV con la cita completa en la sección 7; hallazgo del ícono de Wallbox; Anexo B con las
  fuentes verificadas en octubre de 2026.

Resultado de la validación (2026-10-13):
- QA headless del prototipo (Chrome del sistema, servido por HTTP): 32/32 — alcance y cadena de valor (5 pasos, lista
  ordenada con nombre accesible, cada paso en una línea a 1280 px); las 29 fichas con sus 4 secciones, interacciones
  (salvo INN, MOV y SEG, propuestos para baja) y enlace `?proceso=SIGLA`; Enter abre la ficha, el enlace «Recibe de»
  abre la del otro proceso con el foco en su título y Esc devuelve el foco a la tarjeta original; SG con la regla de
  independencia y su caracterización vigente; SGRF con el hito y la circular verificada (enlace en pestaña nueva); CAR
  sin caracterización; WAL con la advertencia de marca; TAL dueño de §8.5.3 y §8.7; contraste AA de cadena, alcance,
  notas, enlaces y los 3 estados de las normas; prefijo «Borrador» en color de aviso; Tab recorre los enlaces; el
  enlace abre la consulta documental filtrada por TAL; 375/768/1280 px sin desbordamiento; 0 errores de consola.
- Normograma: Excel lo abre (COM) con sus 3 hojas, la tabla de 49 filas y las listas desplegables.
- Propuesta: regenerada con Word (23 págs.); diff de texto contra la versión anterior revisado y páginas 15–17 y 21–23
  revisadas como imagen.
- `control_listas.py`: corre y reporta 4 diferencias reales, que dependen de decisiones pendientes: INN, MOV y SEG no
  están en el catálogo de la consulta (propuestos para baja) y SG está en Estratégicos en el mapa y en Evaluación y
  mejora en la consulta (banda aún no aprobada). Se resuelven al aplicar las decisiones (Fase 5).

Hallazgo de la fase: solo 7 de las 29 siglas tienen caracterización (CA) en el listado y solo SG-CA-001 está vigente;
queda en la propuesta (8.3) y en el paso 7 del plan.

### Fase 5 — Bandas aprobadas y publicación interna
**Estado:** No iniciada
Aplicar las ubicaciones aprobadas al mapa, reemplazar los íconos del mapa publicado por los de la marca y publicarlo
en el destino interno (el de Consulta_Documental, Fase 14 de ese proyecto); retirar entonces la versión de GitHub
Pages. Depende de la decisión de la dirección sobre la propuesta y del destino interno.

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
- Ajuste posterior al cierre de Fase 2 (2026-09-27, registrado el 2026-10-08):
  la banda "Procesos de apoyo" pasa arriba de "Procesos misionales" (la costura
  de las tarjetas laterales se recalcula con el nuevo orden); las tarjetas
  "Partes interesadas" se despliegan/colapsan con un botón (cerradas por
  defecto, independientes); líneas punteadas animadas en el mapa.
- Ajuste (2026-10-15, pedido del usuario, adelanta parte de la Fase 5): el mapa raíz pasa a los íconos de la marca
  (Lucide 1.53.0, trazo 2 px, azul `#00519A`, generados con `brand_svg` de `auditoria/iconos_mapa.py`): 15 SVG en
  `img/iconos/` con su `LICENSE` (14 procesos + Partes interesadas) y `script.js` apunta a `.svg`. Nuevos en
  `auditoria/fuentes_lucide/`: briefcase, chart-line, clipboard-check, circle-alert, list-checks, refresh-cw. Los 5 PNG
  anteriores quedan en la carpeta sin uso. Verificado headless a 1280 px: 16/16 imágenes cargadas, 0 placeholders.
  No publicado.
- Ajuste (2026-10-15, pedido del usuario): la cabecera dice «Sistema de gestión» (antes «Sistema de Gestión de
  Calidad») y lleva el logo horizontal azul de Los Coches sobre el título, más el favicon de la marca (mismos archivos
  y estilo `.map-logo` del prototipo `propuesta_mapa/`). Verificado headless a 1280 y 375 px: logo y favicon cargan,
  sin desbordamiento, 0 errores de consola. No publicado.
