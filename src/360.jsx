import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

import { VideoSphere } from "./components/VideoSphere";
import { useGSAP } from "@gsap/react";
import cloudinary from "./config/cloudinaryConfig";

import { Cloudinary } from "@cloudinary/url-gen";

export default function caApp() {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dhqkfhlnr",
    },
  });

  const myImage = cld.video("/14.1_q3glpf");

  console.log(myImage);

  const [videoUrls, setVideoUrls] = useState([
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722547253/14.1_q3glpf.mp4",
    "https://res.cloudinary.com/dhqkfhlnr/video/upload/v1722547241/14_1_pbizs3.mp4",
  ]);
  const [visibleIndex, setVisibleIndex] = useState(0);
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

  let arrayVideo = [];

  for (let index = 0; index < videoUrls.length; index++) {
    arrayVideo.push(index);
  }

  console.log(arrayVideo);

  return (
    <Canvas className="z-10">
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 500]} />
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
  );
}
