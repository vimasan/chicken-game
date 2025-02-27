export class InputHandler {
  constructor () {
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      space: false
    };

    this.setupEventListeners();
  }

  setupEventListeners () {
    // Manejadores de teclado
    const handleKeyDown = (e) => this.onKeyDown(e);
    const handleKeyUp = (e) => this.onKeyUp(e);

    // Registrar eventos
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Guardar referencia para remover luego
    this.eventListeners = {
      keydown: handleKeyDown,
      keyup: handleKeyUp
    };
  }

  onKeyDown (event) {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.w = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.a = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.s = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.d = true;
        break;
      case 'Space':
        this.keys.space = true;
        event.preventDefault(); // Evitar scroll
        break;
    }
  }

  onKeyUp (event) {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.w = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.a = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.s = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.d = false;
        break;
      case 'Space':
        this.keys.space = false;
        break;
    }
  }

  get movementVector () {
    return {
      x: (this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0),
      y: (this.keys.s ? 1 : 0) - (this.keys.w ? 1 : 0)
    };
  }

  get isSpacePressed () {
    return this.keys.space;
  }

  cleanup () {
    window.removeEventListener('keydown', this.eventListeners.keydown);
    window.removeEventListener('keyup', this.eventListeners.keyup);
  }
}
