import * as THREE from 'three';

export class Controller {
  object: THREE.Object3D;
  constructor(object: THREE.Object3D) {
    this.object = object;
  }

  bindEvents(size: number) {}
}

export class KeyboardControl extends Controller {
  bindEvents(size: number) {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 38: // up
          this.object.position.z -= size;
          break;
        case 40: // down
          this.object.position.z += size;
          break;
        case 37: // left
          this.object.position.x -= size;
          break;
        case 39: // right
          this.object.position.x += size;
          break;
      }
    });
  }
}
