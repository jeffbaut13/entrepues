import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

import { VideoSphere } from "./components/VideoSphere";
import { useGSAP } from "@gsap/react";
import { puntos } from "./helpers/Puntos";
import { PuntoHover } from "./components/PuntoHover";

export default function caApp({
  hasInteracted,
  visibleIndex,
  setVisibleIndex,
}) {
  const [videoUrls] = useState([
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633171/video/ehi84pmwdnfmavtgigit.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633160/video/jwyyaln0ezmj2czz83wb.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633168/video/xwzr9rzemixlkj7cmtqh.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633797/video/mkh8vxaupyn2vnbsltgl.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633163/video/iwu8lwz6tgaf4c4oab3v.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633136/video/pwar6fkvhadrfreomlng.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633171/video/cmxtcwwdhuj0dg1kbvh5.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722633159/video/nila8pwfd7fcpf6i7nx9.mp4",
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

  useEffect(() => {
    if (hasInteracted) {
      const videoElements = document.querySelectorAll("video");
      videoElements.forEach((video) => {
        video.muted = true;
        video.setAttribute("playsInline", "");
        video.play();
      });
    }
  }, [hasInteracted]);

  return (
    <>
      {hasInteracted && (
        <Canvas className="z-10">
          <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            position={[0, 0, 500]}
          />
          <OrbitControls maxDistance={500} />

          {videoUrls.map((videoUrl, index) => (
            <VideoSphere
              key={index}
              videoUrl={videoUrl}
              visible={visibleIndex === index}
              onLoaded={() => {
                if (visibleIndex !== index) setVisibleIndex(index);
              }}
            />
          ))}

          {puntos.map((punto, index) => (
            <Html key={index} position={punto.ubicacion3d}>
              <PuntoHover
                handleUbicacion={() => handlePointClick(index)}
                img={punto.img}
                ubicacion={`${
                  visibleIndex === index ? "hidden" : ""
                } bg-white border-white`}
              />
            </Html>
          ))}
        </Canvas>
      )}
    </>
  );
}
