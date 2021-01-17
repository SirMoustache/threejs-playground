import * as THREE from "three";
import { Controller, KeyboardControl } from "./controls";

export class Entity {
  object: THREE.Object3D;
  controller: Controller;

  constructor(object: THREE.Object3D) {
    this.object = object;
    this.controller = new KeyboardControl(this.object);
    this.controller.bindEvents(10);
  }
}
