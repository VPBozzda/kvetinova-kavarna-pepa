import React from 'react';

export const LocationButton = () => {

  return (

    <a 

      href="https://maps.app.goo.gl/WrQjicdxU1uv1oSHA" 

      target="_blank" 

      rel="noopener noreferrer" 

      className="button01 inline-block bg-white text-pink-500 border border-pink-100 shadow-sm"

    >

      <span className="button01_bg">

        <span className="button01_bg-mid bg-white"></span>

        <span className="button01_bg-right">

          {[...Array(25)].map((_, index) => (

            <span

              key={`pixel-${index}`}

              style={{ '--index': Math.floor(Math.random() * 4) } as React.CSSProperties}

              className="button01_bg-pixel !bg-pink-400"

            ></span>

          ))}

        </span>

        <span className="button01_bg-right-overlay">

          {[...Array(11)].map((_, index) => (

            <span

              key={`overlay-${index}`}

              style={{ '--index': 4 + Math.floor(Math.random() * 4) } as React.CSSProperties}

              className="button01_bg-pixel !bg-pink-300"

            ></span>

          ))}

        </span>

      </span>

      <span data-text="jsme tady" className="button01_inner !text-pink-500">

        <span className="button01_text !text-pink-500 font-semibold">jsme tady</span>

      </span>

    </a>

  );

};
