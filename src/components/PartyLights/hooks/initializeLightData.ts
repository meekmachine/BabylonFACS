import { Vector3, Color3 } from '@babylonjs/core';
// hooks/initializeLightData.ts

import { PartyLightsProps, LightData } from '../interfaces';

const initializeLightData = (props: PartyLightsProps): LightData[] => {
  const { numberOfLights, baseIntensity, offsetMargin,speed, pulseSpeed} = props;
  const randomOffset = ():number => Math.random();

 
  return [...Array(numberOfLights)].map(() => {
    const rand = randomOffset();
    return {
    position: new Vector3(),
    color: new Color3(Math.random(), Math.random(), Math.random()),
    intensity: baseIntensity,
    intensityOffset: Math.random() * 0.2,
    pulseOffset: 2 * Math.PI * rand * offsetMargin,
    randomOffset: rand,
    offsetMargin: offsetMargin,
    x: 0.5 + Math.random() * 1.5,
    y: 0.5 + Math.random() * 1.5,
    z: 0.5 + Math.random() * 1.5,
    alpha: 1,
      speed: speed,
      pulseSpeed: pulseSpeed,
      pulseIntensity:props.pulseIntensity,
      scale: props.scale,
      baseIntensity: baseIntensity
  }});
};

export default initializeLightData;
