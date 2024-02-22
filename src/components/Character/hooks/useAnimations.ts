import { useState, useEffect } from 'react';

const FBX_PATH = "http://localhost:8000/01/";

export const useAnimations = (animationNames: string[]) => {
    const [loadedAnimations, setLoadedAnimations] = useState<string[]>([]);

    const loadAnimationDirectly = async (animationName: string) => {
        try {
            const response = await fetch(`${FBX_PATH}01_03.fbx`);
            const fbxData = await response.blob();
            const blobURL = URL.createObjectURL(fbxData);

            setLoadedAnimations([...loadedAnimations, animationName]);
            return blobURL;
        } catch (error) {
            console.error("Failed to download the animation:", error);
        }
    };

    useEffect(() => {
        for (let animationName of animationNames) {
            if (!loadedAnimations.includes(animationName)) {
                loadAnimationDirectly(animationName);
            }
        }
    }, [animationNames]);

    return loadedAnimations;
};
