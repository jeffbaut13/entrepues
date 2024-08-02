import React from "react";

export const Menu = ({ refContainer, handleOpenMenu, handleCerrarMenu }) => {
  return (
    <div
      className="fixed top-0 z-50 w-full flex justify-end"
      ref={refContainer}
    >
      <button onClick={handleOpenMenu}>Menu</button>

      <div className=" -translate-y-full menuMap fixed top-0 z-20 w-full h-full flex justify-center items-center bg-[--second]">
        <figure className="imagenMapa opacity-0 w-96">
          <img src="/Mapa-entrepues.jpg" alt="" />
        </figure>
        <button className="absolute top-0 right-0" onClick={handleCerrarMenu}>
          Cerrar
        </button>
      </div>
    </div>
  );
};
