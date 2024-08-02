import React from "react";
import { PuntoHover } from "./PuntoHover";
import { puntos } from "../helpers/Puntos";

export const Menu = ({
  refContainer,
  handleOpenMenu,
  handleCerrarMenu,
  setVisibleIndex,
}) => {
  const handlePunto = (index) => {
    setVisibleIndex(index);
    handleCerrarMenu();
  };

  return (
    <div
      className="fixed top-0 z-50 w-full flex justify-end"
      ref={refContainer}
    >
      <button onClick={handleOpenMenu}>Menu</button>

      <div className=" -translate-y-full menuMap fixed top-0 z-20 w-full h-full flex justify-center items-center bg-[--second]">
        <div className="box-img w-[46rem] h-auto relative overflow-hidden">
          <figure className="imagenMapa opacity-0 w-full h-full">
            <img src="/Mapa-entrepues.jpg" alt="" />
          </figure>

          {puntos.map((punto, index) => (
            <PuntoHover
              handleUbicacion={() => handlePunto(index)}
              key={punto.title}
              img={punto.img}
              ubicacion={`${punto.ubicacion} hidden bg-black border-black  point animate-pulse hover:animate-none absolute`}
            />
          ))}
        </div>
        <button className="absolute top-0 right-0" onClick={handleCerrarMenu}>
          Cerrar
        </button>
      </div>
    </div>
  );
};
