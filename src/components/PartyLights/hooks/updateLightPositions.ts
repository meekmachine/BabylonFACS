import { Vector3 } from '@babylonjs/core';
import { PartyLightsProps, LightData } from '../interfaces';

const updateLightPositions = (props: PartyLightsProps, alphaValue: number, prevData: LightData[]): LightData[] => {
  const { baseIntensity, pulseSpeed, pulseIntensity } = prevData[0];
  const scale = prevData[0].scale
  return prevData.map((light, i) => {
    const coef = light;
    const pulseOffset = 2 * Math.PI * coef.randomOffset * coef.offsetMargin
    const x = scale * 2 * Math.sin(alphaValue * coef.x + i);
    const y = 2 + scale * 1.5 * Math.sin(alphaValue * coef.y + i);
    const z = scale * 2 * Math.cos(alphaValue * coef.z + i);
    const pulseFactor = 1 + pulseIntensity * Math.sin(pulseSpeed * alphaValue + pulseOffset);
    const intensity = (baseIntensity + coef.intensityOffset) * pulseFactor;

    // Calculate alpha for the sphere based on the light intensity
    const sphereAlpha =  intensity / baseIntensity

    return {
      ...light,
      position: new Vector3(x, y, z),
      intensity,
      alpha: sphereAlpha / 100,
    };
  });
};

export default updateLightPositions;
