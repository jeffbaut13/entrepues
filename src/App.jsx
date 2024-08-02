// src/App.js
import React, { useState, useEffect, useRef } from "react";

import CaApp from "./360";
import { Menu } from "./components/Menu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loader from "./components/Loader";

function App() {
  const [hasInteracted, setHasInteracted] = useState(false); // Estado para detectar interacción del usuario
  const container = useRef();
  const [visibleIndex, setVisibleIndex] = useState(0);

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
    tl.to(".point", {
      display: "block",

      duration: 0.5,
    });
  });

  const handleCerrarMenu = contextSafe(() => {
    gsap.to(".point", {
      display: "none",

      duration: 0.5,
    });
    gsap.to(".imagenMapa", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.5,
    });
    gsap.to(".menuMap", {
      translateY: "-100%",
      ease: "circ.out",
      duration: 0.3,
    });
  });

  const handleStartClick = () => {
    setHasInteracted(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {!hasInteracted ? (
        <>
          <Loader handleStartClick={handleStartClick} />
        </>
      ) : (
        <>
          <Menu
            refContainer={container}
            handleCerrarMenu={handleCerrarMenu}
            handleOpenMenu={handleOpenMenu}
            setVisibleIndex={setVisibleIndex}
          />
          <CaApp
            visibleIndex={visibleIndex}
            setVisibleIndex={setVisibleIndex}
            hasInteracted={hasInteracted}
            setHasInteracted={setHasInteracted}
          />
        </>
      )}
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Menu
        refContainer={container}
        handleCerrarMenu={handleCerrarMenu}
        handleOpenMenu={handleOpenMenu}
        setVisibleIndex={setVisibleIndex}
      />
      <CaApp
        visibleIndex={visibleIndex}
        setVisibleIndex={setVisibleIndex}
        hasInteracted={hasInteracted}
        setHasInteracted={setHasInteracted}
      />
    </div>
  );
}

export default App;
