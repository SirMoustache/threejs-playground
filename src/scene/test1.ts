import * as THREE from "three";

function main() {
  const canvas = document.querySelector("#c") as any;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // make the camera look down
  camera.position.set(0, 10, 0);
  camera.up.set(0, 0, -1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  scene.add(new THREE.GridHelper(40, 40));

  let player;
  {
    const cubeSize = 1;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshBasicMaterial({ color: "red" });
    player = new THREE.Mesh(cubeGeo, cubeMat);
    player.position.set(0.5, 0.5, 0.5);
    scene.add(player);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    camera.position.lerp(player.position, 0.03);
    camera.position.y = 10; // keep the elevation;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 38: // up
        player.position.z -= 1;
        break;
      case 40: // down
        player.position.z += 1;
        break;
      case 37: // left
        player.position.x -= 1;
        break;
      case 39: // right
        player.position.x += 1;
        break;
    }
  });
}

main();
