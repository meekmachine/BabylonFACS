import { useEffect } from 'react';
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer';
import { StandardMaterial, Mesh, Color3 } from '@babylonjs/core';
import { useScene } from 'react-babylonjs';

import { Nullable } from '@babylonjs/core/types';

export const useGlowEffect = (meshRef: React.RefObject<Mesh>, color: Color3, alpha: number) => {
    useEffect(() => {
      const mesh = meshRef.current;
      if (mesh) {
        const scene = mesh.getScene();
  
        // Check if the scene is not null
        if (scene) {
          let glowLayer = scene.getGlowLayerByName('glow') as GlowLayer;
          if (!glowLayer) {
            glowLayer = new GlowLayer('glow', scene);
          }
          
          glowLayer.intensity = 3;
  
          const material = new StandardMaterial('glowMat', scene);
          material.emissiveColor = color;
          mesh.material = material;
          material.alpha = alpha;
          glowLayer.addIncludedOnlyMesh(mesh);
        }
      }
    }, [color, meshRef]);
  };
  

export default useGlowEffect;
