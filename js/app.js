
// ============================================
// 1. REFERENCIAS A LOS ELEMENTOS HTML
// ============================================

const formulario = document.getElementById(
    "formulario-busqueda"
);

const campoNombre = document.getElementById("nombre");

const campoEstado = document.getElementById("estado");

const botonBuscar = document.getElementById(
    "boton-buscar"
);

const contenedor = document.getElementById(
    "contenedor-personajes"
);

const mensaje = document.getElementById("mensaje");


// ============================================
// 2. CONSULTAR LA API
// ============================================

async function obtenerPersonajes(nombre, estado) {

    const url = new URL(
        "https://rickandmortyapi.com/api/character"
    );

    if (nombre) {
        url.searchParams.set("name", nombre);
    }

    if (estado) {
        url.searchParams.set("status", estado);
    }

    const respuesta = await fetch(url);

    // Si no existen coincidencias, devolvemos un arreglo vacío
    if (respuesta.status === 404) {
        return [];
    }

    // Detectamos otros errores HTTP
    if (!respuesta.ok) {
        throw new Error(
            "No se pudieron obtener los personajes."
        );
    }

    const datos = await respuesta.json();

    return datos.results;
}


// ============================================
// 3. VALIDAR DATOS DESCONOCIDOS
// ============================================

function mostrarDato(valor) {

    if (
        !valor ||
        (typeof valor === "string" &&
        (
            valor.trim() === "" ||
            valor.toLowerCase() === "unknown"
        ))
    ) {
        return "Desconocido";
    }

    return valor;
}


// ============================================
// 4. CREAR TARJETAS DE PERSONAJES
// ============================================

function crearTarjeta(personaje) {

    // Creamos la tarjeta principal
    const tarjeta = document.createElement("article");

    tarjeta.classList.add("tarjeta");

    // Creamos la imagen
    const imagen = document.createElement("img");

    imagen.src = personaje.image;
    imagen.alt = personaje.name;

    // Creamos el contenedor del contenido
    const contenido = document.createElement("div");

    contenido.classList.add("tarjeta-contenido");

    // Creamos el nombre
    const nombre = document.createElement("h3");

    nombre.textContent = personaje.name;

    // Creamos el estado
    const estado = document.createElement("p");

    estado.textContent =
        "Estado: " + mostrarDato(personaje.status);

    // Creamos la especie
    const especie = document.createElement("p");

    especie.textContent =
        "Especie: " + mostrarDato(personaje.species);

    // Creamos el origen
    const origen = document.createElement("p");

    origen.textContent =
        "Origen: " + mostrarDato(personaje.origin?.name);

    // Agregamos los elementos al contenido
    contenido.appendChild(nombre);
    contenido.appendChild(estado);
    contenido.appendChild(especie);
    contenido.appendChild(origen);

    // Agregamos la imagen y el contenido a la tarjeta
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(contenido);

    return tarjeta;
}


// ============================================
// 5. MOSTRAR PERSONAJES EN LA PÁGINA
// ============================================

function mostrarPersonajes(personajes) {

    // Limpiamos los resultados anteriores
    contenedor.textContent = "";

    // Comprobamos si existen resultados
    if (personajes.length === 0) {

        mensaje.textContent =
            "No se encontraron personajes.";

        return;
    }

    mensaje.textContent =
        "Personajes encontrados: " + personajes.length;

    // Recorremos el arreglo de personajes
    personajes.forEach((personaje) => {

        const tarjeta = crearTarjeta(personaje);

        contenedor.appendChild(tarjeta);

    });
}


// ============================================
// 6. GUARDAR LA ÚLTIMA BÚSQUEDA
// ============================================

function guardarBusqueda(nombre, estado) {

    localStorage.setItem("nombre", nombre);

    localStorage.setItem("estado", estado);

}


// ============================================
// 7. EVENTO DEL FORMULARIO Y VALIDACIÓN
// ============================================

formulario.addEventListener("submit", async (evento) => {

    // Evitamos que se recargue la página
    evento.preventDefault();

    // Capturamos los valores
    const nombre = campoNombre.value.trim();

    const estado = campoEstado.value;

    // Validamos los criterios de búsqueda
    if (!nombre && !estado) {

        mensaje.textContent =
            "Introduce un nombre o selecciona un estado.";

        return;
    }

    // Guardamos los criterios de búsqueda
    guardarBusqueda(nombre, estado);

    // Desactivamos el botón
    botonBuscar.disabled = true;

    botonBuscar.textContent = "Buscando...";

    // Informamos al usuario
    mensaje.textContent = "Buscando...";

    try {

        // Consultamos la API
        const personajes = await obtenerPersonajes(
            nombre,
            estado
        );

        // Mostramos los resultados
        mostrarPersonajes(personajes);

    } catch (error) {

        // Mostramos el error
        console.error("Error en la búsqueda:", error);

        contenedor.textContent = "";

        mensaje.textContent =
            "Ocurrió un error al consultar la API. Intenta nuevamente.";

    } finally {

        // Reactivamos el botón
        botonBuscar.disabled = false;

        botonBuscar.textContent = "Buscar";

    }

});


// ============================================
// 8. RESTAURAR LA ÚLTIMA BÚSQUEDA
// ============================================

function restaurarBusqueda() {

    // Recuperamos los valores guardados
    const nombreGuardado =
        localStorage.getItem("nombre") || "";

    const estadoGuardado =
        localStorage.getItem("estado") || "";

    // Restauramos los campos del formulario
    campoNombre.value = nombreGuardado;

    campoEstado.value = estadoGuardado;

    // Repetimos la búsqueda si existen criterios guardados
    if (nombreGuardado || estadoGuardado) {

        formulario.requestSubmit();

    }

}


// Restauramos la búsqueda al cargar la página
restaurarBusqueda();
