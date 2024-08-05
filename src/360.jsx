import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

import { VideoSphere } from "./components/VideoSphere";
import { useGSAP } from "@gsap/react";
import { puntos } from "./helpers/Puntos";
import { PuntoHover } from "./components/PuntoHover";
import RotatingGroup from "./components/RotatingGroup";

export default function caApp({ visibleIndex, setVisibleIndex }) {
  const [videoUrls] = useState([
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633171/video/ehi84pmwdnfmavtgigit.mp4",
  ]);

  const cameraRef = useRef();
  const { contextSafe } = useGSAP({ scope: cameraRef });

  const handlePointClick = contextSafe((newIndex) => {
    if (cameraRef.current) {
      const tl = gsap.timeline();
      tl.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 500,
        duration: 1,
      });

      tl.to(
        cameraRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        },
        "<"
      );
      tl.add(() => {
        setVisibleIndex(newIndex);
      }, "<");
    }
  });

  return (
    <>
      <Canvas className="z-10">
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 500]} />
        <OrbitControls />
        <RotatingGroup>
          {puntos.map((punto, index) => (
            <>
              {visibleIndex === index && (
                <VideoSphere
                  key={index}
                  videoUrl={punto.videoUrl}
                  visible={index}
                  handleUbicacion={handlePointClick}
                  img={punto.img}
                  ubicacion3d={punto.ubicacion3d}
                />
              )}
            </>
          ))}
        </RotatingGroup>
      </Canvas>
    </>
  );
}
