import * as THREE from "three";

const colors = {
  body: "#ffaeae",
  nose: "#e09393",
  eye: "#fff"
};

export const createAnimal = () => {
  const bodyGroup = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(10, 8, 10),
    new THREE.MeshStandardMaterial({
      color: colors.body
    })
  );
  body.castShadow = true;
  body.receiveShadow = true;

  const nose = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
      color: colors.nose
    })
  );
  nose.position.z = 5;
  nose.castShadow = true;
  nose.receiveShadow = true;

  const leftEye = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 1),
    new THREE.MeshStandardMaterial({
      color: colors.eye
    })
  );
  leftEye.position.z = 5;
  leftEye.position.y = 2;
  leftEye.position.x = 2;

  const rightEye = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 1),
    new THREE.MeshStandardMaterial({
      color: colors.eye
    })
  );
  rightEye.position.z = 5;
  rightEye.position.y = 2;
  rightEye.position.x = -2;

  bodyGroup.position.y = 5;
  bodyGroup.add(body);
  bodyGroup.add(nose);
  bodyGroup.add(leftEye);
  bodyGroup.add(rightEye);

  return bodyGroup;
};
