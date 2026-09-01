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
- Fases numeradas y validadas (ver 07_PROGRESO_RESUMEN).
