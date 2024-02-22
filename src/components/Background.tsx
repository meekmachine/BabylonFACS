// Background.tsx

import React, { useEffect } from 'react';
import { useScene } from 'react-babylonjs';
import { Mesh,  Texture, Vector3, ProceduralTexture } from '@babylonjs/core';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';

// import { FireProceduralTexture } from '@babylonjs/procedural-textures';

const Background: React.FC = () => {
    const scene = useScene();

    useEffect(() => {
        if (scene) {
            const skybox = Mesh.CreateSphere("skyBox", 100.0, 1000.0, scene);
            const skyboxMaterial = new StandardMaterial("skyBox", scene);
            skyboxMaterial.backFaceCulling = false;

        
            skybox.material = skyboxMaterial;
            skybox.infiniteDistance = true;
        }
    }, [scene]);

    return (
        <>
            <hemisphericLight name="light1" intensity={1} direction={Vector3.Up()} />
        </>
    );
};

export default Background;
