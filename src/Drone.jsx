/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

export function Drone(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/dron.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    console.log("Available animation names:", names);

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  }, [actions]);

  // مراجع المراوح
  const prop1 = useRef();
  const prop2 = useRef();
  const prop3 = useRef();
  const prop4 = useRef();

  // تدوير المراوح
  useFrame(() => {
    const speed = 0.3;
    [prop1, prop2, prop3, prop4].forEach((ref) => {
      if (ref.current) ref.current.rotation.y += speed;
    });
  });

  // ربط المراوح بعد تحميل المودي
  useEffect(() => {
    prop1.current = scene.getObjectByName("prop_1127_127_correction");
    prop2.current = scene.getObjectByName("prop_2130_130_correction");
    prop3.current = scene.getObjectByName("prop_3133_133_correction");
    prop4.current = scene.getObjectByName("prop_4136_136_correction");
  }, [scene]);

  return (
    <group ref={group} {...props} dispose={null} scale={[10, 10, 10]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/dron.glb");
