# Gallinas

Un juego de gallinas que ponen huevos, creado con HTML, CSS y JavaScript.

## Descripción

Controlas una gallina que pone huevos (al pulsar la barra espaciadora), de los huevos pueden nacer nuevas gallinas que ponen mas huevos de las que a su vez pueden salir mas gallinas.

## Características

* Gallinas que se mueven por la pantalla y ponen huevos.
* Los huevos pueden expirar o pueden salir mas gallinas.
* Contador de huevos y gallinas.
* Botón de reinicio.

## Tecnologías utilizadas

* HTML5.
* CSS3.
* JavaScript (ES6+).
* Canvas API.

## Estructura del proyecto

* `index.html`: archivo principal del juego.
* `style.css`: archivo de estilos CSS.
* `src/`: carpeta que contiene los archivos JavaScript.
	* `main.js`: archivo principal de JavaScript.
  * `state/` carpeta que contiene el estado.
	  + `gameState.js`: archivo que maneja el estado.
  * `core/`: capeta que contiene los archivos de rederizado, logica y manejo de eventos
	  + `renderer.js`: archivo que maneja la renderización del juego.
	  + `inputHandler.js`: archivo que maneja los eventos de entrada.del usuario.
    + `gameEngine.js`: archivo que maneja la logica principal.
  * `entities/`: carpeta que contiene las entidades.
    + `chicken.js`: clase de la gallina y sus metodos.
    + `egg.js`: clase de los huevos y sus metodos.
  * `config/`: carpeta que contiene la configuracion.
    + `config.js`: archivo que contiene la configuracion.

## Instalacion

1. Descarga el codigo desde el repositorio.
2. Instala dependencias `npm install`
2. Accede al directorio de descarga y lanza `node --run dev`.


## Uso

1. Utiliza las teclas de flecha para mover las gallinas.
2. Utiliza la barra espaciadora para poner huevos.
3. Presiona el botón de reinicio para empezar de nuevo.

## Licencia

Este proyecto está bajo la licencia MIT.
