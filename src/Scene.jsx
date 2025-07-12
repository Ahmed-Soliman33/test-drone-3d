/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Drone } from "./Drone";

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
  const cameraRef = useRef(null);

  useFrame(() => {
    cameraRef.current.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const updateCameraPosition = () => {
      const positions = [
        [3.5, -2.17, 60],
        [7, 70, 20],
        [20, 50, -80],
        [18, 10.5, 80],
      ];
      if (progress >= 1) {
        gsap.to(cameraRef.current.position, {
          x: 0,
          y: 75.5,
          z: 70,
          duration: 0.5,
          ease: "power1.out",
        });
      } else {
        const segementProgress = 1 / 3;
        const segementIndex = Math.floor(progress / segementProgress);

        const perecentage = (progress % segementProgress) / segementProgress;

        const [startX, startY, startZ] = positions[segementIndex];
        const [endX, endY, endZ] = positions[segementIndex + 1];

        const x = startX + (endX - startX) * perecentage;
        const y = startY + (endY - startY) * perecentage;
        const z = startZ + (endZ - startZ) * perecentage;

        gsap.to(cameraRef.current.position, {
          x,
          y,
          z,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    updateCameraPosition();
  }, [progress, cameraRef.current]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        fov={45}
        near={0.1}
        far={10000}
        makeDefault
        position={[3.5, -2.17, 80]}
      />

      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />

      <Drone />
      <axesHelper args={[500]} />
    </>
  );
};

export default Scene;
