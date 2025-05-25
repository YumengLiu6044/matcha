// global.d.ts
declare module 'three/examples/jsm/Addons.js' {
  import { Object3D } from 'three';

  export class CSS2DRenderer {
    domElement: HTMLDivElement;
    setSize(width: number, height: number): void;
    render(scene: Object3D, camera: Object3D): void;
  }

  export class CSS2DObject extends Object3D {
    element: HTMLElement;
    constructor(element: HTMLElement);
  }
}
