import React from 'react';

export const LocationButton = () => {

  return (

    <a

      href="https://maps.app.goo.gl/WrQjicdxU1uv1oSHA"

      target="_blank"

      rel="noopener noreferrer"

      className="button01 inline-block"

    >

      <span className="button01_bg">

        <span className="button01_bg-mid"></span>

        <span className="button01_bg-right">

          {[...Array(25)].map((_, index) => (

            <span

              key={`pixel-${index}`}

              style={{ '--index': Math.floor(Math.random() * 4) } as React.CSSProperties}

              className="button01_bg-pixel"

            ></span>

          ))}

        </span>

        <span className="button01_bg-right-overlay">

          {[...Array(11)].map((_, index) => (

            <span

              key={`overlay-${index}`}

              style={{ '--index': 4 + Math.floor(Math.random() * 4) }as React.CSSProperties}

              className="button01_bg-pixel"

            ></span>

          ))}

        </span>

      </span>

      <span data-text="TADY NÁS NAJDETE" className="button01_inner">

        <span className="button01_text">TADY NÁS NAJDETE</span>

      </span>

    </a>

  );

};
