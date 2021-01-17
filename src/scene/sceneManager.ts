import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import { KeyboardControl } from "./controls";

export const createCamera = (aspect: number) => {
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000000);
  camera.position.set(0, 50, 20);
  // camera.up = new THREE.Vector3(0, 0, 1);

  return camera;
};

export const createRenderer = (
  width: number,
  height: number,
  canvas?: HTMLCanvasElement,
) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });

  renderer.setSize(width, height, false);

  return renderer;
};

export const createCameraControls = (
  camera: THREE.Camera,
  renderer: THREE.Renderer,
) => {
  const autoRotateDefaultSpeed = 5.0;

  const cameraControls = new OrbitControls(camera, renderer.domElement);

  cameraControls.autoRotateSpeed = autoRotateDefaultSpeed;
  cameraControls.enableKeys = false;
  cameraControls.update();

  return cameraControls;
};

export const createCameraLight = () => {
  const cameraLight = new THREE.PointLight(0xffffff, 0.7, 0);
  return cameraLight;
};

export class SceneManager {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.Renderer;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = createCamera(1);
    this.renderer = createRenderer(300, 300);
    this.mouse = new THREE.Vector2(1, 1);
    this.raycaster = new THREE.Raycaster();

    const light = new THREE.HemisphereLight(0x202020, 0x004080, 0.6);
    const cameraLight = createCameraLight();
    const cameraControls = createCameraControls(this.camera, this.renderer);
    const gridHelper = new THREE.GridHelper(400, 40);
    const axesHelper = new THREE.AxesHelper(50);

    this.camera.add(cameraLight);
    // this.scene.add(gridHelper);
    // this.scene.add(axesHelper);
    this.scene.add(light);
    this.scene.add(this.camera);
    cameraControls.update();

    this.bindEvents();
  }

  init() {
    this.camera = createCamera(1);
  }

  setPlaceholder(placeholder: HTMLCanvasElement) {
    this.renderer.domElement = placeholder;
  }

  appendTo(container: HTMLElement) {
    console.log('appendTo');
    container.appendChild(this.renderer.domElement);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  add(object: THREE.Object3D) {
    console.log('add');
    this.scene.add(object);
  }

  render() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersections = this.raycaster.intersectObjects(this.scene.children);
    // console.log(intersections);

    if (intersections.length > 0) {
      const instanceId = intersections[0].instanceId;

      // mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff));
      // mesh.instanceColor.needsUpdate = true;
    }

    // console.log("render");
    this.renderer.render(this.scene, this.camera);
    // console.log(this.mouse);
  }

  bindEvents() {
    document.addEventListener('mousemove', (event) => {
      console.log(this.scene.children);
      event.preventDefault();
      const canvasBox = this.renderer.domElement.getBoundingClientRect();

      this.mouse.x =
        ((event.clientX - canvasBox.left) / canvasBox.width) * 2 - 1;
      this.mouse.y =
        -((event.clientY - canvasBox.top) / canvasBox.height) * 2 + 1;

      // console.log({ M: this.mouse });
    });
  }
}
