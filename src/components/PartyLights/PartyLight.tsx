import React, {useRef} from 'react';
import { Color3, Vector3, Animation, EasingFunction, QuadraticEase, StandardMaterial, Mesh } from '@babylonjs/core';
import { useScene } from 'react-babylonjs';
import { PartyLightProps } from './interfaces';
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer';


const PartyLight: React.FC<PartyLightProps> = ({ position, intensity, color, alpha }) => {
  const materialRef = useRef<StandardMaterial | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  const scene = useScene();

let glowLayer = scene?.getGlowLayerByName('glow') as GlowLayer;
if (!glowLayer && !!scene) {
  glowLayer = new GlowLayer('glow', scene);
}
if (meshRef.current){
  glowLayer.addIncludedOnlyMesh(meshRef.current);
}
         glowLayer.intensity = 33;

  return (
    <>
      <pointLight 
        name="pointLight" 
        position={position}
        intensity={intensity}
        diffuse={color}
      />
      <sphere
        name="lightSphere"
        position={position}
        diameter={0.5}
        ref={meshRef}
      >
         <standardMaterial ref={materialRef} name="glow-material" emissiveColor={color} alpha={alpha} />
      </sphere>
    </>
  );
};

export default PartyLight;
