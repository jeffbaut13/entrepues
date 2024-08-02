import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { animationSphere } from "../helpers/animations";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

import { useGSAP } from "@gsap/react";

export const VideoSphere = ({ videoUrl, visible, onLoaded }) => {
  const texture = useVideoTexture(videoUrl, {
    start: true,
    crossOrigin: "Anonymous",
    muted: true, // Añade esta línea
    playsInline: true, // Añade esta línea
  });
  const sphereRef = useRef();
  console.log(texture);
  useGSAP(
    () => {
      const tl = gsap.timeline();
      animationSphere(visible, tl, onLoaded, sphereRef);
    },
    { scope: sphereRef, dependencies: [visible, onLoaded] }
  );

  // Invertir coordenadas UV
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = -1; // Invertir horizontalmente
    }
  }, [texture]);

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={0}
      />
    </mesh>
  );
};
