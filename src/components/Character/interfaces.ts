import { Color3, Vector3 } from '@babylonjs/core';

export interface CharacterState {
    id: string,
    position: Vector3,
    animations: Array<{
      name: 'idle' | 'walk' | 'run' | 'wave',
      weight: number
    }>,
    scale: number,
    animationSpeed: number
  }
  