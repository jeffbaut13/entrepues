// src/App.js
import React, { useState, useEffect, useRef } from "react";

import CaApp from "./360";
import { Menu } from "./components/Menu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const container = useRef();

  const { contextSafe } = useGSAP({ scope: container });

  const tl = gsap.timeline();

  const handleOpenMenu = contextSafe(() => {
    tl.to(".menuMap", {
      translateY: "0%",
      ease: "circ.out",
      duration: 0.3,
    });
    tl.to(".imagenMapa", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
    });
  });

  const handleCerrarMenu = contextSafe(() => {
    tl.to(".imagenMapa", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.5,
    });
    tl.to(".menuMap", {
      translateY: "-100%",
      ease: "circ.out",
      duration: 0.3,
    });
  });

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* <Menu
        refContainer={container}
        handleCerrarMenu={handleCerrarMenu}
        handleOpenMenu={handleOpenMenu}
      /> */}
      <CaApp />
    </div>
  );
}

export default App;
