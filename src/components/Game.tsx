import React, { useRef } from "react";
import { Vector3, Color3, IShadowLight } from "@babylonjs/core";
import { CannonJSPlugin } from "@babylonjs/core/Physics/Plugins/cannonJSPlugin";
import { Engine, Scene } from "react-babylonjs";
import Character from "./Character/."; // Path to your Character component
import PartyLights from "./PartyLights/."; // Path to your Character component
import Background from "./Background";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";
import BouncySphere from "./BouncySpere";
import * as CANNON from "cannon";

const gravityVector = new Vector3(0, -9.81, 0);
const RADIUS = 5;
const NUMBER_OF_BOXES = 8;

const Game: React.FC = () => {
  const pointLightRef = useRef<IShadowLight | undefined>(undefined);

  return (
    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
      <Scene
        enablePhysics={[
          gravityVector,
          new CannonJSPlugin(undefined, undefined, CANNON),
        ]}
      >
        <arcRotateCamera
          name="arcCamera"
          alpha={-Math.PI / 2} // To look from the front.
          beta={Math.PI / 3} // Adjusting this value to pan the camera downwards even more.
          radius={7} // Zoom distance.
          target={new Vector3(0, 1.5, 0)} // Adjusted the Y value here
          lowerAlphaLimit={(-3 * Math.PI) / 4} // Limit horizontal rotation to the left.
          upperAlphaLimit={-Math.PI / 4} // Limit horizontal rotation to the right.
          lowerBetaLimit={Math.PI / 8} // Limit the downwards vertical rotation.
          upperBetaLimit={Math.PI / 2} // Limit the upwards vertical rotation.
          lowerRadiusLimit={5} // Minimum zoom distance.
          upperRadiusLimit={15} // Maximum zoom distance.
        />
        <directionalLight

          name="shadow-light"
          setDirectionToTarget={[Vector3.Zero()]}
          direction={Vector3.Zero()}
          position={new Vector3(-40, 30, -40)}
          intensity={0.7}
          shadowMinZ={1}
          shadowMaxZ={2500}
        >
          <shadowGenerator
            mapSize={1024}
            useBlurExponentialShadowMap={true}
            blurKernel={32}
            darkness={0.8}
            forceBackFacesOnly={true}
            depthScale={100}
            shadowCastChildren
          >
            {Array.from(new Array(NUMBER_OF_BOXES), (_, index) => index).map(
              (x) => (
                <BouncySphere
                  key={x}
                  name={x.toFixed()}
                  fontsReady={true}
                  position={
                    new Vector3(
                      Math.cos(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS,
                      3,
                      Math.sin(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS
                    )
                  }
                  color={
                    new Color3(
                      Math.abs(x - NUMBER_OF_BOXES / 2) / 10,
                      Math.abs(x - NUMBER_OF_BOXES / 2) / 10,
                      Math.abs(x - NUMBER_OF_BOXES / 2) / 10
                    )
                  }
                />
              )
            )}
            <Character
              id="character1"
              position={new Vector3(0, 0, 0)}
              animations={[
                { name: "run", weight: 10000 },
                //... you can add more animations with their respective weights here
              ]}
              scale={2}
              animationSpeed={1.3}
              // remove the updateState prop if it's not being used
            />
          </shadowGenerator>
        </directionalLight>

        <ground
          name="ground1"
          width={24}
          height={24}
          subdivisions={2}
          receiveShadows={true}
        >
          <physicsImpostor
            type={PhysicsImpostor.BoxImpostor}
            _options={{ mass: 0, restitution: 0.9 }}
          />
        </ground>

        {/* <PartyLights  
          numberOfLights={22} 
          scale={4}  
          pulseIntensity={5} 
          baseIntensity={44} pulseSpeed={0} speed={.9}
          offsetMargin={0}
          /> */}

        {pointLightRef.current && (
          <shadowGenerator
            mapSize={512}
            darkness={0.5}
            shadowCasters={["box1", "ground1"]}
            light={pointLightRef.current}
          />
        )}

        {/* <ground name="ground1" width={6} height={6} receiveShadows={true} /> */}

        {/* <Background /> */}
      </Scene>
    </Engine>
  );
};

export default Game;
