import * as React from 'react';
import * as THREE from 'three';
import './styles.css';

import { SceneManager } from './scene/sceneManager';
import { createAnimal } from './scene/animal';
import { createWorld } from './scene/world';
import { Entity } from './scene/entity';
import { KeyboardControl } from './scene/controls';

export default function App() {
  const canvasRef = React.useRef<HTMLElement | null>(null);
  const [scene] = React.useState(new SceneManager());

  React.useEffect(() => {
    if (canvasRef.current) {
      console.log('canvasRef.current');
      console.log({ scene });
      const player = new Entity(createAnimal());
      const world = createWorld();
      console.log({ world });

      scene.addObject(new THREE.BoxHelper(world));
      scene.addObject(player.object);

      // world.position.x = 20;
      // world.position.divideScalar(20).floor().multiplyScalar(20).addScalar(10);

      scene.addObject(world);
      scene.appendTo(canvasRef.current);
      scene.render();

      const animationLoop = () => {
        scene.render();
        requestAnimationFrame(animationLoop);
      };

      animationLoop();
    }
  }, [scene]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox!</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div
        id="world"
        ref={(el) => (canvasRef.current = el)}
        style={{ width: '100%', height: '300px', border: '1px solid tomato' }}
      />
    </div>
  );
}
