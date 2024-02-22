import React, { useEffect, useRef } from 'react';
import { Vector3, SceneLoader, AnimationGroup, Mesh, AnimationPropertiesOverride } from '@babylonjs/core';
import { SceneLoaderAnimationGroupLoadingMode } from '@babylonjs/core/Loading/sceneLoader';
import { useScene } from 'react-babylonjs';
import "@babylonjs/loaders";
import { CharacterState } from './interfaces';
import { useAnimations } from './hooks/useAnimations';

const Character: React.FC<CharacterState> = (props) => {
    const scene = useScene();
    const characterMeshRef = useRef<Mesh | null>(null);
    const animationGroupsRef = useRef<{ [key: string]: AnimationGroup }>({});
    const cachedAnimations = useAnimations(props.animations.map(anim => anim.name));

    useEffect(() => {
        SceneLoader.ImportMesh('', "/models/character/", "eva.glb", scene, (newMeshes) => {
            characterMeshRef.current = newMeshes[0] as Mesh;
            characterMeshRef.current.position = props.position;
            characterMeshRef.current.scaling = new Vector3(props.scale, props.scale, props.scale);
            if (!!scene){
              // Set animation properties override for smooth transitions between animations
              scene.animationPropertiesOverride = new AnimationPropertiesOverride();
              scene.animationPropertiesOverride.enableBlending = true;
              scene.animationPropertiesOverride.blendingSpeed = 0.05;
              scene.animationPropertiesOverride.loopMode = 1;

              // Apply and start the default or cached animations
              applyAndPlayAnimations(cachedAnimations);
            }
      
        });
    }, [scene, props, cachedAnimations]);

    const applyAndPlayAnimations = (animations: string[]) => {
        animations.forEach(animName => {
            const animationData = localStorage.getItem(`animation_${animName}`);
            if (animationData) {
                SceneLoader.ImportAnimations("data:" + animationData, "", scene, false, SceneLoaderAnimationGroupLoadingMode.Clean, null, (scene) => {
                    if (scene.animationGroups.length > 0) {
                        const animationGroup = scene.animationGroups[0]; // Assuming one animation group per animation.
                        animationGroupsRef.current[animationGroup.name] = animationGroup;
                        animationGroup.start(true, props.animationSpeed);
                    }
                });
            }
        });
    };

    useEffect(() => {
        // If animations prop changes, we try to apply and play the new animations
        applyAndPlayAnimations(props.animations.map(anim => anim.name));
    }, [props.animations]);

    return (
        <></>
    );
};

export default Character;
