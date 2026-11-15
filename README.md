# Buscador de personajes — Rick and Morty

## Información del estudiante

- **Nombre:** [Rodrigo Rojas]
- **Variante:** A — Personajes
- **Asignatura:** [Introducción a Fundamentos del Desarrollo Web]

## Descripción del proyecto

Esta aplicación web permite buscar personajes de la serie *Rick and Morty* mediante la API pública [The Rick and Morty API](https://rickandmortyapi.com/).

El usuario puede realizar búsquedas utilizando el nombre del personaje, su estado (vivo, muerto o desconocido), o ambos criterios simultáneamente.

Cada resultado se presenta en una tarjeta que muestra:

- Imagen del personaje.
- Nombre.
- Estado.
- Especie.
- Lugar de origen.

La aplicación también incorpora validaciones, mensajes de carga y de error, y almacenamiento local (`localStorage`) para conservar los últimos criterios de búsqueda y restaurarlos al volver a cargar la página.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage
- The Rick and Morty API

## Captura de pantalla

![Captura de pantalla de la aplicación](img/CAPTURA.PNG)


## Sitios publicados

- **GitHub Pages:** Pendiente de publicación.
- **Vercel:** Pendiente de publicación.

## Estructura del proyecto

```text
tp-rodrigo-rojas/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── estilos.css
├── js/
│   └── app.js
└── img/
    └── CAPTURA.PNG
```

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/RaidenOverdrive/tp-rodrigo-rojas.git
   ```

2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar `index.html` utilizando Live Server.

## Despliegue

El proyecto se publicará mediante GitHub Pages y Vercel.

Ambas plataformas estarán vinculadas al repositorio de GitHub y utilizarán la rama `main` para actualizar automáticamente la aplicación cada vez que se publiquen nuevos cambios.
