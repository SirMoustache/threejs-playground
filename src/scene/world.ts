import * as THREE from 'three';

const map = [
  ['_', '_', '_', '_'],
  ['_', '_', '_', '_'],
  ['_', '_', '_', '_'],
  ['_', '_', '_', '_'],
];

const groundPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 1, 1),
  new THREE.MeshStandardMaterial({
    color: 0xf6f47f,
  }),
);

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const createTile = (size: number) => {
  const tile = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 0xf6f47f,
    }),
  );
  tile.rotateX(degreesToRadians(-90));
  return tile;
};

const normalise = (
  val: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number,
) => {
  return (val / (max - min)) * (newMax - newMin) + newMin;
};

export const createWorld = () => {
  const TILE_SIZE = 20;
  const group = new THREE.Group();
  map.forEach((row, xVector) =>
    row.forEach((column, zVector) => {
      const tile = createTile(TILE_SIZE);
      tile.position.x = xVector * TILE_SIZE;
      tile.position.z = zVector * TILE_SIZE;
      group.add(tile);
    }),
  );

  return group;
};

export class World {
  createWorld() {
    const TILE_SIZE = 20;
    const group = new THREE.Group();
    map.map((row, xVector) =>
      row.map((column, zVector) => {
        const tile = createTile(TILE_SIZE);
        tile.position.x = xVector * TILE_SIZE;
        tile.position.z = zVector * TILE_SIZE;
      }),
    );
  }
}
