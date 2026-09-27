---
tema: Formularios
proyecto: Mapa_de_procesos
estado: pendiente
estado_resumen: "Fase 2 completa — siguiente fase por confirmar"
stack: "HTML + CSS + JS vainilla, sin dependencias"
descripcion: "Mapa de procesos interactivo ISO 9001 (4 bandas expansibles + ficha de detalle por proceso), para publicar en GitHub Pages e incrustar en SharePoint"
aliases: [Mapa_de_procesos]
---

# Mapa de procesos — ISO 9001

Mapa de procesos interactivo bajo la norma ISO 9001, con foco en los procesos
estratégicos (gerenciales). Representa las cuatro bandas del sistema
(estratégicos, misionales, apoyo, y evaluación y mejora) como secciones
compactadas y multi-expansibles.

## Qué es

Página autónoma (HTML + CSS + JS, sin dependencias externas) pensada para
alojarse en GitHub Pages e incrustarse en SharePoint mediante iframe.

## Estructura de archivos

```
Mapa_Procesos/
├── index.html          # estructura raíz del mapa
├── styles.css          # estilos (diseño autónomo, sin fuentes externas)
├── script.js           # datos embebidos (PROCESS_MAP) + render + interacción
├── img/
│   └── iconos/         # un archivo por proceso (ver 06_IMPLEMENTATION)
└── docs/               # esta documentación
```

## Cómo ejecutar (local)

Abrir `index.html` en el navegador con los tres archivos en la misma carpeta.
No requiere servidor ni build.

## Publicación

1. Subir el proyecto a un repositorio de GitHub.
2. Activar GitHub Pages (sirve `text/html`, necesario para el iframe).
3. Incrustar la URL de Pages en SharePoint con el elemento web **Insertar**.

> `raw.githubusercontent.com` NO sirve para el iframe (entrega `text/plain`).
> Debe usarse GitHub Pages (`usuario.github.io/...`).

## Convenciones

- Identificadores en inglés, comentarios en español.
- Arquitectura modular: datos, estructura y estilos separados.
- Fases numeradas y validadas (ver [[Proyectos/Formularios/Mapa_de_procesos/docs/07_PROGRESO_RESUMEN|07_PROGRESO_RESUMEN]]).

## Git

Este proyecto **no** se versiona en el repositorio compartido de la bóveda
(Regla 12): tiene su propio repositorio (`Mapa_de_procesos/.git`, remoto
`github.com/coorwallbox/Mapa_Procesos_Coches`), necesario para publicar por
GitHub Pages. La carpeta queda excluida del repo de `Segundo Cerebro/`
mediante un `.gitignore` con `*` dentro de esta misma carpeta.
