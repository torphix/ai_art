import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'three';

function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  // create one prototype sphere
  const protoSphere = new Mesh(geometry, material);

  // add the sphere to the group
  group.add(protoSphere);

  group.tick = (delta) => { };
  return group
}

export { createMeshGroup };