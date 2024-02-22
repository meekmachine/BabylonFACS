import { Color3, Vector3 } from '@babylonjs/core';

export interface PartyLightsProps {
  numberOfLights: number;
  scale: number;
  baseIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  speed: number; 
  offsetMargin: number;
}

export interface LightData {
  position: Vector3;
  intensity: number;
  color: Color3;
  intensityOffset: number;
  pulseOffset: number;
  x: number;
  y: number;
  z: number;
  alpha: number;
  randomOffset:number;
  offsetMargin: number;
  speed:number;
  pulseSpeed:number,
  pulseIntensity:number,
  scale:number,
  baseIntensity:number
   // Add this
}

export interface PartyLightProps {
  position: Vector3;
  intensity: number;
  color: Color3;
  alpha: number;
}