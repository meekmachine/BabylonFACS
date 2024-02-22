import React, { useRef, useEffect, useState } from "react";
import { Color3, Vector3 } from "@babylonjs/core";
import PartyLight from "./PartyLight";
import initializeLightData from "./hooks/initializeLightData";
import updateLightPositions from "./hooks/updateLightPositions";
import { PartyLightsProps, LightData } from "./interfaces";
import { useBeforeRender } from 'react-babylonjs';

const PartyLights: React.FC<PartyLightsProps> = ({
  numberOfLights,
  scale,
  baseIntensity,
  pulseSpeed,
  pulseIntensity,
  speed,
  offsetMargin
}) => {
  const [lightData, setLightData] = useState<LightData[]>([]);
  const alpha = useRef(0);
  // inside index.tsx (which was PartyLights.tsx)

  useEffect(() => {
    setLightData(initializeLightData( {
      numberOfLights,
      scale,
      baseIntensity,
      pulseSpeed,
      pulseIntensity,
      speed,
      offsetMargin
    }));
  }, [numberOfLights, baseIntensity, speed, scale, pulseSpeed, offsetMargin, pulseIntensity,]);

  useBeforeRender(() => {

      
      setLightData((prevData) =>{
        alpha.current += 0.01 * prevData[0].speed;
        return updateLightPositions(
          {
            numberOfLights,
            scale,
            baseIntensity,
            pulseSpeed,
            pulseIntensity,
            speed,
            offsetMargin
          },
          alpha.current,
          prevData
        )
        });
  
  });

  return (
    <>
      {lightData.map((light, i) => (
        <PartyLight
          key={i}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
          alpha={light.alpha}
        />
      ))}
    </>
  );
};

export default PartyLights;
