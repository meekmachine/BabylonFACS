import React, { useEffect, useRef } from 'react';
import { Vector3, SceneLoader, Mesh, AnimationPropertiesOverride, Skeleton, Animatable } from '@babylonjs/core';
import { useScene } from 'react-babylonjs';
import "@babylonjs/loaders";
import { CharacterState } from './interfaces';

const Character: React.FC<CharacterState> = (props) => {
    const scene = useScene();
    const characterMeshRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (scene) {
            SceneLoader.ImportMesh('', "/models/character/", "eva.glb", scene, (newMeshes, particleSystems, skeletons) => {
                const mesh = newMeshes[0] as Mesh;
                characterMeshRef.current = mesh;
                mesh.position = props.position;
                mesh.scaling = new Vector3(props.scale, props.scale, props.scale);

                skeletons.forEach((skeleton: Skeleton) => {
                    skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
                    skeleton.animationPropertiesOverride.enableBlending = false;
                    skeleton.animationPropertiesOverride.loopMode = 0;
                    skeleton.getAnimatables().forEach((animatable) => {
                        // Use type assertion to treat animatable as Animatable
                        (animatable as any as Animatable).stop();
                    });
                });
            });
        }
    }, [scene, props.position, props.scale]);

    return (
        <></>
    );
};

export default Character;
