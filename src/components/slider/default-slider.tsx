import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export const DefaultSlider = () => {
  const data = [
    "Slider 1",
    "Slider 2",
    "Slider 3",
    "Slider 4",
    "Slider 5",
    "Slider 6",
  ];

  return (
    <>
      <Swiper className="h-screen w-full">
        {data.map((value, index) => {
          return (
            <SwiperSlide
              key={index}
            >
              <div className='flex h-full w-full items-center justify-center text-black'>{value}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
