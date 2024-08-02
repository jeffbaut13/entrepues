import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

import { VideoSphere } from "./components/VideoSphere";
import { useGSAP } from "@gsap/react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function caApp() {
  const [videoUrls, setVideoUrls] = useState([
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722547253/14.1_q3glpf.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722547241/14_1_pbizs3.mp4",
  ]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false); // Estado para detectar interacción del usuario
  const cameraRef = useRef();
  const { contextSafe } = useGSAP({ scope: cameraRef });

  const handlePointClick = contextSafe((newIndex) => {
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
  });

  // Iniciar la reproducción del video tras la interacción del usuario
  const handleStartClick = () => {
    setHasInteracted(true);
  };

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
      {!hasInteracted && (
        <div className="start-button z-[100]">
          <button onClick={handleStartClick}>Start</button>
        </div>
      )}
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

          <Html position={[500, 0, 0]}>
            <button onClick={() => handlePointClick(1)}>
              Click Plaza principal
            </button>
          </Html>
          <Html position={[-500, 0, 0]}>
            <button onClick={() => handlePointClick(0)}>Click parrilla</button>
          </Html>
        </Canvas>
      )}
    </>
  );
}
