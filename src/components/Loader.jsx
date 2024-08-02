import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import water from "../lotties/water.json";
import { useGSAP } from "@gsap/react";

const Loader = ({ handleStartClick }) => {
  const waterRef = useRef(null);
  const tl = gsap.timeline();
  useGSAP(
    () => {
      tl.from(".mask1", {
        duration: 2,
        opacity: 0,
        ease: "sine.inOut",
      });
      tl.from(".btn", {
        duration: 1,
        opacity: 0,
        y: 200,
        ease: "sine.inOut",
      });
    },
    { scope: waterRef }
  );

  return (
    <div
      ref={waterRef}
      className="bg-black flex justify-center items-center flex-col w-full h-full"
    >
      <div className="mask1 w-96 h-96 inline-block">
        <div className="bg-blue-500 w-full h-full">
          <Lottie
            animationData={water}
            className="w-full h-full"
            loop={false}
          />
        </div>
      </div>
      <button onClick={handleStartClick} className="btn bg-white text-black">
        Entrar
      </button>
    </div>
  );
};

export default Loader;
